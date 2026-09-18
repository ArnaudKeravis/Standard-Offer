"use client";

import { Pause, Play, RotateCcw } from "lucide-react";

import { formatClock } from "@/lib/workshops/tech-ambition/clock";

type TimerDockProps = {
  remainingMs: number;
  durationMs: number;
  running: boolean;
  dark?: boolean;
  label?: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export function TimerDock({
  remainingMs,
  durationMs,
  running,
  dark = false,
  label = "Block",
  onStart,
  onPause,
  onReset,
}: TimerDockProps) {
  const urgent = remainingMs > 0 && remainingMs <= 30_000;
  const tone = dark
    ? "border-white/15 bg-[color-mix(in_srgb,#10162c_72%,transparent)] text-white"
    : "border-[color-mix(in_srgb,var(--ws-navy)_14%,transparent)] bg-[color-mix(in_srgb,var(--ws-paper)_82%,white)] text-[var(--ws-ink)]";

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 rounded-2xl border px-3 py-2 shadow-[0_10px_30px_rgba(16,22,44,0.12)] backdrop-blur-xl ${tone}`}
      data-ws-hud
    >
      <div className="min-w-[5.5rem]">
        <p className="ws-kicker text-[0.62rem] opacity-60">{label}</p>
        <p
          className={`ws-display text-[1.65rem] leading-none tabular-nums ${
            urgent ? "text-[#e24b4b]" : ""
          }`}
        >
          {formatClock(remainingMs)}
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <DockButton
          label={running ? "Pause" : "Start"}
          onClick={running ? onPause : onStart}
          dark={dark}
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
        </DockButton>
        <DockButton label="Reset" onClick={onReset} dark={dark}>
          <RotateCcw className="size-4" />
        </DockButton>
      </div>
      <span className="sr-only">
        {label} timer {formatClock(remainingMs)} of {formatClock(durationMs)}
      </span>
    </div>
  );
}

function DockButton({
  children,
  label,
  onClick,
  dark,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex size-12 items-center justify-center rounded-xl transition-transform active:scale-95 ${
        dark
          ? "bg-white/10 text-white hover:bg-white/16"
          : "bg-[var(--ws-ink)] text-white hover:bg-[var(--ws-navy)]"
      }`}
    >
      {children}
    </button>
  );
}
