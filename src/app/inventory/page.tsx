"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FlaskConical,
  RockingChair
} from "lucide-react";

import { PageHeading } from "@/components/game/page-heading";
import {
  BodyIcon,
  GemIcon,
  LotusIcon,
  ManaIcon,
  PackageIcon
} from "@/components/game/game-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { apiClient, fallbackData } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { IconComponent, InventoryItem, InventoryItemType } from "@/types/game";

const itemTypes = ["全部", "丹药", "灵草", "灵矿", "工具", "杂物"] as const;
type ItemFilter = (typeof itemTypes)[number];

const typeIcons: Record<string, IconComponent> = {
  丹药: ManaIcon,
  灵草: LotusIcon,
  灵矿: GemIcon,
  工具: BodyIcon,
  杂物: PackageIcon,
  // 兼容旧 mock 文案
  "涓硅嵂": ManaIcon,
  "鐏佃崏": LotusIcon,
  "鐏电熆": GemIcon,
  "宸ュ叿": BodyIcon,
  "鏉傜墿": PackageIcon
};

const typeTone: Record<string, "jade" | "amber" | "muted" | "ink"> = {
  丹药: "amber",
  灵草: "jade",
  灵矿: "ink",
  工具: "muted",
  杂物: "muted",
  "涓硅嵂": "amber",
  "鐏佃崏": "jade",
  "鐏电熆": "ink",
  "宸ュ叿": "muted",
  "鏉傜墿": "muted"
};

export default function InventoryPage() {
  const [activeType, setActiveType] = useState<ItemFilter>("全部");
  const [items, setItems] = useState<InventoryItem[]>(fallbackData.inventoryItems);
  const [resultText, setResultText] = useState("");
  const [pendingItemId, setPendingItemId] = useState("");

  async function loadItems() {
    try {
      const nextItems = await apiClient.inventoryItems();
      setItems(nextItems);
    } catch {
      setItems(fallbackData.inventoryItems);
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeType === "全部") {
      return items;
    }

    return items.filter((item) => item.type === activeType);
  }, [activeType, items]);

  async function handleUseItem(item: InventoryItem) {
    setPendingItemId(item.id);
    setResultText("");

    try {
      await apiClient.useItem(item.id);
      setResultText(`已使用 ${item.name}`);
      await loadItems();
    } catch (error) {
      setResultText(error instanceof Error ? error.message : "使用失败，请稍后再试");
    } finally {
      setPendingItemId("");
    }
  }

  async function sellItem(item: InventoryItem) {
    setPendingItemId(item.id);
    setResultText("");

    try {
      await apiClient.sellItem(item.id);
      setResultText(`已出售 ${item.name}`);
      await loadItems();
    } catch (error) {
      setResultText(error instanceof Error ? error.message : "出售失败，请稍后再试");
    } finally {
      setPendingItemId("");
    }
  }

  return (
    <>
      <PageHeading title="行囊" description="灵材入囊，丹器有序" />

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
            {resultText ? (
              <div className="mt-3 rounded-md border border-jade-700/20 bg-jade-50 px-3 py-2 text-sm text-jade-800">
                {resultText}
              </div>
            ) : null}
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
            const Icon = typeIcons[item.type] ?? PackageIcon;
            const pending = pendingItemId === item.id;

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
                            <Badge tone={typeTone[item.type] ?? "muted"}>{item.type}</Badge>
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
                        <Button
                          icon={FlaskConical}
                          variant="primary"
                          disabled={!item.usable || pending}
                          onClick={() => handleUseItem(item)}
                        >
                          {pending ? "处理中" : "使用"}
                        </Button>
                        <Button
                          icon={RockingChair}
                          disabled={!item.sellable || pending}
                          onClick={() => sellItem(item)}
                        >
                          {pending ? "处理中" : "出售"}
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
