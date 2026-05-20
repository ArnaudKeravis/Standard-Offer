"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";

function withLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale: Locale = locale === "en" ? "fr" : "en";

  return (
    <button
      type="button"
      onClick={() => {
        const hash =
          typeof window !== "undefined" ? window.location.hash : "";
        router.push(withLocale(pathname, nextLocale) + hash);
      }}
      className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--spark-line)] bg-white/40 px-3 text-sm font-medium text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)] transition-colors hover:bg-white/70 hover:text-[var(--spark-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--spark-paper)]"
      aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
    >
      <Globe className="h-4 w-4" aria-hidden />
      <span className="text-xs tracking-[0.08em]">{nextLocale}</span>
    </button>
  );
}

