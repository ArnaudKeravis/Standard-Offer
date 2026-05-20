"use client";

import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/site/locale-switcher";

export function DeckTopBar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--spark-line)]/80 bg-[color:color-mix(in_oklab,var(--spark-paper),transparent_6%)] backdrop-blur-md supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--spark-paper),transparent_35%)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-6 md:h-16 md:px-12 lg:pl-40">
        <a
          href={`/${locale}#intro`}
          className="group flex min-w-0 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--spark-paper)] sm:flex-row sm:items-baseline sm:gap-2"
        >
          <span className="font-[var(--font-display)] text-sm font-extrabold tracking-[-0.02em] text-[var(--spark-ink)]">
            Sodexo Spark
          </span>
          <span className="hidden truncate text-xs font-medium text-[color:color-mix(in_oklab,var(--spark-ink),transparent_50%)] sm:inline">
            {t("subtitle")}
          </span>
        </a>

        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
