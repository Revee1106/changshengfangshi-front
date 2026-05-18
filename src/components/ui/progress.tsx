import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  tone?: "jade" | "amber" | "cinnabar" | "ink";
  className?: string;
}

const fills = {
  jade: "bg-jade-600",
  amber: "bg-amberInk-500",
  cinnabar: "bg-cinnabar-500",
  ink: "bg-ink-800"
};

export function Progress({ value, tone = "jade", className }: ProgressProps) {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-stone-200", className)}>
      <div className={cn("h-full rounded-full", fills[tone])} style={{ width: `${width}%` }} />
    </div>
  );
}
