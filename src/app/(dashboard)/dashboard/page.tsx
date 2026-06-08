'use client';

import { useState, useEffect, useMemo } from 'react';
import type { User, Task, Schedule, Directive } from '@/types';
import { useTaskStore } from '@/store/taskStore';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskModal from '@/components/tasks/EditTaskModal';
import {
  schedules,
  quickLinks,
  integrations,
  users,
  directives,
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

type SortKey = 'dueDate' | 'priority' | 'urgency' | 'progress';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'dueDate', label: '마감일' },
  { key: 'priority', label: '중요도' },
  { key: 'urgency', label: '긴급도' },
  { key: 'progress', label: '진행도' },
];

function sortTasks(tasks: Task[], sortBy: SortKey): Task[] {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return b[sortBy] - a[sortBy];
  });
}

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('dueDate');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bomnal_current_user');
      if (stored) {
        const u: User = JSON.parse(stored);
        setCurrentUser(u);
      }
    } catch {
      // handled by layout redirect
    }
  }, []);

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  const myTasks: Task[] = tasks;
  const todoAndInProgress = myTasks.filter(
    (t) => t.status === 'todo' || t.status === 'in-progress',
  );
  const urgentTasks = myTasks.filter((t) => t.urgency >= 4);
  const inProgressTasks = myTasks.filter((t) => t.status === 'in-progress');
  const doneTasks = myTasks.filter((t) => t.status === 'done');

  const sortedTasks = sortTasks(myTasks, sortBy);

  const mySchedules: Schedule[] = isAdmin
    ? [...schedules].sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      )
    : [...schedules]
        .filter((s) => s.participants.includes(currentUser.id))
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const userQuickLinks = isAdmin ? quickLinks : getQuickLinksByUser(currentUser.id);

  return (
    <div className="min-h-screen space-y-6 p-4 md:p-6">
      {/* ── Welcome + Stats Row ─────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Welcome Card */}
        <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <h1 className="text-xl md:text-2xl font-bold">
              좋은 아침이에요, {currentUser.name}님!
            </h1>
            <p className="mt-1 text-sm text-white/80">2026년 6월 8일 월요일</p>
            <p className="mt-2 text-sm text-white/90">
              오늘 할일 <span className="font-bold">{todoAndInProgress.length}개</span>, 긴급{' '}
              <span className="font-bold text-yellow-200">{urgentTasks.length}건</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-blue-500/30 bg-slate-900/80 p-4">
            <p className="text-xs font-medium text-blue-400">할일</p>
            <p className="mt-1 text-2xl font-bold text-white">{todoAndInProgress.length}</p>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-slate-900/80 p-4">
            <p className="text-xs font-medium text-red-400">긴급</p>
            <p className="mt-1 text-2xl font-bold text-white">{urgentTasks.length}</p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
            <p className="text-xs font-medium text-amber-400">진행중</p>
            <p className="mt-1 text-2xl font-bold text-white">{inProgressTasks.length}</p>
          </div>
          <div className="rounded-xl border border-green-500/30 bg-slate-900/80 p-4">
            <p className="text-xs font-medium text-green-400">완료</p>
            <p className="mt-1 text-2xl font-bold text-white">{doneTasks.length}</p>
          </div>
        </div>
      </div>

      {/* ── Main 2-Column Layout ────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Tasks (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 오늘의 업무 */}
          <section className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-4">
              <h2 className="text-base font-bold text-white">오늘의 업무</h2>
              <div className="flex items-center gap-2">
                {/* Sort Selector */}
                <div className="flex items-center gap-1 rounded-lg bg-slate-800 p-0.5">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSortBy(opt.key)}
                      className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        sortBy === opt.key
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 transition-colors"
                >
                  + 새 업무
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-700/30">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors hover:bg-slate-800/50"
                  onClick={() => setEditingTask(task)}
                >
                  {/* Status dot */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (task.status !== 'done') {
                        updateTaskStatus(task.id, 'done');
                      }
                    }}
                    className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                      task.status === 'done'
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-slate-600 hover:border-green-500 text-transparent hover:text-green-500'
                    }`}
                    title="완료 처리"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-semibold truncate ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[task.status]}`}>
                        {statusLabel[task.status]}
                      </span>
                      {task.aiAssisted && (
                        <span className="shrink-0 rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-bold text-purple-400">
                          AI
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{task.description}</p>
                  </div>

                  {/* Metrics */}
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <span className="rounded-md bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-purple-400" title="중요도">
                      P{task.priority}
                    </span>
                    <span className="rounded-md bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-400" title="긴급도">
                      U{task.urgency}
                    </span>
                    <span className="rounded-md bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-orange-400" title="위험도">
                      R{task.risk}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="hidden md:flex items-center gap-2 shrink-0 w-28">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full transition-all ${progressBarColor(task.progress)}`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 w-8 text-right">{task.progress}%</span>
                  </div>

                  {/* Due date */}
                  <span className="shrink-0 text-[11px] text-slate-500">{task.dueDate}</span>

                  {/* Edit indicator */}
                  <svg className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}

              {sortedTasks.length === 0 && (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  등록된 업무가 없습니다.
                </div>
              )}
            </div>
          </section>

          {/* 팀 현황 (Admin only) */}
          {isAdmin && (
            <section className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
              <div className="border-b border-slate-700/50 px-5 py-4">
                <h2 className="text-base font-bold text-white">팀 현황</h2>
              </div>
              <div className="divide-y divide-slate-700/30">
                {users.map((member) => {
                  const memberTasks = tasks.filter((t) => t.assigneeId === member.id);
                  const memberTotal = memberTasks.length;
                  const avgProgress = memberTotal
                    ? Math.round(memberTasks.reduce((s, t) => s + t.progress, 0) / memberTotal)
                    : 0;

                  return (
                    <div key={member.id} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{member.name}</p>
                          <span className="text-[10px] text-slate-500">
                            {member.department} · {member.position}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className={`h-full rounded-full transition-all ${progressBarColor(avgProgress)}`}
                              style={{ width: `${avgProgress}%` }}
                            />
                          </div>
                          <span className="shrink-0 text-[11px] text-slate-400 w-12 text-right">{avgProgress}%</span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-slate-500">{memberTotal}건</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 지시사항 (Admin only) */}
          {isAdmin && (
            <section className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
              <div className="border-b border-slate-700/50 px-5 py-4">
                <h2 className="text-base font-bold text-white">지시사항</h2>
              </div>
              <div className="divide-y divide-slate-700/30">
                {directives.map((dir) => {
                  const from = getUserById(dir.fromUserId);
                  const to = getUserById(dir.toUserId);
                  return (
                    <div key={dir.id} className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-slate-300">
                          {from?.name ?? '?'} → {to?.name ?? '?'}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${directiveStatusColor[dir.status]}`}>
                          {directiveStatusLabel[dir.status]}
                        </span>
                        {dir.priority >= 4 && (
                          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                            중요
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{dir.content}</p>
                      <p className="mt-1 text-[10px] text-slate-600">
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
        </div>

        {/* Right Column: Schedule + Integrations + Quick Links (1/3 width) */}
        <div className="space-y-6">
          {/* 오늘의 일정 */}
          <section className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
            <div className="border-b border-slate-700/50 px-5 py-4">
              <h2 className="text-base font-bold text-white">오늘의 일정</h2>
            </div>
            <div className="p-4 space-y-2">
              {mySchedules.map((sched) => (
                <div key={sched.id} className="flex items-start gap-3 rounded-lg bg-slate-800/50 p-3">
                  <span className="mt-0.5 text-base shrink-0">{scheduleTypeIcon[sched.type]}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-white truncate">{sched.title}</h3>
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${scheduleTypeBadge[sched.type]}`}>
                        {sched.type === 'meeting' ? '회의' : sched.type === 'deadline' ? '마감' : sched.type === 'reminder' ? '알림' : '이벤트'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {formatTime(sched.startTime)}
                      {sched.startTime !== sched.endTime && ` ~ ${formatTime(sched.endTime)}`}
                    </p>
                    <div className="mt-1 flex -space-x-1">
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
              ))}
              {mySchedules.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-500">일정이 없습니다.</p>
              )}
            </div>
          </section>

          {/* 연동 서비스 */}
          <section className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
            <div className="border-b border-slate-700/50 px-5 py-4">
              <h2 className="text-base font-bold text-white">연동 서비스</h2>
            </div>
            <div className="p-4 space-y-2">
              {integrations.map((integ) => (
                <div
                  key={integ.id}
                  className="flex items-center gap-3 rounded-lg bg-slate-800/50 px-3 py-2.5"
                >
                  <span className="text-lg shrink-0">{integ.icon}</span>
                  <span className="text-sm font-medium text-white flex-1 truncate">{integ.name}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-medium ${
                      integ.status === 'connected' ? 'text-green-400' : 'text-slate-500'
                    }`}
                  >
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                      integ.status === 'connected' ? 'bg-green-500' : 'bg-slate-600'
                    }`} />
                    {integ.status === 'connected' ? '연결' : '미연결'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 빠른 바로가기 */}
          <section className="rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-sm">
            <div className="border-b border-slate-700/50 px-5 py-4">
              <h2 className="text-base font-bold text-white">바로가기</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {userQuickLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-3 transition-colors hover:bg-slate-700/50"
                >
                  <span className="text-base shrink-0">{link.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{link.title}</p>
                    <p className="text-[9px] text-slate-500 truncate">{link.category}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

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
