"use client";

import { useTranslations } from "next-intl";
import {
  BUSINESS_GOAL_IDS,
  BUSINESS_GOAL_STYLES,
} from "@/lib/business-goals";
import { cn } from "@/lib/utils";

const GOALS = BUSINESS_GOAL_IDS.map((id) => ({
  id,
  ...BUSINESS_GOAL_STYLES[id],
}));

const sectionFrame =
  "relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-28 lg:py-32";

export function BusinessGoals() {
  const t = useTranslations("deck.businessGoals");

  return (
    <section
      id="business-goals"
      className="border-t border-[var(--spark-line)] bg-white"
    >
      <div className={sectionFrame}>
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {GOALS.map(({ id, barClass, accentClass }) => (
            <article
              key={id}
              className="deck-fade-up flex flex-col rounded-2xl border border-[var(--spark-line)] bg-[var(--spark-paper)] p-8"
            >
              <div className={cn("mb-5 h-1 w-10 rounded-full", barClass)} />
              <h3
                className={cn(
                  "font-[var(--font-display)] text-lg font-semibold uppercase tracking-[-0.02em] leading-snug",
                  accentClass,
                )}
              >
                {t(`goals.${id}.title`)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                {t(`goals.${id}.body`)}
              </p>
              <p className="mt-4 text-xs font-medium text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                {t(`goals.${id}.hint`)}
              </p>
            </article>
          ))}
        </div>

        <p className="deck-fade-up mt-10 max-w-3xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
          {t("bridge")}
        </p>
      </div>
    </section>
  );
}
