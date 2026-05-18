import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-stone-200/85 bg-white/78 shadow-panel backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("border-b border-stone-200/75 px-4 py-3", className)}>{children}</div>;
}

export function CardBody({ children, className }: CardProps) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
