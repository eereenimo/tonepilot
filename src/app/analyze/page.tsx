"use client";

import { useState } from "react";
import { ToneSelector } from "@/components/ui/ToneSelector";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { ResultPanel } from "@/components/ui/ResultPanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AnalyzePage() {
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);
    setError("");
    setOutputText("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, tone: selectedTone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Generation failed");
      setTimeout(() => { setOutputText(data.result); setIsLoading(false); }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setIsLoading(false);
    }
  };

  const ArrowRight = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Hero Header */}
      <div className="text-center pb-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          Elevate your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">messaging.</span>
        </h1>
        <p className="text-[15px] text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
          Paste your draft below, pick an identity, and let TonePilot do the heavy lifting.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-200/80 rounded-2xl text-[13px] animate-in fade-in slide-in-from-top-2 duration-300">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div>
            <p className="font-bold text-red-800 mb-0.5">Generation Failed</p>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Main Card */}
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-8 space-y-8">

          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="inputText" className="block text-[11px] font-black uppercase tracking-widest text-slate-400">
                Your Draft
              </label>
              <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                {inputText.length} chars
              </span>
            </div>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              placeholder="Paste your raw text here — an email, a message, a response..."
              className="w-full min-h-[160px] p-5 bg-slate-50/80 border border-[var(--border)] rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/60 transition-all resize-y font-medium text-[15px] text-slate-900 placeholder:text-slate-400 disabled:opacity-60 disabled:resize-none outline-none leading-relaxed"
            />
          </div>

          <div className="h-px bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />

          {/* Tone */}
          <div className="space-y-4">
            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">
              Target Identity
            </label>
            <ToneSelector value={selectedTone} onChange={setSelectedTone} disabled={isLoading} />
          </div>

          {/* CTA */}
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={!inputText.trim()}
              onClick={handleGenerate}
              iconRight={!isLoading && ArrowRight}
              className="w-full sm:w-auto min-w-[180px]"
            >
              {isLoading ? "Styling text..." : "Generate Magic"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Loading */}
      {isLoading && !outputText && (
        <SkeletonLoader lines={4} showHeader />
      )}

      {/* Result */}
      {outputText && (
        <ResultPanel text={outputText} tone={selectedTone} />
      )}
    </div>
  );
}
