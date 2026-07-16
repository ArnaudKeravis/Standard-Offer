import { Compass, Flame, Frown, Star, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import {
  empathyQuadrants,
  type EmpathyQuadrantId,
} from "@/lib/persona-studio/utils/persona-view";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { EvidenceTag } from "./evidence-tag";

const QUADRANT_ICON: Record<EmpathyQuadrantId, LucideIcon> = {
  motivations: Flame,
  frustrations: Frown,
  needs: Star,
  context: Compass,
};

/**
 * The empathy map — a recognisable four-quadrant workshop artifact built
 * entirely from the persona's own evidenced sections (see `empathyQuadrants`).
 * Every statement keeps its evidence tag, so nothing is presented as fact
 * without its status. DOM order follows a logical reading order.
 */
export function EmpathyMap({
  persona,
  lang = "en",
  className,
}: {
  persona: Persona;
  lang?: StudioLang;
  className?: string;
}) {
  const quadrants = empathyQuadrants(persona);

  return (
    <section
      aria-labelledby={`empathy-${persona.id}`}
      className={cn(
        "flex flex-col rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-4">
        <h3
          id={`empathy-${persona.id}`}
          className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
        >
          {tUI(lang, "empathyMap")}
        </h3>
        <p className="mt-1 text-xs text-[var(--studio-muted)]">
          {tUI(lang, "empathyMapNote")}
        </p>
      </div>

      <div className="grid flex-1 gap-px overflow-hidden rounded-2xl bg-[var(--studio-line)] sm:grid-cols-2">
        {quadrants.map((q) => {
          const Icon = QUADRANT_ICON[q.id];
          return (
            <div key={q.id} className="flex flex-col gap-2 bg-[var(--studio-panel)] p-4">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg studio-accent-soft text-[var(--studio-accent)]"
                >
                  <Icon className="size-4" />
                </span>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
                  {tUI(lang, q.labelKey)}
                </h4>
              </div>

              {q.statements.length === 0 ? (
                <p className="text-sm italic text-[var(--studio-muted)]">
                  {tUI(lang, "nothingRecorded")}
                </p>
              ) : (
                <ul className="space-y-2">
                  {q.statements.map((s) => (
                    <li
                      key={s.id}
                      className="flex flex-wrap items-start gap-x-2 gap-y-1 text-sm leading-snug text-[var(--studio-ink)]"
                    >
                      <span className="flex-1">{s.content}</span>
                      <EvidenceTag status={s.evidenceStatus} lang={lang} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
