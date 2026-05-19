import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface PlaceDetail {
  label: string;
  value: string | number;
  tone?: "default" | "danger";
}

interface PlaceCardProps {
  name: string;
  icon: LucideIcon;
  selected: boolean;
  unlocked: boolean;
  details: PlaceDetail[];
  onSelect: () => void;
}

export function PlaceCard({
  name,
  icon: Icon,
  selected,
  unlocked,
  details,
  onSelect
}: PlaceCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg border bg-rice-50 p-3 text-center transition",
        selected
          ? "col-span-2 min-h-[212px] border-jade-600 bg-white shadow-[0_14px_32px_rgba(23,82,68,0.12)] ring-2 ring-jade-500/15 sm:aspect-square sm:min-h-0"
          : "aspect-square min-h-[98px] border-stone-200 hover:border-jade-500 hover:bg-white",
        !unlocked && "cursor-not-allowed opacity-60"
      )}
      onClick={() => unlocked && onSelect()}
      aria-pressed={selected}
      disabled={!unlocked}
    >
      <div className="flex h-full min-h-0 flex-col items-center justify-center">
        <span
          className={cn(
            "flex items-center justify-center rounded-md bg-ink-800 text-rice-50 transition",
            selected ? "h-12 w-12" : "h-10 w-10"
          )}
        >
          <Icon className={selected ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
        </span>
        <h3 className="mt-3 break-words text-sm font-semibold leading-5 text-ink-900">{name}</h3>

        {selected ? (
          <div className="mt-2 w-full space-y-1 text-xs leading-5 text-stone-600">
            {details.map((detail) => (
              <p
                key={`${detail.label}-${detail.value}`}
                className={cn(
                  "break-words",
                  detail.tone === "danger" && "font-medium text-cinnabar-700"
                )}
              >
                <span className={detail.tone === "danger" ? undefined : "text-stone-500"}>
                  {detail.label}：
                </span>
                <span className={detail.tone === "danger" ? undefined : "font-medium text-ink-900"}>
                  {detail.value}
                </span>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}
