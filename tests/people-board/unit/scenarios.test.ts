import { describe, expect, it } from "vitest";
import { applyScenarios } from "@/lib/people-board/scenarios";
import { signalFor } from "@/lib/people-board/signals";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

describe("applyScenarios", () => {
  it("validates and funds the B2B lead from the theoretical cost", () => {
    const seats = applyScenarios(PEOPLE_SEATS, new Set(["validate-b2b-lead"]));
    const lead = seats.find((seat) => seat.id === "lead-pd-b2b");
    expect(lead?.status).toBe("pr1");
    expect(lead?.inBudget).toBe(true);
    expect(lead?.budgetGap).toBe(false);
    expect(lead?.annualCostFromStart).toBe(98993);
    expect(lead?.opex).toBe(98993);
    expect(signalFor("pd-b2b", seats).active).toBe(false);
  });

  it("hires the DSM vacancy from the theoretical cost", () => {
    const seats = applyScenarios(PEOPLE_SEATS, new Set(["validate-dsm"]));
    const dsm = seats.find((seat) => seat.id === "vacancy-dsm");
    expect(dsm?.displayName).toBe("DSM");
    expect(dsm?.inBudget).toBe(true);
    expect(dsm?.budgetGap).toBe(false);
    expect(dsm?.annualCostFromStart).toBe(190530);
    expect(dsm?.opex).toBe(95265);
    expect(dsm?.capex).toBe(95265);
    expect(signalFor("design-system", seats).active).toBe(false);
  });
});
