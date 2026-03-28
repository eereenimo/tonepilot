import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      <PageHeader
        title="Library"
        description="All your past rewrites in one place."
        action={
          <Link href="/analyze">
            <Button variant="primary" size="md" icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            }>
              New Analysis
            </Button>
          </Link>
        }
      />

      {/* Filters row */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {["All", "Professional", "Friendly", "Casual"].map((filter, i) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all border ${
              i === 0
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-[var(--border)] hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            {filter}
          </button>
        ))}
        <div className="ml-auto relative">
          <input
            type="text"
            placeholder="Search library..."
            disabled
            className="w-56 pl-9 pr-4 py-2 bg-white border border-[var(--border)] rounded-xl text-[13px] font-medium placeholder:text-slate-400 shadow-sm disabled:opacity-50"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <EmptyState
        title="Your library is empty"
        description="Once you start generating rewrites in the Analyzer, they'll appear here for quick access."
        icon={
          <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        }
        action={
          <Link href="/analyze">
            <Button variant="primary" size="md" icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            }>
              Open Analyzer
            </Button>
          </Link>
        }
      />
    </div>
  );
}
