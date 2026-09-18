import { describe, expect, it } from "vitest";
import { coverageHoles } from "@/lib/people-board/holes";
import { applyScenarios } from "@/lib/people-board/scenarios";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

describe("coverageHoles", () => {
  it("marks Design System and B2B uncovered from P4 when the internal seat is open", () => {
    const holes = coverageHoles(PEOPLE_SEATS);
    expect(holes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "hole-lead-ds",
          lane: "design-system",
          afterId: "ismael-casado",
          start: 4,
          end: 12,
        }),
        expect.objectContaining({
          id: "hole-lead-b2b",
          lane: "pd-b2b",
          afterId: "laura-geley",
          start: 4,
          end: 12,
        }),
        expect.objectContaining({
          id: "hole-thomas",
          lane: "management",
          afterId: "thomas-didier",
          start: 12,
          end: 12,
        }),
      ]),
    );
    expect(holes.some((hole) => hole.id === "hole-lead-b2c")).toBe(false);
  });

  it("clears the B2B and DSM holes under the validate scenarios", () => {
    const seats = applyScenarios(
      PEOPLE_SEATS,
      new Set(["validate-dsm", "validate-b2b-lead"]),
    );
    const holes = coverageHoles(seats);
    expect(holes.some((hole) => hole.id === "hole-lead-ds")).toBe(false);
    expect(holes.some((hole) => hole.id === "hole-lead-b2b")).toBe(false);
    expect(holes.some((hole) => hole.id === "hole-thomas")).toBe(true);
  });
});
