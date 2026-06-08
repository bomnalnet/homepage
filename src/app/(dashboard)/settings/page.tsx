'use client';

import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  department: string;
  position: string;
}

interface QuickLink {
  id: number;
  label: string;
  url: string;
}

interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

const defaultProfile: UserProfile = {
  name: '김봄날',
  email: 'bomnal@bomnal.co.kr',
  department: '경영',
  position: '대표이사',
};

const defaultLinks: QuickLink[] = [
  { id: 1, label: '대시보드', url: '/dashboard' },
  { id: 2, label: '프로젝트', url: '/projects' },
  { id: 3, label: '캠페인', url: '/campaigns' },
  { id: 4, label: '정산', url: '/finance' },
  { id: 5, label: 'AI 도구', url: '/ai' },
];

const defaultIntegrations: Integration[] = [
  { id: 'gdrive', name: 'Google Drive', icon: '📁', connected: true },
  { id: 'gsheets', name: 'Google Sheets', icon: '📊', connected: true },
  { id: 'notion', name: 'Notion', icon: '📝', connected: true },
  { id: 'synology', name: 'Synology Drive', icon: '🗄️', connected: true },
  { id: 'make', name: 'Make', icon: '⚡', connected: false },
  { id: 'chatgpt', name: 'ChatGPT', icon: '🤖', connected: true },
  { id: 'claude', name: 'Claude', icon: '🧠', connected: true },
];

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [links, setLinks] = useState<QuickLink[]>(defaultLinks);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    urgent: true,
    dailySummary: false,
  });
  const [integrations, setIntegrations] = useState<Integration[]>(defaultIntegrations);
  const [darkMode, setDarkMode] = useState(false);
  const [editingLink, setEditingLink] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bomnal_current_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
  };

  const removeLink = (id: number) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const addLink = () => {
    const newId = Math.max(...links.map((l) => l.id), 0) + 1;
    setLinks((prev) => [...prev, { id: newId, label: '새 바로가기', url: '/' }]);
    setEditingLink(newId);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">설정</h1>
        <p className="mt-1 text-sm text-slate-400">프로필, 알림, 연동 서비스 등을 관리합니다.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* 프로필 설정 */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-5">프로필 설정</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">이름</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">이메일</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">부서</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">직급</label>
              <input
                type="text"
                value={profile.position}
                onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 shadow-lg shadow-black/20 transition-colors">
              저장
            </button>
          </div>
        </div>

        {/* 바로가기 관리 */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-slate-100">바로가기 관리</h2>
            <button
              onClick={addLink}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 shadow-lg shadow-black/20 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              추가
            </button>
          </div>
          <div className="space-y-2">
            {links.map((link) => (
              <div key={link.id} className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2.5">
                <svg className="h-5 w-5 text-slate-500 shrink-0 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
                {editingLink === link.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => setLinks((prev) => prev.map((l) => l.id === link.id ? { ...l, label: e.target.value } : l))}
                      className="flex-1 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-white outline-none focus:border-blue-500"
                      placeholder="이름"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => setLinks((prev) => prev.map((l) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                      className="flex-1 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-white outline-none focus:border-blue-500"
                      placeholder="URL"
                    />
                    <button onClick={() => setEditingLink(null)} className="text-sm text-blue-400 font-medium hover:underline">완료</button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 text-sm font-medium text-white">{link.label}</span>
                    <span className="text-xs text-slate-500">{link.url}</span>
                    <button onClick={() => setEditingLink(link.id)} className="text-slate-500 hover:text-slate-300">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => removeLink(link.id)} className="text-slate-500 hover:text-red-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-5">알림 설정</h2>
          <div className="space-y-4">
            {[
              { key: 'email' as const, label: '이메일 알림', desc: '중요 알림을 이메일로 받습니다.' },
              { key: 'browser' as const, label: '브라우저 알림', desc: '브라우저 푸시 알림을 받습니다.' },
              { key: 'urgent' as const, label: '긴급 알림', desc: '긴급 공지 및 결재 요청을 즉시 알립니다.' },
              { key: 'dailySummary' as const, label: '일일 요약', desc: '매일 오전 요약 리포트를 받습니다.' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[item.key] ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 연동 서비스 */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-5">연동 서비스</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((svc) => (
              <div key={svc.id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{svc.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{svc.name}</p>
                    <p className={`text-xs font-medium ${svc.connected ? 'text-green-400' : 'text-slate-500'}`}>
                      {svc.connected ? '연결됨' : '미연결'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleIntegration(svc.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    svc.connected
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                      : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                  }`}
                >
                  {svc.connected ? '연결 해제' : '연결'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 테마 */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-5">테마</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(false)}
              className={`flex items-center gap-2 rounded-lg border-2 px-5 py-3 text-sm font-medium transition-colors ${
                !darkMode ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              라이트
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`flex items-center gap-2 rounded-lg border-2 px-5 py-3 text-sm font-medium transition-colors ${
                darkMode ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              다크
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
