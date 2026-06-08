'use client';

const summaryCards = [
  { label: '이번 달 매출', value: '1억 2,340만원', change: '+12.5%', positive: true, icon: '📈' },
  { label: '지출', value: '8,750만원', change: '+3.2%', positive: false, icon: '💳' },
  { label: '미수금', value: '2,180만원', change: '-8.1%', positive: true, icon: '📋' },
  { label: '순이익', value: '3,590만원', change: '+18.7%', positive: true, icon: '💰' },
];

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: '수입' | '지출';
  manager: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-06-08', description: '블루오션 월 정산', amount: 35000000, type: '수입', manager: '김민수' },
  { id: '2', date: '2026-06-07', description: 'Google Ads 광고비', amount: 5200000, type: '지출', manager: '이정아' },
  { id: '3', date: '2026-06-07', description: '테크스타 컨설팅 수수료', amount: 12000000, type: '수입', manager: '박진혁' },
  { id: '4', date: '2026-06-06', description: '사무실 임대료', amount: 8500000, type: '지출', manager: '최윤서' },
  { id: '5', date: '2026-06-05', description: '넥스트웨이브 프로젝트 계약금', amount: 20000000, type: '수입', manager: '정하늘' },
  { id: '6', date: '2026-06-05', description: '직원 급여', amount: 42000000, type: '지출', manager: '최윤서' },
  { id: '7', date: '2026-06-04', description: '서버 호스팅 비용', amount: 1800000, type: '지출', manager: '박진혁' },
  { id: '8', date: '2026-06-03', description: '그린솔루션 유지보수 비용', amount: 8000000, type: '수입', manager: '김민수' },
];

const formatWon = (n: number) => new Intl.NumberFormat('ko-KR').format(n) + '원';

export default function FinancePage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">정산 / 회계</h1>
        <p className="mt-1 text-sm text-slate-400">매출, 지출, 미수금 현황을 관리하고 정산을 처리합니다.</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-400">{card.label}</span>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="text-xl font-bold text-white">{card.value}</p>
            <p className={`mt-1 text-sm font-medium ${card.positive ? 'text-green-400' : 'text-red-400'}`}>
              {card.change} 전월 대비
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-blue-500 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          정산 요청
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-slate-800 border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-300 shadow-lg shadow-black/20 hover:bg-slate-700 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          영수증 등록
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-slate-100">최근 거래 내역</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50">
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">날짜</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">내용</th>
                <th className="px-6 py-3.5 text-right font-semibold text-slate-300">금액</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">구분</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">담당자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-white">{tx.description}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${tx.type === '수입' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === '수입' ? '+' : '-'}{formatWon(tx.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      tx.type === '수입' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{tx.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
