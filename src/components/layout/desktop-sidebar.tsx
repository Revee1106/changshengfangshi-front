import Link from "next/link";
import { Leaf } from "lucide-react";

import { SidebarStatusSummary } from "@/components/layout/sidebar-status-summary";
import type { CharacterProfile, NavigationItem } from "@/types/game";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  items: NavigationItem[];
  pathname: string;
  character: CharacterProfile;
}

export function DesktopSidebar({ items, pathname, character }: DesktopSidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-stone-200/80 bg-rice-50/82 px-3 py-5 backdrop-blur md:block">
      <Link href="/" className="mb-4 flex items-center gap-3 rounded-lg px-2 py-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-800 text-rice-50">
          <Leaf className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-base font-semibold text-ink-900">长生坊市</span>
        </span>
      </Link>

      <SidebarStatusSummary character={character} />

      <div className="mb-3 border-t border-stone-200/80" />

      <nav className="space-y-1" aria-label="主导航">
        {items.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm text-stone-600 transition",
                isActive
                  ? "bg-jade-700 text-white shadow-sm"
                  : "hover:bg-white hover:text-ink-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
