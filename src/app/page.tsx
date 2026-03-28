import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ── Hero ── */}
      <section className="text-center pt-8 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[12px] font-bold text-indigo-600 uppercase tracking-widest mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
          </span>
          AI-Powered · Now in Beta
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[1.08] mb-6">
          Say it right,{" "}
          <span className="relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600">
              every time.
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8 Q100 2 200 7 Q300 12 398 6" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
          TonePilot rewrites your messages with AI precision. Paste your draft, pick a tone, and get a polished result in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/analyze"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-900 text-white text-[15px] font-bold rounded-2xl overflow-hidden shadow-[var(--shadow-brand)] hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Launch Analyzer
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </Link>
          <Link
            href="/history"
            className="inline-flex items-center gap-2 px-6 py-4 bg-white border border-[var(--border)] text-slate-700 text-[14px] font-semibold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            View Library
          </Link>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
        {[
          {
            icon: "⚡",
            gradient: "from-indigo-500 to-blue-500",
            bg: "from-indigo-50 to-blue-50",
            border: "border-indigo-100",
            accent: "text-indigo-600",
            title: "Instant Rewrite",
            text: "Transform rough drafts into precise, polished messages in under 3 seconds.",
          },
          {
            icon: "🎯",
            gradient: "from-purple-500 to-violet-500",
            bg: "from-purple-50 to-violet-50",
            border: "border-purple-100",
            accent: "text-purple-600",
            title: "Smart Tone Control",
            text: "Switch between Professional, Friendly, and Casual with a single click.",
          },
          {
            icon: "✓",
            gradient: "from-emerald-500 to-teal-500",
            bg: "from-emerald-50 to-teal-50",
            border: "border-emerald-100",
            accent: "text-emerald-600",
            title: "Copy-Ready Output",
            text: "One-click copy right to your clipboard — ready to paste anywhere.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="relative group bg-white/80 backdrop-blur-xl rounded-2xl border border-[var(--border)] p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${feature.bg} blur-2xl opacity-60 -translate-y-10 translate-x-10`} />
            <div className={`relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.bg} border ${feature.border} text-xl mb-5 shadow-sm`}>
              {feature.icon}
            </div>
            <h3 className="font-bold text-[15px] text-slate-900 mb-2 tracking-tight">{feature.title}</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{feature.text}</p>
          </div>
        ))}
      </section>

      {/* ── Social proof strip ── */}
      <div className="mt-16 text-center animate-in fade-in duration-700 delay-300">
        <p className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-4">Precision communication for</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {["Product Managers", "Customer Success", "Founders", "Recruiters", "Sales Teams"].map(role => (
            <span key={role} className="text-[13px] font-semibold text-slate-500">{role}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
