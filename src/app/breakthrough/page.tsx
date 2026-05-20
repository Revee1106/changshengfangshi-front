import Link from "next/link";

import { BreakthroughRiskCard } from "@/components/game/breakthrough-risk-card";
import { PageHeading } from "@/components/game/page-heading";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { apiClient, fallbackData, readApi } from "@/lib/api-client";

export const dynamic = "force-dynamic";

export default async function BreakthroughPage() {
  const breakthrough = await readApi(
    () => apiClient.breakthroughCurrent(),
    {
      canBreakthrough:
        fallbackData.character.breakthroughAvailable ??
        (fallbackData.character.cultivation >= fallbackData.character.cultivationRequired),
      currentRealm: fallbackData.character.realm,
      currentRealmKey: "",
      targetRealm: fallbackData.character.nextRealm,
      targetRealmKey: "",
      cultivation: fallbackData.character.cultivation,
      cultivationRequired: fallbackData.character.cultivationRequired,
      rates: {
        baseSuccessRate: 68,
        daoHeartBonus: 3,
        randomCorrectionMin: -5,
        randomCorrectionMax: 5,
        minFinalRate: 5,
        maxFinalRate: 95
      },
      availablePills: [
        {
          id: "condensed-origin-pill",
          name: "凝元丹",
          quantity: 1,
          successBonus: 10,
          description: "温养经脉，辅助炼气期小境界突破。"
        },
        {
          id: "clear-heart-pill",
          name: "清心丹",
          quantity: 2,
          successBonus: 6,
          description: "稳住心神，降低突破时气息紊乱的概率。"
        }
      ]
    }
  );
  const canBreakthrough = breakthrough.canBreakthrough;

  return (
    <>
      <PageHeading
        eyebrow="突破"
        title="境界突破"
        description="修为圆满后可尝试突破，突破并非必定成功。"
        badge={canBreakthrough ? "修为已满" : undefined}
      />

      <section className="relative mx-auto w-full max-w-[860px]">
        <div className={!canBreakthrough ? "pointer-events-none blur-sm" : undefined}>
          <BreakthroughRiskCard
            canBreakthrough={canBreakthrough}
            baseSuccessRate={breakthrough.rates.baseSuccessRate}
            daoHeartBonus={breakthrough.rates.daoHeartBonus}
            availablePills={breakthrough.availablePills}
          />
        </div>

        {!canBreakthrough ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-rice-50/70 px-3 backdrop-blur-[2px]">
            <Card className="w-full max-w-md border-jade-700/20 bg-white/95 shadow-[0_18px_46px_rgba(21,42,40,0.16)]">
              <CardHeader>
                <h2 className="text-base font-semibold text-ink-900">未满足突破条件</h2>
              </CardHeader>
              <CardBody>
                <p className="text-sm leading-6 text-stone-600">
                  当前修为尚未圆满，暂不可尝试突破。继续修炼至当前境界圆满后，可从左侧状态卡片进入突破。
                </p>
                <Link
                  href="/cultivation"
                  className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-jade-700 bg-jade-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-jade-600"
                >
                  返回修炼
                </Link>
              </CardBody>
            </Card>
          </div>
        ) : null}
      </section>
    </>
  );
}
