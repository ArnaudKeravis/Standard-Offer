import { describe, expect, it } from "vitest";
import {
  clusterLaneSeats,
  handoffMarkerLeft,
  leadHandoffs,
} from "@/lib/people-board/handoffs";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import type { PersonSeat } from "@/lib/people-board/schemas";

function seat(partial: Partial<PersonSeat> & Pick<PersonSeat, "id">): PersonSeat {
  return {
    lane: "pd-b2c",
    sortOrder: 0,
    team: "Product design",
    costCenter: "HO",
    role: "Lead",
    displayName: partial.id,
    kind: "internal",
    status: "pr1",
    category: "Expert",
    location: "France",
    fte: 1,
    dailyRate: null,
    capexRatio: 0,
    startPeriod: 4,
    endPeriod: 12,
    days: null,
    theoreticalAnnualCost: null,
    annualCostFromStart: 0,
    opex: 0,
    capex: 0,
    vacancyId: null,
    funding: "BAU",
    inBudget: true,
    budgetGap: false,
    chainId: null,
    decisionId: null,
    notes: null,
    supplier: null,
    handoffId: null,
    ...partial,
  };
}

describe("leadHandoffs", () => {
  it("pairs each lead intern with the named extern at the internal start period", () => {
    const pairs = leadHandoffs(PEOPLE_SEATS);
    expect(pairs).toEqual(
      expect.arrayContaining([
        {
          id: "lead-ds",
          lane: "design-system",
          fromId: "ismael-casado",
          toId: "dsm-internal-pt",
          atPeriod: 4,
        },
        {
          id: "lead-b2c",
          lane: "pd-b2c",
          fromId: "aron",
          toId: "lead-pd-b2c",
          atPeriod: 4,
        },
        {
          id: "lead-b2b",
          lane: "pd-b2b",
          fromId: "laura-geley",
          toId: "lead-pd-b2b",
          atPeriod: 4,
        },
        {
          id: "lead-b2o",
          lane: "pd-b2o",
          fromId: "pedro-ciat",
          toId: "lead-pd-b2o",
          atPeriod: 4,
        },
      ]),
    );
    expect(pairs).toHaveLength(4);
  });

  it("does not put Jessica on the B2O lead pair", () => {
    const b2o = leadHandoffs(PEOPLE_SEATS).find((row) => row.id === "lead-b2o");
    expect(b2o?.fromId).toBe("pedro-ciat");
    expect(b2o?.toId).toBe("lead-pd-b2o");
  });
});

describe("clusterLaneSeats", () => {
  it("keeps consecutive handoff rows in one cluster", () => {
    const rows = [
      seat({ id: "a", handoffId: "lead-b2c", kind: "external", sortOrder: 0 }),
      seat({ id: "b", handoffId: "lead-b2c", kind: "internal", sortOrder: 1 }),
      seat({ id: "c", handoffId: null, sortOrder: 2 }),
    ];
    expect(clusterLaneSeats(rows)).toEqual([
      { handoffId: "lead-b2c", seats: [rows[0], rows[1]] },
      { handoffId: null, seats: [rows[2]] },
    ]);
  });
});

describe("handoffMarkerLeft", () => {
  it("places the elbow at the start of the handoff period column", () => {
    expect(handoffMarkerLeft(4)).toBeCloseTo((3 / 12) * 100);
  });
});
