"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import {
  BUSINESS_GOAL_IDS,
  BUSINESS_GOAL_STYLES,
  type BusinessGoalId,
} from "@/lib/business-goals";
import {
  getCatalogueHref,
  getJourneyHref,
  getStandardSolutions,
  getStandardSolutionsByGoal,
  type SolutionLink,
} from "@/lib/solution-links";
import { catalogueSolutionsUrl } from "@/lib/spark-config";
import { cn } from "@/lib/utils";

function SolutionCard({
  link,
  labels,
}: {
  link: SolutionLink;
  labels: {
    tier70: string;
    persona: string;
    moment: string;
    openMoment: string;
    openSolution: string;
    catalogueOnly: string;
  };
}) {
  const ref = link.journeyRefs[0];
  const catalogueHref = getCatalogueHref(link);
  const journeyHref = ref ? getJourneyHref(ref) : null;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[var(--spark-line)] bg-white p-4 shadow-[0_1px_0_rgba(14,26,74,0.04)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
        {labels.tier70} · {link.layer.toUpperCase()}
      </p>
      <p className="mt-1.5 font-medium leading-snug text-[var(--spark-ink)]">
        {link.name}
      </p>

      {ref ? (
        <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
          <span className="font-medium text-[var(--spark-ink)]">
            {labels.persona}:
          </span>{" "}
          {ref.personaId.replace(/-/g, " ")} ·{" "}
          <span className="font-medium text-[var(--spark-ink)]">
            {labels.moment}:
          </span>{" "}
          {ref.momentLabel}
        </p>
      ) : (
        <p className="mt-3 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_42%)]">
          {labels.catalogueOnly}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-3 pt-4">
        {journeyHref && (
          <a
            href={journeyHref}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium text-[var(--spark-iq)]",
              "underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
            )}
          >
            {labels.openMoment}
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
        {catalogueHref && (
          <a
            href={catalogueHref}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]",
              "underline-offset-2 hover:text-[var(--spark-ink)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
            )}
          >
            {labels.openSolution}
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

function GoalGroup({
  goalId,
  solutions,
}: {
  goalId: BusinessGoalId;
  solutions: SolutionLink[];
}) {
  const tGoals = useTranslations("deck.businessGoals");
  const t = useTranslations("deck.journeyStrip");
  const styles = BUSINESS_GOAL_STYLES[goalId];

  if (solutions.length === 0) return null;

  const labels = {
    tier70: t("tier70"),
    persona: t("persona"),
    moment: t("moment"),
    openMoment: t("openMoment"),
    openSolution: t("openSolution"),
    catalogueOnly: t("catalogueOnly"),
  };

  return (
    <section
      aria-labelledby={`journey-goal-${goalId}`}
      className={cn("rounded-2xl border p-6 md:p-8", styles.panelClass)}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className={cn("mb-4 h-1 w-10 rounded-full", styles.barClass)} />
          <h4
            id={`journey-goal-${goalId}`}
            className={cn(
              "font-[var(--font-display)] text-lg font-semibold uppercase tracking-[-0.02em] leading-snug",
              styles.accentClass,
            )}
          >
            {tGoals(`goals.${goalId}.title`)}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
            {tGoals(`goals.${goalId}.body`)}
          </p>
        </div>
        <p
          className={cn(
            "shrink-0 text-xs font-semibold uppercase tracking-[0.12em]",
            styles.accentClass,
          )}
        >
          {t("goalCount", { count: solutions.length })}
        </p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {solutions.map((link) => (
          <li key={link.slug}>
            <SolutionCard link={link} labels={labels} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SolutionJourneyStrip() {
  const t = useTranslations("deck.journeyStrip");
  const tRoadmap = useTranslations("deck.roadmap");
  const standard = getStandardSolutions();
  const grouped = getStandardSolutionsByGoal();

  return (
    <section
      id="journey"
      className="deck-fade-up border-t border-[var(--spark-line)] bg-[var(--spark-paper)]"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-28 lg:py-32">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
            {t("kicker")}
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-3xl">
            {t("headline")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)] md:text-base">
            {t("sub", { count: standard.length })}
          </p>
        </div>

        <div className="space-y-6">
          {BUSINESS_GOAL_IDS.map((goalId) => (
            <GoalGroup
              key={goalId}
              goalId={goalId}
              solutions={grouped[goalId]}
            />
          ))}
        </div>

        <a
          href={catalogueSolutionsUrl(undefined, { from: "standard-offer" })}
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--spark-ink)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2"
        >
          {t("exploreAll")}
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>

        <p className="deck-fade-up mt-10 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
          {tRoadmap("outcome")}
        </p>
      </div>
    </section>
  );
}
