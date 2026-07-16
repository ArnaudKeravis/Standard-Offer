import { cn } from "@/lib/utils";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Radial evidence-coverage ring. The percentage is always rendered as text in
 * the centre, so meaning never depends on the arc alone (WCAG: not colour-only).
 * Exposed as an accessible `meter`.
 */
export function CoverageRing({
  coverage,
  lang = "en",
  size = 104,
  stroke = 9,
  showLabel = true,
  className,
}: {
  coverage: number;
  lang?: StudioLang;
  size?: number;
  stroke?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(coverage * 100)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;
  const label = tUI(lang, "evidenceCoverage");

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} ${pct}%`}
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--studio-line)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--studio-accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="studio-display text-2xl font-bold tabular-nums text-[var(--studio-ink)]">
            {pct}%
          </span>
        </span>
      </div>
      {showLabel && (
        <span className="text-center text-xs font-medium text-[var(--studio-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}
