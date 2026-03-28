import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants = {
  primary: "relative bg-slate-900 text-white shadow-[var(--shadow-brand)] hover:shadow-indigo-500/40 overflow-hidden group/btn",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  danger: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
  outline: "bg-white text-slate-700 border border-[var(--border)] hover:bg-slate-50 hover:border-slate-300",
};

const sizes = {
  sm: "px-4 py-2 text-[13px] rounded-lg gap-1.5",
  md: "px-6 py-2.5 text-[14px] rounded-xl gap-2",
  lg: "px-8 py-3.5 text-[15px] rounded-xl gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 outline-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Gradient hover overlay for primary */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
      )}
      <div className={cn("relative z-10 flex items-center", sizes[size].split(" ").find(s => s.startsWith("gap")))}>
        {loading ? (
          <svg className="animate-spin -ml-0.5 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : icon}
        <span>{children}</span>
        {!loading && iconRight && (
          <span className={variant === "primary" ? "group-hover/btn:translate-x-1 transition-transform" : ""}>{iconRight}</span>
        )}
      </div>
    </button>
  );
}
