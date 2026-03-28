import { cn } from "@/lib/utils";

type ToneId = "Professional" | "Friendly" | "Casual" | "diplomatic" | "assertive" | "direct" | "bold";

const toneStyles: Record<string, string> = {
  Professional: "badge-professional",
  Friendly: "badge-friendly",
  Casual: "badge-casual",
  diplomatic: "badge-diplomatic",
  assertive: "badge-assertive",
  direct: "badge-direct",
  bold: "badge-bold",
};

interface BadgeProps {
  tone: string;
  className?: string;
}

export function Badge({ tone, className }: BadgeProps) {
  const style = toneStyles[tone] ?? "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border", style, className)}>
      {tone}
    </span>
  );
}
