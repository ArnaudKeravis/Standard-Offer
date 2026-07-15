import { cn } from "@/lib/utils";
import { coveragePct } from "@/lib/persona-studio/utils/persona-view";

/**
 * Evidence-coverage meter. The numeric value is always shown as text, so the
 * meaning never depends on the bar's fill alone.
 */
export function CoverageMeter({
  coverage,
  className,
  showLabel = true,
}: {
  coverage: number;
  className?: string;
  showLabel?: boolean;
}) {
  const pct = Math.round(coverage * 100);
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-xs text-[var(--studio-muted)]">
          <span>Evidence coverage</span>
          <span className="font-semibold tabular-nums text-[var(--studio-ink)]">
            {coveragePct(coverage)}
          </span>
        </div>
      )}
      <div
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Evidence coverage ${pct} percent`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--studio-line)]"
      >
        <div
          className="h-full rounded-full studio-accent-bar"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
