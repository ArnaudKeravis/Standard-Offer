"use client";

import Link from "next/link";

import { getLabsGateUi } from "@/lib/sodexo-labs/i18n/gates";
import { labsSessionQuery } from "@/lib/sodexo-labs/parse-session";
import type { LabsArea, LabsAudience, LabsLang } from "@/lib/sodexo-labs/schemas";

type LabsHudProps = {
  lang: LabsLang;
  audience: LabsAudience;
  area: LabsArea;
  index: number;
  total: number;
  dark: boolean;
  credentialsLabel: string;
  changeLabel: string;
  onSelectSlide: (index: number) => void;
  onChangeSession: () => void;
};

export function LabsHud({
  lang,
  audience,
  area,
  index,
  total,
  dark,
  credentialsLabel,
  changeLabel,
  onSelectSlide,
  onChangeSession,
}: LabsHudProps) {
  const ui = getLabsGateUi(lang);
  const credentialsHref = `/labs/credentials${labsSessionQuery({ lang, audience, area })}`;
  const tone = dark
    ? {
        text: "text-white/85",
        strong: "text-white",
        muted: "text-white/65",
        dot: "bg-white/35",
        dotActive: "bg-white",
        link: "text-white hover:text-white",
        button: "text-white hover:text-white focus-visible:ring-white/70",
      }
    : {
        text: "text-[var(--labs-muted)]",
        strong: "text-[var(--labs-ink)]",
        muted: "text-[color-mix(in_srgb,var(--labs-ink)_55%,transparent)]",
        dot: "bg-[color-mix(in_srgb,var(--labs-ink)_22%,transparent)]",
        dotActive: "bg-[var(--labs-accent)]",
        link: "text-[var(--labs-navy)] hover:text-[var(--labs-blue)]",
        button:
          "text-[var(--labs-navy)] hover:text-[var(--labs-blue)] focus-visible:ring-[var(--labs-blue)]",
      };

  return (
    <header
      className={`labs-body pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-[4vw] pt-[3vh] ${tone.text}`}
      data-labs-hud={dark ? "dark" : "light"}
    >
      <div className="pointer-events-auto flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm tracking-[0.04em]">
        <span className={tone.strong}>{ui.langLabel[lang]}</span>
        <span className={tone.muted} aria-hidden>
          ·
        </span>
        <span className={tone.strong}>{ui.audienceLabel[audience]}</span>
        <span className={tone.muted} aria-hidden>
          ·
        </span>
        <span className={tone.strong} style={{ color: "var(--labs-accent)" }}>
          {ui.areaLabel[area]}
        </span>
      </div>

      <nav
        className="pointer-events-auto flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-5"
        aria-label="Presentation controls"
      >
        <ol className="flex items-center gap-1.5" aria-label="Slide progress">
          {Array.from({ length: total }, (_, i) => (
            <li key={i}>
              <button
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => onSelectSlide(i)}
                className={`block h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  i === index ? tone.dotActive : tone.dot
                } ${
                  dark
                    ? "focus-visible:ring-white/50 focus-visible:ring-offset-[#0B1020]"
                    : "focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-[var(--labs-paper)]"
                }`}
              />
            </li>
          ))}
        </ol>

        <p className={`hidden text-xs tabular-nums sm:block ${tone.muted}`}>
          {index + 1} / {total}
        </p>

        <Link
          href={credentialsHref}
          className={`text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${tone.link} ${
            dark
              ? "focus-visible:ring-white/50 focus-visible:ring-offset-[#0B1020]"
              : "focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-[var(--labs-paper)]"
          }`}
        >
          {credentialsLabel}
        </Link>

        <button
          type="button"
          onClick={onChangeSession}
          aria-label={changeLabel}
          className={`text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${tone.button} ${
            dark
              ? "focus-visible:ring-offset-[#0B1020]"
              : "focus-visible:ring-offset-[var(--labs-paper)]"
          }`}
        >
          {changeLabel}
        </button>
      </nav>
    </header>
  );
}
