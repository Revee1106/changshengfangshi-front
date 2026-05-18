"use client";

import { usePathname } from "next/navigation";

import { character, mobileNavigationItems, navigationItems } from "@/data/mock-player";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileResourceBar } from "@/components/layout/mobile-resource-bar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="md:hidden">
        <MobileResourceBar character={character} />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
        <DesktopSidebar items={navigationItems} pathname={pathname} />

        <main className="min-w-0 px-4 pb-24 pt-24 md:px-6 md:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      <MobileTabBar items={mobileNavigationItems} pathname={pathname} />
    </div>
  );
}
