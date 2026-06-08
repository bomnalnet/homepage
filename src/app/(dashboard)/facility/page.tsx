'use client';

interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  slots: { time: string; booked: boolean; booker?: string; title?: string }[];
}

interface Inspection {
  id: string;
  facility: string;
  date: string;
  type: string;
  status: '예정' | '진행중' | '완료';
  manager: string;
}

interface Supply {
  id: string;
  item: string;
  stock: number;
  threshold: number;
  unit: string;
}

const meetingRooms: MeetingRoom[] = [
  {
    id: '1', name: '대회의실 A', capacity: 20, floor: '3층',
    slots: [
      { time: '09:00-10:00', booked: true, booker: '김민수', title: '주간회의' },
      { time: '10:00-11:00', booked: false },
      { time: '11:00-12:00', booked: true, booker: '이정아', title: '개발 스프린트' },
      { time: '13:00-14:00', booked: false },
      { time: '14:00-15:00', booked: true, booker: '박진혁', title: '고객 미팅' },
      { time: '15:00-16:00', booked: false },
    ],
  },
  {
    id: '2', name: '소회의실 B', capacity: 6, floor: '3층',
    slots: [
      { time: '09:00-10:00', booked: false },
      { time: '10:00-11:00', booked: true, booker: '최윤서', title: '디자인 리뷰' },
      { time: '11:00-12:00', booked: false },
      { time: '13:00-14:00', booked: true, booker: '정하늘', title: '1:1 미팅' },
      { time: '14:00-15:00', booked: false },
      { time: '15:00-16:00', booked: false },
    ],
  },
  {
    id: '3', name: '미팅룸 C', capacity: 4, floor: '2층',
    slots: [
      { time: '09:00-10:00', booked: true, booker: '한서윤', title: '인사 면담' },
      { time: '10:00-11:00', booked: true, booker: '한서윤', title: '인사 면담' },
      { time: '11:00-12:00', booked: false },
      { time: '13:00-14:00', booked: false },
      { time: '14:00-15:00', booked: false },
      { time: '15:00-16:00', booked: true, booker: '김민수', title: '팀 브리핑' },
    ],
  },
];

const inspections: Inspection[] = [
  { id: '1', facility: '공조 시스템', date: '2026-06-12', type: '정기 점검', status: '예정', manager: '시설관리팀' },
  { id: '2', facility: '소방 설비', date: '2026-06-15', type: '안전 점검', status: '예정', manager: '안전관리팀' },
  { id: '3', facility: '엘리베이터', date: '2026-06-08', type: '정기 점검', status: '진행중', manager: '시설관리팀' },
  { id: '4', facility: '전기 시설', date: '2026-06-01', type: '정기 점검', status: '완료', manager: '시설관리팀' },
  { id: '5', facility: '정수기', date: '2026-06-05', type: '필터 교체', status: '완료', manager: '총무팀' },
];

const supplies: Supply[] = [
  { id: '1', item: 'A4 용지', stock: 45, threshold: 20, unit: '박스' },
  { id: '2', item: '토너 카트리지', stock: 8, threshold: 5, unit: '개' },
  { id: '3', item: '화이트보드 마커', stock: 3, threshold: 10, unit: '세트' },
  { id: '4', item: '형광펜 세트', stock: 15, threshold: 5, unit: '세트' },
  { id: '5', item: '봉투 (대)', stock: 2, threshold: 10, unit: '묶음' },
  { id: '6', item: '명함 용지', stock: 12, threshold: 5, unit: '팩' },
];

const inspectionStatusColor = (status: string) => {
  switch (status) {
    case '예정': return 'bg-blue-500/20 text-blue-400';
    case '진행중': return 'bg-yellow-500/20 text-yellow-400';
    case '완료': return 'bg-green-500/20 text-green-400';
    default: return 'bg-slate-700/50 text-slate-400';
  }
};

export default function FacilityPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">시설</h1>
        <p className="mt-1 text-sm text-slate-400">회의실 예약, 시설 점검, 비품 재고를 관리합니다.</p>
      </div>

      {/* 회의실 예약 현황 */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">회의실 예약 현황 (오늘)</h2>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-blue-500 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            예약하기
          </button>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {meetingRooms.map((room) => (
            <div key={room.id} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{room.name}</h3>
                  <p className="text-xs text-slate-500">{room.floor} &middot; {room.capacity}인</p>
                </div>
              </div>
              <div className="space-y-2">
                {room.slots.map((slot, i) => (
                  <div
                    key={i}
                    className={`rounded-lg px-3 py-2 text-xs ${
                      slot.booked
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-slate-800/50 border border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${slot.booked ? 'text-blue-400' : 'text-slate-500'}`}>{slot.time}</span>
                      {slot.booked ? (
                        <span className="text-blue-300">{slot.booker}</span>
                      ) : (
                        <span className="text-slate-500">예약 가능</span>
                      )}
                    </div>
                    {slot.title && <p className="mt-0.5 text-blue-400/80">{slot.title}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {/* 시설 점검 일정 */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-100">시설 점검 일정</h2>
          <div className="overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/50">
                    <th className="px-5 py-3 text-left font-semibold text-slate-300">시설</th>
                    <th className="px-5 py-3 text-left font-semibold text-slate-300">점검일</th>
                    <th className="px-5 py-3 text-left font-semibold text-slate-300">유형</th>
                    <th className="px-5 py-3 text-left font-semibold text-slate-300">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {inspections.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-white">{item.facility}</td>
                      <td className="px-5 py-3.5 text-slate-400">{item.date}</td>
                      <td className="px-5 py-3.5 text-slate-300">{item.type}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${inspectionStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 비품 재고 */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-100">비품 재고 현황</h2>
          <div className="space-y-3">
            {supplies.map((item) => {
              const isLow = item.stock <= item.threshold;
              const pct = Math.min((item.stock / (item.threshold * 3)) * 100, 100);
              return (
                <div key={item.id} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{item.item}</span>
                    <span className={`text-sm font-semibold ${isLow ? 'text-red-400' : 'text-slate-300'}`}>
                      {item.stock}{item.unit}
                      {isLow && <span className="ml-1.5 text-xs font-normal text-red-400">부족</span>}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full transition-all ${isLow ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
