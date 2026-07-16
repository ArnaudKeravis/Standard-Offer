import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import {
  buildNeedsMatrix,
  type NeedStrengthLevel,
} from "@/lib/persona-studio/utils/persona-view";
import { tUI, type StudioLang, type UIKey } from "@/lib/persona-studio/utils/i18n";

const LEVEL_META: Record<
  NeedStrengthLevel,
  { pips: number; labelKey: UIKey }
> = {
  STRONG: { pips: 3, labelKey: "strengthStrong" },
  MODERATE: { pips: 2, labelKey: "strengthModerate" },
  EMERGING: { pips: 1, labelKey: "strengthEmerging" },
  NONE: { pips: 0, labelKey: "strengthUnknown" },
};

/**
 * Honest needs coverage matrix: personas × recognised need themes. Every cell is
 * derived only from real statements (see `buildNeedsMatrix`), with confidence as
 * an explicit strength proxy. Meaning is carried by an icon (pips) AND text — and
 * the caption is clear this is evidence coverage of needs, not satisfaction.
 */
export function NeedsMap({
  personas,
  lang = "en",
  className,
}: {
  personas: Persona[];
  lang?: StudioLang;
  className?: string;
}) {
  const { themes, rows } = buildNeedsMatrix(personas);
  if (themes.length === 0 || rows.length === 0) return null;

  return (
    <section
      aria-labelledby="needs-map-title"
      className={cn(
        "rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6",
        className,
      )}
    >
      <div className="mb-4">
        <h2
          id="needs-map-title"
          className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
        >
          {tUI(lang, "needsMap")}
        </h2>
        <p className="mt-1 max-w-2xl text-xs text-[var(--studio-muted)]">
          {tUI(lang, "needsMapCaption")}
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--studio-line)]">
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]"
              >
                {tUI(lang, "persona")}
              </th>
              {themes.map((theme) => (
                <th
                  key={theme.id}
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]"
                >
                  {tUI(lang, theme.labelKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.persona.id}
                className="border-b border-[var(--studio-line)] last:border-0"
              >
                <th
                  scope="row"
                  className="px-3 py-3 text-left align-top font-medium text-[var(--studio-ink)]"
                >
                  {row.persona.name}
                  <span className="block text-xs font-normal text-[var(--studio-muted)]">
                    {row.persona.archetype}
                  </span>
                </th>
                {row.cells.map((cell) => (
                  <td key={cell.themeId} className="px-3 py-3 align-top">
                    <StrengthCell level={cell.strength.level} count={cell.strength.count} lang={lang} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StrengthCell({
  level,
  count,
  lang,
}: {
  level: NeedStrengthLevel;
  count: number;
  lang: StudioLang;
}) {
  const meta = LEVEL_META[level];
  const label = tUI(lang, meta.labelKey);

  if (level === "NONE") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[var(--studio-muted)]">
        <span aria-hidden className="tabular-nums">
          —
        </span>
        <span className="text-xs">{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden className="flex items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "size-1.5 rounded-full",
                i < meta.pips
                  ? "studio-accent-bar"
                  : "bg-[var(--studio-line)]",
              )}
            />
          ))}
        </span>
        <span className="text-xs font-medium text-[var(--studio-ink)]">
          {label}
        </span>
      </span>
      <span className="text-[0.7rem] text-[var(--studio-muted)]">
        {count} {tUI(lang, "statementsCount")}
      </span>
    </span>
  );
}
