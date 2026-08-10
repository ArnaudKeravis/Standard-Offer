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
  slideLabels: string[];
  credentialsLabel: string;
  changeLabel: string;
  onSelectSlide: (index: number) => void;
  onChangeSession: () => void;
};

const pressClass =
  "transition-transform duration-100 ease-out active:scale-[0.97]";

export function LabsHud({
  lang,
  audience,
  area,
  index,
  total,
  dark,
  slideLabels,
  credentialsLabel,
  changeLabel,
  onSelectSlide,
  onChangeSession,
}: LabsHudProps) {
  const ui = getLabsGateUi(lang);
  const credentialsHref = `/labs/credentials${labsSessionQuery({ lang, audience, area })}`;
  const currentLabel = slideLabels[index] ?? `${index + 1}`;
  const tone = dark
    ? {
        shell:
          "border-white/12 bg-[color-mix(in_srgb,#0B1020_55%,transparent)] text-white/85",
        strong: "text-white",
        muted: "text-white/60",
        dot: "bg-white/35",
        dotActive: "bg-white",
        link: "text-white/90 hover:text-white",
        button: "text-white/90 hover:text-white focus-visible:ring-white/70",
        tip: "bg-[#0B1020] text-white",
        ringOffset: "focus-visible:ring-offset-[#0B1020]",
        ring: "focus-visible:ring-white/50",
      }
    : {
        shell:
          "border-[color-mix(in_srgb,var(--labs-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--labs-paper)_72%,white)] text-[var(--labs-muted)]",
        strong: "text-[var(--labs-ink)]",
        muted: "text-[color-mix(in_srgb,var(--labs-ink)_55%,transparent)]",
        dot: "bg-[color-mix(in_srgb,var(--labs-ink)_22%,transparent)]",
        dotActive: "bg-[var(--labs-accent)]",
        link: "text-[var(--labs-navy)] hover:text-[var(--labs-blue)]",
        button:
          "text-[var(--labs-navy)] hover:text-[var(--labs-blue)] focus-visible:ring-[var(--labs-blue)]",
        tip: "bg-[var(--labs-ink)] text-white",
        ringOffset: "focus-visible:ring-offset-[var(--labs-paper)]",
        ring: "focus-visible:ring-[var(--labs-blue)]",
      };

  return (
    <header
      className="labs-body pointer-events-none absolute inset-x-0 top-0 z-20 px-[3vw] pt-[2.4vh]"
      data-labs-hud={dark ? "dark" : "light"}
    >
      <div
        className={`pointer-events-auto mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 shadow-[0_8px_28px_rgba(11,16,32,0.08)] backdrop-blur-xl backdrop-saturate-150 labs-hud-material ${tone.shell}`}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 text-sm tracking-[0.03em]">
          <span className={`font-medium ${tone.strong}`}>
            {ui.langLabel[lang]}
          </span>
          <span className={tone.muted} aria-hidden>
            ·
          </span>
          <span className={`font-medium ${tone.strong}`}>
            {ui.audienceLabel[audience]}
          </span>
          <span className={tone.muted} aria-hidden>
            ·
          </span>
          <span
            className="font-medium"
            style={{ color: "var(--labs-accent)" }}
          >
            {ui.areaLabel[area]}
          </span>
        </div>

        <nav
          className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4"
          aria-label="Presentation controls"
        >
          <div className="flex items-center gap-3">
            <p
              className={`hidden text-xs font-medium tracking-[0.04em] sm:block ${tone.muted}`}
              aria-live="polite"
            >
              {currentLabel}
              <span className="mx-1.5 opacity-50" aria-hidden>
                ·
              </span>
              <span className="tabular-nums">
                {index + 1}/{total}
              </span>
            </p>

            <ol className="flex items-center gap-1" aria-label="Slide progress">
              {Array.from({ length: total }, (_, i) => {
                const label = slideLabels[i] ?? `Slide ${i + 1}`;
                const active = i === index;
                return (
                  <li key={i} className="relative">
                    <button
                      type="button"
                      title={label}
                      aria-label={label}
                      aria-current={active ? "true" : undefined}
                      onClick={() => onSelectSlide(i)}
                      className={`group relative block rounded-full focus-visible:outline-none focus-visible:ring-2 ${pressClass} ${tone.ring} ${tone.ringOffset} ${
                        active ? "h-2.5 w-5" : "h-2 w-2"
                      }`}
                    >
                      <span
                        className={`block h-full w-full rounded-full transition-colors ${
                          active ? tone.dotActive : tone.dot
                        }`}
                      />
                      <span
                        className={`pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-30 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold tracking-[0.06em] uppercase opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${tone.tip}`}
                      >
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <Link
            href={credentialsHref}
            className={`text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 ${pressClass} ${tone.link} ${tone.ring} ${tone.ringOffset}`}
          >
            {credentialsLabel}
          </Link>

          <button
            type="button"
            onClick={onChangeSession}
            aria-label={changeLabel}
            className={`text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 ${pressClass} ${tone.button} ${tone.ringOffset}`}
          >
            {changeLabel}
          </button>
        </nav>
      </div>
    </header>
  );
}
