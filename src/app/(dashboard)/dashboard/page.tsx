'use client';

import { useState, useEffect } from 'react';
import type { User, Task, Schedule, QuickLink, Directive } from '@/types';
import { useTaskStore } from '@/store/taskStore';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskModal from '@/components/tasks/EditTaskModal';
import {
  schedules,
  quickLinks,
  integrations,
  users,
  notifications,
  directives,
  getTasksByAssignee,
  getSchedulesByParticipant,
  getQuickLinksByUser,
  getUserById,
} from '@/lib/mock-data';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusLabel: Record<Task['status'], string> = {
  todo: '할일',
  'in-progress': '진행중',
  review: '검토중',
  done: '완료',
};

const statusColor: Record<Task['status'], string> = {
  todo: 'bg-slate-500/20 text-slate-300',
  'in-progress': 'bg-blue-500/20 text-blue-400',
  review: 'bg-yellow-500/20 text-yellow-400',
  done: 'bg-green-500/20 text-green-400',
};

const scheduleTypeIcon: Record<Schedule['type'], string> = {
  meeting: '🤝',
  deadline: '⏰',
  reminder: '🔔',
  event: '🎉',
};

const scheduleTypeLabel: Record<Schedule['type'], string> = {
  meeting: '회의',
  deadline: '마감',
  reminder: '리마인더',
  event: '이벤트',
};

const scheduleTypeColor: Record<Schedule['type'], string> = {
  meeting: 'border-blue-500/30 bg-blue-500/10',
  deadline: 'border-red-500/30 bg-red-500/10',
  reminder: 'border-yellow-500/30 bg-yellow-500/10',
  event: 'border-emerald-500/30 bg-emerald-500/10',
};

const scheduleTypeBadge: Record<Schedule['type'], string> = {
  meeting: 'bg-blue-500/20 text-blue-400',
  deadline: 'bg-red-500/20 text-red-400',
  reminder: 'bg-yellow-500/20 text-yellow-400',
  event: 'bg-emerald-500/20 text-emerald-400',
};

const directiveStatusLabel: Record<Directive['status'], string> = {
  pending: '대기중',
  acknowledged: '확인됨',
  completed: '완료',
};

const directiveStatusColor: Record<Directive['status'], string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  acknowledged: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-green-500/20 text-green-400',
};

