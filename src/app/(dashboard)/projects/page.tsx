'use client';

interface Project {
  id: string;
  name: string;
  team: string;
  deadline: string;
  progress: number;
  status: '기획' | '진행중' | '검토' | '완료';
  priority: '높음' | '보통' | '낮음';
}

interface WeekSchedule {
  id: string;
  day: string;
  date: string;
  events: { time: string; title: string; type: string }[];
}

const mockProjects: Project[] = [
  { id: '1', name: '홈페이지 리뉴얼', team: '개발팀', deadline: '2026-07-15', progress: 25, status: '기획', priority: '높음' },
  { id: '2', name: '모바일 앱 v2.0', team: '개발팀', deadline: '2026-08-30', progress: 60, status: '진행중', priority: '높음' },
  { id: '3', name: 'CRM 시스템 도입', team: '기획팀', deadline: '2026-06-30', progress: 85, status: '검토', priority: '보통' },
  { id: '4', name: '브랜드 가이드라인 개정', team: '디자인팀', deadline: '2026-06-20', progress: 100, status: '완료', priority: '보통' },
  { id: '5', name: 'AI 챗봇 구축', team: '개발팀', deadline: '2026-09-15', progress: 15, status: '기획', priority: '높음' },
  { id: '6', name: '연간 보고서 작성', team: '경영지원팀', deadline: '2026-06-25', progress: 45, status: '진행중', priority: '낮음' },
];

const columns: Project['status'][] = ['기획', '진행중', '검토', '완료'];

const weekSchedule: WeekSchedule[] = [
  { id: '1', day: '월', date: '06/08', events: [{ time: '10:00', title: '주간 스프린트 회의', type: 'meeting' }, { time: '14:00', title: 'CRM 데모 리뷰', type: 'meeting' }] },
  { id: '2', day: '화', date: '06/09', events: [{ time: '11:00', title: '디자인 리뷰', type: 'meeting' }] },
  { id: '3', day: '수', date: '06/10', events: [{ time: '09:00', title: '전체 조회', type: 'event' }, { time: '15:00', title: 'AI 챗봇 기획 워크숍', type: 'meeting' }] },
  { id: '4', day: '목', date: '06/11', events: [{ time: '13:00', title: '고객사 미팅 (블루오션)', type: 'meeting' }] },
  { id: '5', day: '금', date: '06/12', events: [{ time: '16:00', title: '주간 회고', type: 'meeting' }, { time: '18:00', title: 'CRM 도입 마감', type: 'deadline' }] },
];

const columnColor = (status: string) => {
  switch (status) {
    case '기획': return 'border-t-purple-400';
    case '진행중': return 'border-t-blue-400';
    case '검토': return 'border-t-yellow-400';
    case '완료': return 'border-t-green-400';
    default: return 'border-t-gray-400';
  }
};

const priorityColor = (p: string) => {
  switch (p) {
    case '높음': return 'text-red-600 bg-red-50';
    case '보통': return 'text-yellow-600 bg-yellow-50';
    case '낮음': return 'text-gray-500 bg-gray-50';
    default: return 'text-gray-500 bg-gray-50';
  }
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">프로젝트 / 일정</h1>
        <p className="mt-1 text-sm text-gray-500">프로젝트 현황과 주간 일정을 관리합니다.</p>
      </div>

      {/* Kanban Board */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">프로젝트 현황</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => {
            const items = mockProjects.filter((p) => p.status === col);
            return (
              <div key={col} className={`rounded-xl border border-gray-200 border-t-4 ${columnColor(col)} bg-gray-50 p-4`}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">{col}</h3>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500 shadow-sm">{items.length}</span>
                </div>
                <div className="space-y-3">
                  {items.map((project) => (
                    <div key={project.id} className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">{project.name}</h4>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${priorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <p className="mb-3 text-xs text-gray-500">{project.team} &middot; ~{project.deadline}</p>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">진행률</span>
                          <span className="font-medium text-gray-700">{project.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100">
                          <div
                            className="h-1.5 rounded-full bg-blue-500 transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">이번 주 일정</h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {weekSchedule.map((day) => (
            <div key={day.id} className="rounded-xl bg-white border border-gray-200 shadow-sm p-4">
              <div className="mb-3 text-center">
                <span className="block text-lg font-bold text-gray-900">{day.day}</span>
                <span className="text-xs text-gray-400">{day.date}</span>
              </div>
              <div className="space-y-2">
                {day.events.map((ev, i) => (
                  <div key={i} className={`rounded-lg p-2.5 text-xs ${
                    ev.type === 'deadline' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <span className={`block font-medium ${ev.type === 'deadline' ? 'text-red-700' : 'text-blue-700'}`}>{ev.time}</span>
                    <span className={`${ev.type === 'deadline' ? 'text-red-600' : 'text-blue-600'}`}>{ev.title}</span>
                  </div>
                ))}
                {day.events.length === 0 && (
                  <p className="text-center text-xs text-gray-400 py-4">일정 없음</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
