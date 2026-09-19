import { describe, expect, it } from "vitest";

import { resolveActiveTimer } from "@/lib/workshops/tech-ambition/active-timer";

const pack = (remainingMs: number, durationMs: number, running: boolean) => ({
  remainingMs,
  durationMs,
  running,
});

describe("resolveActiveTimer", () => {
  it("drives the header from the Proud speaker clock on the ritual", () => {
    expect(
      resolveActiveTimer({
        kind: "proud-ritual",
        timed: true,
        proud: pack(90_000, 120_000, true),
        clinic: pack(15 * 60_000, 15 * 60_000, false),
        hourback: pack(20 * 60_000, 20 * 60_000, false),
        block: pack(30 * 60_000, 30 * 60_000, false),
      }),
    ).toEqual({
      remainingMs: 90_000,
      durationMs: 120_000,
      running: true,
      source: "proud",
    });
  });

  it("drives Clinics and Hour Back from their ritual clocks, with SWAP on the 30-minute build", () => {
    expect(
      resolveActiveTimer({
        kind: "clinics-ritual",
        timed: true,
        proud: pack(120_000, 120_000, false),
        clinic: pack(8 * 60_000, 15 * 60_000, true),
        hourback: pack(30 * 60_000, 30 * 60_000, false),
        block: null,
      }),
    ).toMatchObject({
      remainingMs: 8 * 60_000,
      durationMs: 15 * 60_000,
      running: true,
      source: "clinic",
    });

    expect(
      resolveActiveTimer({
        kind: "hourback-ritual",
        timed: true,
        proud: pack(120_000, 120_000, false),
        clinic: pack(15 * 60_000, 15 * 60_000, false),
        hourback: pack(22 * 60_000, 30 * 60_000, true),
        block: null,
      }),
    ).toEqual({
      remainingMs: 22 * 60_000,
      durationMs: 30 * 60_000,
      running: true,
      source: "hourback",
      swapAtSec: 900,
    });
  });

  it("uses the block clock on timed briefing slides and hides on cover", () => {
    expect(
      resolveActiveTimer({
        kind: "fy26-results",
        timed: true,
        proud: pack(120_000, 120_000, false),
        clinic: pack(15 * 60_000, 15 * 60_000, false),
        hourback: pack(20 * 60_000, 20 * 60_000, false),
        block: pack(11 * 60_000, 20 * 60_000, true),
      }),
    ).toEqual({
      remainingMs: 11 * 60_000,
      durationMs: 20 * 60_000,
      running: true,
      source: "block",
    });

    expect(
      resolveActiveTimer({
        kind: "cover",
        proud: pack(120_000, 120_000, false),
        clinic: pack(15 * 60_000, 15 * 60_000, false),
        hourback: pack(20 * 60_000, 20 * 60_000, false),
        block: null,
      }),
    ).toBeNull();
  });
});
