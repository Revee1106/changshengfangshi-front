import Link from "next/link";

import type { NavigationItem } from "@/types/game";
import { cn } from "@/lib/utils";

interface MobileTabBarProps {
  items: NavigationItem[];
  pathname: string;
}

export function MobileTabBar({ items, pathname }: MobileTabBarProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid border-t border-stone-200 bg-rice-50/96 px-2 pb-2 pt-1 backdrop-blur md:hidden"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-col items-center gap-1 rounded-md px-1 py-1.5 text-[11px] transition",
              isActive ? "bg-jade-700 text-white" : "text-stone-600 hover:bg-white"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
