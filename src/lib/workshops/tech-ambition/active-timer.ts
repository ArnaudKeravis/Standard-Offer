import type { ScreenKind } from "@/lib/workshops/tech-ambition/types";

export type TimerPack = {
  remainingMs: number;
  durationMs: number;
  running: boolean;
};

export type ActiveTimer = TimerPack & {
  source: "proud" | "clinic" | "hourback" | "block";
  swapAtSec?: number;
};

export function resolveActiveTimer(input: {
  kind: ScreenKind;
  timed?: boolean;
  proud: TimerPack;
  clinic: TimerPack;
  hourback: TimerPack;
  block: TimerPack | null;
}): ActiveTimer | null {
  switch (input.kind) {
    case "proud-ritual":
      return { ...input.proud, source: "proud" };
    case "clinics-ritual":
      return { ...input.clinic, source: "clinic" };
    case "hourback-ritual":
      return {
        ...input.hourback,
        source: "hourback",
        ...(input.hourback.durationMs === 20 * 60_000 ? { swapAtSec: 600 } : {}),
      };
    case "break":
      return input.block ? { ...input.block, source: "block" } : null;
    default:
      return input.timed && input.block
        ? { ...input.block, source: "block" }
        : null;
  }
}
