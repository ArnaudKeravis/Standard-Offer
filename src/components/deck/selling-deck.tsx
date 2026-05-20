"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { OutlinedHeadline } from "@/components/brand/outlined-headline";
import { FloatingDeckNav } from "@/components/deck/floating-deck-nav";
import { Roadmap702010 } from "@/components/deck/roadmap-702010";
import { SolutionJourneyStrip } from "@/components/deck/solution-journey-strip";
import { useLenisContext } from "@/components/providers/lenis-context";
import { cn } from "@/lib/utils";

const sectionFrame =
  "relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-28 lg:py-32";

export function SellingDeck() {
  const t = useTranslations("deck");
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useLenisContext();

  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const q = gsap.utils.selector(rootRef);

    const ctx = gsap.context(() => {
      q(".deck-parallax-slow").forEach((el) => {
        gsap.to(el, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      q(".deck-parallax-fast").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });

      q(".deck-fade-up").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(q(".deck-stat-card"), {
        y: 36,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#context",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(q(".deck-pillar"), {
        x: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#ambition",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(q(".deck-layer-card"), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#layers",
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    }, rootRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, [reducedMotion]);

  const stats = ["stat1", "stat2", "stat3", "stat4"] as const;
  const pillars = ["p1", "p2", "p3"] as const;
  const layers = [
    { id: "iq" as const, barClass: "bg-[var(--spark-iq)]" },
    { id: "xp" as const, barClass: "bg-[var(--spark-xp)]" },
    { id: "os" as const, barClass: "bg-[var(--spark-os)]" },
  ];
  const offerings = ["o1", "o2", "o3", "o4"] as const;
  const quotes = ["q1", "q2", "q3"] as const;

  return (
    <div
      ref={rootRef}
      className="relative pb-28 pl-1 md:pb-0 md:pl-2 lg:pl-36"
    >
      <FloatingDeckNav />

      {/* Intro */}
      <section
        id="intro"
        className="relative min-h-[min(100dvh,920px)] overflow-hidden bg-[var(--spark-ink-deep)] text-white"
      >
        <div className="deck-parallax-slow pointer-events-none absolute -left-1/4 top-1/4 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--spark-iq),transparent_20%),transparent_70%)] opacity-40" />
        <div className="deck-parallax-fast pointer-events-none absolute -right-1/3 bottom-0 h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-[radial-gradient(circle_at_70%_70%,color-mix(in_oklab,var(--spark-amber),transparent_25%),transparent_72%)] opacity-35" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] [background-size:64px_64px]" />

        <div
          className={cn(
            sectionFrame,
            "flex min-h-[min(100dvh,920px)] flex-col justify-center pb-28 pt-24",
          )}
        >
          <div className="deck-fade-up max-w-4xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,white,transparent_35%)]">
              {t("intro.kicker")}
            </p>
            <OutlinedHeadline
              tone="dark"
              solid={t("intro.titleSolid")}
              outline={t("intro.titleOutline")}
            />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:color-mix(in_oklab,white,transparent_28%)] md:text-xl">
              {t("intro.lead")}
            </p>
          </div>

          <a
            href="#context"
            className="deck-fade-up mt-16 inline-flex items-center gap-2 text-sm font-medium text-[color:color-mix(in_oklab,white,transparent_22%)] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--spark-ink-deep)]"
          >
            <span>{t("intro.scroll")}</span>
            <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
      </section>

      {/* Context */}
      <section
        id="context"
        className="border-t border-[var(--spark-line)] bg-[var(--spark-paper)]"
      >
        <div className={sectionFrame}>
          <div className="deck-fade-up mb-14 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
              {t("context.kicker")}
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              {t("context.headline")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)] md:text-lg">
              {t("context.sub")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((key) => (
              <article
                key={key}
                className="deck-stat-card flex flex-col rounded-2xl border border-[var(--spark-line)] bg-white p-6 shadow-[0_1px_0_rgba(14,26,74,0.04)]"
              >
                <p className="font-[var(--font-display)] text-3xl tabular-nums tracking-[-0.04em] text-[var(--spark-ink)] md:text-4xl">
                  {t(`context.stats.${key}.value`)}
                </p>
                <p className="mt-3 text-sm font-medium leading-snug text-[var(--spark-ink)]">
                  {t(`context.stats.${key}.label`)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                  {t(`context.stats.${key}.hint`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ambition */}
      <section id="ambition" className="relative bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--spark-line)]" />
        <div className={sectionFrame}>
          <div className="deck-fade-up mb-14 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
              {t("ambition.kicker")}
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              {t("ambition.headline")}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((key) => (
              <article
                key={key}
                className="deck-pillar relative overflow-hidden rounded-2xl border border-[var(--spark-line)] bg-[var(--spark-paper)] p-8"
              >
                <div className="absolute right-6 top-6 font-[var(--font-display)] text-5xl font-bold tabular-nums leading-none text-[color:color-mix(in_oklab,var(--spark-ink),transparent_88%)]">
                  {String(pillars.indexOf(key) + 1).padStart(2, "0")}
                </div>
                <h3 className="max-w-[18ch] font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
                  {t(`ambition.pillars.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                  {t(`ambition.pillars.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Three layers */}
      <section
        id="layers"
        className="border-t border-[var(--spark-line)] bg-[var(--spark-paper)]"
      >
        <div className={sectionFrame}>
          <div className="deck-fade-up mb-14 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
              {t("layers.kicker")}
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              {t("layers.headline")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
              {t("layers.sub")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {layers.map((layer) => (
              <article
                key={layer.id}
                className="deck-layer-card group flex flex-col rounded-2xl border border-[var(--spark-line)] bg-white p-8 shadow-[0_18px_40px_rgba(14,26,74,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className={cn("mb-6 h-1 w-12 rounded-full", layer.barClass)} />
                <h3 className="font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
                  {t(`layers.${layer.id}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                  {t(`layers.${layer.id}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Roadmap702010 />

      {/* Offerings (selling highlights, not catalogue) */}
      <section id="offerings" className="relative bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--spark-line)]" />
        <div className={sectionFrame}>
          <div className="deck-fade-up mb-14 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
              {t("offerings.kicker")}
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              {t("offerings.headline")}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {offerings.map((key, i) => (
              <article
                key={key}
                className={cn(
                  "deck-fade-up rounded-2xl border border-[var(--spark-line)] p-8",
                  i === 0 && "md:col-span-2 md:flex md:gap-12",
                  i === 0
                    ? "bg-[var(--spark-amber-soft)]"
                    : "bg-[var(--spark-paper)]",
                )}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
                    {t(`offerings.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                    {t(`offerings.items.${key}.body`)}
                  </p>
                </div>
                {i === 0 && (
                  <div className="mt-6 shrink-0 md:mt-0 md:w-48">
                    <p className="font-[var(--font-display)] text-4xl tabular-nums text-[var(--spark-ink)]">
                      {t("offerings.highlightMetric")}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                      {t("offerings.highlightLabel")}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <SolutionJourneyStrip />
        </div>
      </section>

      {/* Proof */}
      <section
        id="proof"
        className="border-t border-[var(--spark-line)] bg-[var(--spark-ink-deep)] text-white"
      >
        <div className={sectionFrame}>
          <div className="deck-fade-up mb-14 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,white,transparent_45%)]">
              {t("proof.kicker")}
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] md:text-4xl">
              {t("proof.headline")}
            </h2>
          </div>

          <div className="space-y-12">
            {quotes.map((key) => (
              <blockquote
                key={key}
                className="deck-fade-up border-l-2 border-[var(--spark-amber)] pl-8"
              >
                <p className="font-[var(--font-display)] text-2xl leading-snug tracking-[-0.03em] text-[color:color-mix(in_oklab,white,transparent_8%)] md:text-3xl">
                  {t(`proof.quotes.${key}.quote`)}
                </p>
                <footer className="mt-6 text-sm text-[color:color-mix(in_oklab,white,transparent_35%)]">
                  {t(`proof.quotes.${key}.attribution`)}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem closing */}
      <section id="ecosystem" className="bg-[var(--spark-paper)]">
        <div className={sectionFrame}>
          <div className="deck-fade-up mb-12 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                {t("ecosystem.kicker")}
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
                {t("ecosystem.headline")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
                {t("ecosystem.body")}
              </p>
            </div>
            <div className="flex flex-col justify-end gap-6 rounded-2xl border border-[var(--spark-line)] bg-white p-8">
              <div>
                <p className="font-[var(--font-display)] text-3xl tabular-nums text-[var(--spark-ink)]">
                  {t("ecosystem.m1.value")}
                </p>
                <p className="mt-1 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                  {t("ecosystem.m1.label")}
                </p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-3xl tabular-nums text-[var(--spark-ink)]">
                  {t("ecosystem.m2.value")}
                </p>
                <p className="mt-1 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                  {t("ecosystem.m2.label")}
                </p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-3xl tabular-nums text-[var(--spark-ink)]">
                  {t("ecosystem.m3.value")}
                </p>
                <p className="mt-1 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                  {t("ecosystem.m3.label")}
                </p>
              </div>
            </div>
          </div>

          <div className="deck-fade-up h-px w-full bg-[var(--spark-line)]" />
          <p className="deck-fade-up mt-10 max-w-2xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
            {t("ecosystem.closing")}
          </p>
        </div>
      </section>
    </div>
  );
}
