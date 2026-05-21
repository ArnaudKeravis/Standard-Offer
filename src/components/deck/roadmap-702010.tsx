"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioPathChoice } from "@/components/deck/portfolio-path-choice";
import { getTierCatalogueHref } from "@/lib/solution-links";
import type { RoadmapTier } from "@/lib/spark-config";

const TIERS: {
  tier: RoadmapTier;
  accent: string;
  border: string;
  bg: string;
}[] = [
  {
    tier: "70",
    accent: "text-[var(--spark-iq)]",
    border: "border-[color:color-mix(in_oklab,var(--spark-iq),transparent_70%)]",
    bg: "bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_92%)]",
  },
  {
    tier: "20",
    accent: "text-[var(--spark-xp)]",
    border: "border-[color:color-mix(in_oklab,var(--spark-xp),transparent_70%)]",
    bg: "bg-[color:color-mix(in_oklab,var(--spark-amber-soft),transparent_40%)]",
  },
  {
    tier: "10",
    accent: "text-[var(--spark-os)]",
    border: "border-[color:color-mix(in_oklab,var(--spark-os),transparent_70%)]",
    bg: "bg-[color:color-mix(in_oklab,var(--spark-os),transparent_92%)]",
  },
];

export function Roadmap702010() {
  const t = useTranslations("deck.roadmap");

  return (
    <section
      id="roadmap"
      className="border-t border-[var(--spark-line)] bg-white"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-28 lg:py-32">
        <div className="deck-fade-up max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
            {t("kicker")}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
            {t("headline")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
            {t("sub")}
          </p>
        </div>

        <div id="roadmap-tiers" className="scroll-mt-28">
          <p className="deck-fade-up mb-8 mt-14 text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
            {t("tiersLabel")}
          </p>
          <p className="deck-fade-up mb-8 max-w-3xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
            {t("tiersNote")}
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map(({ tier, accent, border, bg }) => (
              <article
                key={tier}
                className={cn(
                  "deck-fade-up flex flex-col rounded-2xl border p-8",
                  border,
                  bg,
                )}
              >
                <p
                  className={cn(
                    "font-[var(--font-display)] text-5xl font-bold tabular-nums tracking-[-0.04em]",
                    accent,
                  )}
                >
                  {tier}%
                </p>
                <h3 className="mt-4 font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
                  {t(`tiers.${tier}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                  {t(`tiers.${tier}.body`)}
                </p>
                <p className="mt-4 text-xs font-medium text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                  {t(`tiers.${tier}.focus`)}
                </p>
                <a
                  href={getTierCatalogueHref(tier)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--spark-ink)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2"
                >
                  {t(`tiers.${tier}.cta`)}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </div>

        <PortfolioPathChoice />
      </div>
    </section>
  );
}
