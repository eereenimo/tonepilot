"use client";

import { cn } from "@/lib/utils";

const TONES = [
  { id: "Professional", icon: "💼", description: "Clear, structured, and authoritative" },
  { id: "Friendly", icon: "👋", description: "Warm, approachable, and sincere" },
  { id: "Casual", icon: "👕", description: "Relaxed, natural, and easy-going" },
];

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
  disabled?: boolean;
}

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {TONES.map((tone) => {
        const isSelected = value === tone.id;
        return (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            disabled={disabled}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-xl text-left transition-all duration-200 outline-none border",
              isSelected
                ? "bg-indigo-50/60 border-indigo-400/40 ring-2 ring-indigo-500/30 scale-[1.01]"
                : "bg-white border-[var(--border)] hover:bg-slate-50/80 hover:border-slate-300/80 hover:scale-[1.005]",
              disabled && "opacity-50 cursor-not-allowed scale-100"
            )}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xl leading-none">{tone.icon}</span>
              <span className={cn("font-bold text-[14px]", isSelected ? "text-indigo-800" : "text-slate-700")}>
                {tone.id}
              </span>
            </div>
            <span className={cn("text-[12px] font-medium leading-snug", isSelected ? "text-indigo-600/80" : "text-slate-400")}>
              {tone.description}
            </span>
            {isSelected && (
              <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.7)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
