'use client';

import { useState } from 'react';

interface Client {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  status: '활성' | '비활성' | '신규';
  lastActivity: string;
}

const mockClients: Client[] = [
  { id: '1', company: '(주)블루오션', contact: '김민수', phone: '02-1234-5678', email: 'kim@blueocean.co.kr', status: '활성', lastActivity: '2026-06-07' },
  { id: '2', company: '테크스타 주식회사', contact: '이정아', phone: '02-9876-5432', email: 'lee@techstar.kr', status: '활성', lastActivity: '2026-06-05' },
  { id: '3', company: '그린솔루션', contact: '박진혁', phone: '031-555-1234', email: 'park@greensol.kr', status: '신규', lastActivity: '2026-06-08' },
  { id: '4', company: '스마트미디어', contact: '최윤서', phone: '02-3333-4444', email: 'choi@smartmedia.kr', status: '비활성', lastActivity: '2026-05-20' },
  { id: '5', company: '넥스트웨이브', contact: '정하늘', phone: '02-7777-8888', email: 'jung@nextwave.kr', status: '활성', lastActivity: '2026-06-06' },
];

const filters = ['전체', '활성', '비활성', '신규'] as const;

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('전체');

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.company.includes(search) ||
      client.contact.includes(search) ||
      client.phone.includes(search);
    const matchesFilter = activeFilter === '전체' || client.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusColor = (status: string) => {
    switch (status) {
      case '활성': return 'bg-green-100 text-green-700';
      case '비활성': return 'bg-gray-100 text-gray-600';
      case '신규': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">고객 관리</h1>
        <p className="mt-1 text-sm text-gray-500">고객사 정보를 관리하고 활동 내역을 추적합니다.</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="회사명, 담당자, 연락처 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          신규 고객 등록
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Client Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3.5 text-left font-semibold text-gray-700">회사명</th>
                <th className="px-6 py-3.5 text-left font-semibold text-gray-700">담당자</th>
                <th className="px-6 py-3.5 text-left font-semibold text-gray-700">연락처</th>
                <th className="px-6 py-3.5 text-left font-semibold text-gray-700">상태</th>
                <th className="px-6 py-3.5 text-left font-semibold text-gray-700">최근활동</th>
                <th className="px-6 py-3.5 text-right font-semibold text-gray-700">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{client.company}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{client.contact}</td>
                  <td className="px-6 py-4 text-gray-700">{client.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{client.lastActivity}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">상세</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredClients.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
