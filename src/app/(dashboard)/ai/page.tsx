'use client';

import { useState } from 'react';

interface AITool {
  id: string;
  name: string;
  status: '연결됨' | '미연결';
  description: string;
  icon: string;
  color: string;
}

interface AILog {
  id: string;
  tool: string;
  action: string;
  result: string;
  timestamp: string;
}

interface AutoRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  tool: string;
}

const aiTools: AITool[] = [
  { id: '1', name: 'ChatGPT', status: '연결됨', description: '자연어 처리 및 콘텐츠 생성 자동화', icon: '🤖', color: 'bg-emerald-500' },
  { id: '2', name: 'Claude', status: '연결됨', description: '문서 분석 및 요약, 코드 리뷰 지원', icon: '🧠', color: 'bg-orange-500' },
  { id: '3', name: 'Make (Integromat)', status: '연결됨', description: '워크플로우 자동화 및 앱 간 연동', icon: '⚡', color: 'bg-purple-500' },
  { id: '4', name: 'Google AI', status: '미연결', description: 'Gemini 기반 데이터 분석 및 예측', icon: '🔮', color: 'bg-blue-500' },
];

const aiLogs: AILog[] = [
  { id: '1', tool: 'ChatGPT', action: '마케팅 카피 생성', result: '완료', timestamp: '2026-06-08 14:30' },
  { id: '2', tool: 'Claude', action: '계약서 검토 요약', result: '완료', timestamp: '2026-06-08 13:15' },
  { id: '3', tool: 'Make', action: '주간 보고서 자동 전송', result: '완료', timestamp: '2026-06-08 09:00' },
  { id: '4', tool: 'ChatGPT', action: '고객 문의 자동 응답 초안', result: '검토 필요', timestamp: '2026-06-07 17:45' },
  { id: '5', tool: 'Claude', action: '회의록 요약 및 액션아이템 추출', result: '완료', timestamp: '2026-06-07 16:00' },
];

const initialRules: AutoRule[] = [
  { id: '1', name: '이메일 자동 분류', description: '수신 이메일을 AI로 자동 분류하여 담당자에게 전달', enabled: true, tool: 'ChatGPT' },
  { id: '2', name: '회의록 자동 요약', description: '회의 종료 후 녹음 파일을 자동으로 요약', enabled: true, tool: 'Claude' },
  { id: '3', name: '주간 보고서 생성', description: '매주 월요일 오전 9시 자동 보고서 생성 및 전송', enabled: false, tool: 'Make' },
  { id: '4', name: '고객 문의 초안 작성', description: '고객 문의 접수 시 자동 응답 초안 생성', enabled: true, tool: 'ChatGPT' },
];

export default function AIPage() {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">AI 업무</h1>
        <p className="mt-1 text-sm text-slate-400">AI 도구 연동 및 자동화 규칙을 관리합니다.</p>
      </div>

      {/* AI Tools Grid */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">연동 AI 도구</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aiTools.map((tool) => (
            <div key={tool.id} className="rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-5 hover:shadow-xl hover:shadow-black/30 transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.color} text-xl`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{tool.name}</h3>
                  <span className={`text-xs font-medium ${tool.status === '연결됨' ? 'text-green-400' : 'text-slate-500'}`}>
                    {tool.status === '연결됨' ? '● 연결됨' : '○ 미연결'}
                  </span>
                </div>
              </div>
              <p className="mb-4 text-sm text-slate-400">{tool.description}</p>
              <button
                className={`w-full rounded-lg py-2 text-sm font-medium transition-colors ${
                  tool.status === '연결됨'
                    ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {tool.status === '연결됨' ? '실행' : '연결하기'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Action Logs */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">AI 작업 로그</h2>
        <div className="overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-300">도구</th>
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-300">작업</th>
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-300">결과</th>
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-300">시간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {aiLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-white">{log.tool}</td>
                    <td className="px-6 py-3.5 text-slate-300">{log.action}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        log.result === '완료' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {log.result}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Automation Rules */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">AI 자동화 규칙</h2>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 hover:bg-blue-500 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 자동화 규칙 추가
          </button>
        </div>
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-lg shadow-black/20 p-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{rule.name}</h3>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">{rule.tool}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{rule.description}</p>
              </div>
              <button
                onClick={() => toggleRule(rule.id)}
                className={`relative ml-4 h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                  rule.enabled ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    rule.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
