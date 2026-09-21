import type { PersonSeat } from "./schemas";

export const SCENARIOS = ["validate-dsm", "validate-b2b-lead"] as const;
export type ScenarioId = (typeof SCENARIOS)[number];

export function applyScenarios(
  seats: PersonSeat[],
  on: ReadonlySet<ScenarioId>,
): PersonSeat[] {
  return seats.map((seat) => {
    if (on.has("validate-dsm") && seat.id === "vacancy-dsm") {
      const cost = seat.theoreticalAnnualCost ?? 0;
      return {
        ...seat,
        displayName: "DSM",
        inBudget: true,
        budgetGap: false,
        annualCostFromStart: cost,
        opex: Math.round(cost * (1 - seat.capexRatio)),
        capex: Math.round(cost * seat.capexRatio),
      };
    }
    if (on.has("validate-b2b-lead") && seat.id === "lead-pd-b2b") {
      const cost = seat.theoreticalAnnualCost ?? 0;
      return {
        ...seat,
        status: "pr1",
        inBudget: true,
        budgetGap: false,
        annualCostFromStart: cost,
        opex: cost,
        capex: 0,
      };
    }
    return seat;
  });
}

export function parseScenarios(raw: string | null | undefined): Set<ScenarioId> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .filter((id): id is ScenarioId => SCENARIOS.includes(id as ScenarioId)),
  );
}

export function serializeScenarios(on: Iterable<ScenarioId>): string {
  return [...on].join(",");
}
