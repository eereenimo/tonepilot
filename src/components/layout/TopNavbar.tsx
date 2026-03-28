"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/": { title: "Home", description: "Welcome to TonePilot" },
  "/analyze": { title: "Analyzer", description: "Rewrite your message with AI precision" },
  "/history": { title: "Library", description: "Your past analyses and rewrites" },
  "/settings": { title: "Settings", description: "Manage your preferences and account" },
  "/onboarding": { title: "Get Started", description: "Set up your TonePilot workspace" },
};

export function TopNavbar() {
  const pathname = usePathname();
  if (pathname === "/onboarding") return null;

  const page = pageTitles[pathname] ?? { title: "TonePilot", description: "" };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-white/70 backdrop-blur-xl px-5 sm:px-8 flex-shrink-0">
      {/* Left: Mobile logo + Page context */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile logo (hidden on md+) */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="font-bold text-[15px] text-slate-900">TonePilot</span>
        </div>

        {/* Desktop: breadcrumb */}
        <div className="hidden md:flex items-center gap-2 min-w-0">
          <span className="text-[13px] font-medium text-slate-400">Workspace</span>
          <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          <span className="text-[13px] font-bold text-slate-800 truncate">{page.title}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Notification Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all group">
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          <svg className="w-5 h-5 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div className="w-px h-5 bg-slate-200" />

        {/* User Avatar Chip */}
        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-slate-100 transition-all group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200/60 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-black text-indigo-600">EY</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[12px] font-bold text-slate-800 leading-none">Eren Yeager</p>
            <p className="text-[10px] text-indigo-500 font-semibold mt-0.5 uppercase tracking-wide">Pro</p>
          </div>
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </header>
  );
}
