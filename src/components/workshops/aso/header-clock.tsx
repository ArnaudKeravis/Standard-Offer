"use client";

import { formatClock } from "@/lib/workshops/tech-ambition/clock";
import type { TimerTone } from "@/lib/workshops/tech-ambition/clock";

const TONE_CLASS: Record<TimerTone, string> = {
  idle: "opacity-[0.34]",
  running: "opacity-100",
  amber: "text-[#f2c200] opacity-100",
  red: "aso-timer-pulse text-[var(--aso-pois)] opacity-100",
};

export function HeaderClock({
  remainingMs,
  durationSec,
  running,
  tone,
  dark,
  onToggle,
}: {
  remainingMs: number;
  durationSec: number;
  running: boolean;
  tone: TimerTone;
  dark: boolean;
  onToggle: () => void;
}) {
  const ink = dark ? "text-white" : "text-[var(--aso-ink)]";

  return (
    <button
      type="button"
      data-aso-hud
      onClick={onToggle}
      aria-label={running ? "Pause minuteur" : "Démarrer le minuteur"}
      className={`pointer-events-auto flex flex-col items-end leading-none ${ink}`}
    >
      <span className={`aso-timer text-[96px] leading-none ${TONE_CLASS[tone]}`}>
        {formatClock(remainingMs)}
      </span>
      <span className={`aso-kicker mt-1 ${tone === "idle" ? "opacity-40" : "opacity-70"}`}>
        {running ? "En course" : tone === "idle" ? `${Math.round(durationSec / 60)} min` : "Pause"}
      </span>
    </button>
  );
}

export function TimerRail({
  remainingMs,
  durationSec,
  tone,
}: {
  remainingMs: number;
  durationSec: number;
  tone: TimerTone;
}) {
  const width =
    durationSec > 0
      ? Math.max(0, Math.min(100, (remainingMs / (durationSec * 1000)) * 100))
      : 0;
  const fill =
    tone === "red"
      ? "bg-[var(--aso-pois)]"
      : tone === "amber"
        ? "bg-[var(--aso-jaune-deep)]"
        : "bg-[var(--aso-jaune)]";

  return (
    <div className="pointer-events-none h-[5px] w-full bg-black/20" aria-hidden>
      <div className={`h-full ${fill}`} style={{ width: `${width}%` }} />
    </div>
  );
}
