import { syncClock, type Clock } from "@/lib/workshops/tech-ambition/clock";
import type {
  BlockId,
  ClinicRound,
  HourbackStep,
} from "@/lib/workshops/tech-ambition/types";

export const WORKSHOP_STORAGE_KEY = "ws-tech-ambition-v5";

export type WorkshopSnapshot = {
  version: 1;
  index: number;
  clinicRound: ClinicRound;
  hourStep: HourbackStep;
  hintDismissed: boolean;
  proud: Clock;
  clinic: Clock;
  hourback: Clock;
  blocks: Partial<Record<BlockId, Clock>>;
};

export function freezeClock(clock: Clock): Clock {
  return { ...clock };
}

export function thawClock(saved: Clock, now: number): Clock {
  return syncClock(
    {
      durationMs: saved.durationMs,
      remainingMs: saved.remainingMs,
      running: saved.running,
      epochMs: typeof saved.epochMs === "number" ? saved.epochMs : null,
    },
    now,
  );
}

function isClock(value: unknown): value is Clock {
  if (!value || typeof value !== "object") return false;
  const clock = value as Clock;
  return (
    typeof clock.durationMs === "number" &&
    typeof clock.remainingMs === "number" &&
    typeof clock.running === "boolean"
  );
}

function isClinicRound(value: unknown): value is ClinicRound {
  return value === 1 || value === 2 || value === "report";
}

function isHourStep(value: unknown): value is HourbackStep {
  return value === 1 || value === 2 || value === 3;
}

export function parseSnapshot(raw: string | null): WorkshopSnapshot | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as WorkshopSnapshot;
    if (data.version !== 1) return null;
    if (!Number.isInteger(data.index) || data.index < 0) return null;
    if (!isClinicRound(data.clinicRound) || !isHourStep(data.hourStep)) return null;
    if (!isClock(data.proud) || !isClock(data.clinic) || !isClock(data.hourback)) {
      return null;
    }
    return {
      ...data,
      hintDismissed: Boolean(data.hintDismissed),
      blocks: data.blocks ?? {},
    };
  } catch {
    return null;
  }
}

export function readSnapshot(
  storage: Pick<Storage, "getItem"> | null = typeof window === "undefined"
    ? null
    : window.sessionStorage,
): WorkshopSnapshot | null {
  if (!storage) return null;
  try {
    return parseSnapshot(storage.getItem(WORKSHOP_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeSnapshot(
  snapshot: WorkshopSnapshot,
  storage: Pick<Storage, "setItem"> | null = typeof window === "undefined"
    ? null
    : window.sessionStorage,
): void {
  if (!storage) return;
  try {
    storage.setItem(WORKSHOP_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* quota / private mode */
  }
}
