// 봄날 인트라넷 타입 정의

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  avatar: string;
  position: string;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  category: string;
  userId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 1 | 2 | 3 | 4 | 5;
  urgency: 1 | 2 | 3 | 4 | 5;
  risk: 1 | 2 | 3 | 4 | 5;
  progress: number; // 0-100
  dueDate: string;
  createdAt: string;
  category: string;
  relatedLinks: QuickLink[];
  aiAssisted: boolean;
}

export interface Schedule {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'event';
  participants: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  read: boolean;
  createdAt: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'google-drive' | 'google-sheets' | 'notion' | 'synology' | 'make' | 'chatgpt' | 'claude';
  status: 'connected' | 'disconnected';
  icon: string;
}

export interface Department {
  id: string;
  name: string;
  headId: string;
  memberIds: string[];
}

export interface Directive {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  status: 'pending' | 'acknowledged' | 'completed';
  createdAt: string;
  priority: 1 | 2 | 3 | 4 | 5;
}
