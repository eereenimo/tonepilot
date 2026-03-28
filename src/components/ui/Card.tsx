import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white/80 backdrop-blur-xl rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)]",
        hover && "transition-shadow duration-200 hover:shadow-[var(--shadow-elevated)]",
        className
      )}
    >
      {children}
    </div>
  );
}
