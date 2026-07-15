import { Quote } from "lucide-react";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { QuoteType } from "@/lib/persona-studio/ai/schemas/common";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import {
  familyLabel,
  orderedSections,
} from "@/lib/persona-studio/utils/persona-view";
import {
  collectStatements,
  evidenceBreakdown,
} from "@/lib/persona-studio/utils/confidence";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { CoverageMeter } from "@/components/persona-studio/shared/coverage-meter";
import { PersonaPortrait } from "@/components/persona-studio/shared/persona-portrait";
import { SectionCard } from "@/components/persona-studio/shared/section-card";

const QUOTE_TYPE_LABEL: Record<QuoteType, string> = {
  VERBATIM: "Verbatim quote",
  COMPOSITE: "Composite quote",
  DRAFTED_HYPOTHESIS: "Drafted hypothesis — to validate",
  NONE: "No quote available",
};

export function PersonaDetail({
  persona,
  sources,
}: {
  persona: Persona;
  sources: SourceDocument[];
}) {
  const sourcesById = new Map(sources.map((s) => [s.id, s]));
  const sections = orderedSections(persona);
  const breakdown = evidenceBreakdown(
    collectStatements([...persona.commonSections, ...persona.domainSections]),
  );

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      {/* Hero */}
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="order-2 md:order-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
            {persona.archetype}
          </p>
          <h1 className="studio-display mt-1 text-4xl font-bold leading-[1.05] text-[var(--studio-ink)] sm:text-5xl">
            {persona.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[var(--studio-ink)]/85">
            {persona.oneLineEssence}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--studio-muted)]">
            <span className="rounded-full studio-accent-soft px-2.5 py-1 font-medium">
              {familyLabel(persona.family)}
            </span>
            {persona.category && <span>{persona.category}</span>}
            {persona.demographicContext.ageRange && (
              <span>· Age {persona.demographicContext.ageRange}</span>
            )}
            {persona.demographicContext.location && (
              <span>· {persona.demographicContext.location}</span>
            )}
          </div>

          {persona.behaviouralTags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {persona.behaviouralTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-[var(--studio-line)] px-2 py-0.5 text-xs text-[var(--studio-muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-1 md:order-2">
          <PersonaPortrait
            name={persona.name}
            className="aspect-[4/5] w-full"
            rounded="rounded-3xl"
          />
        </div>
      </div>

      {/* Quote */}
      {persona.quote && (
        <blockquote className="mt-8 rounded-3xl border-l-4 border-[var(--studio-accent)] bg-[var(--studio-panel)] p-6">
          <Quote aria-hidden className="size-5 text-[var(--studio-accent)]" />
          <p className="studio-display mt-2 text-2xl font-medium leading-snug text-[var(--studio-ink)]">
            {persona.quote}
          </p>
          <footer className="mt-2 text-xs font-medium uppercase tracking-wide text-[var(--studio-muted)]">
            {QUOTE_TYPE_LABEL[persona.quoteType]}
          </footer>
        </blockquote>
      )}

      {/* Confidence + coverage strip */}
      <div className="mt-8 grid gap-4 rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex flex-col gap-2">
          <ConfidenceBadge level={persona.confidenceLevel} />
          <CoverageMeter coverage={persona.evidenceCoverage} className="w-48" />
        </div>
        <div className="sm:border-l sm:border-[var(--studio-line)] sm:pl-6">
          <p className="text-sm leading-relaxed text-[var(--studio-ink)]/85">
            {persona.confidenceExplanation}
          </p>
          <p className="mt-2 text-xs text-[var(--studio-muted)]">
            {breakdown.evidence} evidence · {breakdown.assumption} assumptions ·{" "}
            {breakdown.toValidate} to validate ({breakdown.total} statements)
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            sourcesById={sourcesById}
            className={section.type === "text" ? "md:col-span-2" : undefined}
          />
        ))}
      </div>

      {/* Simulation note (chat lands in Phase 3) */}
      <p className="mt-8 rounded-2xl border border-dashed border-[var(--studio-line)] p-4 text-xs text-[var(--studio-muted)]">
        “Talk to this persona” is a research-grounded simulation built from the
        evidence above — not a real customer or employee. It arrives in a later
        phase.
      </p>
    </article>
  );
}
