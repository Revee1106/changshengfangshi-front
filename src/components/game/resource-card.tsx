import type { ResourceSummary } from "@/types/game";
import { Card, CardBody } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const toneToProgress = {
  jade: "jade",
  ink: "ink",
  amber: "amber",
  cinnabar: "cinnabar",
  muted: "ink"
} as const;

interface ResourceCardProps {
  resource: ResourceSummary;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-stone-500">{resource.key}</p>
            <p className="mt-1 truncate text-xl font-semibold text-ink-900">{resource.value}</p>
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
