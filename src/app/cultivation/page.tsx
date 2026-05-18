"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Flame, Mountain, ShieldCheck } from "lucide-react";

import { PageHeading } from "@/components/game/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  character,
  cultivationActions,
  cultivationPlaces
} from "@/data/mock-player";

const energyOptions = [10, 50, 100];

export default function CultivationPage() {
  const [selectedPlaceId, setSelectedPlaceId] = useState(cultivationPlaces[0].id);
  const [selectedActionId, setSelectedActionId] = useState(cultivationActions[0].id);
  const [selectedEnergy, setSelectedEnergy] = useState(50);

  const selectedPlace = cultivationPlaces.find((place) => place.id === selectedPlaceId) ?? cultivationPlaces[0];
  const selectedAction =
    cultivationActions.find((action) => action.id === selectedActionId) ?? cultivationActions[0];

  const estimate = useMemo(() => {
    const isFocus = selectedAction.id === "focus";
    const isWild = selectedPlace.type === "wild";
    const cultivationGain = isFocus
      ? selectedEnergy
      : Math.round(selectedEnergy * (selectedAction.id === "mana" ? 0.45 : 0.38));
    const mindGain = isFocus ? selectedEnergy * 5 : Math.round(selectedEnergy * 2.5);

    return {
      cultivation: isWild
        ? `${Math.round(cultivationGain * 0.8)} - ${Math.round(cultivationGain * 1.2)}`
        : String(cultivationGain),
      mind: isWild ? `${Math.round(mindGain * 0.8)} - ${Math.round(mindGain * 1.2)}` : String(mindGain),
      daoHeart: selectedPlace.daoHeartChange ?? "无明显变化",
      risk: selectedPlace.risk ?? "无伤势风险"
    };
  }, [selectedAction.id, selectedEnergy, selectedPlace]);

  const cultivationProgress = Math.round(
    (character.cultivation / character.cultivationRequired) * 100
  );

  return (
    <>
      <PageHeading
        eyebrow="修炼"
        title="命元入道，稳步长生"
        description="选择修炼场所、修炼行为和消耗命元数量，查看本次收益预估。第一阶段仅展示 UI 与本地预估。"
        badge="mock data"
      />

      <section className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">当前修炼状态</h2>
          </CardHeader>
          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["当前境界", character.realm],
                ["当前命元", `${character.energy} / ${character.energyMax} 周`],
                ["当前道心", `${character.daoHeartState} ${character.daoHeart}`],
                ["当前伤势", character.injuryState],
                ["当前心神", String(character.mind)],
                ["命元恢复", character.energyRecovery]
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-rice-100 px-3 py-2">
                  <p className="text-xs text-stone-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink-900">{value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">境界进度</h2>
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex justify-between text-sm">
              <span>{character.realm}</span>
              <span>
                {character.cultivation} / {character.cultivationRequired}
              </span>
            </div>
            <Progress value={cultivationProgress} />
            <p className="mt-3 text-sm text-stone-600">目标：{character.nextRealm}</p>
          </CardBody>
        </Card>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink-900">修炼场所</h2>
          <span className="text-xs text-stone-500">安全场所收益稳定，野外场所有风险</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {cultivationPlaces.map((place) => {
            const selected = selectedPlaceId === place.id;
            const Icon = place.type === "safe" ? ShieldCheck : Mountain;

            return (
              <button
                key={place.id}
                type="button"
                className={cn(
                  "min-h-[210px] rounded-lg border bg-white/78 p-4 text-left shadow-panel transition",
                  selected ? "border-jade-600 ring-2 ring-jade-500/20" : "border-stone-200 hover:border-jade-500",
                  !place.unlocked && "opacity-65"
                )}
                onClick={() => place.unlocked && setSelectedPlaceId(place.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-800 text-rice-50">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Badge tone={place.type === "wild" ? "cinnabar" : place.unlocked ? "jade" : "muted"}>
                    {place.type === "wild" ? "野外修炼" : place.unlocked ? "安全修炼" : "未解锁"}
                  </Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{place.name}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{place.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md bg-rice-100 px-3 py-2">
                    <p className="text-stone-500">收益倍率</p>
                    <p className="mt-1 font-semibold text-ink-900">{place.multiplier}</p>
                  </div>
                  <div className="rounded-md bg-rice-100 px-3 py-2">
                    <p className="text-stone-500">道心影响</p>
                    <p className="mt-1 font-semibold text-ink-900">{place.daoHeartChange ?? "待解锁"}</p>
                  </div>
                </div>
                {place.risk ? <p className="mt-3 text-xs font-medium text-cinnabar-700">{place.risk}</p> : null}
                {place.requirement ? <p className="mt-3 text-xs text-stone-500">{place.requirement}</p> : null}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">修炼行为选择</h2>
          </CardHeader>
          <CardBody>
            <div className="grid gap-3 md:grid-cols-2">
              {cultivationActions.map((action) => {
                const selected = selectedActionId === action.id;

                return (
                  <button
                    key={action.id}
                    type="button"
                    className={cn(
                      "rounded-lg border bg-white/70 p-4 text-left transition",
                      selected ? "border-jade-600 ring-2 ring-jade-500/20" : "border-stone-200 hover:border-jade-500"
                    )}
                    onClick={() => setSelectedActionId(action.id)}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-ink-900">{action.name}</h3>
                      {action.recommended ? <Badge tone="jade">推荐</Badge> : null}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-stone-600">{action.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge tone="muted">{action.baseYield}</Badge>
                      <Badge tone="amber">{action.sideYield}</Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold text-ink-900">消耗命元数量</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-3 gap-2">
                {energyOptions.map((option) => (
                  <Button
                    key={option}
                    variant={selectedEnergy === option ? "primary" : "secondary"}
                    onClick={() => setSelectedEnergy(option)}
                  >
                    {option} 周
                  </Button>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-stone-500">
                当前命元 {character.energy} 周，超过可用命元的选项后续接入接口时应禁用。
              </p>
            </CardBody>
          </Card>

          <Card className={selectedPlace.type === "wild" ? "border-cinnabar-500/40" : undefined}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-ink-900">结果预估</h2>
                {selectedPlace.type === "wild" ? (
                  <Badge tone="cinnabar">风险行为</Badge>
                ) : (
                  <Badge tone="jade">稳定收益</Badge>
                )}
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">修炼场所</span>
                  <span className="font-semibold text-ink-900">{selectedPlace.name}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">修炼行为</span>
                  <span className="font-semibold text-ink-900">{selectedAction.name}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">预计消耗</span>
                  <span className="font-semibold text-cinnabar-700">命元 -{selectedEnergy} 周</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">预计修为</span>
                  <span className="font-semibold text-jade-700">+{estimate.cultivation}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">预计心神</span>
                  <span className="font-semibold text-jade-700">+{estimate.mind}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">道心影响</span>
                  <span className="font-semibold text-ink-900">{estimate.daoHeart}</span>
                </div>
              </div>

              <div
                className={cn(
                  "mt-4 flex gap-3 rounded-lg border p-3 text-sm",
                  selectedPlace.type === "wild"
                    ? "border-cinnabar-500/25 bg-cinnabar-100/45 text-cinnabar-700"
                    : "border-jade-500/25 bg-jade-50 text-jade-700"
                )}
              >
                {selectedPlace.type === "wild" ? (
                  <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                )}
                <span>{estimate.risk}</span>
              </div>

              <Button className="mt-4 w-full" icon={Flame} variant="primary">
                开始修炼
              </Button>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}
