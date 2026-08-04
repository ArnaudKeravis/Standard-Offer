import Link from "next/link";
import {
  BookOpen,
  GitCompareArrows,
  Lightbulb,
  Presentation,
  Route,
  Users,
} from "lucide-react";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import {
  AreasExplorer,
  type AreaCard,
} from "@/components/persona-studio/areas/areas-explorer";

/**
 * Persona Studio lobby — high-level presentation, key uses (product + workshop),
 * then the areas map as the working entry point.
 */
export function StudioHome({
  lang,
  areas,
}: {
  lang: StudioLang;
  areas: AreaCard[];
}) {
  const features = [
    {
      href: "#areas",
      icon: Users,
      title: tUI(lang, "homeFeatureBrowseTitle"),
      body: tUI(lang, "homeFeatureBrowseBody"),
    },
    {
      href: "#areas",
      icon: Route,
      title: tUI(lang, "homeFeatureJourneyTitle"),
      body: tUI(lang, "homeFeatureJourneyBody"),
    },
    {
      href: "/studio/projects/proj-xp-work/compare",
      icon: GitCompareArrows,
      title: tUI(lang, "homeFeatureCompareTitle"),
      body: tUI(lang, "homeFeatureCompareBody"),
    },
    {
      href: "/studio/projects/proj-xp-work/challenge",
      icon: Lightbulb,
      title: tUI(lang, "homeFeatureChallengeTitle"),
      body: tUI(lang, "homeFeatureChallengeBody"),
    },
    {
      href: "/studio/projects/proj-xp-work/present",
      icon: Presentation,
      title: tUI(lang, "homeFeaturePresentTitle"),
      body: tUI(lang, "homeFeaturePresentBody"),
    },
    {
      href: "/studio/method",
      icon: BookOpen,
      title: tUI(lang, "homeFeatureMethodTitle"),
      body: tUI(lang, "homeFeatureMethodBody"),
    },
  ] as const;

  return (
    <div className="space-y-20 pb-8 pt-6 sm:pt-10">
      {/* Hero — brand first, one job */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--studio-accent)]">
          Persona Studio
        </p>
        <h1 className="studio-display mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-[var(--studio-ink)] sm:text-5xl lg:text-6xl">
          {tUI(lang, "homeHeroTitle")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--studio-muted)] sm:text-lg">
          {tUI(lang, "homeHeroSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#areas"
            className="inline-flex items-center rounded-full bg-[var(--studio-ink)] px-5 py-2.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            {tUI(lang, "homeCtaAreas")}
          </a>
          <Link
            href="/studio/method"
            className="inline-flex items-center rounded-full border border-[var(--studio-line)] px-5 py-2.5 text-sm font-medium text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            {tUI(lang, "homeCtaMethod")}
          </Link>
        </div>
      </header>

      {/* Who it's for — product + workshop */}
      <section
        aria-labelledby="home-audience-heading"
        className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2"
      >
        <article className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
            {tUI(lang, "homeAudienceProductEyebrow")}
          </p>
          <h2
            id="home-audience-heading"
            className="studio-display mt-2 text-xl font-semibold text-[var(--studio-ink)]"
          >
            {tUI(lang, "homeAudienceProductTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--studio-muted)] sm:text-base">
            {tUI(lang, "homeAudienceProductBody")}
          </p>
        </article>
        <article className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
            {tUI(lang, "homeAudienceWorkshopEyebrow")}
          </p>
          <h2 className="studio-display mt-2 text-xl font-semibold text-[var(--studio-ink)]">
            {tUI(lang, "homeAudienceWorkshopTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--studio-muted)] sm:text-base">
            {tUI(lang, "homeAudienceWorkshopBody")}
          </p>
        </article>
      </section>

      {/* Key features */}
      <section aria-labelledby="home-features-heading" className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
            {tUI(lang, "homeFeaturesEyebrow")}
          </p>
          <h2
            id="home-features-heading"
            className="studio-display mt-2 text-2xl font-bold text-[var(--studio-ink)] sm:text-3xl"
          >
            {tUI(lang, "homeFeaturesTitle")}
          </h2>
          <p className="mt-2 text-sm text-[var(--studio-muted)] sm:text-base">
            {tUI(lang, "homeFeaturesIntro")}
          </p>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const className =
              "studio-enter studio-lift flex h-full flex-col rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]";
            const inner = (
              <>
                <span className="flex size-10 items-center justify-center rounded-2xl studio-accent-soft text-[var(--studio-accent)]">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="studio-display mt-4 text-base font-semibold text-[var(--studio-ink)]">
                  {feature.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-[var(--studio-muted)]">
                  {feature.body}
                </span>
              </>
            );
            return (
              <li
                key={feature.title}
                style={{ ["--stagger-index" as string]: i }}
              >
                {feature.href.startsWith("#") ? (
                  <a href={feature.href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link href={feature.href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-[var(--studio-muted)]">
          {tUI(lang, "homeFeaturesNote")}
        </p>
      </section>

      {/* Areas — working entry */}
      <div id="areas" className="scroll-mt-24">
        <AreasExplorer lang={lang} areas={areas} headingLevel="h2" />
      </div>
    </div>
  );
}
