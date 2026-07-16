import Image from "next/image";
import Link from "next/link";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tUI } from "@/lib/persona-studio/utils/i18n";
import {
  accentForFamily,
  themeForFamily,
} from "@/lib/persona-studio/utils/family-theme";
import type { PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";

export type StudioAreaId = "WORK" | "HEAL" | "LEARN" | "PLAY";

export type AreaCard = {
  id: StudioAreaId;
  projectId: string;
  href: string;
  label: string;
  description: string;
  personaCount: number;
};

const COPY: Record<
  StudioLang,
  {
    mapAlt: string;
    personas: (n: number) => string;
    open: string;
  }
> = {
  en: {
    mapAlt:
      "Isometric illustration of Sodexo operating areas: workplaces, hospitals, campuses and venues",
    personas: (n) => `${n} personas`,
    open: "Open area",
  },
  fr: {
    mapAlt:
      "Illustration isométrique des territoires Sodexo : lieux de travail, hôpitaux, campus et sites événementiels",
    personas: (n) => `${n} personas`,
    open: "Ouvrir le territoire",
  },
};

/**
 * Studio home gateway — same isometric map pattern as XP Catalogue /areas,
 * linking into Persona Studio projects (one sheet format for every persona).
 */
export function AreasExplorer({
  lang,
  areas,
}: {
  lang: StudioLang;
  areas: AreaCard[];
}) {
  const copy = COPY[lang];

  return (
    <section aria-labelledby="studio-areas-heading" className="mt-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          id="studio-areas-heading"
          className="studio-display text-3xl font-bold tracking-tight text-[var(--studio-ink)] sm:text-4xl lg:text-5xl"
        >
          {tUI(lang, "areasTitle")}
        </h1>
        <p className="mt-3 text-base text-[var(--studio-muted)] sm:text-lg">
          {tUI(lang, "areasSubtitle")}
        </p>
      </div>

      <div className="studio-shadow-soft relative mt-8 overflow-hidden rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)]">
        <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]">
          <Image
            src="/persona-studio/areas/areas-isometric.png"
            alt={copy.mapAlt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center opacity-90"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--studio-paper)]/50 via-transparent to-[var(--studio-paper)]/75"
          />

          <ul className="relative z-10 grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:absolute lg:inset-0 lg:grid-cols-2 lg:content-between lg:p-8">
            {areas.map((area, index) => {
              const family = area.id as PersonaFamily;
              const accent = accentForFamily(family);
              const theme = themeForFamily(family);
              return (
                <li
                  key={area.id}
                  className={
                    index % 2 === 0
                      ? "lg:max-w-md lg:justify-self-start"
                      : "lg:max-w-md lg:justify-self-end"
                  }
                >
                  <Link
                    href={area.href}
                    data-studio-theme={theme}
                    style={{ ["--persona-accent" as string]: accent }}
                    className="studio-lift studio-focusable group block rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-md transition-[transform,box-shadow,background-color] duration-200 hover:bg-white/95 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
                        {area.label}
                      </p>
                      <span className="rounded-full studio-accent-soft px-2.5 py-0.5 text-xs font-medium tabular-nums">
                        {copy.personas(area.personaCount)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--studio-ink)]">
                      {area.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--studio-ink)]">
                      {copy.open}
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
