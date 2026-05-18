import type { GameLog } from "@/types/game";
import { Badge } from "@/components/ui/badge";

interface LogListProps {
  logs: GameLog[];
}

const logTone = {
  修炼: "jade",
  采集: "muted",
  系统: "ink",
  突破: "cinnabar",
  坊市: "amber"
} as const;

export function LogList({ logs }: LogListProps) {
  return (
    <div className="divide-y divide-stone-200/80">
      {logs.map((log) => (
        <article key={log.id} className="py-3 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge tone={logTone[log.type]}>{log.type}</Badge>
              <span className="text-xs text-stone-400">{log.time}</span>
            </div>
            {log.delta ? <span className="text-xs font-medium text-jade-700">{log.delta}</span> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-stone-700">{log.content}</p>
        </article>
      ))}
    </div>
  );
}
