import { PageHeading } from "@/components/game/page-heading";
import { LogList } from "@/components/game/log-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { attributes, character, recentLogs } from "@/data/mock-player";
import { cn } from "@/lib/utils";

interface ResourceMeterProps {
  label: string;
  value: string;
  detail: string;
  progress: number;
  tone: "life" | "energy";
  aside?: string;
}

function ResourceMeter({ label, value, detail, progress, tone, aside }: ResourceMeterProps) {
  const fillClass = tone === "life" ? "bg-amberInk-500" : "bg-jade-600";
  const glowClass = tone === "life" ? "shadow-[0_0_0_1px_rgba(184,137,45,0.3)]" : "shadow-[0_0_0_1px_rgba(40,125,102,0.3)]";

  return (
    <details className="group relative rounded-md border border-stone-200 bg-rice-50 px-3 py-2">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-2">
          <span className="text-sm font-semibold text-ink-800">{label}:</span>
          <span className="min-w-0 truncate text-sm font-semibold text-ink-900">{value}</span>
          {aside ? <span className="text-sm text-stone-400">{aside}</span> : null}
        </div>
        <div className="mt-1.5 rounded-full border border-stone-300 bg-white p-[2px]">
          <span className="relative block h-2 overflow-hidden rounded-full bg-stone-100">
            <span className="absolute inset-0 bg-[repeating-linear-gradient(to_right,transparent_0,transparent_19px,rgba(21,42,40,0.16)_20px)]" />
            <span
              className={cn("relative block h-full rounded-r-none rounded-l-full", fillClass, glowClass)}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </span>
        </div>
      </summary>
      <div className="absolute left-0 top-[calc(100%+8px)] z-20 hidden w-64 rounded-lg border border-stone-200 bg-white p-3 text-xs leading-5 text-stone-600 shadow-panel group-open:block md:group-hover:block">
        {detail}
      </div>
    </details>
  );
}

interface PlainResourceProps {
  label: string;
  value: string;
  detail: string;
  tone: "jade" | "amber";
}

function PlainResource({ label, value, detail, tone }: PlainResourceProps) {
  return (
    <details className="group relative rounded-md border border-stone-200 bg-rice-50 px-3 py-2">
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-semibold text-ink-800">{label}:</span>
        <span className={cn("text-sm font-semibold", tone === "jade" ? "text-jade-700" : "text-amberInk-700")}>
          {value}
        </span>
      </summary>
      <div className="absolute left-0 top-[calc(100%+8px)] z-20 hidden w-64 rounded-lg border border-stone-200 bg-white p-3 text-xs leading-5 text-stone-600 shadow-panel group-open:block md:group-hover:block">
        {detail}
      </div>
    </details>
  );
}

function AttributePanel() {
  return (
    <div className="h-full rounded-md border border-jade-700/20 bg-jade-50/45 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-ink-900">四维概览</h3>
        <span className="text-xs text-stone-500">当前基础</span>
      </div>
      <div className="grid h-[calc(100%-32px)] grid-cols-2 gap-3">
        {attributes.map((attribute) => (
          <details key={attribute.key} className="group relative min-w-0">
            <summary className="flex h-full cursor-pointer list-none flex-col justify-center rounded-md border border-stone-200 bg-white px-3 py-2 [&::-webkit-details-marker]:hidden">
              <span className="text-xs text-stone-500">{attribute.key}</span>
              <span className="mt-1 text-xl font-semibold text-ink-900">{attribute.value}</span>
            </summary>
            <div className="absolute left-0 top-[calc(100%+8px)] z-20 hidden w-64 rounded-lg border border-stone-200 bg-white p-3 text-xs leading-5 text-stone-600 shadow-panel group-open:block md:group-hover:block">
              {attribute.description}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const cultivationProgress = Math.round(
    (character.cultivation / character.cultivationRequired) * 100
  );
  const lifespanRemainingProgress = Math.round(
    ((character.lifespanYearsMax - character.age) / character.lifespanYearsMax) * 100
  );
  const energyProgress = Math.round((character.energy / character.energyMax) * 100);

  return (
    <>
      <PageHeading
        eyebrow="玩家前台"
        title="总览"
        description="查看当前修士状态、核心资源和最近发生的修行记录。"
      />

      <Card className="border-jade-700/25 bg-white text-ink-900">
        <CardBody>
          <div className="grid gap-5 xl:min-h-[320px] xl:grid-cols-[minmax(340px,0.85fr)_minmax(300px,0.75fr)_minmax(380px,1fr)]">
            <div className="min-w-0">
              <p className="text-sm font-medium text-jade-700">修士状态</p>
              <h2 className="mt-2 text-3xl font-semibold text-ink-900">{character.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="jade">{character.realm}</Badge>
                <Badge tone="ink">道心 {character.daoHeartState}</Badge>
                <Badge tone="muted">{character.injuryState}</Badge>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <ResourceMeter
                  label="寿数"
                  value={`${character.age}/${character.lifespanYearsMax}`}
                  progress={lifespanRemainingProgress}
                  tone="life"
                  detail="当前年龄 / 寿数上限，条形表示剩余寿数。"
                />
                <ResourceMeter
                  label="命元"
                  value={`${character.energy}/${character.energyMax}`}
                  progress={energyProgress}
                  tone="energy"
                  aside={
                    character.energy < character.energyMax
                      ? `下次恢复 ${character.energyNextRecoveryIn}`
                      : undefined
                  }
                  detail={`命元最大积攒到 ${character.energyMax}，${character.energyRecovery}。`}
                />
                <PlainResource
                  label="心神"
                  value={String(character.mind)}
                  tone="jade"
                  detail="心神用于采集、炼丹、炼器等事务行为。"
                />
                <PlainResource
                  label="灵石"
                  value={String(character.spiritStones)}
                  tone="amber"
                  detail="灵石用于坊市交易、解锁场所和购买消耗品。"
                />
              </div>
            </div>

            <div className="flex min-h-[148px] items-start">
              <div className="mt-0 w-full rounded-md border border-stone-200 bg-rice-50 px-4 py-4">
                <div className="mb-2 flex justify-between text-sm text-ink-800">
                  <span className="font-semibold">修为进度</span>
                  <span>
                    {character.cultivation} / {character.cultivationRequired}
                  </span>
                </div>
                <Progress value={cultivationProgress} tone="jade" />
                <p className="mt-3 text-xs leading-5 text-stone-500">
                  当前境界内的修为积累进度。
                </p>
              </div>
            </div>

            <AttributePanel />
          </div>
        </CardBody>
      </Card>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">最近日志</h2>
          </CardHeader>
          <CardBody>
            <LogList logs={recentLogs.slice(0, 5)} />
          </CardBody>
        </Card>
      </section>
    </>
  );
}
