import clsx from "clsx";

export function Section({
  title,
  eyebrow,
  description,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="text-xs tracking-widest uppercase text-gray-600">{eyebrow}</div>
          )}
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="mt-3 text-gray-700">{description}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