function progressBarColor(pct: number): string {
  if (pct > 70) return 'bg-green-500';
  if (pct > 40) return 'bg-amber-500';
  return 'bg-red-500';
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [userQuickLinks, setUserQuickLinks] = useState<QuickLink[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bomnal_current_user');
      if (stored) {
        const u: User = JSON.parse(stored);
        setCurrentUser(u);
        if (u.role === 'admin') {
          setUserQuickLinks(quickLinks);
        } else {
          setUserQuickLinks(getQuickLinksByUser(u.id));
        }
      }
    } catch {
      // handled by layout redirect
    }
  }, []);

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  // Task data from store
  const myTasks: Task[] = isAdmin ? tasks : tasks;
  const todoAndInProgress = myTasks.filter(
    (t) => t.status === 'todo' || t.status === 'in-progress',
  );
  const urgentTasks = myTasks.filter((t) => t.urgency >= 4);
  const inProgressTasks = myTasks.filter((t) => t.status === 'in-progress');
  const doneTasks = myTasks.filter((t) => t.status === 'done');

  // Schedules sorted by time
  const mySchedules: Schedule[] = isAdmin
    ? [...schedules].sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      )
    : [...schedules]
        .filter((s) => s.participants.includes(currentUser.id))
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return (
    <div className="min-h-screen bg-slate-950 space-y-6 p-4 md:p-6 lg:p-8">
      {/* ── A) Welcome Banner ───────────────────────────────── */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold">
            좋은 아침이에요, {currentUser.name}님! 👋
          </h1>
          <p className="mt-1 text-sm text-white/80">2026년 6월 8일 월요일</p>
          <p className="mt-3 text-sm md:text-base text-white/90">
            오늘 할일 <span className="font-bold">{todoAndInProgress.length}개</span>, 긴급{' '}
            <span className="font-bold text-yellow-200">{urgentTasks.length}건</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium">
              {currentUser.department}
            </span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium">
              {currentUser.position}
            </span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium">
              일정 {mySchedules.length}건
            </span>
          </div>
        </div>
      </section>

      {/* ── B) Stats Overview Cards ─────────────────────────── */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* 오늘의 할일 - blue */}
        <div className="rounded-2xl border border-blue-500/30 bg-slate-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-blue-400">오늘의 할일</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-lg">
              📋
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{todoAndInProgress.length}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-blue-400">▲ 2</span>
            <span className="text-xs text-slate-400">어제 대비</span>
          </div>
        </div>

        {/* 긴급 업무 - red */}
        <div className="rounded-2xl border border-red-500/30 bg-slate-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-red-400">긴급 업무</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-lg">
              🔥
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{urgentTasks.length}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-red-400">즉시 처리 필요</span>
          </div>
        </div>

        {/* 진행중 - amber */}
        <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-amber-400">진행중</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-lg">
              ⚡
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{inProgressTasks.length}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-amber-400">
              평균{' '}
              {inProgressTasks.length
                ? Math.round(
                    inProgressTasks.reduce((s, t) => s + t.progress, 0) / inProgressTasks.length,
                  )
                : 0}
              %
            </span>
            <span className="text-xs text-slate-400">진행률</span>
          </div>
        </div>

        {/* 완료 - green */}
        <div className="rounded-2xl border border-green-500/30 bg-slate-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-green-400">완료</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-lg">
              ✅
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{doneTasks.length}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-green-400">▲</span>
            <span className="text-xs text-slate-400">
              전체의 {myTasks.length ? Math.round((doneTasks.length / myTasks.length) * 100) : 0}%
              완료
            </span>
          </div>
        </div>
      </section>

      {/* ── C) 오늘의 업무 ──────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">오늘의 업무</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 transition-colors"
            >
              + 새 업무
            </button>
            <button
              type="button"
              onClick={() => toggleSection('tasks')}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {collapsedSections.tasks ? '펼치기 ▼' : '접기 ▲'}
            </button>
          </div>
        </div>
        {!collapsedSections.tasks && (
          <div className="space-y-3">
            {myTasks.map((task) => {
              const isExpanded = expandedTask === task.id;
              return (
                <div
                  key={task.id}
                  className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm transition-all hover:border-slate-600"
                >
                  <button
                    type="button"
                    className="w-full p-5 text-left"
                    onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white truncate">{task.title}</h3>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[task.status]}`}
                          >
                            {statusLabel[task.status]}
                          </span>
                          {task.aiAssisted && (
                            <span className="shrink-0 rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-400">
                              AI
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                          {task.description}
                        </p>
                      </div>
                      <p className="shrink-0 text-xs text-slate-400">마감 {task.dueDate}</p>
                    </div>

                    {/* 4 colored badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                        중요도 {task.priority}
                      </span>
                      <span className="rounded-md bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                        긴급도 {task.urgency}
                      </span>
                      <span className="rounded-md bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-orange-400">
                        위험도 {task.risk}
                      </span>
                      <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                        진행도 {task.progress}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full transition-all ${progressBarColor(task.progress)}`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-slate-700/50 px-5 py-4 space-y-3">
                      <p className="text-sm text-slate-300">{task.description}</p>

                      {/* Related links */}
                      {task.relatedLinks.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-slate-400 mb-1">관련 링크</p>
                          <div className="flex flex-wrap gap-2">
                            {task.relatedLinks.map((link) => (
                              <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
                              >
                                <span>{link.icon}</span>
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTask(task);
                          }}
                          className="rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/30 transition-colors"
                        >
                          ✏️ 편집
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-400 hover:bg-purple-500/30 transition-colors"
                        >
                          🤖 AI 전달
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task.id, 'done');
                          }}
                          className="rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/30 transition-colors"
                        >
                          ✓ 완료
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── D) 오늘의 일정 ──────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">오늘의 일정</h2>
          <button
            type="button"
            onClick={() => toggleSection('schedules')}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {collapsedSections.schedules ? '펼치기 ▼' : '접기 ▲'}
          </button>
        </div>
        {!collapsedSections.schedules && (
          <div className="relative space-y-3 pl-6">
            {/* Timeline line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-px bg-slate-800" />

            {mySchedules.map((sched) => (
              <div key={sched.id} className="relative flex items-start gap-3">
                {/* Dot */}
                <div className="absolute -left-6 top-3 z-10 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-slate-950" />

                <div
                  className={`flex-1 rounded-xl border-l-4 p-4 ${scheduleTypeColor[sched.type]}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base">{scheduleTypeIcon[sched.type]}</span>
                      <h3 className="text-sm font-semibold text-white truncate">
                        {sched.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${scheduleTypeBadge[sched.type]}`}
                      >
                        {scheduleTypeLabel[sched.type]}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-slate-400">
                      {formatTime(sched.startTime)}
                      {sched.startTime !== sched.endTime && ` - ${formatTime(sched.endTime)}`}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">
                      참여자 {sched.participants.length}명
                    </span>
                    <div className="flex -space-x-1">
                      {sched.participants.slice(0, 4).map((pid) => {
                        const u = users.find((usr) => usr.id === pid);
                        return u ? (
                          <span
                            key={pid}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[8px] font-bold text-white ring-1 ring-slate-900"
                            title={u.name}
                          >
                            {u.name.charAt(0)}
                          </span>
                        ) : null;
                      })}
                      {sched.participants.length > 4 && (
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[8px] font-bold text-slate-300 ring-1 ring-slate-900">
                          +{sched.participants.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── E) 연동 서비스 ──────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-white">연동 서비스</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {integrations.map((integ) => (
            <div
              key={integ.id}
              className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-900/80 px-4 py-3 shadow-sm"
            >
              <span className="text-xl">{integ.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white whitespace-nowrap">
                  {integ.name}
                </p>
                <div className="mt-0.5 flex items-center gap-1">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      integ.status === 'connected' ? 'bg-green-500' : 'bg-red-400'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400">
                    {integ.status === 'connected' ? '연결됨' : '미연결'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── F) 빠른 바로가기 ────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-white">빠른 바로가기</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {userQuickLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-4 shadow-sm transition-all hover:border-blue-500/50 hover:-translate-y-0.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-lg">
                {link.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{link.title}</p>
                <p className="text-[10px] text-slate-400">{link.category}</p>
              </div>
            </a>
          ))}

          {/* + 바로가기 추가 */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/80 p-4 text-slate-400 transition-colors hover:border-blue-500/50 hover:text-blue-400"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xl font-bold">
              +
            </span>
            <p className="text-sm font-medium">바로가기 추가</p>
          </button>
        </div>
      </section>

      {/* ── G) 팀 현황 (Admin only) ─────────────────────────── */}
      {isAdmin && (
        <section>
          <h2 className="mb-4 text-lg font-bold text-white">팀 현황</h2>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
            <div className="divide-y divide-slate-700/50">
              {users.map((member) => {
                const memberTasks = tasks.filter((t) => t.assigneeId === member.id);
                const memberTotal = memberTasks.length;
                const avgProgress = memberTotal
                  ? Math.round(memberTasks.reduce((s, t) => s + t.progress, 0) / memberTotal)
                  : 0;

                return (
                  <div key={member.id} className="flex items-center gap-4 px-5 py-4">
                    {/* Avatar */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                      {member.name.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">{member.name}</p>
                        <span className="text-[10px] text-slate-400">
                          {member.department} &middot; {member.position}
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full transition-all ${progressBarColor(avgProgress)}`}
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                        <span className="shrink-0 text-xs text-slate-400">평균 {avgProgress}%</span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs text-slate-400">업무 {memberTotal}건</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 지시사항 */}
          <h2 className="mt-6 mb-4 text-lg font-bold text-white">지시사항</h2>
          <div className="space-y-3">
            {directives.map((dir) => {
              const from = getUserById(dir.fromUserId);
              const to = getUserById(dir.toUserId);
              return (
                <div
                  key={dir.id}
                  className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-300">
                          {from?.name ?? '알 수 없음'} → {to?.name ?? '알 수 없음'}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${directiveStatusColor[dir.status]}`}
                        >
                          {directiveStatusLabel[dir.status]}
                        </span>
                        {dir.priority >= 4 && (
                          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                            중요도 {dir.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{dir.content}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] text-slate-500">
                    {new Date(dir.createdAt).toLocaleString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Modals ──────────────────────────────────────────── */}
      <AddTaskModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      {editingTask && (
        <EditTaskModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          task={editingTask}
        />
      )}
    </div>
  );
}
