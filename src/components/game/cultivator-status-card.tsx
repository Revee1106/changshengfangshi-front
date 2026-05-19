"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardBody } from "@/components/ui/card";
import {
  CultivationIcon,
  DaoHeartIcon,
  EnergyIcon,
  InjuryIcon,
  LifespanIcon,
  MindIcon,
  SpiritStoneIcon
} from "@/components/game/game-icons";
import { HoverTooltip } from "@/components/game/hover-tooltip";
import { StatusProgressBar } from "@/components/game/status-progress-bar";
import type { CharacterProfile } from "@/types/game";

interface CultivatorStatusCardProps {
  character: CharacterProfile;
}

function formatCountdown(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function StatusLine({
  label,
  value,
  max,
  variant,
  tooltip,
  icon,
  footer
}: {
  label: string;
  value: number;
  max: number;
  variant: "cultivation" | "lifespan" | "energy";
  tooltip: React.ReactNode;
  icon: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
          {icon}
          <HoverTooltip label={label}>{tooltip}</HoverTooltip>
        </div>
        <div className="whitespace-nowrap text-sm font-semibold text-ink-900">
          {value} / {max}
        </div>
      </div>
      <StatusProgressBar value={value} max={max} variant={variant} />
      {footer ? <div className="text-right text-xs leading-4 text-stone-500">{footer}</div> : null}
    </div>
  );
}

export function CultivatorStatusCard({ character }: CultivatorStatusCardProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    character.energyRecoveryRemainingSeconds ?? 0
  );

  useEffect(() => {
    if (character.energy >= character.energyMax || remainingSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [character.energy, character.energyMax, remainingSeconds]);

  const isEnergyFull = character.energy >= character.energyMax;
  const energyRecoveryText = `下次恢复：${formatCountdown(remainingSeconds)} 后 +${character.energyRecoveryAmountWeeks ?? 4} 周`;
  const energyTooltip = useMemo(() => {
    if (character.energy >= character.energyMax) {
      return "命元已满。";
    }

    return (
      <>
        <span className="block">
          当前命元：{character.energy} / {character.energyMax}
        </span>
        <span className="block">{energyRecoveryText}</span>
      </>
    );
  }, [
    character.energy,
    character.energyMax,
    energyRecoveryText
  ]);
  const shouldShowInjury = character.injuryState !== "无伤";

  return (
    <Card className="h-full border-jade-700/25 bg-white text-ink-900">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-3xl font-semibold text-ink-900">{character.name}</h2>
          <div className="rounded-md bg-jade-50 px-3 py-1 text-sm font-medium text-jade-700">
            {character.realm}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600">
          <span className="group/dao relative inline-flex items-center">
            <DaoHeartIcon className="h-5 w-5 text-jade-700" />
            <span className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 hidden w-32 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs leading-5 text-stone-600 shadow-panel group-hover/dao:block">
              道心{character.daoHeartState}
            </span>
          </span>
          {shouldShowInjury ? (
            <span className="inline-flex items-center gap-2">
              <InjuryIcon className="h-5 w-5 text-cinnabar-700" />
              {character.injuryState}
            </span>
          ) : null}
        </div>

        <div className="mt-6 space-y-5">
          <StatusLine
            label="修为进度"
            value={character.cultivation}
            max={character.cultivationRequired}
            variant="cultivation"
            tooltip="当前境界内的修为积累进度。"
            icon={<CultivationIcon className="h-5 w-5 text-jade-700" />}
          />
          <StatusLine
            label="寿数"
            value={character.age}
            max={character.lifespanYearsMax}
            variant="lifespan"
            tooltip="剩余寿命，一世倒计时。"
            icon={<LifespanIcon className="h-5 w-5 text-amberInk-700" />}
          />
          <StatusLine
            label="命元"
            value={character.energy}
            max={character.energyMax}
            variant="energy"
            tooltip={energyTooltip}
            icon={<EnergyIcon className="h-5 w-5 text-jade-700" />}
            footer={!isEnergyFull ? energyRecoveryText : undefined}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-rice-100 px-4 py-3">
            <div className="inline-flex items-center gap-2 text-xs text-stone-500">
              <MindIcon className="h-5 w-5 text-jade-700" />
              心神
            </div>
            <div className="mt-1 text-2xl font-semibold text-jade-700">{character.mind}</div>
          </div>
          <div className="rounded-md bg-rice-100 px-4 py-3">
            <div className="inline-flex items-center gap-2 text-xs text-stone-500">
              <SpiritStoneIcon className="h-5 w-5 text-amberInk-700" />
              灵石
            </div>
            <div className="mt-1 text-2xl font-semibold text-amberInk-700">
              {character.spiritStones}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
