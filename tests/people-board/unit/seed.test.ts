import { describe, expect, it } from "vitest";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import { PersonSeat } from "@/lib/people-board/schemas";

describe("PEOPLE_SEATS seed", () => {
  it("validates every seat and has unique ids", () => {
    const parsed = PEOPLE_SEATS.map((seat) => PersonSeat.parse(seat));
    expect(parsed).toHaveLength(27);
    const ids = parsed.map((seat) => seat.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("marks West US Labs manager as Pr1 and in budget from P1", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "labs-manager-west-us");
    expect(seat?.status).toBe("pr1");
    expect(seat?.startPeriod).toBe(1);
    expect(seat?.inBudget).toBe(true);
  });

  it("marks Brazil Labs manager as Pr1 from P4", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "labs-manager-brazil");
    expect(seat?.status).toBe("pr1");
    expect(seat?.startPeriod).toBe(4);
    expect(seat?.role).toMatch(/Brazil|BR/i);
  });

  it("keeps East US Labs manager Pr2 and out of budget", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "labs-manager-east-us");
    expect(seat?.status).toBe("pr2");
    expect(seat?.inBudget).toBe(false);
    expect(seat?.startPeriod).toBe(13);
  });

  it("renames B2B B2C B2O internals to Lead Product Design", () => {
    for (const id of ["lead-pd-b2b", "lead-pd-b2c-india", "lead-pd-b2o"] as const) {
      const seat = PEOPLE_SEATS.find((row) => row.id === id);
      expect(seat?.role).toMatch(/^Lead Product Design/);
      expect(seat?.role).not.toMatch(/Design System Manager/);
      expect(seat?.status).toBe("pr2");
      expect(seat?.startPeriod).toBe(4);
    }
  });

  it("keeps the Portugal internalization seat as Design System Manager", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "dsm-internal-pt");
    expect(seat?.role).toBe("Design System Manager");
    expect(seat?.status).toBe("pr2");
    expect(seat?.startPeriod).toBe(4);
    expect(seat?.chainId).toBe("design-system");
  });

  it("treats Nikhil as full-time on the India B2C decision", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "nikhil-soeze");
    expect(seat?.fte).toBe(1);
    expect(seat?.decisionId).toBe("india-b2c-soeze");
    expect(seat?.kind).toBe("external");
  });
});
