'use client';

import { useState } from 'react';

interface Folder {
  id: string;
  name: string;
  fileCount: number;
  icon: string;
}

interface RecentFile {
  id: string;
  name: string;
  size: string;
  uploader: string;
  date: string;
  type: string;
}

const folders: Folder[] = [
  { id: '1', name: '마케팅자료', fileCount: 48, icon: '📊' },
  { id: '2', name: '계약서', fileCount: 23, icon: '📄' },
  { id: '3', name: '회의록', fileCount: 67, icon: '📝' },
  { id: '4', name: '디자인', fileCount: 35, icon: '🎨' },
  { id: '5', name: '기타', fileCount: 12, icon: '📁' },
];

const recentFiles: RecentFile[] = [
  { id: '1', name: '2026_Q2_마케팅_보고서.pdf', size: '4.2 MB', uploader: '김민수', date: '2026-06-08', type: 'PDF' },
  { id: '2', name: '블루오션_계약서_v3.docx', size: '1.8 MB', uploader: '이정아', date: '2026-06-07', type: 'DOCX' },
  { id: '3', name: '주간회의_0607.md', size: '24 KB', uploader: '박진혁', date: '2026-06-07', type: 'MD' },
  { id: '4', name: '브랜드_가이드라인_최종.fig', size: '52.3 MB', uploader: '최윤서', date: '2026-06-06', type: 'FIG' },
  { id: '5', name: '서버_아키텍처_다이어그램.png', size: '3.1 MB', uploader: '정하늘', date: '2026-06-05', type: 'PNG' },
  { id: '6', name: '연간_예산_계획_2026.xlsx', size: '890 KB', uploader: '김민수', date: '2026-06-04', type: 'XLSX' },
];

const integrations = [
  { name: 'Google Drive', status: '연결됨' },
  { name: 'Synology Drive', status: '연결됨' },
];

const fileTypeColor = (type: string) => {
  switch (type) {
    case 'PDF': return 'bg-red-500/20 text-red-400';
    case 'DOCX': return 'bg-blue-500/20 text-blue-400';
    case 'XLSX': return 'bg-green-500/20 text-green-400';
    case 'FIG': return 'bg-purple-500/20 text-purple-400';
    case 'PNG': return 'bg-orange-500/20 text-orange-400';
    default: return 'bg-slate-700/50 text-slate-400';
  }
};

export default function FilesPage() {
  const [view] = useState<'grid' | 'list'>('grid');

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">자료실</h1>
        <p className="mt-1 text-sm text-slate-400">팀 공유 파일과 문서를 관리합니다.</p>
      </div>

      {/* Actions & Integrations */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {integrations.map((int) => (
            <span key={int.name} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-green-500/20 text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {int.name} {int.status}
            </span>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-blue-500 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          파일 업로드
        </button>
      </div>

      {/* Folder Grid */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">폴더</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-5">
          {folders.map((folder) => (
            <div key={folder.id} className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 cursor-pointer hover:shadow-lg hover:shadow-black/20 transition-shadow">
              <div className="text-3xl mb-3">{folder.icon}</div>
              <h3 className="font-semibold text-white text-sm">{folder.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{folder.fileCount}개 파일</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Files */}
      <div className="overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-slate-100">최근 파일</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50">
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">파일명</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">유형</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">크기</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">업로더</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-300">날짜</th>
                <th className="px-6 py-3.5 text-right font-semibold text-slate-300">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {recentFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{file.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${fileTypeColor(file.type)}`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{file.size}</td>
                  <td className="px-6 py-4 text-slate-300">{file.uploader}</td>
                  <td className="px-6 py-4 text-slate-400">{file.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-blue-400 hover:text-blue-300 font-medium mr-3">다운로드</button>
                    <button className="text-sm text-slate-500 hover:text-red-400 font-medium">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
