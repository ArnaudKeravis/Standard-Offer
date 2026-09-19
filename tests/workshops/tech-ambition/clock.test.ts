import { describe, expect, it } from "vitest";
import {
  createClock,
  displayedRemaining,
  formatClock,
  isFreshClock,
  minutesToMs,
  pauseClock,
  resetClock,
  startClock,
  syncClock,
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
});
