import { cn } from "@/lib/utils";

export function OutlinedHeadline({
  solid,
  outline,
  className,
  tone = "light",
}: {
  solid: string;
  outline: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const solidCls =
    tone === "dark"
      ? "text-[color:color-mix(in_oklab,white,transparent_6%)]"
      : "text-[var(--spark-ink)]";
  const outlineCls =
    tone === "dark" ? "spark-outline--dark" : "spark-outline";

  return (
    <div className={cn("space-y-1", className)}>
      <p
        className={cn(
          "font-[var(--font-display)] text-4xl tracking-[-0.04em] md:text-6xl lg:text-7xl",
          solidCls,
        )}
      >
        {solid}
      </p>
      <p
        className={cn(
          "font-[var(--font-display)] text-4xl tracking-[-0.04em] text-transparent md:text-6xl lg:text-7xl",
          outlineCls,
        )}
      >
        {outline}
      </p>
    </div>
  );
}

