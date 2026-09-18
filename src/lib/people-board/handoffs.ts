import type { LaneId, PersonSeat } from "./schemas";

export type LeadHandoff = {
  id: string;
  lane: LaneId;
  fromId: string;
  toId: string;
  atPeriod: number;
};

export type LaneCluster = {
  handoffId: string | null;
  seats: PersonSeat[];
};

export function leadHandoffs(seats: PersonSeat[]): LeadHandoff[] {
  const groups = new Map<string, PersonSeat[]>();
  for (const seat of seats) {
    if (!seat.handoffId) continue;
    const list = groups.get(seat.handoffId) ?? [];
    list.push(seat);
    groups.set(seat.handoffId, list);
  }

  return [...groups.entries()]
    .map(([id, group]) => {
      const from = group.find((seat) => seat.kind === "external");
      const to = group.find((seat) => seat.kind === "internal");
      if (!from || !to) return null;
      return {
        id,
        lane: to.lane,
        fromId: from.id,
        toId: to.id,
        atPeriod: to.startPeriod,
      };
    })
    .filter((row): row is LeadHandoff => row !== null);
}

export function clusterLaneSeats(seats: PersonSeat[]): LaneCluster[] {
  const clusters: LaneCluster[] = [];
  for (const seat of seats) {
    const last = clusters.at(-1);
    if (last && seat.handoffId && last.handoffId === seat.handoffId) {
      last.seats.push(seat);
      continue;
    }
    clusters.push({ handoffId: seat.handoffId, seats: [seat] });
  }
  return clusters;
}

export function handoffMarkerLeft(atPeriod: number): number {
  return ((atPeriod - 1) / 12) * 100;
}

export function handoffForCluster(
  handoffs: LeadHandoff[],
  cluster: LaneCluster,
): LeadHandoff | null {
  if (!cluster.handoffId || cluster.seats.length < 2) return null;
  return handoffs.find((row) => row.id === cluster.handoffId) ?? null;
}
