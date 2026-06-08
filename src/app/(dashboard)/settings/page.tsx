'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types';

interface QuickLink {
  id: string;
  title: string;
  url: string;
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface IntegrationService {
  id: string;
  name: string;
  description: string;
  status: '연결됨' | '미연결';
  icon: string;
}

const initialQuickLinks: QuickLink[] = [
  { id: '1', title: 'Google Drive', url: 'https://drive.google.com' },
  { id: '2', title: 'Notion 워크스페이스', url: 'https://notion.so' },
  { id: '3', title: 'Slack', url: 'https://slack.com' },
  { id: '4', title: 'Figma 프로젝트', url: 'https://figma.com' },
];

const initialNotifications: NotificationSetting[] = [
  { id: '1', label: '이메일 알림', description: '중요 공지 및 결재 요청을 이메일로 수신합니다.', enabled: true },
  { id: '2', label: '브라우저 알림', description: '실시간 메시지 및 알림을 브라우저에서 수신합니다.', enabled: true },
  { id: '3', label: '일정 리마인더', description: '미팅 10분 전에 알림을 받습니다.', enabled: true },
  { id: '4', label: '주간 보고서 알림', description: '매주 월요일 오전에 주간 보고서 요약을 받습니다.', enabled: false },
  { id: '5', label: 'AI 작업 완료 알림', description: 'AI 자동화 작업이 완료되면 알림을 받습니다.', enabled: true },
];

const initialIntegrations: IntegrationService[] = [
  { id: '1', name: 'Google Drive', description: '팀 공유 드라이브와 파일을 동기화합니다.', status: '연결됨', icon: '📁' },
  { id: '2', name: 'Synology Drive', description: '사내 NAS와 파일을 동기화합니다.', status: '연결됨', icon: '💾' },
  { id: '3', name: 'Notion', description: '문서 및 위키를 연동합니다.', status: '연결됨', icon: '📝' },
  { id: '4', name: 'Slack', description: '팀 커뮤니케이션과 알림을 연동합니다.', status: '미연결', icon: '💬' },
  { id: '5', name: 'Google Calendar', description: '일정 및 미팅을 동기화합니다.', status: '연결됨', icon: '📅' },
];

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [quickLinks, setQuickLinks] = useState(initialQuickLinks);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bomnal_current_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: i.status === '연결됨' ? '미연결' : '연결됨' } : i))
    );
  };

  const removeQuickLink = (id: string) => {
    setQuickLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="mt-1 text-sm text-gray-500">프로필, 알림, 연동 서비스 등 개인 설정을 관리합니다.</p>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* 프로필 설정 */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">프로필 설정</h2>
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {user?.name?.charAt(0) ?? '봄'}
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    defaultValue={user?.name ?? ''}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    defaultValue={user?.email ?? ''}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <input
                    type="text"
                    defaultValue={user?.department ?? ''}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
                  <input
                    type="text"
                    defaultValue={user?.position ?? ''}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-500"
                  />
                </div>
              </div>
              <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                프로필 저장
              </button>
            </div>
          </div>
        </div>

        {/* 바로가기 관리 */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">바로가기 관리</h2>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              바로가기 추가
            </button>
          </div>
          <div className="space-y-2">
            {quickLinks.map((link, index) => (
              <div key={link.id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                <svg className="h-4 w-4 flex-shrink-0 cursor-grab text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{link.title}</p>
                  <p className="text-xs text-gray-400 truncate">{link.url}</p>
                </div>
                <button
                  onClick={() => removeQuickLink(link.id)}
                  className="flex-shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">알림 설정</h2>
          <div className="space-y-4">
            {notifications.map((noti) => (
              <div key={noti.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{noti.label}</p>
                  <p className="text-xs text-gray-500">{noti.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(noti.id)}
                  className={`relative ml-4 h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                    noti.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      noti.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 연동 서비스 관리 */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">연동 서비스 관리</h2>
          <div className="space-y-3">
            {integrations.map((integ) => (
              <div key={integ.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integ.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{integ.name}</p>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        integ.status === '연결됨' ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${integ.status === '연결됨' ? 'bg-green-500' : 'bg-gray-300'}`} />
                        {integ.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{integ.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleIntegration(integ.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                    integ.status === '연결됨'
                      ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {integ.status === '연결됨' ? '연결 해제' : '연결하기'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 테마 설정 */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">테마 설정</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">다크 모드</p>
              <p className="text-xs text-gray-500">어두운 배경의 테마로 전환합니다.</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
