"use client";

import { useEffect, useMemo, useState } from "react";

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

interface SidebarStatusSummaryProps {
  character: CharacterProfile;
}

function formatCountdown(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function SummaryProgress({
  label,
  value,
  max,
  variant,
  icon,
  tooltip,
  footer
}: {
  label: string;
  value: number;
  max: number;
  variant: "cultivation" | "lifespan" | "energy";
  icon: React.ReactNode;
  tooltip: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 text-[11px] text-ink-800">
        <div className="inline-flex min-w-0 items-center gap-1.5 font-medium">
          {icon}
          <HoverTooltip label={label}>{tooltip}</HoverTooltip>
        </div>
        <span className="whitespace-nowrap font-semibold text-ink-900">
          {value} / {max}
        </span>
      </div>
      <StatusProgressBar value={value} max={max} variant={variant} className="h-1.5" />
      {footer ? <div className="mt-1 text-right text-[10px] leading-3 text-stone-500">{footer}</div> : null}
    </div>
  );
}

export function SidebarStatusSummary({ character }: SidebarStatusSummaryProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    character.energyRecoveryRemainingSeconds ?? 0
  );
  const isEnergyFull = character.energy >= character.energyMax;
  const energyRecoveryText = `下次恢复：${formatCountdown(remainingSeconds)} 后 +${character.energyRecoveryAmountWeeks ?? 4} 周`;

  useEffect(() => {
    if (isEnergyFull || remainingSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isEnergyFull, remainingSeconds]);

  const energyTooltip = useMemo(() => {
    if (isEnergyFull) {
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
  }, [character.energy, character.energyMax, energyRecoveryText, isEnergyFull]);
  const shouldShowInjury = character.injuryState !== "无伤";

  return (
    <section className="mb-4 rounded-lg border border-jade-700/15 bg-white/72 p-3 shadow-[0_12px_30px_rgba(21,42,40,0.06)]">
      <div className="mb-2 flex items-end justify-between gap-2">
        <div className="min-w-0 truncate text-base font-semibold leading-6 text-ink-900">
          {character.name}
        </div>
        <div className="shrink-0 rounded-md bg-jade-50 px-2 py-0.5 text-[11px] font-medium leading-5 text-jade-700">
          {character.realm}
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <span className="group/dao relative inline-flex h-6 w-6 items-center justify-center rounded-md bg-jade-50">
          <DaoHeartIcon className="h-4 w-4 text-jade-700" />
          <span className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 hidden w-32 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs leading-5 text-stone-600 shadow-panel group-hover/dao:block">
            道心{character.daoHeartState}
          </span>
        </span>
        {shouldShowInjury ? (
          <span className="group/injury relative inline-flex h-6 w-6 items-center justify-center rounded-md bg-cinnabar-100/60">
            <InjuryIcon className="h-4 w-4 text-cinnabar-700" />
            <span className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 hidden w-32 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs leading-5 text-stone-600 shadow-panel group-hover/injury:block">
              {character.injuryState}
            </span>
          </span>
        ) : null}
      </div>

      <div className="space-y-2.5">
        <SummaryProgress
          label="修为"
          value={character.cultivation}
          max={character.cultivationRequired}
          variant="cultivation"
          icon={<CultivationIcon className="h-3.5 w-3.5 text-jade-700" />}
          tooltip="当前境界内的修为积累进度。"
        />
        <SummaryProgress
          label="寿数"
          value={character.age}
          max={character.lifespanYearsMax}
          variant="lifespan"
          icon={<LifespanIcon className="h-3.5 w-3.5 text-amberInk-700" />}
          tooltip="剩余寿命，一世倒计时。"
        />
        <SummaryProgress
          label="命元"
          value={character.energy}
          max={character.energyMax}
          variant="energy"
          icon={<EnergyIcon className="h-3.5 w-3.5 text-jade-700" />}
          tooltip={energyTooltip}
          footer={!isEnergyFull ? energyRecoveryText : undefined}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-md bg-rice-100 px-2 py-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-stone-500">
            <MindIcon className="h-3.5 w-3.5 text-jade-700" />
            心神
          </div>
          <div className="text-sm font-semibold text-jade-700">{character.mind}</div>
        </div>
        <div className="rounded-md bg-rice-100 px-2 py-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-stone-500">
            <SpiritStoneIcon className="h-3.5 w-3.5 text-amberInk-700" />
            灵石
          </div>
          <div className="text-sm font-semibold text-amberInk-700">{character.spiritStones}</div>
        </div>
      </div>
    </section>
  );
}
