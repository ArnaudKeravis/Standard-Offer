"use client";

import Link from "next/link";

import type { LabsArea, LabsAudience } from "@/lib/sodexo-labs/schemas";

const AUDIENCE_LABEL: Record<LabsAudience, string> = {
  internal: "Internal",
  external: "External",
};

const AREA_LABEL: Record<LabsArea, string> = {
  work: "Work",
  heal: "Heal",
  play: "Play",
  learn: "Learn",
};

type LabsHudProps = {
  audience: LabsAudience;
  area: LabsArea;
  index: number;
  total: number;
  dark: boolean;
  onSelectSlide: (index: number) => void;
  onChangeSession: () => void;
};

export function LabsHud({
  audience,
  area,
  index,
  total,
  dark,
  onSelectSlide,
  onChangeSession,
}: LabsHudProps) {
  const credentialsHref = `/labs/credentials?audience=${audience}&area=${area}`;
  const tone = dark
    ? {
        text: "text-white/85",
        strong: "text-white",
        muted: "text-white/65",
        dot: "bg-white/35",
        dotActive: "bg-white",
        link: "text-white hover:text-white",
        button:
          "text-white hover:text-white focus-visible:ring-white/70",
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
        <span className={tone.strong}>{AUDIENCE_LABEL[audience]}</span>
        <span className={tone.muted} aria-hidden>
          ·
        </span>
        <span className={tone.strong} style={{ color: "var(--labs-accent)" }}>
          {AREA_LABEL[area]}
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
          Credentials
        </Link>

        <button
          type="button"
          onClick={onChangeSession}
          aria-label="Change session"
          className={`text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${tone.button} ${
            dark
              ? "focus-visible:ring-offset-[#0B1020]"
              : "focus-visible:ring-offset-[var(--labs-paper)]"
          }`}
        >
          Change
        </button>
      </nav>
    </header>
  );
}
