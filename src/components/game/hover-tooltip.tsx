import { Info } from "lucide-react";

interface HoverTooltipProps {
  label: string;
  children: React.ReactNode;
}

export function HoverTooltip({ label, children }: HoverTooltipProps) {
  return (
    <span className="group/tooltip relative inline-flex items-center gap-1">
      <span>{label}</span>
      <Info className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
      <span
        className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 hidden w-64 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs font-normal leading-5 text-stone-600 shadow-panel group-hover/tooltip:block group-focus-within/tooltip:block"
        role="tooltip"
      >
        {children}
      </span>
    </span>
  );
}
