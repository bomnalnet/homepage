'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/types';

interface SidebarProps {
  user: User | null;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { href: '/dashboard', label: '대시보드', icon: '📊' },
  { href: '/clients', label: '고객 관리', icon: '👥' },
  { href: '/campaigns', label: '캠페인 관리', icon: '📢' },
  { href: '/ai', label: 'AI 업무', icon: '🤖' },
  { href: '/projects', label: '프로젝트 / 일정', icon: '📅' },
  { href: '/finance', label: '정산 / 회계', icon: '💰' },
  { href: '/files', label: '자료실', icon: '📁' },
  { href: '/office', label: '행정', icon: '🏢' },
  { href: '/hr', label: '인사', icon: '👤' },
  { href: '/planning', label: '기획', icon: '📋' },
  { href: '/facility', label: '시설', icon: '🔧' },
  { href: '/it', label: '전산', icon: '💻' },
  { href: '/settings', label: '설정', icon: '⚙️' },
];

const adminItems = [
  { href: '/settings/system', label: '시스템 관리', icon: '🛠️' },
  { href: '/settings/users', label: '사용자 관리', icon: '🔐' },
  { href: '/settings/logs', label: '로그 조회', icon: '📜' },
];

function getUserInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return name.slice(0, 2);
  return parts.map((p) => p[0]).join('').slice(0, 2);
}

export default function Sidebar({ user, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Hamburger button for mobile */}
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-800 p-2 text-white shadow-lg shadow-black/20 lg:hidden"
        aria-label="메뉴 토글"
      >
        {collapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-[#0a0f1e] border-r border-slate-800 text-white
          transition-transform duration-300 ease-in-out
          ${collapsed ? '-translate-x-full' : 'translate-x-0'}
          lg:relative lg:z-auto lg:translate-x-0
          ${collapsed ? 'lg:-translate-x-full lg:w-0 lg:overflow-hidden' : 'lg:w-64'}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-lg font-bold shadow-lg shadow-blue-500/20">
            봄
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">봄날</h1>
            <p className="text-[10px] text-slate-500">인트라넷 시스템</p>
          </div>
        </div>

        {/* User profile summary */}
        {user && (
          <div className="border-b border-slate-800 px-4 py-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-3 py-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-sm font-semibold">
                {getUserInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-400">{user.department}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all
                    ${
                      isActive(item.href)
                        ? 'bg-blue-600/20 text-blue-400 font-medium border-l-2 border-blue-500'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white border-l-2 border-transparent'
                    }
                  `}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-400" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin section */}
          {user?.role === 'admin' && (
            <div className="mt-6 border-t border-slate-800 pt-4">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                관리자 메뉴
              </p>
              <ul className="space-y-1">
                {adminItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all
                        ${
                          isActive(item.href)
                            ? 'bg-blue-600/20 text-blue-400 font-medium border-l-2 border-blue-500'
                            : 'text-slate-400 hover:bg-slate-800/60 hover:text-white border-l-2 border-transparent'
                        }
                      `}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-800 px-4 py-3">
          <p className="text-center text-[10px] text-slate-600">
            &copy; 2026 봄날 시너지
          </p>
        </div>
      </aside>
    </>
  );
}
