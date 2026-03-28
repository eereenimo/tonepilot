"use client";

import { useState } from "react";
import { Badge } from "./Badge";

interface ResultPanelProps {
  text: string;
  tone: string;
}

export function ResultPanel({ text, tone }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-indigo-100/80 bg-white shadow-[var(--shadow-elevated)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Gradient stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-indigo-50/30 border-b border-indigo-100/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[var(--shadow-brand)]">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-extrabold text-slate-900 leading-none">Optimized Result</p>
            <div className="mt-1.5">
              <Badge tone={tone} />
            </div>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-[13px] font-bold text-slate-600 hover:text-slate-900 active:scale-95 shadow-sm"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-7">
        <p className="text-[16px] text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
