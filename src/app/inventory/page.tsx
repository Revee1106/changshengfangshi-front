"use client";

import { useMemo, useState } from "react";
import {
  FlaskConical,
  Hammer,
  Leaf,
  PackageOpen,
  Pill,
  RockingChair,
  Sparkles
} from "lucide-react";

import { PageHeading } from "@/components/game/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { inventoryItems } from "@/data/mock-player";
import { cn } from "@/lib/utils";
import type { InventoryItemType } from "@/types/game";

const itemTypes = ["全部", "丹药", "灵草", "灵矿", "工具", "杂物"] as const;
type ItemFilter = (typeof itemTypes)[number];

const typeIcons: Record<InventoryItemType, typeof Pill> = {
  丹药: Pill,
  灵草: Leaf,
  灵矿: Sparkles,
  工具: Hammer,
  杂物: PackageOpen
};

const typeTone: Record<InventoryItemType, "jade" | "amber" | "muted" | "ink"> = {
  丹药: "amber",
  灵草: "jade",
  灵矿: "ink",
  工具: "muted",
  杂物: "muted"
};

export default function InventoryPage() {
  const [activeType, setActiveType] = useState<ItemFilter>("全部");
  const filteredItems = useMemo(() => {
    if (activeType === "全部") {
      return inventoryItems;
    }

    return inventoryItems.filter((item) => item.type === activeType);
  }, [activeType]);

  return (
    <>
      <PageHeading title="行囊" description="灵材入袋，丹器有序" />

      <section>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-base font-semibold text-ink-900">行囊分类</h2>
              <span className="text-xs text-stone-500">通过标签筛选行囊中的不同物品</span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {itemTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm transition",
                    activeType === type
                      ? "border-jade-600 bg-jade-700 text-white shadow-sm"
                      : "border-stone-200 bg-rice-50 text-stone-600 hover:border-jade-500 hover:bg-white hover:text-ink-900"
                  )}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink-900">行囊物品</h2>
          <span className="text-xs text-stone-500">当前显示 {filteredItems.length} 件</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const Icon = typeIcons[item.type];

            return (
              <Card key={item.id} className="border-stone-200 bg-white/78">
                <CardBody>
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ink-800 text-rice-50">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-ink-900">{item.name}</h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <Badge tone={typeTone[item.type]}>{item.type}</Badge>
                            <Badge tone="muted">{item.grade}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-stone-500">数量</div>
                          <div className="text-lg font-semibold text-ink-900">{item.quantity}</div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button icon={FlaskConical} variant="primary" disabled={!item.usable}>
                          使用
                        </Button>
                        <Button icon={RockingChair} disabled={!item.sellable}>
                          出售
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
