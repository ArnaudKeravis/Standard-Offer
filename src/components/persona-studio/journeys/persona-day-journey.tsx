import { Route } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import { enrichJourneyMoment } from "@/lib/persona-studio/utils/journey-enrichment";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { EvidenceTag } from "@/components/persona-studio/shared/evidence-tag";

/**
 * Persona day journey — catalogue-style “What I do” block with a living layer:
 * each moment links goal / emotion / pain / opportunity from the persona’s own
 * statements (never invented).
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

      <nav aria-label={tUI(lang, "journeyEyebrow")} className="sticky top-14 z-20 -mx-2 mt-6 border-b border-[var(--studio-line)] bg-[var(--studio-paper)]/90 px-2 py-3 backdrop-blur">
        <ol className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {moments.map((moment, i) => {
            const label =
              moment.label?.trim() || `${tUI(lang, "steps")} ${i + 1}`;
            return (
              <li key={`nav-${moment.id}`} className="shrink-0">
                <a
                  href={`#moment-${moment.id}`}
                  className="studio-focusable inline-flex items-center gap-2 rounded-full border border-[var(--studio-line)] bg-[var(--studio-panel)] py-1.5 pl-1.5 pr-3.5 text-sm text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)]"
                >
                  <span className="flex size-6 items-center justify-center rounded-full studio-accent-soft text-xs font-semibold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap font-medium">{label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <ol className="mt-8 space-y-4">
        {moments.map((moment, i) => {
          const label = moment.label?.trim();
          const living = enrichJourneyMoment(persona, moment);
          return (
            <li
              key={moment.id}
              id={`moment-${moment.id}`}
              className="studio-enter scroll-mt-28 grid gap-4 rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/60 p-5 sm:grid-cols-[auto_1fr] sm:gap-5 sm:p-6"
              style={{ ["--stagger-index" as string]: i }}
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--studio-ink)] text-sm font-semibold tabular-nums text-[var(--studio-paper)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < moments.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-full min-h-8 w-px grow bg-[var(--studio-line)] sm:ml-5 sm:block"
                  />
                )}
              </div>
              <div>
                {label ? (
                  <h3 className="studio-display text-lg font-semibold text-[var(--studio-ink)] sm:text-xl">
                    {label}
                  </h3>
                ) : null}
                <p
                  className={cn(
                    "text-sm leading-relaxed text-[var(--studio-ink)]/90 sm:text-base",
                    label ? "mt-2" : undefined,
                  )}
                >
                  {moment.content}
                </p>
                <div className="mt-3">
                  <EvidenceTag status={moment.evidenceStatus} lang={lang} />
                </div>

                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
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
              </div>
            </li>
          );
        })}
      </ol>
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
    <div className="rounded-xl border border-[var(--studio-line)] bg-[var(--studio-paper)]/80 p-3">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-[var(--studio-ink)]">
        {slot ? (
          <>
            <p>{slot.statement.content}</p>
            <div className="mt-2">
              <EvidenceTag
                status={slot.statement.evidenceStatus}
                lang={lang}
              />
            </div>
          </>
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
