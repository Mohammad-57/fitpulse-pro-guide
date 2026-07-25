import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:pt-14 animate-fade-up">
      <div className="text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
