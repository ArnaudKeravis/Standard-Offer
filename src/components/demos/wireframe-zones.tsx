"use client";

import { Eye, EyeOff, Route, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type PreviewKey = "persona" | "experience" | "journey";

export function ZoneBadge({
  number,
  label,
  icon: Icon,
  accentClass,
}: {
  number: 1 | 2 | 3;
  label: string;
  icon: typeof User;
  accentClass: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-sm",
        accentClass,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      Zone {number} · {label}
    </span>
  );
}

export function InsertionShell({
  zone,
  preview,
  active,
  onToggle,
  children,
  rationale,
  accentBorder,
  accentBadge,
  icon,
}: {
  zone: PreviewKey;
  preview: boolean;
  active: Record<PreviewKey, boolean>;
  onToggle: (key: PreviewKey) => void;
  children: React.ReactNode;
  rationale: string;
  accentBorder: string;
  accentBadge: string;
  icon: typeof User;
}) {
  const zoneNumber = zone === "persona" ? 1 : zone === "experience" ? 2 : 3;
  const zoneLabel =
    zone === "persona" ? "Persona" : zone === "experience" ? "Experience" : "Journey";

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-dashed p-1 transition-all duration-300",
        preview ? "border-solid bg-white shadow-lg" : accentBorder,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_94%)] px-4 py-3">
        <ZoneBadge number={zoneNumber as 1 | 2 | 3} label={zoneLabel} icon={icon} accentClass={accentBadge} />
        <button
          type="button"
          onClick={() => onToggle(zone)}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
            active[zone]
              ? "bg-[var(--spark-ink)] text-white"
              : "bg-white text-[var(--spark-ink)] hover:bg-[var(--spark-amber-soft)]",
          )}
        >
          {active[zone] ? (
            <>
              <EyeOff className="size-3.5" aria-hidden />
              Hide preview
            </>
          ) : (
            <>
              <Eye className="size-3.5" aria-hidden />
              Preview insert
            </>
          )}
        </button>
      </div>
      <p className="mx-4 mt-2 text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
        {rationale}
      </p>
      {active[zone] && <div className="p-4 md:p-6">{children}</div>}
    </div>
  );
}

export function WireframeLegend({
  kicker,
  title,
  sub,
  personaAccent = "bg-[var(--spark-os)]",
  experienceAccent = "bg-[var(--spark-amber)] text-[var(--spark-ink)]",
  journeyAccent = "bg-[var(--spark-iq)]",
}: {
  kicker: string;
  title: string;
  sub: string;
  personaAccent?: string;
  experienceAccent?: string;
  journeyAccent?: string;
}) {
  return (
    <div className="border-b border-[var(--spark-line)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 md:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
          {kicker}
        </p>
        <h1 className="mt-2 font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
          {sub}
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <ZoneBadge number={1} label="Persona" icon={User} accentClass={personaAccent} />
          </li>
          <li>
            <ZoneBadge number={2} label="Experience" icon={Sparkles} accentClass={experienceAccent} />
          </li>
          <li>
            <ZoneBadge number={3} label="Journey" icon={Route} accentClass={journeyAccent} />
          </li>
        </ul>
      </div>
    </div>
  );
}
