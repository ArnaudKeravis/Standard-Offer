import { describe, expect, it } from "vitest";
import {
  createClock,
  displayedRemaining,
  justFinished,
  startClock,
} from "@/lib/workshops/tech-ambition/clock";
import { freezeClock, parseSnapshot, thawClock } from "@/lib/workshops/tech-ambition/persist";

describe("workshop persist", () => {
  it("resumes a running clock from its original epoch", () => {
    const running = startClock(createClock(60_000), 1_000);
    const thawed = thawClock(freezeClock(running), 21_000);
    expect(displayedRemaining(thawed, 21_000)).toBe(40_000);
    expect(thawed.running).toBe(true);
  });

  it("keeps a paused clock paused", () => {
    const thawed = thawClock(
      { durationMs: 15_000, remainingMs: 8_000, running: false, epochMs: null },
      50_000,
    );
    expect(thawed.running).toBe(false);
    expect(displayedRemaining(thawed, 80_000)).toBe(8_000);
  });

  it("rejects a broken snapshot", () => {
    expect(parseSnapshot("not-json")).toBeNull();
    expect(parseSnapshot(JSON.stringify({ version: 2, index: 0 }))).toBeNull();
  });
});

describe("justFinished", () => {
  it("fires only when a live clock crosses zero", () => {
    expect(justFinished(800, 0)).toBe(true);
    expect(justFinished(0, 0)).toBe(false);
    expect(justFinished(0, 120_000)).toBe(false);
    expect(justFinished(12_000, 11_000)).toBe(false);
  });
});
