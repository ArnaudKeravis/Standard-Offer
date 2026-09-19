import type { DayId } from "@/lib/workshops/aso/types";

export const WORKSHOP_STORAGE_KEY = "ws-aso-tdf-v1";

export type AsoSnapshot = {
  version: 1;
  day: DayId;
  index: number;
  hintDismissed: boolean;
  blackout: boolean;
};

function isDay(value: unknown): value is DayId {
  return value === "j1" || value === "j2";
}

export function parseSnapshot(raw: string | null): AsoSnapshot | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as AsoSnapshot;
    if (data.version !== 1) return null;
    if (!isDay(data.day)) return null;
    if (!Number.isInteger(data.index) || data.index < 0) return null;
    return {
      version: 1,
      day: data.day,
      index: data.index,
      hintDismissed: Boolean(data.hintDismissed),
      blackout: Boolean(data.blackout),
    };
  } catch {
    return null;
  }
}

export function readSnapshot(
  storage: Pick<Storage, "getItem"> | null = typeof window === "undefined"
    ? null
    : window.sessionStorage,
): AsoSnapshot | null {
  if (!storage) return null;
  try {
    return parseSnapshot(storage.getItem(WORKSHOP_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeSnapshot(
  snapshot: AsoSnapshot,
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
