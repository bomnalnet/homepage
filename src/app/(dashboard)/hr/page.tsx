'use client';

import { useState } from 'react';

const summaryCards = [
  { label: '전체', value: '24명', icon: '👥', color: 'bg-blue-500/20 text-blue-400' },
  { label: '출근', value: '22명', icon: '✅', color: 'bg-green-500/20 text-green-400' },
  { label: '휴가', value: '1명', icon: '🏖️', color: 'bg-yellow-500/20 text-yellow-400' },
  { label: '출장', value: '1명', icon: '✈️', color: 'bg-purple-500/20 text-purple-400' },
];

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  joinDate: string;
  status: '출근' | '휴가' | '출장' | '퇴근';
}

const employees: Employee[] = [
  { id: 1, name: '김봄날', department: '경영', position: '대표이사', joinDate: '2020-03-01', status: '출근' },
  { id: 2, name: '최윤서', department: '경영지원', position: '팀장', joinDate: '2020-06-15', status: '출근' },
  { id: 3, name: '김민수', department: '마케팅', position: '팀장', joinDate: '2021-01-10', status: '출근' },
  { id: 4, name: '이정아', department: '마케팅', position: '대리', joinDate: '2022-03-02', status: '출근' },
  { id: 5, name: '박진혁', department: '개발', position: '시니어', joinDate: '2021-07-20', status: '출장' },
  { id: 6, name: '정하늘', department: '기획', position: '팀장', joinDate: '2021-04-05', status: '출근' },
  { id: 7, name: '이도현', department: '전산', position: '매니저', joinDate: '2022-09-01', status: '출근' },
  { id: 8, name: '한서윤', department: '디자인', position: '대리', joinDate: '2023-02-13', status: '휴가' },
];

const leaveRequests = [
  { id: 1, name: '김민수', type: '연차', period: '6/15 ~ 6/17 (3일)', status: '승인 대기' },
  { id: 2, name: '이정아', type: '반차(오후)', period: '6/10 (0.5일)', status: '승인 대기' },
  { id: 3, name: '정하늘', type: '연차', period: '6/20 ~ 6/21 (2일)', status: '승인 대기' },
];

const statusStyle: Record<string, string> = {
  '출근': 'bg-green-500/20 text-green-400',
  '휴가': 'bg-yellow-500/20 text-yellow-400',
  '출장': 'bg-purple-500/20 text-purple-400',
  '퇴근': 'bg-slate-700/50 text-slate-400',
  '승인 대기': 'bg-yellow-500/20 text-yellow-400',
};

export default function HRPage() {
  const [filter, setFilter] = useState<string>('전체');

  const filtered = filter === '전체' ? employees : employees.filter((e) => e.status === filter);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">인사</h1>
        <p className="mt-1 text-sm text-slate-400">직원 현황, 근태 관리, 휴가 신청을 관리합니다.</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 p-5 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-xl`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 직원 목록 */}
      <div className="mb-8 rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-lg shadow-black/20">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-white">직원 목록</h2>
          <div className="flex gap-1 rounded-lg bg-slate-800 border border-slate-700/50 p-1">
            {['전체', '출근', '휴가', '출장', '퇴근'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  filter === s ? 'bg-blue-600 text-white shadow-lg shadow-black/20' : 'text-slate-400 hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="pb-3 font-medium">이름</th>
                <th className="pb-3 font-medium">부서</th>
                <th className="pb-3 font-medium">직급</th>
                <th className="pb-3 font-medium">입사일</th>
                <th className="pb-3 font-medium">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-medium text-white">{emp.name}</td>
                  <td className="py-3 text-slate-300">{emp.department}</td>
                  <td className="py-3 text-slate-300">{emp.position}</td>
                  <td className="py-3 text-slate-400">{emp.joinDate}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[emp.status]}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 근태 현황 */}
      <div className="mb-8 rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-lg shadow-black/20">
        <h2 className="mb-4 text-lg font-semibold text-white">오늘의 근태 현황</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-green-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">22</p>
            <p className="mt-1 text-sm text-green-400/80">출근</p>
          </div>
          <div className="rounded-lg bg-yellow-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">1</p>
            <p className="mt-1 text-sm text-yellow-400/80">휴가</p>
          </div>
          <div className="rounded-lg bg-purple-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">1</p>
            <p className="mt-1 text-sm text-purple-400/80">출장</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 p-4 text-center">
            <p className="text-2xl font-bold text-slate-400">0</p>
            <p className="mt-1 text-sm text-slate-500">퇴근</p>
          </div>
        </div>
      </div>

      {/* 휴가 신청 */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 shadow-lg shadow-black/20">
        <h2 className="mb-4 text-lg font-semibold text-white">휴가 신청 현황</h2>
        <div className="divide-y divide-slate-700/50">
          {leaveRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="font-medium text-white">
                  {req.name} <span className="ml-2 text-sm text-slate-400">{req.type}</span>
                </p>
                <p className="mt-1 text-sm text-slate-400">{req.period}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[req.status]}`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
