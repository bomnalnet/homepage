'use client';

import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = ['마케팅', '개발', '디자인', '경영지원', '기획', '영업'];

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const addTask = useTaskStore((s) => s.addTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [urgency, setUrgency] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [risk, setRisk] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [aiAssisted, setAiAssisted] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority(3);
    setUrgency(3);
    setRisk(3);
    setDueDate('');
    setCategory(categories[0]);
    setAiAssisted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title,
      description,
      assigneeId: 'user-1',
      status: 'todo',
      priority,
      urgency,
      risk,
      progress: 0,
      dueDate,
      category,
      relatedLinks: [],
      aiAssisted,
    });
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const inputClass =
    'w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors';
  const labelClass = 'block text-slate-300 text-sm font-medium mb-1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-xl font-bold text-slate-100">새 업무 추가</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 제목 */}
          <div>
            <label className={labelClass}>제목</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="업무 제목을 입력하세요"
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
              placeholder="업무 설명을 입력하세요"
              className={inputClass + ' resize-none'}
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
              id="aiAssisted"
              checked={aiAssisted}
              onChange={(e) => setAiAssisted(e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="aiAssisted" className="text-slate-300 text-sm font-medium">
              AI 보조 사용
            </label>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-600"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              업무 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
