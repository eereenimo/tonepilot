import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const DefaultIcon = () => (
  <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-white/60 backdrop-blur-sm p-16 flex flex-col items-center justify-center text-center">
      <div className="relative mb-7">
        <div className="absolute inset-0 scale-150 rounded-full bg-indigo-50/60 blur-xl" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-100/60 flex items-center justify-center text-slate-400 shadow-sm">
          {icon ?? <DefaultIcon />}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-[14px] text-slate-500 max-w-xs mx-auto mb-7 leading-relaxed font-medium">{description}</p>
      {action}
    </div>
  );
}
