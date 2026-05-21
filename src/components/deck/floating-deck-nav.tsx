"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useLenisContext } from "@/components/providers/lenis-context";

const SECTION_IDS = [
  "intro",
  "context",
  "ambition",
  "layers",
  "businessGoals",
  "roadmap",
  "journey",
  "offerings",
  "proof",
  "ecosystem",
] as const;

export type DeckSectionId = (typeof SECTION_IDS)[number];

export function FloatingDeckNav() {
  const t = useTranslations("deck.nav");
  const { lenis, reducedMotion } = useLenisContext();
  const [active, setActive] = useState<DeckSectionId>("intro");

  const labelKeys = useMemo(
    () =>
      ({
        intro: "intro",
        context: "context",
        ambition: "ambition",
        layers: "layers",
        businessGoals: "businessGoals",
        journey: "journey",
        roadmap: "roadmap",
        offerings: "offerings",
        proof: "proof",
        ecosystem: "ecosystem",
      }) satisfies Record<DeckSectionId, string>,
    [],
  );

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id as DeckSectionId | undefined;
        if (top && SECTION_IDS.includes(top)) setActive(top);
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-45% 0px -45% 0px" },
    );

    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: DeckSectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (reducedMotion || !lenis) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    lenis.scrollTo(el, { offset: -72, duration: 1.1 });
  };

  return (
    <>
      {/* Desktop / tablet: floating rail */}
      <nav
        aria-label={t("aria")}
        className="pointer-events-none fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 md:block lg:left-6"
      >
        <div className="pointer-events-auto rounded-2xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-paper),transparent_12%)] p-2 shadow-[0_18px_50px_rgba(14,26,74,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--spark-paper),transparent_28%)]">
          <ul className="flex flex-col gap-0.5">
            {SECTION_IDS.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[11px] font-medium tracking-[0.06em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--spark-paper)]",
                      isActive
                        ? "text-[var(--spark-ink)]"
                        : "text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)] hover:text-[var(--spark-ink)]",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full border border-[var(--spark-line)] transition-all duration-200",
                        isActive
                          ? "scale-110 border-[var(--spark-amber)] bg-[var(--spark-amber)]"
                          : "bg-transparent group-hover:border-[color:color-mix(in_oklab,var(--spark-ink),transparent_55%)]",
                      )}
                      aria-hidden
                    />
                    <span className="max-w-[9.5rem] leading-snug">
                      {t(labelKeys[id])}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile: compact bottom rail */}
      <nav
        aria-label={t("ariaMobile")}
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-paper),transparent_8%)] p-1.5 shadow-lg backdrop-blur-md md:hidden"
      >
        {SECTION_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className={cn(
              "h-9 min-w-9 rounded-full px-2 text-[10px] font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--spark-paper)]",
              active === id
                ? "bg-[var(--spark-ink)] text-white"
                : "text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]",
            )}
            aria-current={active === id ? "true" : undefined}
            title={t(labelKeys[id])}
          >
            {SECTION_IDS.indexOf(id) + 1 < 10
              ? `0${SECTION_IDS.indexOf(id) + 1}`
              : String(SECTION_IDS.indexOf(id) + 1)}
          </button>
        ))}
      </nav>
    </>
  );
}
