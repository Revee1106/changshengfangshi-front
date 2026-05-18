import type { Attribute } from "@/types/game";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AttributeCardProps {
  attribute: Attribute;
}

export function AttributeCard({ attribute }: AttributeCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-stone-500">{attribute.key}</p>
            <p className="mt-1 text-2xl font-semibold text-ink-900">{attribute.value}</p>
          </div>
          <Badge tone="jade">近期 {attribute.recentGain}</Badge>
        </div>
        <p className="mt-3 text-xs leading-5 text-stone-600">{attribute.description}</p>
      </CardBody>
    </Card>
  );
}
