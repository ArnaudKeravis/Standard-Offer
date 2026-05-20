"use client";

import { useLocale, useTranslations } from "next-intl";

const anchors = [
  { id: "intro", key: "intro" as const },
  { id: "roadmap", key: "roadmap" as const },
  { id: "layers", key: "layers" as const },
  { id: "offerings", key: "offerings" as const },
  { id: "proof", key: "proof" as const },
] as const;

export function DeckFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("deck.nav");
  const locale = useLocale();

  return (
    <footer className="border-t border-[var(--spark-line)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-[var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-[var(--spark-ink)]">
            Sodexo Spark
          </p>
          <p className="mt-2 max-w-sm text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
            {t("tagline")}
          </p>
        </div>

        <div className="text-sm">
          <p className="font-medium text-[var(--spark-ink)]">{t("linksTitle")}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
            {anchors.map((a) => (
              <li key={a.id}>
                <a
                  href={`/${locale}#${a.id}`}
                  className="hover:text-[var(--spark-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {tNav(a.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_55%)]">
          © {new Date().getFullYear()} Sodexo — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
