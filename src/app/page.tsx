import { PageHeading } from "@/components/game/page-heading";
import { LogList } from "@/components/game/log-list";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { attributes, recentLogs } from "@/data/mock-player";

function AttributePanel() {
  return (
    <Card className="h-full border-jade-700/20 bg-white text-ink-900">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-ink-900">四维概览</h2>
          <span className="text-xs text-stone-500">当前基础</span>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-3">
          {attributes.map((attribute) => (
            <details key={attribute.key} className="group relative min-w-0">
              <summary className="flex min-h-[110px] cursor-pointer list-none flex-col justify-center rounded-md border border-stone-200 bg-rice-50 px-3 py-2 [&::-webkit-details-marker]:hidden">
                <span className="text-xs text-stone-500">{attribute.key}</span>
                <span className="mt-1 text-xl font-semibold text-ink-900">{attribute.value}</span>
              </summary>
              <div className="absolute left-0 top-[calc(100%+8px)] z-20 hidden w-64 rounded-lg border border-stone-200 bg-white p-3 text-xs leading-5 text-stone-600 shadow-panel group-open:block md:group-hover:block">
                {attribute.description}
              </div>
            </details>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default function OverviewPage() {
  return (
    <>
      <PageHeading
        title="总览"
        description="查看当前修士状态、核心资源和最近发生的修行记录。"
      />

      <section>
        <AttributePanel />
      </section>

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
