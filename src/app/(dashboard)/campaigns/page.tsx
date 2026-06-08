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
      case '진행중': return 'bg-green-500/20 text-green-400';
      case '대기': return 'bg-yellow-500/20 text-yellow-400';
      case '완료': return 'bg-slate-700/50 text-slate-400';
      default: return 'bg-slate-700/50 text-slate-400';
    }
  };

  const formatWon = (n: number) =>
    new Intl.NumberFormat('ko-KR').format(n) + '원';

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">캠페인 관리</h1>
        <p className="mt-1 text-sm text-slate-400">마케팅 캠페인을 계획하고 성과를 추적합니다.</p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-slate-800 border border-slate-700/50 p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-black/20' : 'text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-blue-500 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 캠페인
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
        {filtered.map((campaign) => (
          <div key={campaign.id} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6 hover:shadow-xl hover:shadow-black/30 transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                <p className="mt-0.5 text-xs text-slate-500">{campaign.channel}</p>
              </div>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>

            <div className="mb-4 text-sm text-slate-400">
              <span>{campaign.period}</span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-slate-400">진행률</span>
                <span className="font-medium text-white">{campaign.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div
                  className={`h-2 rounded-full transition-all ${
                    campaign.status === '완료' ? 'bg-slate-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>

            {/* Budget & ROI */}
            <div className="grid grid-cols-3 gap-3 rounded-lg bg-slate-800/50 p-3">
              <div>
                <p className="text-xs text-slate-500">예산</p>
                <p className="text-sm font-semibold text-white">{formatWon(campaign.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">집행액</p>
                <p className="text-sm font-semibold text-white">{formatWon(campaign.spent)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ROI</p>
                <p className={`text-sm font-semibold ${campaign.roi >= 2 ? 'text-green-400' : campaign.roi > 0 ? 'text-yellow-400' : 'text-slate-500'}`}>
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
