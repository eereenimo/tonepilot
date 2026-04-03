"use client";

import { useState, useEffect, useRef } from "react";
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
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const draft = localStorage.getItem("tonepilot_draft");
      if (draft) {
        try {
          const { text, tone } = JSON.parse(draft);
          if (text) setInputText(text);
          if (tone) setSelectedTone(tone);
        } catch (err) {}
        localStorage.removeItem("tonepilot_draft");
      }
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if ((!inputText.trim() && !imageData) || isLoading) return;
    setIsLoading(true);
    setError("");
    setOutputText("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: inputText || "Analyze this image context.", 
          tone: selectedTone,
          imageData: imageData 
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Generation failed");

      if (typeof window !== "undefined") {
        const historyItem = {
          id: crypto.randomUUID(),
          originalText: inputText || "[Image Analysis]",
          generatedText: data.result,
          tone: selectedTone,
          createdAt: Date.now(),
        };
        try {
          const existing = JSON.parse(localStorage.getItem("tonepilot_history") || "[]");
          localStorage.setItem("tonepilot_history", JSON.stringify([historyItem, ...existing]));
        } catch (e) {
          console.error("Failed to save history", e);
        }
      }

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
          Paste your draft or upload a screenshot, pick an identity, and let TonePilot do the heavy lifting.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-start gap-3 px-5 py-4 bg-red-50 border border-red-200/80 rounded-2xl text-[13px] animate-in fade-in slide-in-from-top-2 duration-300">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div>
            <p className="font-bold text-red-800 mb-0.5">Operation Failed</p>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Main Card */}
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-8 space-y-8">

          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="inputText" className="block text-[11px] font-black uppercase tracking-widest text-slate-400">
                Your Context / Draft
              </label>
              <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                {inputText.length} chars
              </span>
            </div>
            
            <div className="relative group/input">
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                placeholder="Paste your draft or describe a situation (e.g., 'How do I reply to this screenshot?')..."
                className="w-full min-h-[160px] p-5 bg-slate-50/80 border border-[var(--border)] rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/60 transition-all resize-y font-medium text-[15px] text-slate-900 placeholder:text-slate-400 disabled:opacity-60 disabled:resize-none outline-none leading-relaxed"
              />
              
              {/* Image Input Trigger */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="p-2.5 rounded-xl bg-white border border-[var(--border)] shadow-sm text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
                  title="Attach screenshot or photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Preview */}
            {imageData && (
              <div className="relative inline-block mt-2 animate-in zoom-in-95 duration-200">
                <img 
                  src={imageData} 
                  alt="Attachment" 
                  className="w-24 h-24 object-cover rounded-xl border-2 border-indigo-500/20 shadow-md transition-all hover:brightness-90" 
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
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
              disabled={!inputText.trim() && !imageData}
              onClick={handleGenerate}
              iconRight={!isLoading && ArrowRight}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {isLoading ? "Consulting AI..." : "Optimize Response"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && !outputText && (
        <div className="space-y-4">
          <p className="text-center text-[12px] font-bold text-indigo-500 uppercase tracking-widest animate-pulse">Analyzing context & optimizing language...</p>
          <SkeletonLoader lines={4} showHeader />
        </div>
      )}

      {/* Result */}
      {outputText && (
        <ResultPanel text={outputText} tone={selectedTone} />
      )}
    </div>
  );
}

