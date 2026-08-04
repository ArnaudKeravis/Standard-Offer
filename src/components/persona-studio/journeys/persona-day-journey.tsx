import { ChevronRight, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import { enrichJourneyMoment } from "@/lib/persona-studio/utils/journey-enrichment";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { EvidenceTag } from "@/components/persona-studio/shared/evidence-tag";

/**
 * Persona day journey — horizontal left→right consumer journey map.
 * Each moment is a stage on a timeline; living goal / emotion / pain /
 * opportunity slots are drawn only from the persona’s own statements.
 */
export function PersonaDayJourney({
  section,
  persona,
  lang = "en",
  className,
}: {
  section: PersonaSection;
  persona: Persona;
  lang?: StudioLang;
  className?: string;
}) {
  const moments = section.statements.filter((s) => s.content.trim().length > 0);
  if (moments.length === 0) return null;

  const title =
    section.key === "moments" || section.key === "journey_moments"
      ? tUI(lang, "whatIDo")
      : section.title;

  return (
    <section
      id="journey"
      aria-labelledby="persona-journey-heading"
      className={cn(
        "scroll-mt-24 rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
            <Route aria-hidden className="size-3.5" />
            {tUI(lang, "journeyEyebrow")}
          </p>
          <h2
            id="persona-journey-heading"
            className="studio-display mt-2 text-2xl font-bold tracking-tight text-[var(--studio-ink)] sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm text-[var(--studio-muted)] sm:text-base">
            {tUI(lang, "journeyIntro").replace("{n}", String(moments.length))}
          </p>
          <p className="mt-1 text-xs text-[var(--studio-muted)]">
            {tUI(lang, "journeyLivingNote")}
          </p>
        </div>
        <span className="rounded-full border border-[var(--studio-line)] px-3 py-1 text-xs font-medium tabular-nums text-[var(--studio-muted)]">
          {moments.length} {tUI(lang, "steps")}
        </span>
      </div>

      {/* Horizontal consumer journey — scroll L→R */}
      <div className="relative mt-8 -mx-2 sm:-mx-3">
        <div
          className="overflow-x-auto px-2 pb-3 scrollbar-none sm:px-3"
          tabIndex={0}
          role="region"
          aria-label={tUI(lang, "journeyEyebrow")}
        >
          <ol className="flex min-w-min items-stretch gap-0">
            {moments.map((moment, i) => {
              const label = moment.label?.trim();
              const living = enrichJourneyMoment(persona, moment);
              const isLast = i === moments.length - 1;

              return (
                <li
                  key={moment.id}
                  id={`moment-${moment.id}`}
                  className="studio-enter flex scroll-mt-28 shrink-0"
                  style={{ ["--stagger-index" as string]: i }}
                >
                  <div className="flex w-[min(20rem,78vw)] flex-col sm:w-80">
                    {/* Timeline rail */}
                    <div className="relative mb-4 flex h-10 items-center">
                      <span className="relative z-[1] flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--studio-ink)] text-sm font-semibold tabular-nums text-[var(--studio-paper)] shadow-[var(--studio-shadow-soft)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {!isLast ? (
                        <span
                          aria-hidden
                          className="absolute left-10 right-0 top-1/2 flex -translate-y-1/2 items-center"
                        >
                          <span className="h-px flex-1 bg-[var(--studio-line)]" />
                          <ChevronRight
                            className="size-4 shrink-0 text-[var(--studio-accent)]"
                            strokeWidth={2}
                          />
                        </span>
                      ) : null}
                    </div>

                    {/* Stage card */}
                    <article className="flex flex-1 flex-col rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/60 p-4 sm:p-5">
                      {label ? (
                        <h3 className="studio-display text-base font-semibold leading-snug text-[var(--studio-ink)] sm:text-lg">
                          {label}
                        </h3>
                      ) : (
                        <h3 className="studio-display text-base font-semibold text-[var(--studio-ink)]">
                          {tUI(lang, "steps")} {i + 1}
                        </h3>
                      )}
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--studio-ink)]/90">
                        {moment.content}
                      </p>
                      <div className="mt-3">
                        <EvidenceTag status={moment.evidenceStatus} lang={lang} />
                      </div>

                      <dl className="mt-4 grid gap-2">
                        <LivingSlot
                          label={tUI(lang, "journeySlotGoal")}
                          slot={living.goal}
                          lang={lang}
                        />
                        <LivingSlot
                          label={tUI(lang, "journeySlotEmotion")}
                          slot={living.emotion}
                          lang={lang}
                        />
                        <LivingSlot
                          label={tUI(lang, "journeySlotPain")}
                          slot={living.pain}
                          lang={lang}
                        />
                        <LivingSlot
                          label={tUI(lang, "journeySlotOpportunity")}
                          slot={living.opportunity}
                          lang={lang}
                        />
                      </dl>
                    </article>
                  </div>

                  {/* Spacing between stages (connector lives inside timeline) */}
                  {!isLast ? <div aria-hidden className="w-3 shrink-0 sm:w-4" /> : null}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Fade hint that more stages exist to the right */}
        {moments.length > 2 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--studio-paper)] to-transparent sm:w-14"
          />
        ) : null}
      </div>
    </section>
  );
}

function LivingSlot({
  label,
  slot,
  lang,
}: {
  label: string;
  slot: ReturnType<typeof enrichJourneyMoment>["goal"];
  lang: StudioLang;
}) {
  return (
    <div className="rounded-xl border border-[var(--studio-line)] bg-[var(--studio-paper)]/80 p-2.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-xs leading-relaxed text-[var(--studio-ink)] sm:text-sm">
        {slot ? (
          <p className="line-clamp-3">{slot.statement.content}</p>
        ) : (
          <p className="text-[var(--studio-muted)]">
            {tUI(lang, "journeyInsufficient")}
          </p>
        )}
      </dd>
    </div>
  );
}

/** Sections that carry a day / moment journey (not ordinary bullet lists). */
export function isJourneySection(section: PersonaSection): boolean {
  return (
    section.type === "moments" ||
    section.key === "moments" ||
    section.key === "journey_moments"
  );
}
