import { describe, expect, it } from "vitest";
import {
  BLOCKS,
  CLINIC_TABLES,
  MATURITY,
  SCREENS,
  blockById,
  clinicDuration,
  hourbackDuration,
} from "@/lib/workshops/tech-ambition/run-of-show";

describe("tech ambition run of show", () => {
  it("keeps unique screen ids in a known block", () => {
    const ids = SCREENS.map((screen) => screen.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const screen of SCREENS) {
      expect(BLOCKS.some((block) => block.id === screen.blockId)).toBe(true);
    }
  });

  it("has six live clinic tables and greys data out of the tables", () => {
    expect(CLINIC_TABLES).toHaveLength(6);
    expect(MATURITY.filter((row) => row.table === null).map((row) => row.id)).toEqual([
      "data",
    ]);
    expect(CLINIC_TABLES.every((table) => table.host.length > 0)).toBe(true);
  });

  it("uses the ritual durations from the run-of-show", () => {
    expect(blockById("proud").durationMin).toBe(30);
    expect(clinicDuration(1)).toBe(15 * 60_000);
    expect(clinicDuration("report")).toBe(3 * 60_000);
    expect(hourbackDuration(1)).toBe(20 * 60_000);
    expect(hourbackDuration(2)).toBe(10 * 60_000);
    expect(hourbackDuration(3)).toBe(30 * 60_000);
  });
});
