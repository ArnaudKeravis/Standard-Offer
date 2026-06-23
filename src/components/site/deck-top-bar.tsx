"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "", labelKey: "home" as const, match: (path: string, locale: string) => {
    const home = `/${locale}`;
    return path === home || path === `${home}/`;
  }},
  { href: "/demos/thales", labelKey: "thalesMap" as const, match: (path: string) => path.includes("/demos/thales") },
];

export function DeckTopBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

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

        <nav
          aria-label={t("aria")}
          className="ml-4 hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const href = `/${locale}${item.href}`;
            const active = item.match(pathname, locale);
            const isDemo = item.href.startsWith("/demos");

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--spark-paper)]",
                  active
                    ? "bg-[var(--spark-ink)] text-white"
                    : "text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)] hover:bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_6%)] hover:text-[var(--spark-ink)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {isDemo && <MapPin className="size-3.5" aria-hidden />}
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/${locale}/demos/thales`}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--spark-line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--spark-ink)] shadow-sm transition-colors hover:border-[var(--spark-amber)] hover:bg-[var(--spark-amber-soft)] md:hidden"
          >
            <MapPin className="size-3.5" aria-hidden />
            {t("thalesMapShort")}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
