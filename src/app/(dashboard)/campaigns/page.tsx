'use client';

import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  period: string;
  budget: number;
  spent: number;
  status: '진행중' | '대기' | '완료';
  progress: number;
  roi: number;
  channel: string;
}

const mockCampaigns: Campaign[] = [
  { id: '1', name: '2026 여름 프로모션', period: '2026.06.01 - 2026.08.31', budget: 50000000, spent: 18500000, status: '진행중', progress: 37, roi: 2.4, channel: 'SNS / 디스플레이' },
  { id: '2', name: '신제품 론칭 캠페인', period: '2026.07.01 - 2026.07.31', budget: 30000000, spent: 0, status: '대기', progress: 0, roi: 0, channel: '검색광고 / 영상' },
  { id: '3', name: '브랜드 인지도 강화', period: '2026.03.01 - 2026.05.31', budget: 40000000, spent: 38200000, status: '완료', progress: 100, roi: 3.1, channel: 'TV / 디지털' },
  { id: '4', name: '고객 리텐션 프로그램', period: '2026.05.15 - 2026.09.30', budget: 20000000, spent: 7800000, status: '진행중', progress: 52, roi: 1.8, channel: 'CRM / 이메일' },
];

const filterTabs = ['전체', '진행중', '대기', '완료'] as const;

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<string>('전체');

  const filtered = mockCampaigns.filter(
    (c) => activeTab === '전체' || c.status === activeTab
  );

  const statusStyle = (status: string) => {
    switch (status) {
      case '진행중': return 'bg-green-100 text-green-700';
      case '대기': return 'bg-yellow-100 text-yellow-700';
      case '완료': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatWon = (n: number) =>
    new Intl.NumberFormat('ko-KR').format(n) + '원';

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">캠페인 관리</h1>
        <p className="mt-1 text-sm text-gray-500">마케팅 캠페인을 계획하고 성과를 추적합니다.</p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-white border border-gray-200 p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 캠페인
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
        {filtered.map((campaign) => (
          <div key={campaign.id} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{campaign.channel}</p>
              </div>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>

            <div className="mb-4 text-sm text-gray-500">
              <span>{campaign.period}</span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-600">진행률</span>
                <span className="font-medium text-gray-900">{campaign.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className={`h-2 rounded-full transition-all ${
                    campaign.status === '완료' ? 'bg-gray-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>

            {/* Budget & ROI */}
            <div className="grid grid-cols-3 gap-3 rounded-lg bg-gray-50 p-3">
              <div>
                <p className="text-xs text-gray-500">예산</p>
                <p className="text-sm font-semibold text-gray-900">{formatWon(campaign.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">집행액</p>
                <p className="text-sm font-semibold text-gray-900">{formatWon(campaign.spent)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ROI</p>
                <p className={`text-sm font-semibold ${campaign.roi >= 2 ? 'text-green-600' : campaign.roi > 0 ? 'text-yellow-600' : 'text-gray-400'}`}>
                  {campaign.roi > 0 ? `${campaign.roi}x` : '-'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
