import type { User } from '@/types';

// ============================================================
// 봄날 인트라넷 인증 유틸리티
// ============================================================

interface AuthUser {
  email: string;
  password: string;
  user: User;
}

const authUsers: AuthUser[] = [
  {
    email: 'admin@bomnal.net',
    password: 'admin123',
    user: {
      id: 'user-1',
      name: '김봄날',
      email: 'admin@bomnal.net',
      role: 'admin',
      department: '경영지원',
      avatar: '/avatars/admin.png',
      position: '대표이사',
    },
  },
  {
    email: 'user@bomnal.net',
    password: 'user123',
    user: {
      id: 'user-6',
      name: '한소희',
      email: 'user@bomnal.net',
      role: 'employee',
      department: '영업',
      avatar: '/avatars/sohee.png',
      position: '영업 매니저',
    },
  },
];

const AUTH_STORAGE_KEY = 'bomnal_current_user';

/**
 * 이메일과 비밀번호로 로그인합니다.
 * 성공 시 사용자 정보를 localStorage에 저장하고 User 객체를 반환합니다.
 * 실패 시 null을 반환합니다.
 */
export function login(email: string, password: string): User | null {
  const found = authUsers.find(
    (a) => a.email === email && a.password === password
  );

  if (!found) {
    return null;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found.user));
  }

  return found.user;
}

/**
 * localStorage에서 현재 로그인된 사용자를 가져옵니다.
 * 로그인되지 않은 경우 null을 반환합니다.
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

/**
 * 로그아웃합니다. localStorage에서 사용자 정보를 제거합니다.
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

/**
 * 현재 사용자가 로그인 상태인지 확인합니다.
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * 현재 사용자가 관리자인지 확인합니다.
 */
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
