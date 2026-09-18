export type Clock = {
  durationMs: number;
  remainingMs: number;
  running: boolean;
  epochMs: number | null;
};

export function minutesToMs(minutes: number): number {
  return Math.round(minutes * 60_000);
}

export function createClock(durationMs: number): Clock {
  return {
    durationMs,
    remainingMs: durationMs,
    running: false,
    epochMs: null,
  };
}

export function displayedRemaining(clock: Clock, now: number): number {
  if (!clock.running || clock.epochMs === null) {
    return Math.max(0, clock.remainingMs);
  }
  return Math.max(0, clock.remainingMs - (now - clock.epochMs));
}

export function startClock(clock: Clock, now: number): Clock {
  if (clock.running) return clock;
  if (clock.remainingMs <= 0) return clock;
  return { ...clock, running: true, epochMs: now };
}

export function pauseClock(clock: Clock, now: number): Clock {
  if (!clock.running) return clock;
  return {
    ...clock,
    remainingMs: displayedRemaining(clock, now),
    running: false,
    epochMs: null,
  };
}

export function resetClock(clock: Clock): Clock {
  return createClock(clock.durationMs);
}

export function retargetClock(durationMs: number): Clock {
  return createClock(durationMs);
}

export function syncClock(clock: Clock, now: number): Clock {
  const remaining = displayedRemaining(clock, now);
  if (clock.running && remaining <= 0) {
    return {
      ...clock,
      remainingMs: 0,
      running: false,
      epochMs: null,
    };
  }
  return clock;
}

export function toggleClock(clock: Clock, now: number): Clock {
  return clock.running ? pauseClock(clock, now) : startClock(clock, now);
}

export function justFinished(previousMs: number, nextMs: number): boolean {
  return previousMs > 0 && nextMs <= 0;
}

export function isFreshClock(clock: Clock): boolean {
  return !clock.running && clock.remainingMs === clock.durationMs;
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
