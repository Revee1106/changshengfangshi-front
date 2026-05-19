"use client";

import { useState } from "react";
import { FlaskConical, Hammer, Leaf, MapPinned, ScrollText } from "lucide-react";

import { PageHeading } from "@/components/game/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { gatheringPlaces, mindPracticeDirections } from "@/data/mock-player";
import { cn } from "@/lib/utils";

const directionIcons = {
  gathering: Leaf,
  alchemy: FlaskConical,
  crafting: Hammer,
  talisman: ScrollText
};

export default function MindPage() {
  const [selectedDirectionId, setSelectedDirectionId] = useState("gathering");
  const [selectedPlaceId, setSelectedPlaceId] = useState(gatheringPlaces[0].id);
  const showGathering = selectedDirectionId === "gathering";

  return (
    <>
      <PageHeading title="心神" description="心神外用，采物炼艺" />

      <section>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-base font-semibold text-ink-900">辅修方向</h2>
              <span className="text-xs text-stone-500">首版开放采集，其余方向预留入口</span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mindPracticeDirections.map((direction) => {
                const selected = selectedDirectionId === direction.id;
                const Icon = directionIcons[direction.id];

                return (
                  <button
                    key={direction.id}
                    type="button"
                    className={cn(
                      "min-h-[132px] rounded-lg border bg-rice-50 px-3 py-3 text-left transition",
                      selected
                        ? "border-jade-600 bg-jade-50/70 shadow-[0_10px_28px_rgba(23,82,68,0.12)] ring-2 ring-jade-500/15"
                        : "border-stone-200 hover:border-jade-500 hover:bg-white",
                      !direction.unlocked && "cursor-not-allowed opacity-60"
                    )}
                    onClick={() => direction.unlocked && setSelectedDirectionId(direction.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink-800 text-rice-50">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {direction.unlocked ? <Badge tone="jade">已开放</Badge> : null}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-ink-900">{direction.name}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-stone-600">
                      {direction.description}
                    </p>
                    {direction.requirement ? (
                      <p className="mt-2 line-clamp-1 text-xs text-stone-500">{direction.requirement}</p>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </section>

      {showGathering ? (
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink-900">采集地点</h2>
            <span className="text-xs text-stone-500">消耗心神，获取材料与杂物</span>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white/72 p-3 shadow-panel">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {gatheringPlaces.map((place) => {
                const selected = selectedPlaceId === place.id;

                return (
                  <button
                    key={place.id}
                    type="button"
                    className={cn(
                      "aspect-square rounded-lg border bg-rice-50 p-3 text-center transition",
                      selected
                        ? "sm:col-span-2 border-jade-600 bg-white shadow-[0_14px_32px_rgba(23,82,68,0.12)] ring-2 ring-jade-500/15"
                        : "border-stone-200 hover:border-jade-500 hover:bg-white",
                      !place.unlocked && "cursor-not-allowed opacity-60"
                    )}
                    onClick={() => place.unlocked && setSelectedPlaceId(place.id)}
                  >
                    <div className="flex h-full flex-col items-center justify-center">
                      <span
                        className={cn(
                          "flex items-center justify-center rounded-md bg-ink-800 text-rice-50 transition",
                          selected ? "h-12 w-12" : "h-10 w-10"
                        )}
                      >
                        <MapPinned className={selected ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-ink-900">{place.name}</h3>
                      {selected ? (
                        <div className="mt-2 space-y-1 text-xs leading-4 text-stone-600">
                          <p>
                            <span className="text-stone-500">心神消耗：</span>
                            <span className="font-medium text-ink-900">{place.mindCost}</span>
                          </p>
                          <p>
                            <span className="text-stone-500">主要产物：</span>
                            <span className="font-medium text-ink-900">{place.mainYield}</span>
                          </p>
                          {place.rareYield ? (
                            <p>
                              <span className="text-stone-500">稀有产物：</span>
                              <span className="font-medium text-ink-900">{place.rareYield}</span>
                            </p>
                          ) : null}
                          {place.risk ? (
                            <p className="font-medium text-cinnabar-700">{place.risk}</p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
