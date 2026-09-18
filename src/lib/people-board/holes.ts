import { leadHandoffs } from "./handoffs";
import type { LaneId, PersonSeat } from "./schemas";

export type CoverageHole = {
  id: string;
  lane: LaneId;
  afterId: string;
  start: number;
  end: number;
  label: string;
};

function isOpenSeat(seat: PersonSeat): boolean {
  return seat.status === "pr2" || seat.budgetGap;
}

export function coverageHoles(seats: PersonSeat[]): CoverageHole[] {
  const holes: CoverageHole[] = [];

  for (const handoff of leadHandoffs(seats)) {
    const to = seats.find((seat) => seat.id === handoff.toId);
    if (!to || !isOpenSeat(to)) continue;
    holes.push({
      id: `hole-${handoff.id}`,
      lane: handoff.lane,
      afterId: handoff.fromId,
      start: handoff.atPeriod,
      end: 12,
      label: "Uncovered",
    });
  }

  const thomas = seats.find((seat) => seat.id === "thomas-didier");
  if (thomas && thomas.endPeriod < 12) {
    holes.push({
      id: "hole-thomas",
      lane: "management",
      afterId: thomas.id,
      start: thomas.endPeriod + 1,
      end: 12,
      label: "Uncovered",
    });
  }

  return holes;
}

export function holeOnSeat(
  holes: CoverageHole[],
  seat: PersonSeat,
): CoverageHole | null {
  return (
    holes.find((hole) => {
      if (hole.id === "hole-thomas") return seat.id === hole.afterId;
      const handoffId = hole.id.replace(/^hole-/, "");
      return seat.handoffId === handoffId && seat.kind === "internal";
    }) ?? null
  );
}
