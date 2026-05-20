"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Briefcase, Map } from "lucide-react";
import { XP_CATALOGUE_URL } from "@/lib/spark-config";
import { useLenisContext } from "@/components/providers/lenis-context";

export function PortfolioPathChoice() {
  const t = useTranslations("deck.roadmap.pathChoice");
  const { lenis, reducedMotion } = useLenisContext();

  const scrollToBusinessPath = () => {
    const el = document.getElementById("business-goals");
    if (!el) return;
    if (reducedMotion || !lenis) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    lenis.scrollTo(el, { offset: -80, duration: 1.1 });
  };

  return (
    <div id="roadmap-path-choice" className="deck-fade-up scroll-mt-28">
      <p className="mt-16 font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-2xl">
        {t("title")}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
        {t("lead")}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={scrollToBusinessPath}
          className="group relative flex flex-col rounded-2xl border border-[var(--spark-line)] bg-white p-8 text-left shadow-[0_20px_50px_rgba(14,26,74,0.06)] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <span
              className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_88%)] px-2 font-[var(--font-display)] text-sm font-bold tabular-nums text-[var(--spark-iq)]"
              aria-hidden
            >
              {t("business.label")}
            </span>
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_88%)] text-[var(--spark-iq)]">
              <Briefcase className="h-6 w-6" aria-hidden />
            </div>
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
          <div className="mb-6 flex items-start justify-between gap-4">
            <span
              className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white/10 px-2 font-[var(--font-display)] text-sm font-bold tabular-nums text-[var(--spark-amber)]"
              aria-hidden
            >
              {t("experience.label")}
            </span>
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--spark-amber)]">
              <Map className="h-6 w-6" aria-hidden />
            </div>
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
