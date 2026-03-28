interface SkeletonLoaderProps {
  lines?: number;
  showHeader?: boolean;
}

export function SkeletonLoader({ lines = 4, showHeader = true }: SkeletonLoaderProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-[var(--border)] p-8 shadow-[var(--shadow-card)] space-y-6 animate-pulse">
      {showHeader && (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-100 rounded-full w-2/5" />
            <div className="h-3 bg-slate-100 rounded-full w-1/4" />
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 bg-slate-100 rounded-full"
            style={{ width: `${100 - i * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}
