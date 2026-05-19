"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Pill, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BreakthroughPill {
  id: string;
  name: string;
  quantity: number;
  successBonus: number;
  description: string;
}

const baseSuccessRate = 68;
const daoHeartBonus = 3;

const availablePills: BreakthroughPill[] = [
  {
    id: "condensed-origin-pill",
    name: "凝元丹",
    quantity: 1,
    successBonus: 10,
    description: "温养经脉，辅助练气期小境界突破。"
  },
  {
    id: "clear-heart-pill",
    name: "清心丹",
    quantity: 2,
    successBonus: 6,
    description: "稳住心神，降低突破时气息紊乱的概率。"
  }
];

interface BreakthroughRiskCardProps {
  canBreakthrough: boolean;
}

export function BreakthroughRiskCard({ canBreakthrough }: BreakthroughRiskCardProps) {
  const [selectedPillId, setSelectedPillId] = useState<string | null>(null);
  const [isBreakingThrough, setIsBreakingThrough] = useState(false);

  const selectedPill = availablePills.find((pill) => pill.id === selectedPillId);
  const pillBonus = selectedPill?.successBonus ?? 0;
  const expectedSuccessRate = useMemo(
    () => baseSuccessRate + pillBonus + daoHeartBonus,
    [pillBonus]
  );

  function togglePill(pillId: string) {
    setSelectedPillId((currentId) => (currentId === pillId ? null : pillId));
  }

  function startBreakthrough() {
    setIsBreakingThrough(true);
    window.setTimeout(() => setIsBreakingThrough(false), 900);
  }

  return (
    <Card className="border-cinnabar-700/20 bg-white">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-cinnabar-700" aria-hidden="true" />
          <h2 className="text-base font-semibold text-ink-900">突破风险</h2>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm leading-6 text-stone-600">
          突破并非必定成功。本次突破将根据基础成功率、丹药修正、道心修正与随机值修正进行结算。
        </p>

        <div className="mt-5 rounded-lg border border-stone-200 bg-rice-50/80 p-3">
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <RateRow label="基础成功率" value={`${baseSuccessRate}%`} />
            <RateRow label="丹药修正" value={`+${pillBonus}%`} />
            <RateRow label="道心修正" value={`+${daoHeartBonus}%`} />
            <RateRow label="随机值修正" value="突破时结算" muted />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200 pt-3">
            <span className="text-sm font-medium text-ink-900">预计成功率</span>
            <Badge tone="jade" className="text-sm">
              {expectedSuccessRate}%
            </Badge>
          </div>
        </div>

        <section className="mt-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-ink-900">突破丹药</h3>
              <p className="mt-1 text-xs leading-5 text-stone-500">
                可选择一枚辅助突破丹药，提高本次突破成功率。第一版每次突破最多使用一枚突破丹药。
              </p>
            </div>
          </div>

          {availablePills.length > 0 ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {availablePills.map((pill) => {
                const selected = selectedPillId === pill.id;

                return (
                  <button
                    key={pill.id}
                    type="button"
                    className={cn(
                      "min-w-0 rounded-lg border bg-rice-50 p-3 text-left transition",
                      selected
                        ? "border-jade-600 bg-white shadow-[0_10px_28px_rgba(23,82,68,0.12)] ring-2 ring-jade-500/15"
                        : "border-stone-200 hover:border-jade-500 hover:bg-white"
                    )}
                    onClick={() => togglePill(pill.id)}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ink-800 text-rice-50">
                        <Pill className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h4 className="break-words text-sm font-semibold text-ink-900">{pill.name}</h4>
                          <Badge tone={selected ? "jade" : "muted"}>
                            {selected ? "已选择" : "选择"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-stone-500">
                          <span>持有 {pill.quantity}</span>
                          <span className="font-semibold text-jade-700">成功率 +{pill.successBonus}%</span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-stone-600">{pill.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-3 rounded-lg border border-stone-200 bg-rice-50 px-3 py-4">
              <p className="text-sm font-semibold text-ink-900">暂无可用突破丹药</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">
                可通过炼丹或坊市获取辅助突破丹药。
              </p>
            </div>
          )}
        </section>

        <div className="mt-5 border-t border-stone-200 pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-stone-500">
              {selectedPill
                ? `已选择 ${selectedPill.name}，本次突破预计成功率 ${expectedSuccessRate}%。`
                : "未选择突破丹药，将以当前成功率直接尝试突破。"}
            </p>
            <Button
              icon={Sparkles}
              variant="primary"
              disabled={!canBreakthrough || isBreakingThrough}
              onClick={startBreakthrough}
              className="shrink-0"
            >
              {isBreakingThrough ? "突破中..." : "开始突破"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function RateRow({
  label,
  value,
  muted
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-md bg-white/72 px-3 py-2">
      <span className="text-stone-500">{label}</span>
      <span className={cn("text-right font-semibold text-ink-900", muted && "text-stone-500")}>
        {value}
      </span>
    </div>
  );
}
