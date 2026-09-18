import { describe, expect, it } from "vitest";
import {
  FY27_PERIODS,
  currentFyPeriod,
  ganttSpan,
  parsePeriodLabel,
  periodLabel,
} from "@/lib/people-board/periods";

describe("parsePeriodLabel", () => {
  it("maps P1-Sep through P4-Dec and P11-Jul", () => {
    expect(parsePeriodLabel("P1-Sep")).toBe(1);
    expect(parsePeriodLabel("P2-Oct")).toBe(2);
    expect(parsePeriodLabel("P3-Nov")).toBe(3);
    expect(parsePeriodLabel("P4-Dec")).toBe(4);
    expect(parsePeriodLabel("P11-Jul")).toBe(11);
  });

  it("maps P13-Not in Budget to 13", () => {
    expect(parsePeriodLabel("P13-Not in Budget")).toBe(13);
  });
});

describe("periodLabel", () => {
  it("returns the FY27 short label", () => {
    expect(periodLabel(1)).toBe("P1 Sep");
    expect(periodLabel(12)).toBe("P12 Aug");
    expect(periodLabel(13)).toBe("P13 not in budget");
  });
});

describe("FY27_PERIODS", () => {
  it("has twelve in-budget periods", () => {
    expect(FY27_PERIODS).toHaveLength(12);
    expect(FY27_PERIODS[0]).toEqual({ id: 1, month: "Sep", year: 2026 });
    expect(FY27_PERIODS[11]).toEqual({ id: 12, month: "Aug", year: 2027 });
  });
});

describe("currentFyPeriod", () => {
  it("places 18 Sep 2026 in P1", () => {
    expect(currentFyPeriod(new Date("2026-09-18T12:00:00Z"))).toBe(1);
  });

  it("places 1 Dec 2026 in P4", () => {
    expect(currentFyPeriod(new Date("2026-12-01T12:00:00Z"))).toBe(4);
  });

  it("places 15 Jul 2027 in P11", () => {
    expect(currentFyPeriod(new Date("2027-07-15T12:00:00Z"))).toBe(11);
  });
});

describe("ganttSpan", () => {
  it("spans internals from start through P12", () => {
    expect(ganttSpan({ startPeriod: 4, endPeriod: 12, inBudget: true })).toEqual(
      { start: 4, end: 12, visible: true },
    );
  });

  it("hides P13 not-in-budget seats from the FY bar", () => {
    expect(
      ganttSpan({ startPeriod: 13, endPeriod: 13, inBudget: false }),
    ).toEqual({ start: 13, end: 13, visible: false });
  });

  it("keeps a one-period external bar (Guillaume in P1)", () => {
    expect(ganttSpan({ startPeriod: 1, endPeriod: 1, inBudget: true })).toEqual(
      { start: 1, end: 1, visible: true },
    );
  });
});
