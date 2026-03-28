"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLES = ["Product Manager", "Writer / Editor", "Customer Success", "Student", "Other"];
const TONES = [
  { id: "Professional", icon: "💼", description: "Clear, structured, and authoritative" },
  { id: "Friendly", icon: "👋", description: "Warm, approachable, and sincere" },
  { id: "Casual", icon: "👕", description: "Relaxed, natural, and easy-going" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTone, setSelectedTone] = useState("");

  const steps = [
    { label: "Role", title: "What's your primary role?", subtitle: "We'll tailor TonePilot to your communication needs." },
    { label: "Tone", title: "What's your preferred tone?", subtitle: "Pick your default writing identity. You can change it any time." },
    { label: "Done", title: "You're all set! 🎉", subtitle: "Your preferences have been saved. Welcome to TonePilot." },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--surface)] z-50">
      {/* Ambient */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-400/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-lg mx-auto px-4">
        {/* Brand Bar */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[var(--shadow-brand)]">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">TonePilot</span>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.label} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-indigo-500 w-8" : "bg-slate-200 w-4"}`} />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-[var(--border)] shadow-[var(--shadow-elevated)] p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">{steps[step].title}</h1>
            <p className="text-[14px] text-slate-500 font-medium">{steps[step].subtitle}</p>
          </div>

          {step === 0 && (
            <div className="grid grid-cols-1 gap-2.5">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-xl border text-[14px] font-semibold transition-all ${
                    selectedRole === role
                      ? "bg-indigo-50 border-indigo-400/40 ring-2 ring-indigo-500/30 text-indigo-800"
                      : "bg-white border-[var(--border)] text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {role}
                  {selectedRole === role && (
                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-2.5">
              {TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all ${
                    selectedTone === tone.id
                      ? "bg-indigo-50 border-indigo-400/40 ring-2 ring-indigo-500/30"
                      : "bg-white border-[var(--border)] hover:bg-slate-50"
                  }`}
                >
                  <span className="text-2xl">{tone.icon}</span>
                  <div>
                    <p className="font-bold text-[14px] text-slate-800">{tone.id}</p>
                    <p className="text-[12px] text-slate-500 font-medium">{tone.description}</p>
                  </div>
                  {selectedTone === tone.id && (
                    <svg className="w-4 h-4 text-indigo-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center mb-5 shadow-[var(--shadow-brand)]">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium text-[14px] mb-1">Workspace configured as:</p>
              <div className="flex justify-center gap-2 flex-wrap mt-2">
                {selectedRole && <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[12px] font-bold rounded-lg border border-indigo-100">{selectedRole}</span>}
                {selectedTone && <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[12px] font-bold rounded-lg border border-purple-100">{selectedTone} tone</span>}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex gap-3">
            {step > 0 && step < 2 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 py-3 rounded-xl border border-[var(--border)] text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-all">
                Back
              </button>
            )}
            <button
              onClick={() => step < 2 ? setStep(step + 1) : router.push("/analyze")}
              disabled={(step === 0 && !selectedRole) || (step === 1 && !selectedTone)}
              className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold text-[14px] hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-[var(--shadow-brand)]"
            >
              {step === 2 ? "Launch TonePilot →" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
