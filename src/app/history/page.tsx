"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HistoryItem } from "@/types";

export default function HistoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTone, setFilterTone] = useState("All");

  useEffect(() => {
    setMounted(true);
    try {
      const history = JSON.parse(localStorage.getItem("tonepilot_history") || "[]");
      setItems(history);
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const handleDelete = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem("tonepilot_history", JSON.stringify(newItems));
  };

  const handleClearAll = () => {
    if (!window.confirm("Are you sure you want to clear all history?")) return;
    setItems([]);
    localStorage.removeItem("tonepilot_history");
  };

  const handleReuse = (item: HistoryItem) => {
    localStorage.setItem("tonepilot_draft", JSON.stringify({ text: item.originalText, tone: item.tone }));
    router.push("/analyze");
  };

  if (!mounted) return null;

  const filteredItems = items.filter(item => {
    if (filterTone !== "All" && item.tone !== filterTone) return false;
    if (searchQuery && !item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) && !item.generatedText.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const availableTones = ["All", ...Array.from(new Set(items.map(item => item.tone)))];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      <PageHeader
        title="Library"
        description="All your past rewrites in one place."
        action={
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <Button variant="danger" size="md" onClick={handleClearAll} icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              }>
                Clear All
              </Button>
            )}
            <Link href="/analyze">
              <Button variant="primary" size="md" icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              }>
                New Analysis
              </Button>
            </Link>
          </div>
        }
      />

      {items.length === 0 ? (
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
      ) : (
        <>
          {/* Filters row */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {availableTones.map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterTone(filter)}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all border ${
                  filter === filterTone
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-500 border-[var(--border)] hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
            <div className="ml-auto relative w-full sm:w-auto mt-2 sm:mt-0">
              <input
                type="text"
                placeholder="Search library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 bg-white border border-[var(--border)] rounded-xl text-[13px] font-medium placeholder:text-slate-400 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/60 outline-none transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <Card key={item.id} hover className="flex flex-col group overflow-hidden">
                <div className="flex flex-col p-5 flex-1 gap-3">
                  <div className="flex justify-between items-start">
                    <Badge tone={item.tone} />
                    <span className="text-[12px] text-slate-400 font-medium">
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(item.createdAt)}
                    </span>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-[14px] text-slate-800 font-medium line-clamp-3 leading-relaxed">
                      {item.generatedText}
                    </p>
                    <p className="text-[13px] text-slate-400 line-clamp-1 italic">
                      From: {item.originalText}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3 bg-slate-50 border-t border-[var(--border)] flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleReuse(item)}
                    className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Reuse as draft
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-[13px] font-bold text-slate-400 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-slate-500 font-medium border border-dashed border-[var(--border-hover)] rounded-2xl">
              No rewrites match your current filters.
            </div>
          )}
        </>
      )}
    </div>
  );
}
