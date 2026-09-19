"use client";

import { formatClock } from "@/lib/workshops/tech-ambition/clock";
import type { TimerTone } from "@/lib/workshops/tech-ambition/clock";

type HeaderClockProps = {
  remainingMs: number;
  durationSec: number;
  running: boolean;
  tone: TimerTone;
  dark: boolean;
  onToggle: () => void;
};

const TONE_CLASS: Record<TimerTone, string> = {
  idle: "opacity-[0.32]",
  running: "opacity-100",
  amber: "text-[#ef9f1a] opacity-100",
  red: "ws-timer-pulse text-[#e24b4b] opacity-100",
};

export function HeaderClock({
  remainingMs,
  durationSec,
  running,
  tone,
  dark,
  onToggle,
}: HeaderClockProps) {
  const ink = dark ? "text-white" : "text-[var(--ws-ink)]";

  return (
    <button
      type="button"
      data-ws-hud
      onClick={onToggle}
      aria-label={running ? "Pause timer" : "Start timer"}
      className={`pointer-events-auto flex flex-col items-end leading-none ${ink}`}
    >
      <span
        className={`ws-timer text-[96px] font-medium tabular-nums ${TONE_CLASS[tone]}`}
      >
        {formatClock(remainingMs)}
      </span>
      <span
        className={`ws-kicker mt-1 text-[0.62rem] ${
          tone === "idle" ? "opacity-[0.32]" : "opacity-60"
        }`}
      >
        {running ? "Running" : tone === "idle" ? formatDuration(durationSec) : "Paused"}
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
      ? "bg-[#e24b4b]"
      : tone === "amber"
        ? "bg-[#ef9f1a]"
        : "bg-[var(--ws-accent)]";

  return (
    <div className="pointer-events-none h-[5px] w-full bg-black/15" aria-hidden>
      <div className={`h-full ${fill}`} style={{ width: `${width}%` }} />
    </div>
  );
}

function formatDuration(durationSec: number): string {
  const minutes = Math.round(durationSec / 60);
  return `${minutes} min`;
}
