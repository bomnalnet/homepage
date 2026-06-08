'use client';

import { useState } from 'react';

const announcements = [
  { id: 1, title: '2026년 하반기 경영 계획 안내', author: '대표이사 김봄날', date: '2026-06-08', pinned: true },
  { id: 2, title: '6월 전사 워크숍 일정 변경 안내', author: '경영지원팀 최윤서', date: '2026-06-07', pinned: true },
  { id: 3, title: '사무실 냉방 시스템 점검 공지', author: '시설관리팀 박건우', date: '2026-06-06', pinned: false },
  { id: 4, title: '신규 프로젝트 관리 도구 도입 안내', author: '전산팀 이도현', date: '2026-06-05', pinned: false },
  { id: 5, title: '6월 생일자 축하 이벤트', author: '인사팀 정하늘', date: '2026-06-04', pinned: false },
];

const pendingApprovals = [
  { id: 1, requester: '김민수', type: '휴가 신청', date: '2026-06-08', detail: '연차 3일 (6/15~6/17)' },
  { id: 2, requester: '이정아', type: '지출 결의', date: '2026-06-07', detail: 'Google Ads 광고비 520만원' },
  { id: 3, requester: '박진혁', type: '출장 신청', date: '2026-06-06', detail: '부산 출장 (6/12~6/13)' },
];

const supplyRequests = [
  { id: 1, item: 'A4 용지 10박스', requester: '경영지원팀 최윤서', date: '2026-06-08', status: '승인 대기' },
  { id: 2, item: '모니터 암 2개', requester: '개발팀 이도현', date: '2026-06-07', status: '배송 중' },
  { id: 3, item: '무선 마우스 5개', requester: '마케팅팀 김민수', date: '2026-06-06', status: '완료' },
  { id: 4, item: '회의실 화이트보드 마커', requester: '기획팀 정하늘', date: '2026-06-05', status: '완료' },
];

const statusColor: Record<string, string> = {
  '승인 대기': 'bg-yellow-500/20 text-yellow-400',
  '배송 중': 'bg-blue-500/20 text-blue-400',
  '완료': 'bg-green-500/20 text-green-400',
};

export default function OfficePage() {
  const [tab, setTab] = useState<'announcements' | 'approvals' | 'supplies'>('announcements');

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">행정</h1>
          <p className="mt-1 text-sm text-slate-400">공지사항, 결재, 비품 요청 등 행정 업무를 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 shadow-lg shadow-black/20 transition">
            공지 작성
          </button>
          <button className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition">
            결재 요청
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-1 rounded-lg bg-slate-800 border border-slate-700/50 p-1 w-fit">
        {([['announcements', '공지사항'], ['approvals', '결재 대기'], ['supplies', '비품 요청']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as 'announcements' | 'approvals' | 'supplies')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              tab === key ? 'bg-blue-600 text-white shadow-lg shadow-black/20' : 'text-slate-400 hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 공지사항 */}
      {tab === 'announcements' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-lg shadow-black/20">
          <h2 className="mb-4 text-lg font-semibold text-white">공지사항</h2>
          <div className="divide-y divide-slate-700/50">
            {announcements.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                {item.pinned && (
                  <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">고정</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.author}</p>
                </div>
                <span className="shrink-0 text-sm text-slate-500">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 결재 대기 */}
      {tab === 'approvals' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-lg shadow-black/20">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                  {item.type}
                </span>
                <span className="text-sm text-slate-500">{item.date}</span>
              </div>
              <p className="font-medium text-white">{item.requester}</p>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-500 shadow-lg shadow-black/20 transition">
                  승인
                </button>
                <button className="flex-1 rounded-lg border border-slate-600 bg-slate-800 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition">
                  반려
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 비품 요청 */}
      {tab === 'supplies' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-lg shadow-black/20">
          <h2 className="mb-4 text-lg font-semibold text-white">비품 요청 현황</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 text-slate-400">
                  <th className="pb-3 font-medium">요청 항목</th>
                  <th className="pb-3 font-medium">요청자</th>
                  <th className="pb-3 font-medium">요청일</th>
                  <th className="pb-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {supplyRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-medium text-white">{item.item}</td>
                    <td className="py-3 text-slate-300">{item.requester}</td>
                    <td className="py-3 text-slate-400">{item.date}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
