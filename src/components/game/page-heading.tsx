import { Badge } from "@/components/ui/badge";

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
}

export function PageHeading({ eyebrow, title, description, badge }: PageHeadingProps) {
  return (
    <header className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-medium text-jade-700">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink-900 md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{description}</p>
      </div>
      {badge ? <Badge tone="jade">{badge}</Badge> : null}
    </header>
  );
}
