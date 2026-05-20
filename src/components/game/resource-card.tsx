import type { IconComponent, ResourceKey, ResourceSummary } from "@/types/game";
import { Card, CardBody } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BodyIcon,
  CultivationIcon,
  DaoHeartIcon,
  DivineSenseIcon,
  EnergyIcon,
  LifespanIcon,
  ManaIcon,
  MindIcon,
  MovementIcon,
  SpiritStoneIcon
} from "@/components/game/game-icons";
import { cn } from "@/lib/utils";

const toneToProgress = {
  jade: "jade",
  ink: "ink",
  amber: "amber",
  cinnabar: "cinnabar",
  muted: "ink"
} as const;

const resourceIcons = {
  寿数: LifespanIcon,
  命元: EnergyIcon,
  心神: MindIcon,
  道心: DaoHeartIcon,
  修为: CultivationIcon,
  法力: ManaIcon,
  神识: DivineSenseIcon,
  体魄: BodyIcon,
  遁法: MovementIcon,
  灵石: SpiritStoneIcon
} satisfies Record<ResourceKey, IconComponent>;

const toneToIcon = {
  jade: "bg-jade-50 text-jade-700",
  ink: "bg-ink-800/5 text-ink-800",
  amber: "bg-amberInk-100/70 text-amberInk-700",
  cinnabar: "bg-cinnabar-100/70 text-cinnabar-700",
  muted: "bg-rice-100 text-stone-600"
} as const;

interface ResourceCardProps {
  resource: ResourceSummary;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = resourceIcons[resource.key];

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                toneToIcon[resource.tone]
              )}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-stone-500">{resource.key}</p>
              <p className="mt-1 truncate text-xl font-semibold text-ink-900">{resource.value}</p>
            </div>
          </div>
          {resource.progress !== undefined ? (
            <span className="rounded-md bg-ink-800/5 px-2 py-1 text-xs text-stone-600">
              {resource.progress}%
            </span>
          ) : null}
        </div>
        <p className="mt-3 min-h-5 text-xs text-stone-500">{resource.detail}</p>
        {resource.progress !== undefined ? (
          <Progress value={resource.progress} tone={toneToProgress[resource.tone]} className="mt-3" />
        ) : null}
      </CardBody>
    </Card>
  );
}
