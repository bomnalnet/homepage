import type {
  User,
  Task,
  Schedule,
  QuickLink,
  Notification,
  Integration,
  Department,
  Directive,
} from '@/types';

// ============================================================
// 사용자 (Users)
// ============================================================

export const users: User[] = [
  {
    id: 'user-1',
    name: '김봄날',
    email: 'admin@bomnal.net',
    role: 'admin',
    department: '경영지원',
    avatar: '/avatars/admin.png',
    position: '대표이사',
  },
  {
    id: 'user-2',
    name: '이하늘',
    email: 'haneul@bomnal.net',
    role: 'manager',
    department: '마케팅',
    avatar: '/avatars/haneul.png',
    position: '마케팅팀장',
  },
  {
    id: 'user-3',
    name: '박서준',
    email: 'seojun@bomnal.net',
    role: 'manager',
    department: '개발',
    avatar: '/avatars/seojun.png',
    position: '개발팀장',
  },
  {
    id: 'user-4',
    name: '최예린',
    email: 'yerin@bomnal.net',
    role: 'employee',
    department: '디자인',
    avatar: '/avatars/yerin.png',
    position: '시니어 디자이너',
  },
  {
    id: 'user-5',
    name: '정민수',
    email: 'minsu@bomnal.net',
    role: 'employee',
    department: '기획',
    avatar: '/avatars/minsu.png',
    position: '서비스 기획자',
  },
  {
    id: 'user-6',
    name: '한소희',
    email: 'user@bomnal.net',
    role: 'employee',
    department: '영업',
    avatar: '/avatars/sohee.png',
    position: '영업 매니저',
  },
];

// ============================================================
// 부서 (Departments)
// ============================================================

export const departments: Department[] = [
  {
    id: 'dept-1',
    name: '경영지원',
    headId: 'user-1',
    memberIds: ['user-1'],
  },
  {
    id: 'dept-2',
    name: '마케팅',
    headId: 'user-2',
    memberIds: ['user-2'],
  },
  {
    id: 'dept-3',
    name: '개발',
    headId: 'user-3',
    memberIds: ['user-3'],
  },
  {
    id: 'dept-4',
    name: '디자인',
    headId: 'user-4',
    memberIds: ['user-4'],
  },
  {
    id: 'dept-5',
    name: '기획',
    headId: 'user-5',
    memberIds: ['user-5'],
  },
  {
    id: 'dept-6',
    name: '영업',
    headId: 'user-6',
    memberIds: ['user-6'],
  },
];

// ============================================================
// 빠른 링크 (Quick Links)
// ============================================================

export const quickLinks: QuickLink[] = [
  {
    id: 'link-1',
    title: '봄날 Google Drive',
    url: 'https://drive.google.com',
    icon: '📁',
    category: '클라우드',
    userId: 'user-1',
  },
  {
    id: 'link-2',
    title: '프로젝트 Notion',
    url: 'https://notion.so',
    icon: '📝',
    category: '문서',
    userId: 'user-1',
  },
  {
    id: 'link-3',
    title: 'Synology NAS',
    url: 'https://nas.bomnal.net',
    icon: '💾',
    category: '스토리지',
    userId: 'user-1',
  },
  {
    id: 'link-4',
    title: '매출 관리 시트',
    url: 'https://docs.google.com/spreadsheets',
    icon: '📊',
    category: '스프레드시트',
    userId: 'user-6',
  },
  {
    id: 'link-5',
    title: '디자인 피그마',
    url: 'https://figma.com',
    icon: '🎨',
    category: '디자인',
    userId: 'user-4',
  },
  {
    id: 'link-6',
    title: 'GitHub 저장소',
    url: 'https://github.com/bomnal',
    icon: '🐙',
    category: '개발',
    userId: 'user-3',
  },
  {
    id: 'link-7',
    title: 'Make 자동화',
    url: 'https://make.com',
    icon: '⚙️',
    category: '자동화',
    userId: 'user-1',
  },
  {
    id: 'link-8',
    title: '인사 관리 시스템',
    url: 'https://hr.bomnal.net',
    icon: '👥',
    category: '관리',
    userId: 'user-1',
  },
];

