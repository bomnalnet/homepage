'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@/types';

interface HeaderProps {
  user: User | null;
  notifications: number;
}

const pageTitles: Record<string, string> = {
  '/dashboard': '대시보드',
  '/clients': '고객 관리',
  '/campaigns': '캠페인 관리',
  '/ai': 'AI 업무',
  '/projects': '프로젝트 / 일정',
  '/finance': '정산 / 회계',
  '/files': '자료실',
  '/office': '행정',
  '/hr': '인사',
  '/planning': '기획',
  '/facility': '시설',
  '/it': '전산',
  '/settings': '설정',
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const base = '/' + pathname.split('/')[1];
  return pageTitles[base] || '봄날 인트라넷';
}

const integrations = [
  { name: 'Google Drive', connected: true },
  { name: 'Notion', connected: true },
  { name: 'Synology', connected: false },
];

export default function Header({ user, notifications }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bomnal_current_user');
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 lg:px-6">
      {/* Left: Page title */}
      <div className="flex items-center gap-3">
        {/* Spacer for mobile hamburger */}
        <div className="w-10 lg:hidden" />
        <h2 className="text-lg font-semibold text-white">
          {getPageTitle(pathname)}
        </h2>
      </div>

      {/* Center: Search */}
      <div className="hidden max-w-md flex-1 px-8 md:block">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right: Actions & user */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Quick actions */}
        <Link
          href="/dashboard?action=new-task"
          className="hidden items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500 shadow-lg shadow-blue-600/20 sm:flex"
        >
          <span>＋</span>
          <span>새 업무 추가</span>
        </Link>
        <Link
          href="/ai"
          className="hidden items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-500/20 sm:flex"
        >
          <span>🤖</span>
          <span>AI 어시스턴트</span>
        </Link>

        {/* Integration status indicators */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {integrations.map((integ) => (
            <span
              key={integ.name}
              title={`${integ.name}: ${integ.connected ? '연결됨' : '연결 끊김'}`}
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                integ.connected ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
          ))}
        </div>

        {/* Notification bell */}
        <button
          className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          aria-label="알림"
        >
          <span className="text-xl">🔔</span>
          {notifications > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {notifications > 99 ? '99+' : notifications}
            </span>
          )}
        </button>

        {/* User dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-xs font-semibold text-white">
              {user ? user.name.slice(0, 1) : '?'}
            </div>
            <span className="hidden text-sm font-medium text-slate-200 md:block">
              {user?.name || '사용자'}
            </span>
            <span className="hidden text-xs text-slate-500 md:block">▼</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-2xl shadow-black/40">
              {user && (
                <div className="border-b border-slate-700 px-4 py-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {user.department} · {user.position}
                  </p>
                </div>
              )}
              <div className="py-1">
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <span>👤</span>
                  <span>내 프로필</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <span>⚙️</span>
                  <span>설정</span>
                </Link>
              </div>
              <div className="border-t border-slate-700 py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <span>🚪</span>
                  <span>로그아웃</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
