"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

function SettingsRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-[var(--border)] last:border-0">
      <div>
        <p className="font-semibold text-[14px] text-slate-800 dark:text-slate-200">{label}</p>
        {description && <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on }: { on?: boolean }) {
  const [enabled, setEnabled] = useState(on ?? false);
  return (
    <button onClick={() => setEnabled(!enabled)} className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${enabled ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [theme, setTheme] = useState("System");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "System";
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    const isDark = newTheme === "Dark" || (newTheme === "System" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      <PageHeader title="Settings" description="Manage your preferences and account." />

      <div className="space-y-8">
        {/* Profile */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Profile</p>
          <Card>
            <div className="px-6 divide-y divide-[var(--border)]">
              <SettingsRow label="Display Name" description="Your name shown in the workspace">
                <input defaultValue="Eren Yeager" className="px-3.5 py-2 text-[14px] font-medium border border-[var(--border)] rounded-xl bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none w-48" />
              </SettingsRow>
              <SettingsRow label="Email Address" description="Linked to your account">
                <input defaultValue="eren@example.com" disabled className="px-3.5 py-2 text-[14px] font-medium border border-[var(--border)] rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 outline-none w-48 cursor-not-allowed" />
              </SettingsRow>
              <SettingsRow label="Plan" description="Your current subscription tier">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[12px] font-black uppercase tracking-wider border border-indigo-100 dark:border-indigo-500/20">Pro</span>
              </SettingsRow>
            </div>
          </Card>
        </div>

        {/* AI Preferences */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">AI Preferences</p>
          <Card>
            <div className="px-6 divide-y divide-[var(--border)]">
              <SettingsRow label="Default Tone" description="Your preferred starting tone">
                <select className="px-3.5 py-2 text-[14px] font-semibold border border-[var(--border)] rounded-xl bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Casual</option>
                </select>
              </SettingsRow>
              <SettingsRow label="Response Length" description="How detailed should the output be">
                <select className="px-3.5 py-2 text-[14px] font-semibold border border-[var(--border)] rounded-xl bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none">
                  <option>Balanced</option>
                  <option>Short</option>
                  <option>Detailed</option>
                </select>
              </SettingsRow>
              <SettingsRow label="Auto-save Results" description="Save each result to your Library automatically">
                <Toggle on />
              </SettingsRow>
            </div>
          </Card>
        </div>

        {/* Appearance */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Appearance</p>
          <Card>
            <div className="px-6">
              <SettingsRow label="Theme" description="Visual theme for the workspace">
                <div className="flex items-center gap-2">
                  {["Light", "Dark", "System"].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleThemeChange(t)}
                      className={`px-3.5 py-2 rounded-lg text-[13px] font-bold border transition-all ${
                        t === theme
                          ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                          : "bg-white text-slate-500 border-[var(--border)] hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </SettingsRow>
            </div>
          </Card>
        </div>

        <div className="flex justify-end pb-4">
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-bold rounded-xl transition-all shadow-[var(--shadow-brand)] active:scale-[0.98]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

