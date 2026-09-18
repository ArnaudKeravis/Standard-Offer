import type { Funding, LaneId, PersonSeat } from "./schemas";

export type FundingSplit = Record<Funding, number>;

export type MoneyStrip = {
  total: number;
  opex: number;
  capex: number;
  funding: FundingSplit;
};

export type SupplierRow = {
  supplier: string;
  total: number;
  count: number;
};

function emptyFunding(): FundingSplit {
  return { BOOST: 0, ACC: 0, BAU: 0 };
}

export function moneyForSeats(seats: PersonSeat[]): MoneyStrip {
  const funding = emptyFunding();
  let total = 0;
  let opex = 0;
  let capex = 0;
  for (const seat of seats) {
    if (!seat.inBudget) continue;
    total += seat.annualCostFromStart;
    opex += seat.opex;
    capex += seat.capex;
    funding[seat.funding] += seat.annualCostFromStart;
  }
  return { total, opex, capex, funding };
}

export function laneMoney(seats: PersonSeat[], lane: LaneId): MoneyStrip {
  return moneyForSeats(seats.filter((seat) => seat.lane === lane));
}

export function supplierRollup(seats: PersonSeat[]): SupplierRow[] {
  const map = new Map<string, SupplierRow>();
  for (const seat of seats) {
    if (!seat.inBudget || !seat.supplier) continue;
    const current = map.get(seat.supplier) ?? {
      supplier: seat.supplier,
      total: 0,
      count: 0,
    };
    current.total += seat.annualCostFromStart;
    current.count += 1;
    map.set(seat.supplier, current);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}
