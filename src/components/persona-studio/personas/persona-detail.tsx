import { MapPin, Quote, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import {
  empathyQuadrants,
  orderedSections,
} from "@/lib/persona-studio/utils/persona-view";
import {
  collectStatements,
  evidenceBreakdown,
} from "@/lib/persona-studio/utils/confidence";
import {
  tBreakdown,
  tFamily,
  tQuoteType,
  tUI,
  type StudioLang,
} from "@/lib/persona-studio/utils/i18n";
import {
  isJourneySection,
  PersonaDayJourney,
} from "@/components/persona-studio/journeys/persona-day-journey";
import { PersonaAuditPanel } from "@/components/persona-studio/personas/persona-audit-panel";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { CoverageRing } from "@/components/persona-studio/shared/coverage-ring";
import { EmpathyMap } from "@/components/persona-studio/shared/empathy-map";
import { PersonaPortrait } from "@/components/persona-studio/shared/persona-portrait";
import { SectionCard } from "@/components/persona-studio/shared/section-card";

/**
 * Persona detail as an asymmetric bento grid where size encodes hierarchy: a
 * large identity anchor, a bold quote, a coverage ring, a confidence tile, the
 * empathy-map centerpiece, and the remaining sections as varied-span tiles.
 *
 * DOM order deliberately follows a logical reading order (identity → coverage →
 * confidence → quote → synthesis → detail) so the screen-reader experience is
 * coherent regardless of the visual bento arrangement.
 */
export function PersonaDetail({
  persona,
  peers = [],
  sources,
  lang = "en",
}: {
  persona: Persona;
  peers?: Persona[];
  sources: SourceDocument[];
  lang?: StudioLang;
}) {
  const sourcesById = new Map(sources.map((s) => [s.id, s]));
  const sections = orderedSections(persona);
  const quadrants = empathyQuadrants(persona);
  const journeySections = sections.filter(isJourneySection);
  // Empathy map + journey get dedicated surfaces — don't repeat as bento tiles.
  const consumedKeys = new Set(
    [
      ...quadrants.map((q) => q.section?.key),
      ...journeySections.map((s) => s.key),
    ].filter((k): k is string => Boolean(k)),
  );
  const detailSections = sections.filter((s) => !consumedKeys.has(s.key));
  const breakdown = evidenceBreakdown(
    collectStatements([...persona.commonSections, ...persona.domainSections]),
  );
  const hasJourney = journeySections.some((s) =>
    s.statements.some((st) => st.content.trim().length > 0),
  );

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      {hasJourney ? (
        <nav
          aria-label={tUI(lang, "onThisPage")}
          className="mb-6 flex flex-wrap gap-2"
        >
          <a
            href="#who-i-am"
            className="studio-focusable rounded-full border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-1.5 text-xs font-medium text-[var(--studio-muted)] transition-colors hover:border-[var(--studio-accent)] hover:text-[var(--studio-ink)]"
          >
            {tUI(lang, "whoIAm")}
          </a>
          <a
            href="#journey"
            className="studio-focusable rounded-full border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-1.5 text-xs font-medium text-[var(--studio-muted)] transition-colors hover:border-[var(--studio-accent)] hover:text-[var(--studio-ink)]"
          >
            {tUI(lang, "whatIDo")}
          </a>
        </nav>
      ) : null}

      {/* Hero bento — Who I am */}
      <div
        id="who-i-am"
        className="scroll-mt-24 grid grid-cols-1 gap-4 lg:grid-cols-6"
      >
        {/* Identity anchor */}
        <section
          className="studio-enter rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-7 lg:col-span-4 lg:row-span-2"
          style={{ ["--stagger-index" as string]: 0 }}
        >
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
                {persona.archetype}
              </p>
              <h1 className="studio-display mt-1 text-4xl font-bold leading-[1.05] text-[var(--studio-ink)] sm:text-5xl">
                {persona.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[var(--studio-ink)]/85">
                {persona.oneLineEssence}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--studio-muted)]">
                <span className="rounded-full studio-accent-soft px-2.5 py-1 font-medium">
                  {tFamily(lang, persona.family)}
                </span>
                {persona.category && <span>{persona.category}</span>}
                {persona.demographicContext.ageRange && (
                  <span>
                    {tUI(lang, "age")} {persona.demographicContext.ageRange}
                  </span>
                )}
                {persona.demographicContext.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin aria-hidden className="size-3.5 text-[var(--studio-accent)]" />
                    {persona.demographicContext.location}
                  </span>
                )}
              </div>

              {persona.behaviouralTags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {persona.behaviouralTags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md border border-[var(--studio-line)] px-2 py-0.5 text-xs text-[var(--studio-muted)]"
                    >
                      <Tag aria-hidden className="size-3 text-[var(--studio-accent)]" />
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <PersonaPortrait
              name={persona.name}
              src={persona.portraitUrl}
              className="aspect-[4/5] w-full sm:w-48"
              rounded="rounded-2xl"
              sizes="(max-width: 640px) 100vw, 192px"
            />
          </div>
        </section>

        {/* Coverage ring — visual weight tracks evidence coverage */}
        <section
          className="studio-enter flex items-center justify-center rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 lg:col-span-2"
          style={{
            ["--stagger-index" as string]: 1,
            opacity: 0.75 + persona.evidenceCoverage * 0.25,
          }}
        >
          <CoverageRing coverage={persona.evidenceCoverage} lang={lang} />
        </section>

        {/* Confidence — thicker border when LOW (needs attention) */}
        <section
          className={cn(
            "studio-enter flex flex-col gap-2 rounded-3xl border bg-[var(--studio-paper)] p-6 lg:col-span-2",
            persona.confidenceLevel === "LOW"
              ? "border-[var(--studio-accent)]"
              : "border-[var(--studio-line)]",
          )}
          style={{ ["--stagger-index" as string]: 2 }}
        >
          <ConfidenceBadge
            level={persona.confidenceLevel}
            lang={lang}
            className="self-start"
          />
          <p className="text-sm leading-relaxed text-[var(--studio-ink)]/85">
            {persona.confidenceExplanation}
          </p>
          <p className="mt-auto text-xs text-[var(--studio-muted)]">
            {tBreakdown(lang, breakdown)}
          </p>
        </section>

        {/* Quote */}
        {persona.quote && (
          <blockquote
            className="studio-enter rounded-3xl border-l-4 border-[var(--studio-accent)] bg-[var(--studio-panel)] p-6 lg:col-span-6"
            style={{ ["--stagger-index" as string]: 3 }}
          >
            <Quote aria-hidden className="size-5 text-[var(--studio-accent)]" />
            <p className="studio-display mt-2 text-2xl font-medium leading-snug text-[var(--studio-ink)]">
              {persona.quote}
            </p>
            <footer className="mt-2 text-xs font-medium uppercase tracking-wide text-[var(--studio-muted)]">
              {tQuoteType(lang, persona.quoteType)}
            </footer>
          </blockquote>
        )}

        {/* Empathy map — centerpiece */}
        <div
          className="studio-enter lg:col-span-6"
          style={{ ["--stagger-index" as string]: 4 }}
        >
          <EmpathyMap persona={persona} lang={lang} className="h-full" />
        </div>
      </div>

      {/* Day journey — full-width, catalogue “What I do” */}
      {journeySections.map((section) => (
        <PersonaDayJourney
          key={section.id}
          section={section}
          persona={persona}
          lang={lang}
          className="mt-6"
        />
      ))}

      <PersonaAuditPanel
        persona={persona}
        peers={peers}
        lang={lang}
        className="mt-6"
      />

      {/* Detail sections — varied-span tiles */}
      {detailSections.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {detailSections.map((section, i) => {
            const wide = section.type === "text" || section.type === "quote";
            return (
              <div
                key={section.id}
                className={cn(
                  "studio-enter",
                  wide ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2",
                )}
                style={{ ["--stagger-index" as string]: 5 + i }}
              >
                <SectionCard
                  section={section}
                  sourcesById={sourcesById}
                  lang={lang}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Simulation note (chat lands in Phase 3) */}
      <p className="mt-8 rounded-2xl border border-dashed border-[var(--studio-line)] p-4 text-xs text-[var(--studio-muted)]">
        {tUI(lang, "simulationNote")}
      </p>
    </article>
  );
}
