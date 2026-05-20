"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Briefcase, Map } from "lucide-react";
import { XP_CATALOGUE_URL } from "@/lib/spark-config";
import { useLenisContext } from "@/components/providers/lenis-context";

export function PortfolioPathChoice() {
  const t = useTranslations("deck.roadmap.pathChoice");
  const { lenis, reducedMotion } = useLenisContext();

  const scrollToTiers = () => {
    const el = document.getElementById("roadmap-tiers");
    if (!el) return;
    if (reducedMotion || !lenis) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    lenis.scrollTo(el, { offset: -80, duration: 1.1 });
  };

  return (
    <div className="deck-fade-up">
      <p className="mt-10 font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-2xl">
        {t("title")}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
        {t("lead")}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={scrollToTiers}
          className="group relative flex flex-col rounded-2xl border border-[var(--spark-line)] bg-white p-8 text-left shadow-[0_20px_50px_rgba(14,26,74,0.06)] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_88%)] text-[var(--spark-iq)]">
            <Briefcase className="h-6 w-6" aria-hidden />
          </div>
          <h3 className="font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--spark-ink)]">
            {t("business.title")}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
            {t("business.body")}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--spark-iq)]">
            {t("business.badge")}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--spark-ink)]">
            {t("business.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>

        <a
          href={XP_CATALOGUE_URL}
          className="group relative flex flex-col rounded-2xl border border-[var(--spark-line)] bg-[var(--spark-ink-deep)] p-8 text-white shadow-[0_20px_50px_rgba(5,11,46,0.25)] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[var(--spark-amber)]">
            <Map className="h-6 w-6" aria-hidden />
          </div>
          <h3 className="font-[var(--font-display)] text-2xl tracking-[-0.03em]">
            {t("experience.title")}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,white,transparent_28%)]">
            {t("experience.body")}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--spark-amber)]">
            {t("experience.badge")}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
            {t("experience.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>

      <p className="mt-8 max-w-2xl text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
        {t("footnote")}
      </p>
    </div>
  );
}
