import Link from "next/link";
import { AlertTriangle, Layers, Sparkles, Split } from "lucide-react";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { CompareView } from "@/lib/persona-studio/utils/persona-compare";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { EvidenceTag } from "@/components/persona-studio/shared/evidence-tag";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { CoverageMeter } from "@/components/persona-studio/shared/coverage-meter";

/**
 * Server-rendered compare results. Every cell and insight is derived from the
 * personas' own structured statements (see `buildCompareView`) — nothing is
 * invented. Divergences are labelled as prompts to explore, not findings.
 */
export function CompareResults({
  projectId,
  view,
  lang,
}: {
  projectId: string;
  view: CompareView;
  lang: StudioLang;
}) {
  const byId = new Map(view.personas.map((p) => [p.id, p]));
  const idsQuery = view.personas.map((p) => p.id).join(",");

  return (
    <div className="space-y-8">
      <p className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)] px-4 py-3 text-sm text-[var(--studio-muted)]">
        <span className="font-medium text-[var(--studio-ink)]">
          {tWorkshop(lang, "simulationNotTruth")}.{" "}
        </span>
        {tWorkshop(lang, "derivedNote")}
      </p>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/studio/projects/${projectId}/present?ids=${idsQuery}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          {tWorkshop(lang, "presentSelection")}
        </Link>
        <Link
          href={`/studio/projects/${projectId}/challenge?ids=${idsQuery}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          {tWorkshop(lang, "challengeSelection")}
        </Link>
      </div>

      <InsightSection
        icon={<Layers className="size-4" />}
        title={tWorkshop(lang, "universalNeeds")}
        description={tWorkshop(lang, "universalNeedsDesc")}
        empty={tWorkshop(lang, "noUniversalNeeds")}
        isEmpty={view.universalNeeds.length === 0}
      >
        <ul className="mt-3 flex flex-wrap gap-2">
          {view.universalNeeds.map((n) => (
            <li
              key={n.themeId}
              className="rounded-full border border-[var(--studio-line)] px-3 py-1 text-sm font-medium text-[var(--studio-ink)]"
            >
              {tUI(lang, n.labelKey)}
            </li>
          ))}
        </ul>
      </InsightSection>

      <InsightSection
        icon={<Split className="size-4" />}
        title={tWorkshop(lang, "differentiators")}
        description={tWorkshop(lang, "differentiatorsDesc")}
        empty={tWorkshop(lang, "noDifferentiators")}
        isEmpty={view.differentiators.length === 0}
      >
        <ul className="mt-3 space-y-3">
          {view.differentiators.map((d) => (
            <li
              key={d.themeId}
              className="rounded-2xl border border-[var(--studio-line)] px-4 py-3 text-sm"
            >
              <p className="font-medium text-[var(--studio-ink)]">
                {tUI(lang, d.labelKey)}
              </p>
              <p className="mt-1 text-xs text-[var(--studio-muted)]">
                {tWorkshop(lang, "coveredBy")}: {nameList(d.coveredIds, byId)}
                {" · "}
                {tWorkshop(lang, "absentFor")}: {nameList(d.missingIds, byId)}
              </p>
            </li>
          ))}
        </ul>
      </InsightSection>

      <InsightSection
        icon={<AlertTriangle className="size-4" />}
        title={tWorkshop(lang, "designTensions")}
        description={tWorkshop(lang, "designTensionsDesc")}
        empty={tWorkshop(lang, "noTensions")}
        isEmpty={view.tensions.length === 0}
      >
        <ul className="mt-3 space-y-3">
          {view.tensions.map((t) => (
            <li
              key={t.themeId}
              className="rounded-2xl border border-[var(--studio-line)] px-4 py-3 text-sm"
            >
              <p className="font-medium text-[var(--studio-ink)]">
                {tWorkshop(lang, "conflictingNeeds")}: {tUI(lang, t.labelKey)}
              </p>
              <p className="mt-1 text-xs text-[var(--studio-muted)]">
                {tWorkshop(lang, "prioritisedBy")}: {nameList(t.strongIds, byId)}
                {" · "}
                {tWorkshop(lang, "absentFor")}: {nameList(t.absentIds, byId)}
              </p>
            </li>
          ))}
        </ul>
      </InsightSection>

      <InsightSection
        icon={<Sparkles className="size-4" />}
        title={tWorkshop(lang, "opportunityAreas")}
        description={tWorkshop(lang, "opportunityAreasDesc")}
        empty={tWorkshop(lang, "noOpportunities")}
        isEmpty={view.opportunities.length === 0}
      >
        <ul className="mt-3 space-y-3">
          {view.opportunities.map((o) => (
            <li
              key={o.themeId}
              className="rounded-2xl border border-[var(--studio-line)] px-4 py-3 text-sm"
            >
              <p className="font-medium text-[var(--studio-ink)]">
                {tUI(lang, o.labelKey)}
              </p>
              <p className="mt-1 text-xs text-[var(--studio-muted)]">
                {tWorkshop(lang, "coveredBy")}: {nameList(o.personaIds, byId)}
              </p>
            </li>
          ))}
        </ul>
      </InsightSection>


      {view.dimensions.map((row) => (
        <section
          key={row.id}
          aria-labelledby={`dim-${row.id}`}
          className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5"
        >
          <h2
            id={`dim-${row.id}`}
            className="studio-display mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
          >
            {tWorkshop(lang, row.labelKey)}
          </h2>
          <div
            className="grid gap-4 overflow-x-auto"
            style={{
              gridTemplateColumns: `repeat(${view.personas.length}, minmax(12rem, 1fr))`,
            }}
          >
            {row.cells.map((cell) => {
              const persona = byId.get(cell.personaId)!;
              return (
                <div key={cell.personaId} className="min-w-0">
                  <PersonaColumnHeader persona={persona} />
                  {cell.statements.length === 0 ? (
                    <p className="mt-2 text-xs italic text-[var(--studio-muted)]">
                      {tWorkshop(lang, "noStatements")}
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {cell.statements.slice(0, 5).map((s) => (
                        <li key={s.id} className="text-sm leading-relaxed">
                          <div className="flex flex-wrap items-start gap-1.5">
                            <span className="flex-1 text-[var(--studio-ink)]">
                              {s.content}
                            </span>
                            <EvidenceTag status={s.evidenceStatus} lang={lang} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section
        aria-labelledby="dim-confidence"
        className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5"
      >
        <h2
          id="dim-confidence"
          className="studio-display mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
        >
          {tWorkshop(lang, "dimensionConfidence")}
        </h2>
        <div
          className="grid gap-4 overflow-x-auto"
          style={{
            gridTemplateColumns: `repeat(${view.personas.length}, minmax(12rem, 1fr))`,
          }}
        >
          {view.personas.map((persona) => (
            <div key={persona.id} className="min-w-0 space-y-3">
              <PersonaColumnHeader persona={persona} />
              <ConfidenceBadge level={persona.confidenceLevel} lang={lang} />
              <p className="text-xs text-[var(--studio-muted)]">
                {persona.confidenceExplanation}
              </p>
              <CoverageMeter coverage={persona.evidenceCoverage} lang={lang} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5">
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
          {tWorkshop(lang, "sharedTags")}
        </h2>
        {view.sharedTags.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--studio-muted)]">
            {tWorkshop(lang, "noSharedTags")}
          </p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {view.sharedTags.map((tag) => (
              <li
                key={tag.tag}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--studio-line)] px-3 py-1 text-sm"
              >
                <span className="font-medium text-[var(--studio-ink)]">
                  {tag.tag}
                </span>
                <span className="text-xs text-[var(--studio-muted)]">
                  {nameList(tag.personaIds, byId)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PersonaColumnHeader({ persona }: { persona: Persona }) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--studio-line)] pb-2">
      <span
        aria-hidden
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: persona.accentColor }}
      />
      <div className="min-w-0">
        <p className="truncate font-medium text-[var(--studio-ink)]">
          {persona.name}
        </p>
        <p className="truncate text-xs text-[var(--studio-muted)]">
          {persona.archetype}
        </p>
      </div>
    </div>
  );
}

function nameList(ids: string[], byId: Map<string, Persona>): string {
  return ids.map((id) => byId.get(id)?.name ?? id).join(", ");
}

function InsightSection({
  icon,
  title,
  description,
  empty,
  isEmpty,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  empty: string;
  isEmpty: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5">
      <div className="mb-1 flex items-center gap-2 text-[var(--studio-accent)]">
        {icon}
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
          {title}
        </h2>
      </div>
      <p className="text-xs text-[var(--studio-muted)]">{description}</p>
      {isEmpty ? (
        <p className="mt-3 text-sm text-[var(--studio-muted)]">{empty}</p>
      ) : (
        children
      )}
    </section>
  );
}
