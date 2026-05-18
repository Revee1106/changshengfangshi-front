import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import type { Tone } from "@/types/game";

interface ActionCardProps {
  title: string;
  description: string;
  cost: string;
  reward: string;
  icon: LucideIcon;
  tone?: Tone;
  disabled?: boolean;
  risk?: string;
}

export function ActionCard({
  title,
  description,
  cost,
  reward,
  icon: Icon,
  tone = "jade",
  disabled = false,
  risk
}: ActionCardProps) {
  return (
    <Card className={disabled ? "opacity-65" : undefined}>
      <CardBody>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-jade-700 text-white">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
              {risk ? <Badge tone="cinnabar">{risk}</Badge> : null}
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600">{description}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-rice-100 px-3 py-2">
            <p className="text-stone-500">消耗</p>
            <p className="mt-1 font-semibold text-ink-900">{cost}</p>
          </div>
          <div className="rounded-md bg-jade-50 px-3 py-2">
            <p className="text-stone-500">预计收益</p>
            <p className="mt-1 font-semibold text-jade-700">{reward}</p>
          </div>
        </div>

        <Button
          className="mt-4 w-full"
          icon={ArrowRight}
          variant={tone === "cinnabar" ? "danger" : "primary"}
          disabled={disabled}
        >
          {disabled ? "条件不足" : "选择行动"}
        </Button>
      </CardBody>
    </Card>
  );
}
