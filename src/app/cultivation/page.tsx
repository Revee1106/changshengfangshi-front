"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";

import {
  BodyIcon,
  CultivationIcon,
  MountainIcon
} from "@/components/game/game-icons";
import { PageHeading } from "@/components/game/page-heading";
import { PlaceCard } from "@/components/game/place-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { apiClient, fallbackData } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { CultivationAction, CultivationPlace } from "@/types/game";

export default function CultivationPage() {
  const [cultivationActions, setCultivationActions] = useState<CultivationAction[]>(
    fallbackData.cultivationActions
  );
  const [cultivationPlaces, setCultivationPlaces] = useState<CultivationPlace[]>(
    fallbackData.cultivationPlaces
  );
  const [selectedPlaceId, setSelectedPlaceId] = useState(fallbackData.cultivationPlaces[0].id);
  const [selectedActionId, setSelectedActionId] = useState(fallbackData.cultivationActions[0].id);
  const [energyWeeks, setEnergyWeeks] = useState("50");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    let mounted = true;

    Promise.all([apiClient.cultivationActions(), apiClient.cultivationPlaces()])
      .then(([actions, places]) => {
        if (!mounted) {
          return;
        }

        setCultivationActions(actions);
        setCultivationPlaces(places);
        setSelectedActionId((current) =>
          actions.some((action) => action.id === current) ? current : actions[0]?.id ?? current
        );
        setSelectedPlaceId((current) =>
          places.some((place) => place.id === current) ? current : places[0]?.id ?? current
        );
      })
      .catch(() => {
        if (!mounted) {
          return;
        }

        setCultivationActions(fallbackData.cultivationActions);
        setCultivationPlaces(fallbackData.cultivationPlaces);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const selectedAction =
    cultivationActions.find((action) => action.id === selectedActionId) ?? cultivationActions[0];
  const selectedEnergy = Math.max(0, Number.parseInt(energyWeeks, 10) || 0);
  const safePlaces = useMemo(
    () => cultivationPlaces.filter((place) => place.type === "safe"),
    [cultivationPlaces]
  );
  const wildPlaces = useMemo(
    () => cultivationPlaces.filter((place) => place.type === "wild"),
    [cultivationPlaces]
  );

  async function startCultivation() {
    setIsSubmitting(true);
    setResultText("");

    try {
      const result = await apiClient.startCultivation(selectedActionId, selectedPlaceId, selectedEnergy);
      setResultText(`修炼完成，当前修为 ${result.character.cultivation} / ${result.character.cultivationRequired}`);
    } catch (error) {
      setResultText(error instanceof Error ? error.message : "修炼失败，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeading
        title="修炼"
        description="命元入道，稳步长生"
      />

      <section>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-base font-semibold text-ink-900">修行方向</h2>
              <span className="text-xs text-stone-500">选择方向，输入本次消耗命元周数</span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {cultivationActions.map((action) => {
                const selected = selectedActionId === action.id;

                return (
                  <button
                    key={action.id}
                    type="button"
                    className={cn(
                      "min-h-[138px] rounded-lg border bg-rice-50 px-3 py-3 text-left transition",
                      selected
                        ? "border-jade-600 bg-jade-50/70 shadow-[0_10px_28px_rgba(23,82,68,0.12)] ring-2 ring-jade-500/15"
                        : "border-stone-200 hover:border-jade-500 hover:bg-white"
                    )}
                    onClick={() => {
                      setSelectedActionId(action.id);
                      setResultText("");
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink-800 text-rice-50">
                        <CultivationIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {action.recommended ? <Badge tone="jade">推荐</Badge> : null}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-ink-900">{action.name}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-stone-600">
                      {action.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-jade-700">{action.baseYield}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3 border-t border-stone-200 pt-4 md:grid-cols-[minmax(180px,260px)_auto_minmax(0,1fr)] md:items-end">
              <label className="block">
                <span className="text-xs text-stone-500">修炼周数</span>
                <input
                  className="mt-1 h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm font-semibold text-ink-900 outline-none transition focus:border-jade-600 focus:ring-2 focus:ring-jade-500/15"
                  inputMode="numeric"
                  min={1}
                  type="number"
                  value={energyWeeks}
                  onChange={(event) => {
                    setEnergyWeeks(event.target.value);
                    setResultText("");
                  }}
                />
              </label>
              <Button
                icon={Flame}
                variant="primary"
                className="h-10 px-5"
                disabled={isSubmitting || selectedEnergy <= 0}
                onClick={startCultivation}
              >
                {isSubmitting ? "修炼中..." : "开始修炼"}
              </Button>
              <div className="text-xs leading-5 text-stone-500">
                {resultText || `当前选择：${selectedAction.name}，预计消耗命元 ${selectedEnergy} 周。`}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink-900">修炼场所</h2>
          <span className="text-xs text-stone-500">安全场所收益稳定，野外场所有风险</span>
        </div>
        <div className="space-y-4">
          {[
            { title: "安全修炼", places: safePlaces, icon: BodyIcon },
            { title: "野外修炼", places: wildPlaces, icon: MountainIcon }
          ].map((group) => (
            <div key={group.title} className="rounded-lg border border-stone-200 bg-white/72 p-3 shadow-panel">
              <div className="mb-3 flex items-center gap-2">
                <group.icon className="h-4 w-4 text-jade-700" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-ink-900">{group.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10">
                {group.places.map((place) => {
                  const selected = selectedPlaceId === place.id;
                  const details = [
                    { label: "修炼效率", value: place.multiplier },
                    {
                      label: "道心变化",
                      value: place.daoHeartChange ?? place.requirement ?? "收益稳定"
                    },
                    ...(place.cost ? [{ label: "解锁消耗", value: place.cost }] : []),
                    ...(place.risk ? [{ label: "风险", value: place.risk, tone: "danger" as const }] : [])
                  ];

                  return (
                    <PlaceCard
                      key={place.id}
                      name={place.name}
                      icon={place.type === "safe" ? BodyIcon : MountainIcon}
                      selected={selected}
                      unlocked={place.unlocked}
                      details={details}
                      onSelect={() => {
                        setSelectedPlaceId(place.id);
                        setResultText("");
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
