'use client';

import { useState } from 'react';

const systemStatus = [
  { label: '서버', status: '정상', icon: '🖥️', ok: true },
  { label: '네트워크', status: '정상', icon: '🌐', ok: true },
  { label: '보안', status: '주의', icon: '🔒', ok: false },
  { label: '백업', status: '정상', icon: '💾', ok: true },
];

interface ITRequest {
  id: number;
  date: string;
  requester: string;
  type: string;
  content: string;
  status: '대기' | '처리중' | '완료';
}

const itRequests: ITRequest[] = [
  { id: 1, date: '2026-06-08', requester: '김민수', type: '소프트웨어', content: 'Adobe Creative Suite 라이선스 갱신 요청', status: '대기' },
  { id: 2, date: '2026-06-07', requester: '이정아', type: '하드웨어', content: '노트북 배터리 교체 요청', status: '처리중' },
  { id: 3, date: '2026-06-06', requester: '최윤서', type: '네트워크', content: '3층 회의실 Wi-Fi 연결 불안정', status: '처리중' },
  { id: 4, date: '2026-06-05', requester: '정하늘', type: '계정', content: '신규 입사자 이메일 계정 생성', status: '완료' },
  { id: 5, date: '2026-06-04', requester: '한서윤', type: '프린터', content: '2층 복합기 용지 걸림 반복 발생', status: '완료' },
  { id: 6, date: '2026-06-03', requester: '박진혁', type: '보안', content: 'VPN 접속 오류 (출장 중)', status: '완료' },
];

const equipmentSummary = [
  { label: '노트북', total: 28, inUse: 24, icon: '💻' },
  { label: '모니터', total: 35, inUse: 30, icon: '🖥️' },
  { label: '프린터/복합기', total: 6, inUse: 6, icon: '🖨️' },
  { label: '태블릿', total: 8, inUse: 5, icon: '📱' },
];

const statusColor = (status: string) => {
  switch (status) {
    case '대기': return 'bg-yellow-500/20 text-yellow-400';
    case '처리중': return 'bg-blue-500/20 text-blue-400';
    case '완료': return 'bg-green-500/20 text-green-400';
    default: return 'bg-slate-700/50 text-slate-400';
  }
};

export default function ITPage() {
  const [filter, setFilter] = useState<'전체' | '대기' | '처리중' | '완료'>('전체');

  const filteredRequests = filter === '전체'
    ? itRequests
    : itRequests.filter((r) => r.status === filter);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">전산</h1>
          <p className="mt-1 text-sm text-slate-400">시스템 상태, IT 요청, 장비 현황을 관리합니다.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-blue-500 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          IT 지원 요청
        </button>
      </div>

      {/* 시스템 상태 */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {systemStatus.map((sys) => (
          <div key={sys.label} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sys.icon}</span>
              <div>
                <p className="text-sm text-slate-400">{sys.label}</p>
                <p className={`text-lg font-bold ${sys.ok ? 'text-green-400' : 'text-yellow-400'}`}>
                  {sys.status} {sys.ok ? '✅' : '⚠️'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IT 요청 목록 */}
      <div className="mb-8">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-100">IT 요청 목록</h2>
          <div className="flex gap-2">
            {(['전체', '대기', '처리중', '완료'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-black/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-600 hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">요청일</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">요청자</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">유형</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">내용</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">{req.date}</td>
                    <td className="px-5 py-3.5 font-medium text-white whitespace-nowrap">{req.requester}</td>
                    <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-slate-800/50 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                        {req.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">{req.content}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 장비 현황 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-100">장비 현황</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {equipmentSummary.map((eq) => {
            const usage = Math.round((eq.inUse / eq.total) * 100);
            return (
              <div key={eq.label} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{eq.icon}</span>
                  <span className="text-sm font-medium text-white">{eq.label}</span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-slate-400">사용 중 {eq.inUse} / 전체 {eq.total}</span>
                  <span className="text-xs font-semibold text-slate-300">{usage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-2 rounded-full transition-all ${usage > 90 ? 'bg-red-500' : usage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${usage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
