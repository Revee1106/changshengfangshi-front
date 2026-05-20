"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { mobileNavigationItems, navigationItems } from "@/data/mock-player";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileResourceBar } from "@/components/layout/mobile-resource-bar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { apiClient, fallbackData } from "@/lib/api-client";
import type { CharacterProfile } from "@/types/game";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [character, setCharacter] = useState<CharacterProfile>(fallbackData.character);

  useEffect(() => {
    let mounted = true;

    apiClient
      .characterSummary()
      .then((nextCharacter) => {
        if (mounted) {
          setCharacter(nextCharacter);
        }
      })
      .catch(() => {
        if (mounted) {
          setCharacter(fallbackData.character);
        }
      });

    return () => {
      mounted = false;
    };
  }, [pathname]);

  if (pathname === "/login" || pathname === "/create-character") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <div className="md:hidden">
        <MobileResourceBar character={character} />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 md:grid-cols-[244px_minmax(0,1fr)]">
        <DesktopSidebar items={navigationItems} pathname={pathname} character={character} />

        <main className="min-w-0 px-4 pb-24 pt-24 md:px-6 md:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      <MobileTabBar items={mobileNavigationItems} pathname={pathname} />
    </div>
  );
}
