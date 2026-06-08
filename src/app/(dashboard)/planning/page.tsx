'use client';

const okrs = [
  {
    objective: '신규 고객 확보를 통한 매출 성장',
    keyResults: [
      { label: '신규 고객 30개사 확보', progress: 67, current: '20개사' },
      { label: '월 매출 2억원 달성', progress: 75, current: '1.5억원' },
      { label: '고객 전환율 15% 달성', progress: 80, current: '12%' },
    ],
  },
  {
    objective: '서비스 품질 향상 및 고객 만족도 제고',
    keyResults: [
      { label: '고객 만족도 점수 4.5/5.0 달성', progress: 88, current: '4.4' },
      { label: '평균 응답 시간 2시간 이내', progress: 60, current: '3.2시간' },
      { label: '리텐션율 90% 달성', progress: 85, current: '87%' },
    ],
  },
  {
    objective: '조직 역량 강화 및 문화 구축',
    keyResults: [
      { label: '직원 교육 시간 분기 40시간', progress: 55, current: '22시간' },
      { label: '직원 만족도 4.0/5.0 달성', progress: 90, current: '3.9' },
      { label: '핵심 인재 채용 5명', progress: 40, current: '2명' },
    ],
  },
];

const initiatives = [
  { id: 1, title: 'AI 기반 마케팅 자동화', status: '진행 중', owner: '김민수', timeline: '2026 Q2~Q3', color: 'bg-blue-100 text-blue-700' },
  { id: 2, title: '고객 온보딩 프로세스 개선', status: '완료', owner: '정하늘', timeline: '2026 Q1~Q2', color: 'bg-green-100 text-green-700' },
  { id: 3, title: '데이터 분석 플랫폼 구축', status: '진행 중', owner: '박진혁', timeline: '2026 Q2~Q4', color: 'bg-blue-100 text-blue-700' },
  { id: 4, title: '브랜드 리뉴얼 프로젝트', status: '계획', owner: '한서윤', timeline: '2026 Q3~Q4', color: 'bg-gray-100 text-gray-600' },
];

const meetings = [
  { id: 1, title: '주간 전략 회의', date: '2026-06-08', participants: '경영진 5명', summary: 'Q3 목표 수립 및 리소스 배분 논의' },
  { id: 2, title: '마케팅 캠페인 리뷰', date: '2026-06-06', participants: '마케팅팀 4명', summary: '6월 캠페인 성과 분석, 예산 재조정' },
  { id: 3, title: '프로덕트 로드맵 회의', date: '2026-06-05', participants: '기획/개발 6명', summary: 'AI 기능 우선순위 결정, 출시 일정 확정' },
  { id: 4, title: '월간 전사 타운홀', date: '2026-06-02', participants: '전 직원 24명', summary: '5월 성과 공유, 하반기 비전 발표' },
];

const kpis = [
  { label: '월간 MRR', value: '₩1.23억', change: '+8.5%', positive: true },
  { label: '고객 획득 비용', value: '₩120만', change: '-5.2%', positive: true },
  { label: '고객 이탈률', value: '2.3%', change: '-0.8%', positive: true },
  { label: 'NPS 점수', value: '72', change: '+3', positive: true },
];

export default function PlanningPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">기획</h1>
        <p className="mt-1 text-sm text-gray-500">OKR, 전략 이니셔티브, KPI 등 기획 업무를 관리합니다.</p>
      </div>

      {/* KPI 대시보드 */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className={`mt-1 text-sm font-medium ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* OKR 현황 */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">OKR 현황</h2>
        <div className="space-y-8">
          {okrs.map((okr, idx) => (
            <div key={idx}>
              <h3 className="mb-3 font-medium text-gray-900">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  O{idx + 1}
                </span>
                {okr.objective}
              </h3>
              <div className="ml-8 space-y-3">
                {okr.keyResults.map((kr, krIdx) => (
                  <div key={krIdx}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-gray-600">{kr.label}</span>
                      <span className="font-medium text-gray-900">{kr.current} ({kr.progress}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          kr.progress >= 80 ? 'bg-emerald-500' : kr.progress >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${kr.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전략 이니셔티브 */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">전략 이니셔티브</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {initiatives.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.color}`}>{item.status}</span>
                <span className="text-sm text-gray-400">{item.timeline}</span>
              </div>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">담당: {item.owner}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 회의록 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">최근 회의록</h2>
        <div className="divide-y divide-gray-100">
          {meetings.map((m) => (
            <div key={m.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{m.title}</h3>
                <span className="text-sm text-gray-400">{m.date}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{m.participants}</p>
              <p className="mt-1 text-sm text-gray-600">{m.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
