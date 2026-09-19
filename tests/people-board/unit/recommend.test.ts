import { describe, expect, it } from "vitest";
import { recommendations } from "@/lib/people-board/recommend";
import { applyScenarios } from "@/lib/people-board/scenarios";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

describe("people recommendations", () => {
  it("turns active signals into verb-first actions, risks before arbitration", () => {
    const recs = recommendations(PEOPLE_SEATS);
    expect(recs.map((row) => row.id)).toEqual([
      "design-system",
      "pd-b2b",
      "thomas-exit",
      "data-vacancy",
      "india-b2c-soeze",
      "b2o-overlap",
    ]);
    expect(recs.every((row) => row.active)).toBe(true);
    expect(recs[0]).toMatchObject({
      verb: "Validate",
      action: "Validate the internal DSM",
    });
    expect(recs[0]?.why).toMatch(/December/i);
    expect(recs.find((row) => row.id === "pd-b2b")?.verb).toBe("Fund");
    expect(recs.find((row) => row.id === "india-b2c-soeze")?.verb).toBe(
      "Arbitrate",
    );
  });

  it("drops resolved risks to the bottom when a what-if clears them", () => {
    const recs = recommendations(
      applyScenarios(PEOPLE_SEATS, new Set(["validate-dsm", "validate-b2b-lead"])),
    );
    expect(recs.filter((row) => row.active).map((row) => row.id)).toEqual([
      "thomas-exit",
      "data-vacancy",
      "india-b2c-soeze",
      "b2o-overlap",
    ]);
    expect(recs.filter((row) => !row.active).map((row) => row.id)).toEqual([
      "design-system",
      "pd-b2b",
    ]);
  });
});
