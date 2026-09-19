import { describe, expect, it } from "vitest";
import {
  createClock,
  displayedRemaining,
  formatClock,
  isFreshClock,
  jumpClock,
  justCrossedMark,
  minutesToMs,
  pauseClock,
  resetClock,
  setClockDuration,
  startClock,
  syncClock,
  timerTone,
  toggleClock,
} from "@/lib/workshops/tech-ambition/clock";

describe("workshop clock", () => {
  it("formats minutes and seconds", () => {
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(2_000)).toBe("0:02");
    expect(formatClock(minutesToMs(2))).toBe("2:00");
    expect(formatClock(minutesToMs(15) + 500)).toBe("15:01");
  });

  it("counts down only while running", () => {
    const idle = createClock(60_000);
    expect(displayedRemaining(idle, 1_000)).toBe(60_000);

    const running = startClock(idle, 1_000);
    expect(displayedRemaining(running, 11_000)).toBe(50_000);

    const paused = pauseClock(running, 11_000);
    expect(paused.running).toBe(false);
    expect(displayedRemaining(paused, 40_000)).toBe(50_000);
  });

  it("stops at zero and reset restores duration", () => {
    const running = startClock(createClock(5_000), 0);
    const done = syncClock(running, 8_000);
    expect(done.running).toBe(false);
    expect(done.remainingMs).toBe(0);
    expect(resetClock(done).remainingMs).toBe(5_000);
  });

  it("treats an unused clock as fresh", () => {
    const fresh = createClock(10_000);
    expect(isFreshClock(fresh)).toBe(true);
    expect(isFreshClock(startClock(fresh, 0))).toBe(false);
    expect(isFreshClock({ ...fresh, remainingMs: 9_000 })).toBe(false);
  });

  it("toggles start and pause", () => {
    const started = toggleClock(createClock(10_000), 0);
    expect(started.running).toBe(true);
    const paused = toggleClock(started, 2_000);
    expect(paused.running).toBe(false);
    expect(paused.remainingMs).toBe(8_000);
  });

  it("jumps by whole minutes without drifting a running clock", () => {
    const running = startClock(createClock(minutesToMs(15)), 0);
    const plus = jumpClock(running, 60, 90_000);
    expect(displayedRemaining(plus, 90_000)).toBe(minutesToMs(14) + 30_000);

    const minus = jumpClock(plus, -60, 90_000);
    expect(displayedRemaining(minus, 90_000)).toBe(minutesToMs(13) + 30_000);
    expect(displayedRemaining(plus, 100_000)).toBe(minutesToMs(14) + 20_000);
  });

  it("clamps jumps to the declared duration", () => {
    const idle = createClock(minutesToMs(2));
    expect(jumpClock(idle, 60, 0).remainingMs).toBe(minutesToMs(2));
    expect(jumpClock(idle, -180, 0).remainingMs).toBe(0);
  });

  it("setDuration starts idle at the new length", () => {
    const next = setClockDuration(minutesToMs(20));
    expect(next.durationMs).toBe(minutesToMs(20));
    expect(isFreshClock(next)).toBe(true);
  });

  it("names idle, running, amber under 20%, and red under 60s", () => {
    expect(timerTone(1200, 1200, false)).toBe("idle");
    expect(timerTone(900, 1200, true)).toBe("running");
    expect(timerTone(239, 1200, true)).toBe("amber");
    expect(timerTone(59, 1200, true)).toBe("red");
    expect(timerTone(0, 1200, false)).toBe("red");
  });

  it("detects a mid-block mark exactly once on the crossing tick", () => {
    expect(justCrossedMark(901_000, 899_000, 900)).toBe(true);
    expect(justCrossedMark(899_000, 898_000, 900)).toBe(false);
    expect(justCrossedMark(1_200_000, 1_199_000, 900)).toBe(false);
  });
});
