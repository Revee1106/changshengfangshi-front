import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

const variants = {
  primary: "border-jade-700 bg-jade-700 text-white hover:bg-jade-600",
  secondary: "border-stone-300 bg-white text-ink-800 hover:bg-rice-100",
  danger: "border-cinnabar-700 bg-cinnabar-700 text-white hover:bg-cinnabar-500",
  ghost: "border-transparent bg-transparent text-ink-800 hover:bg-ink-800/5"
};

export function Button({
  children,
  className,
  icon: Icon,
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span className="truncate">{children}</span>
    </button>
  );
}