// ============================================================
// 업무 (Tasks)
// ============================================================

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: '2분기 마케팅 보고서 작성',
    description: '2분기 마케팅 성과 분석 및 3분기 전략 수립 보고서를 작성합니다.',
    assigneeId: 'user-2',
    status: 'in-progress',
    priority: 5,
    urgency: 4,
    risk: 3,
    progress: 65,
    dueDate: '2026-06-12',
    createdAt: '2026-06-01',
    category: '마케팅',
    relatedLinks: [quickLinks[1]],
    aiAssisted: true,
  },
  {
    id: 'task-2',
    title: '신규 서비스 API 개발',
    description: '봄날 플랫폼 v2.0 REST API 설계 및 개발을 진행합니다.',
    assigneeId: 'user-3',
    status: 'in-progress',
    priority: 5,
    urgency: 5,
    risk: 4,
    progress: 40,
    dueDate: '2026-06-20',
    createdAt: '2026-05-15',
    category: '개발',
    relatedLinks: [quickLinks[5]],
    aiAssisted: true,
  },
  {
    id: 'task-3',
    title: '브랜드 리뉴얼 디자인',
    description: '봄날 브랜드 아이덴티티 리뉴얼 작업 - 로고, 컬러, 타이포그래피.',
    assigneeId: 'user-4',
    status: 'review',
    priority: 4,
    urgency: 3,
    risk: 2,
    progress: 85,
    dueDate: '2026-06-15',
    createdAt: '2026-05-20',
    category: '디자인',
    relatedLinks: [quickLinks[4]],
    aiAssisted: false,
  },
  {
    id: 'task-4',
    title: '거래처 미팅 준비',
    description: '(주)햇살과의 파트너십 미팅 자료를 준비합니다.',
    assigneeId: 'user-6',
    status: 'todo',
    priority: 4,
    urgency: 5,
    risk: 3,
    progress: 10,
    dueDate: '2026-06-09',
    createdAt: '2026-06-05',
    category: '영업',
    relatedLinks: [quickLinks[3]],
    aiAssisted: false,
  },
  {
    id: 'task-5',
    title: '서비스 기획서 v2 작성',
    description: '사용자 피드백 반영한 서비스 기획서 2차 버전을 작성합니다.',
    assigneeId: 'user-5',
    status: 'in-progress',
    priority: 3,
    urgency: 3,
    risk: 2,
    progress: 55,
    dueDate: '2026-06-18',
    createdAt: '2026-05-28',
    category: '기획',
    relatedLinks: [quickLinks[1]],
    aiAssisted: true,
  },
  {
    id: 'task-6',
    title: '월간 매출 분석 리포트',
    description: '5월 매출 데이터 분석 및 경영진 보고 자료를 작성합니다.',
    assigneeId: 'user-1',
    status: 'done',
    priority: 5,
    urgency: 5,
    risk: 1,
    progress: 100,
    dueDate: '2026-06-05',
    createdAt: '2026-06-01',
    category: '경영지원',
    relatedLinks: [quickLinks[3]],
    aiAssisted: true,
  },
  {
    id: 'task-7',
    title: 'SNS 콘텐츠 캘린더 기획',
    description: '6월 인스타그램, 블로그 콘텐츠 캘린더를 수립합니다.',
    assigneeId: 'user-2',
    status: 'done',
    priority: 3,
    urgency: 2,
    risk: 1,
    progress: 100,
    dueDate: '2026-06-03',
    createdAt: '2026-05-25',
    category: '마케팅',
    relatedLinks: [],
    aiAssisted: false,
  },
  {
    id: 'task-8',
    title: '보안 취약점 점검',
    description: '분기별 정기 보안 점검 및 패치를 적용합니다.',
    assigneeId: 'user-3',
    status: 'todo',
    priority: 5,
    urgency: 4,
    risk: 5,
    progress: 0,
    dueDate: '2026-06-25',
    createdAt: '2026-06-08',
    category: '개발',
    relatedLinks: [],
    aiAssisted: false,
  },
  {
    id: 'task-9',
    title: '모바일 앱 UI 개선',
    description: '사용자 테스트 결과를 반영하여 모바일 앱 UI를 개선합니다.',
    assigneeId: 'user-4',
    status: 'in-progress',
    priority: 3,
    urgency: 2,
    risk: 2,
    progress: 30,
    dueDate: '2026-06-22',
    createdAt: '2026-06-03',
    category: '디자인',
    relatedLinks: [quickLinks[4]],
    aiAssisted: false,
  },
  {
    id: 'task-10',
    title: '신규 고객사 제안서 작성',
    description: '(주)들꽃 신규 프로젝트 제안서를 작성합니다.',
    assigneeId: 'user-6',
    status: 'in-progress',
    priority: 4,
    urgency: 4,
    risk: 3,
    progress: 50,
    dueDate: '2026-06-14',
    createdAt: '2026-06-02',
    category: '영업',
    relatedLinks: [quickLinks[0], quickLinks[3]],
    aiAssisted: true,
  },
  {
    id: 'task-11',
    title: 'NAS 백업 시스템 구축',
    description: 'Synology NAS 자동 백업 스케줄 설정 및 재해 복구 매뉴얼을 작성합니다.',
    assigneeId: 'user-3',
    status: 'review',
    priority: 4,
    urgency: 3,
    risk: 4,
    progress: 90,
    dueDate: '2026-06-10',
    createdAt: '2026-05-22',
    category: '개발',
    relatedLinks: [quickLinks[2]],
    aiAssisted: false,
  },
  {
    id: 'task-12',
    title: '사내 교육 프로그램 기획',
    description: 'AI 도구 활용 사내 교육 프로그램을 기획하고 일정을 수립합니다.',
    assigneeId: 'user-5',
    status: 'todo',
    priority: 2,
    urgency: 1,
    risk: 1,
    progress: 5,
    dueDate: '2026-06-30',
    createdAt: '2026-06-07',
    category: '기획',
    relatedLinks: [quickLinks[1]],
    aiAssisted: true,
  },
  {
    id: 'task-13',
    title: 'Make 자동화 워크플로우 설정',
    description: '영업 리드 관리 자동화 워크플로우를 Make에서 구성합니다.',
    assigneeId: 'user-1',
    status: 'in-progress',
    priority: 3,
    urgency: 2,
    risk: 2,
    progress: 70,
    dueDate: '2026-06-16',
    createdAt: '2026-06-04',
    category: '경영지원',
    relatedLinks: [quickLinks[6]],
    aiAssisted: true,
  },
];

