'use client';

import { create } from 'zustand';
import type { Task } from '@/types';
import { tasks as initialTasks } from '@/lib/mock-data';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskProgress: (id: string, progress: number) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  updateTaskProgress: (id, progress) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, progress } : t)),
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}));
