import { cn } from "@/lib/utils";

type ProgressVariant = "cultivation" | "lifespan" | "energy";

interface StatusProgressBarProps {
  value: number;
  max: number;
  variant: ProgressVariant;
  className?: string;
}

const variantClasses: Record<ProgressVariant, string> = {
  cultivation: "from-ink-800 via-jade-700 to-jade-500",
  lifespan: "from-amberInk-700 via-amberInk-500 to-amberInk-100",
  energy: "from-jade-700 via-jade-600 to-jade-100"
};

export function StatusProgressBar({ value, max, variant, className }: StatusProgressBarProps) {
  const width = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;

  return (
    <div
      className={cn(
        "h-2.5 overflow-hidden rounded-full bg-rice-200 shadow-[inset_0_1px_2px_rgba(21,42,40,0.12)]",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-[width] duration-300 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
          variantClasses[variant]
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
