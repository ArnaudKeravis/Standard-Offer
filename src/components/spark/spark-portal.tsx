"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Briefcase, Map } from "lucide-react";
import { XP_CATALOGUE_URL } from "@/lib/spark-config";
import { LocaleSwitcher } from "@/components/site/locale-switcher";

export function SparkPortal() {
  const t = useTranslations("portal");
  const locale = useLocale();

  return (
    <main
      id="content"
      className="min-h-[min(100dvh,900px)] bg-[var(--spark-paper)] text-[var(--spark-ink)]"
    >
      <header className="border-b border-[var(--spark-line)]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 md:px-10">
          <span className="font-[var(--font-display)] text-sm font-extrabold tracking-[-0.02em]">
            Sodexo Spark
          </span>
          <LocaleSwitcher />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
          {t("kicker")}
        </p>
        <h1 className="mt-4 max-w-3xl font-[var(--font-display)] text-4xl tracking-[-0.04em] md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
          {t("lead")}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Link
            href={`/${locale}/deck`}
            className="group relative flex flex-col rounded-2xl border border-[var(--spark-line)] bg-white p-8 shadow-[0_20px_50px_rgba(14,26,74,0.06)] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--spark-paper)]"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_88%)] text-[var(--spark-iq)]">
              <Briefcase className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="font-[var(--font-display)] text-2xl tracking-[-0.03em]">
              {t("business.title")}
            </h2>
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
          </Link>

          <a
            href={XP_CATALOGUE_URL}
            className="group relative flex flex-col rounded-2xl border border-[var(--spark-line)] bg-[var(--spark-ink-deep)] p-8 text-white shadow-[0_20px_50px_rgba(5,11,46,0.25)] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--spark-paper)]"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[var(--spark-amber)]">
              <Map className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="font-[var(--font-display)] text-2xl tracking-[-0.03em]">
              {t("experience.title")}
            </h2>
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

        <p className="mt-12 max-w-2xl text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
          {t("footnote")}
        </p>
      </div>
    </main>
  );
}