// ============================================================
// 일정 (Schedules) - 오늘 날짜 기준
// ============================================================

export const schedules: Schedule[] = [
  {
    id: 'sched-1',
    title: '전체 조회 (주간 회의)',
    startTime: '2026-06-08T09:00:00',
    endTime: '2026-06-08T09:30:00',
    type: 'meeting',
    participants: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
  },
  {
    id: 'sched-2',
    title: '마케팅 전략 미팅',
    startTime: '2026-06-08T10:00:00',
    endTime: '2026-06-08T11:00:00',
    type: 'meeting',
    participants: ['user-1', 'user-2', 'user-5'],
  },
  {
    id: 'sched-3',
    title: 'API 설계 리뷰',
    startTime: '2026-06-08T11:30:00',
    endTime: '2026-06-08T12:30:00',
    type: 'meeting',
    participants: ['user-3', 'user-5'],
  },
  {
    id: 'sched-4',
    title: '점심 - 팀 빌딩 런치',
    startTime: '2026-06-08T12:30:00',
    endTime: '2026-06-08T13:30:00',
    type: 'event',
    participants: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
  },
  {
    id: 'sched-5',
    title: '디자인 시안 발표',
    startTime: '2026-06-08T14:00:00',
    endTime: '2026-06-08T15:00:00',
    type: 'meeting',
    participants: ['user-4', 'user-2', 'user-5'],
  },
  {
    id: 'sched-6',
    title: '거래처 미팅 자료 마감',
    startTime: '2026-06-08T16:00:00',
    endTime: '2026-06-08T16:00:00',
    type: 'deadline',
    participants: ['user-6'],
  },
  {
    id: 'sched-7',
    title: '보안 점검 킥오프',
    startTime: '2026-06-08T16:00:00',
    endTime: '2026-06-08T16:30:00',
    type: 'meeting',
    participants: ['user-3', 'user-1'],
  },
  {
    id: 'sched-8',
    title: '일일 업무 보고 제출',
    startTime: '2026-06-08T17:30:00',
    endTime: '2026-06-08T17:30:00',
    type: 'reminder',
    participants: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
  },
];

// ============================================================
// 연동 서비스 (Integrations)
// ============================================================

