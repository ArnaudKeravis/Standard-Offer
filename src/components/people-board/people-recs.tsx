"use client";

import { LANE_META } from "@/lib/people-board/lanes";
import type { Recommendation } from "@/lib/people-board/recommend";
import { cn } from "@/lib/utils";

const LANE_SHORT: Record<Recommendation["lane"], string> = {
  management: "Mgmt",
  "design-system": "DS",
  "pd-b2c": "B2C",
  "pd-b2b": "B2B",
  "pd-b2o": "B2O",
  "pd-data": "Data",
  codesign: "CoD",
};

const VERB_TONE: Record<Recommendation["verb"], string> = {
  Validate: "bg-[#c23b4a] text-white",
  Fund: "bg-[#c23b4a] text-white",
  Hire: "bg-[var(--spark-amber)] text-[var(--spark-ink)]",
  Cover: "bg-[var(--spark-amber)] text-[var(--spark-ink)]",
  Arbitrate: "bg-[var(--spark-ink)] text-white",
  Cut: "bg-[var(--spark-ink)] text-white",
};

export function PeopleRecs({
  recs,
  selectedId,
  onSelect,
}: {
  recs: Recommendation[];
  selectedId: string | null;
  onSelect: (rec: Recommendation) => void;
}) {
  const open = recs.filter((rec) => rec.active).length;

  return (
    <section
      aria-label="Recommendations"
      className="overflow-hidden rounded-xl border border-[var(--spark-line)] bg-white"
    >
      <header className="flex items-baseline justify-between gap-3 border-b border-[var(--spark-line)] px-3 py-2">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          Recommend
        </p>
        <p className="text-[11px] font-medium tabular-nums text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          {open} open
          {recs.length > open ? ` · ${recs.length - open} resolved` : ""}
        </p>
      </header>
      <ul>
        {recs.map((rec) => {
          const selected = Boolean(
            selectedId && rec.personIds.includes(selectedId),
          );
          return (
            <li key={rec.id} className="border-t border-[var(--spark-line)] first:border-t-0">
              <button
                type="button"
                onClick={() => onSelect(rec)}
                aria-pressed={selected}
                className={cn(
                  "grid w-full grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 text-left outline-none hover:bg-[color:color-mix(in_oklab,var(--spark-paper),white_20%)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--spark-amber)]",
                  selected && "bg-[var(--spark-amber-soft)]",
                  !rec.active && "opacity-45",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-6 items-center justify-center rounded-sm px-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase",
                    rec.active
                      ? VERB_TONE[rec.verb]
                      : "bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_88%)] text-[var(--spark-ink)]",
                  )}
                >
                  {rec.active ? rec.verb : "Done"}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--spark-ink)]">
                    {rec.action}
                  </span>
                  <span className="block truncate text-[12px] leading-snug text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                    {rec.why}
                  </span>
                </span>
                <span
                  className="hidden text-[10px] font-semibold tracking-[0.1em] uppercase text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)] sm:block"
                  title={LANE_META[rec.lane].label}
                >
                  {LANE_SHORT[rec.lane]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
