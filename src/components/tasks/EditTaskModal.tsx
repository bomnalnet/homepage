'use client';

import { useState, useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';
import type { Task } from '@/types';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const categories = ['마케팅', '개발', '디자인', '경영지원', '기획', '영업'];
const statuses: Task['status'][] = ['todo', 'in-progress', 'review', 'done'];
const statusLabels: Record<Task['status'], string> = {
  todo: '할 일',
  'in-progress': '진행 중',
  review: '검토',
  done: '완료',
};

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [urgency, setUrgency] = useState(task.urgency);
  const [risk, setRisk] = useState(task.risk);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [category, setCategory] = useState(task.category);
  const [aiAssisted, setAiAssisted] = useState(task.aiAssisted);
  const [progress, setProgress] = useState(task.progress);
  const [status, setStatus] = useState(task.status);

  // Sync state when the task prop changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setUrgency(task.urgency);
    setRisk(task.risk);
    setDueDate(task.dueDate);
    setCategory(task.category);
    setAiAssisted(task.aiAssisted);
    setProgress(task.progress);
    setStatus(task.status);
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(task.id, {
      title,
      description,
      priority,
      urgency,
      risk,
      dueDate,
      category,
      aiAssisted,
      progress,
      status,
    });
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  const inputClass =
    'w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors';
  const labelClass = 'block text-slate-300 text-sm font-medium mb-1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-xl font-bold text-slate-100">업무 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 제목 */}
          <div>
            <label className={labelClass}>제목</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* 설명 */}
          <div>
            <label className={labelClass}>설명</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* 상태 */}
          <div>
            <label className={labelClass}>상태</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              className={inputClass}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
          </div>

          {/* 진행률 */}
          <div>
            <label className={labelClass}>진행률 ({progress}%)</label>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* 우선순위 / 긴급도 / 리스크 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>우선순위</label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>긴급도</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>리스크</label>
              <select
                value={risk}
                onChange={(e) => setRisk(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 마감일 */}
          <div>
            <label className={labelClass}>마감일</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className={labelClass}>카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* AI 보조 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="editAiAssisted"
              checked={aiAssisted}
              onChange={(e) => setAiAssisted(e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="editAiAssisted" className="text-slate-300 text-sm font-medium">
              AI 보조 사용
            </label>
          </div>

          {/* 버튼 */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30"
            >
              삭제
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-600"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                저장
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
