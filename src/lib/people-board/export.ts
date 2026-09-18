import { periodLabel } from "./periods";
import type { PersonSeat } from "./schemas";

const HEADERS = [
  "lane",
  "name",
  "role",
  "supplier",
  "status",
  "start",
  "end",
  "dailyRate",
  "cost",
  "opex",
  "capex",
  "funding",
  "inBudget",
] as const;

function csvCell(value: string | number | boolean | null): string {
  const raw = value === null ? "" : String(value);
  if (/[",\n]/.test(raw)) {
    return `"${raw.replaceAll('"', '""')}"`;
  }
  return raw;
}

function coverLabel(seat: PersonSeat): { start: string; end: string } {
  if (seat.startPeriod === 13 || seat.endPeriod === 13) {
    return { start: "not-in-budget", end: "not-in-budget" };
  }
  return {
    start: periodLabel(seat.startPeriod),
    end: periodLabel(seat.endPeriod),
  };
}

export function seatsToCsv(seats: PersonSeat[]): string {
  const rows = seats.map((seat) => {
    const cover = coverLabel(seat);
    return [
      seat.lane,
      seat.displayName,
      seat.role,
      seat.supplier,
      seat.status,
      cover.start,
      cover.end,
      seat.dailyRate,
      seat.annualCostFromStart,
      seat.opex,
      seat.capex,
      seat.funding,
      seat.inBudget,
    ]
      .map((cell) => csvCell(cell))
      .join(",");
  });
  return [HEADERS.join(","), ...rows].join("\n") + "\n";
}
