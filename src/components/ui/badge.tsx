import type { Tone } from "@/types/game";
import { cn } from "@/lib/utils";

const toneClasses: Record<Tone, string> = {
  jade: "border-jade-500/25 bg-jade-50 text-jade-700",
  ink: "border-ink-800/15 bg-ink-800/5 text-ink-800",
  amber: "border-amberInk-500/25 bg-amberInk-100/45 text-amberInk-700",
  cinnabar: "border-cinnabar-500/25 bg-cinnabar-100/60 text-cinnabar-700",
  muted: "border-stone-300 bg-stone-100 text-stone-600"
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
