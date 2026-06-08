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
  '승인 대기': 'bg-yellow-100 text-yellow-700',
  '배송 중': 'bg-blue-100 text-blue-700',
  '완료': 'bg-green-100 text-green-700',
};

export default function OfficePage() {
  const [tab, setTab] = useState<'announcements' | 'approvals' | 'supplies'>('announcements');

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">행정</h1>
          <p className="mt-1 text-sm text-gray-500">공지사항, 결재, 비품 요청 등 행정 업무를 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition">
            공지 작성
          </button>
          <button className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition">
            결재 요청
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {([['announcements', '공지사항'], ['approvals', '결재 대기'], ['supplies', '비품 요청']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as 'announcements' | 'approvals' | 'supplies')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              tab === key ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 공지사항 */}
      {tab === 'announcements' && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">공지사항</h2>
          <div className="divide-y divide-gray-100">
            {announcements.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                {item.pinned && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">고정</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.author}</p>
                </div>
                <span className="shrink-0 text-sm text-gray-400">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 결재 대기 */}
      {tab === 'approvals' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                  {item.type}
                </span>
                <span className="text-sm text-gray-400">{item.date}</span>
              </div>
              <p className="font-medium text-gray-900">{item.requester}</p>
              <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition">
                  승인
                </button>
                <button className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                  반려
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 비품 요청 */}
      {tab === 'supplies' && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">비품 요청 현황</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="pb-3 font-medium">요청 항목</th>
                  <th className="pb-3 font-medium">요청자</th>
                  <th className="pb-3 font-medium">요청일</th>
                  <th className="pb-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {supplyRequests.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 font-medium text-gray-900">{item.item}</td>
                    <td className="py-3 text-gray-600">{item.requester}</td>
                    <td className="py-3 text-gray-600">{item.date}</td>
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
