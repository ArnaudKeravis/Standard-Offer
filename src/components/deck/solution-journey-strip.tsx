"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import {
  getCatalogueHref,
  getJourneyHref,
  getLinksByTier,
  getSolutionLinks,
} from "@/lib/solution-links";
import { catalogueSolutionsUrl } from "@/lib/spark-config";
import { cn } from "@/lib/utils";

export function SolutionJourneyStrip() {
  const t = useTranslations("deck.journeyStrip");
  const standard = getLinksByTier("70").filter((s) => !s.clientOnly);
  const featured = getSolutionLinks().filter(
    (s) => s.journeyRefs.length > 0 && s.roadmapTier === "70",
  ).slice(0, 6);

  return (
    <section
      id="journey"
      className="deck-fade-up border-t border-[var(--spark-line)] bg-[var(--spark-paper)]"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-28 lg:py-32">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
          {t("kicker")}
        </p>
        <h3 className="mt-3 font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--spark-ink)]">
          {t("headline")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          {t("sub", { count: standard.length })}
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {featured.map((link) => {
          const ref = link.journeyRefs[0];
          const catalogueHref = getCatalogueHref(link);
          const journeyHref = ref ? getJourneyHref(ref) : null;

          return (
            <li
              key={link.slug}
              className="rounded-xl border border-[var(--spark-line)] bg-[var(--spark-paper)] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                    {t("tier70")} · {link.layer.toUpperCase()}
                  </p>
                  <p className="mt-1 font-medium text-[var(--spark-ink)]">
                    {link.name}
                  </p>
                </div>
              </div>

              {ref && (
                <p className="mt-3 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                  <span className="font-medium text-[var(--spark-ink)]">
                    {t("persona")}:
                  </span>{" "}
                  {ref.personaId.replace(/-/g, " ")} ·{" "}
                  <span className="font-medium text-[var(--spark-ink)]">
                    {t("moment")}:
                  </span>{" "}
                  {ref.momentLabel}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                {journeyHref && (
                  <a
                    href={journeyHref}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium text-[var(--spark-iq)]",
                      "underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                    )}
                  >
                    {t("openMoment")}
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
                    {t("openSolution")}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <a
        href={catalogueSolutionsUrl(undefined, { from: "standard-offer" })}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--spark-ink)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2"
      >
        {t("exploreAll")}
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
      </div>
    </section>
  );
}
