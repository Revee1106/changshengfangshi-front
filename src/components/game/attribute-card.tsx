import type { Attribute, IconComponent } from "@/types/game";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BodyIcon,
  DivineSenseIcon,
  ManaIcon,
  MovementIcon
} from "@/components/game/game-icons";

const attributeIcons = {
  法力: ManaIcon,
  神识: DivineSenseIcon,
  体魄: BodyIcon,
  遁法: MovementIcon
} satisfies Record<Attribute["key"], IconComponent>;

interface AttributeCardProps {
  attribute: Attribute;
}

export function AttributeCard({ attribute }: AttributeCardProps) {
  const Icon = attributeIcons[attribute.key];

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-jade-50 text-jade-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-stone-500">{attribute.key}</p>
              <p className="mt-1 text-2xl font-semibold text-ink-900">{attribute.value}</p>
            </div>
          </div>
          <Badge tone="jade">近期 {attribute.recentGain}</Badge>
        </div>
        <p className="mt-3 text-xs leading-5 text-stone-600">{attribute.description}</p>
      </CardBody>
    </Card>
  );
}