export const integrations: Integration[] = [
  {
    id: 'integ-1',
    name: 'Google Drive',
    type: 'google-drive',
    status: 'connected',
    icon: '📁',
  },
  {
    id: 'integ-2',
    name: 'Google Sheets',
    type: 'google-sheets',
    status: 'connected',
    icon: '📊',
  },
  {
    id: 'integ-3',
    name: 'Notion',
    type: 'notion',
    status: 'connected',
    icon: '📝',
  },
  {
    id: 'integ-4',
    name: 'Synology NAS',
    type: 'synology',
    status: 'connected',
    icon: '💾',
  },
  {
    id: 'integ-5',
    name: 'Make (자동화)',
    type: 'make',
    status: 'connected',
    icon: '⚙️',
  },
  {
    id: 'integ-6',
    name: 'Claude AI',
    type: 'claude',
    status: 'disconnected',
    icon: '🤖',
  },
];

// ============================================================
// 알림 (Notifications)
// ============================================================

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    title: '긴급: 거래처 미팅 일정 변경',
    message: '(주)햇살과의 미팅이 내일 오후 2시로 변경되었습니다. 자료 준비를 서둘러 주세요.',
    type: 'urgent',
    read: false,
    createdAt: '2026-06-08T08:30:00',
  },
  {
    id: 'notif-2',
    title: 'NAS 백업 완료',
    message: '6월 7일 야간 자동 백업이 정상적으로 완료되었습니다.',
    type: 'success',
    read: false,
    createdAt: '2026-06-08T06:00:00',
  },
  {
    id: 'notif-3',
    title: '브랜드 리뉴얼 디자인 리뷰 요청',
    message: '최예린님이 브랜드 리뉴얼 시안에 대한 리뷰를 요청했습니다.',
    type: 'info',
    read: false,
    createdAt: '2026-06-08T07:45:00',
  },
  {
    id: 'notif-4',
    title: 'Make 워크플로우 오류',
    message: '영업 리드 자동 알림 워크플로우에서 오류가 발생했습니다. 확인이 필요합니다.',
    type: 'warning',
    read: true,
    createdAt: '2026-06-07T22:15:00',
  },
  {
    id: 'notif-5',
    title: '월간 매출 분석 리포트 승인 완료',
    message: '5월 매출 분석 리포트가 경영진에 의해 최종 승인되었습니다.',
    type: 'success',
    read: true,
    createdAt: '2026-06-07T17:00:00',
  },
];

// ============================================================
// 지시사항 (Directives)
// ============================================================

export const directives: Directive[] = [
  {
    id: 'dir-1',
    fromUserId: 'user-1',
    toUserId: 'user-2',
    content:
      '2분기 마케팅 보고서에 SNS 채널별 ROI 분석을 추가해 주세요. 금요일까지 초안 공유 부탁드립니다.',
    status: 'acknowledged',
    createdAt: '2026-06-08T09:00:00',
    priority: 4,
  },
  {
    id: 'dir-2',
    fromUserId: 'user-1',
    toUserId: 'user-3',
    content:
      'API 보안 점검 일정을 앞당겨 주세요. 최근 업계 보안 이슈가 있으니 다음 주 내로 1차 점검을 완료해 주시기 바랍니다.',
    status: 'pending',
    createdAt: '2026-06-08T09:15:00',
    priority: 5,
  },
  {
    id: 'dir-3',
    fromUserId: 'user-1',
    toUserId: 'user-6',
    content:
      '(주)햇살 미팅 시 신규 파트너십 패키지 제안도 함께 준비해 주세요. 관련 자료는 Google Drive 영업 폴더에 있습니다.',
    status: 'completed',
    createdAt: '2026-06-07T16:30:00',
    priority: 3,
  },
];

// ============================================================
// 헬퍼 함수
// ============================================================

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getTasksByAssignee(assigneeId: string): Task[] {
  return tasks.filter((t) => t.assigneeId === assigneeId);
}

export function getSchedulesByParticipant(userId: string): Schedule[] {
  return schedules.filter((s) => s.participants.includes(userId));
}

export function getQuickLinksByUser(userId: string): QuickLink[] {
  return quickLinks.filter((l) => l.userId === userId);
}

export function getDirectivesForUser(userId: string): Directive[] {
  return directives.filter((d) => d.toUserId === userId);
}

export function getDirectivesFromUser(userId: string): Directive[] {
  return directives.filter((d) => d.fromUserId === userId);
}
