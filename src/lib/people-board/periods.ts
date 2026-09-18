export const FY27_PERIODS = [
  { id: 1, month: "Sep", year: 2026 },
  { id: 2, month: "Oct", year: 2026 },
  { id: 3, month: "Nov", year: 2026 },
  { id: 4, month: "Dec", year: 2026 },
  { id: 5, month: "Jan", year: 2027 },
  { id: 6, month: "Feb", year: 2027 },
  { id: 7, month: "Mar", year: 2027 },
  { id: 8, month: "Apr", year: 2027 },
  { id: 9, month: "May", year: 2027 },
  { id: 10, month: "Jun", year: 2027 },
  { id: 11, month: "Jul", year: 2027 },
  { id: 12, month: "Aug", year: 2027 },
] as const;

const PERIOD_FROM_LABEL: Record<string, number> = {
  "P1-Sep": 1,
  "P2-Oct": 2,
  "P3-Nov": 3,
  "P4-Dec": 4,
  "P5-Jan": 5,
  "P6-Feb": 6,
  "P7-Mar": 7,
  "P8-Apr": 8,
  "P9-May": 9,
  "P10-Jun": 10,
  "P11-Jul": 11,
  "P12-Aug": 12,
  "P13-Not in Budget": 13,
};

export function parsePeriodLabel(label: string): number {
  const period = PERIOD_FROM_LABEL[label.trim()];
  if (!period) {
    throw new Error(`Unknown FY period label: ${label}`);
  }
  return period;
}

export function periodLabel(period: number): string {
  if (period === 13) return "P13 not in budget";
  const row = FY27_PERIODS.find((item) => item.id === period);
  if (!row) {
    throw new Error(`Unknown FY period: ${period}`);
  }
  return `P${row.id} ${row.month}`;
}

/** Sodexo FY: P1 = September. */
export function currentFyPeriod(now: Date): number {
  const month = now.getUTCMonth() + 1;
  return month >= 9 ? month - 8 : month + 4;
}

export function ganttSpan(seat: {
  startPeriod: number;
  endPeriod: number;
  inBudget: boolean;
  budgetGap?: boolean;
}): { start: number; end: number; visible: boolean } {
  if (seat.startPeriod === 13 || seat.endPeriod === 13) {
    return { start: seat.startPeriod, end: seat.endPeriod, visible: false };
  }
  if (!seat.inBudget && !seat.budgetGap) {
    return { start: seat.startPeriod, end: seat.endPeriod, visible: false };
  }
  return { start: seat.startPeriod, end: seat.endPeriod, visible: true };
}
