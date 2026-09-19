"use client";

import { StageProfile } from "@/components/workshops/aso/stage-profile";
import { PHASES } from "@/lib/workshops/aso/run-of-show";
import type { DayId, PhaseId, ProfilePoint } from "@/lib/workshops/aso/types";

export function AsoHud({
  day,
  phase,
  title,
  start,
  index,
  total,
  dark,
  reserveClock,
  points,
  activeSequenceId,
  onJumpSequence,
  onToggleDay,
}: {
  day: DayId;
  phase: PhaseId;
  title: string;
  start: string;
  index: number;
  total: number;
  dark: boolean;
  reserveClock: boolean;
  points: ProfilePoint[];
  activeSequenceId?: string;
  onJumpSequence: (sequenceId: string) => void;
  onToggleDay: () => void;
}) {
  const phaseMeta = PHASES[phase];
  const ink = dark ? "text-white" : "text-[var(--aso-ink)]";
  const muted = dark ? "text-white/55" : "text-[var(--aso-muted)]";

  return (
    <header
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 ${
        dark ? "bg-[var(--aso-noir)]" : "bg-[var(--aso-papier)]"
      } px-[3vw] pt-[1.6vh] pb-[1vh] ${reserveClock ? "pr-[min(22rem,32vw)]" : ""}`}
      data-aso-hud
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-4">
        <button
          type="button"
          onClick={onToggleDay}
          className={`pointer-events-auto aso-kicker border px-2.5 py-1 ${ink} ${
            dark ? "border-white/20" : "border-[var(--aso-hair)]"
          }`}
        >
          {day === "j1" ? "J1 · Itinérance" : "J2 · GD / GA"}
        </button>
        <span
          className="aso-kicker px-2.5 py-1 text-white"
          style={{ background: phaseMeta.color, color: phaseMeta.ink }}
        >
          {phaseMeta.label}
        </span>
        <p className={`min-w-0 truncate text-sm ${ink}`}>
          <span className="font-semibold">{title}</span>
          <span className={`ml-2 ${muted}`}>{start}</span>
        </p>
        <div className="ml-auto hidden min-w-0 flex-1 px-4 lg:block">
          <StageProfile
            points={points}
            activeId={activeSequenceId}
            compact
            onSelect={onJumpSequence}
          />
        </div>
        <p className={`shrink-0 text-sm tabular-nums ${muted}`}>
          {index + 1} / {total}
        </p>
      </div>
    </header>
  );
}
