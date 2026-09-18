import type { PersonSeat } from "./schemas";

export const SEAT_FILTERS = ["pr2", "budget-gap", "external", "lead"] as const;
export type SeatFilter = (typeof SEAT_FILTERS)[number];

export function isLeadSeat(seat: PersonSeat): boolean {
  return Boolean(seat.handoffId) || /lead/i.test(seat.role);
}

export function matchesSeatFilter(seat: PersonSeat, filter: SeatFilter): boolean {
  if (filter === "pr2") return seat.status === "pr2";
  if (filter === "budget-gap") return seat.budgetGap;
  if (filter === "external") return seat.kind === "external";
  return isLeadSeat(seat);
}

export function matchesSeatFilters(
  seat: PersonSeat,
  filters: ReadonlySet<SeatFilter>,
): boolean {
  if (filters.size === 0) return true;
  return [...filters].some((filter) => matchesSeatFilter(seat, filter));
}

export function serializeSeatFilters(filters: Iterable<SeatFilter>): string {
  return [...filters].join(",");
}

export function parseSeatFilters(raw: string | null | undefined): Set<SeatFilter> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .filter((id): id is SeatFilter =>
        SEAT_FILTERS.includes(id as SeatFilter),
      ),
  );
}
