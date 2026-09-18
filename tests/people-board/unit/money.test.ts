import { describe, expect, it } from "vitest";
import { laneMoney, moneyForSeats, supplierRollup } from "@/lib/people-board/money";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

describe("moneyForSeats", () => {
  it("sums in-budget cost, opex, capex and funding", () => {
    const money = moneyForSeats(PEOPLE_SEATS);
    const inBudget = PEOPLE_SEATS.filter((seat) => seat.inBudget);
    expect(money.total).toBe(
      inBudget.reduce((sum, seat) => sum + seat.annualCostFromStart, 0),
    );
    expect(money.opex).toBe(inBudget.reduce((sum, seat) => sum + seat.opex, 0));
    expect(money.capex).toBe(inBudget.reduce((sum, seat) => sum + seat.capex, 0));
    expect(money.funding.BOOST + money.funding.ACC + money.funding.BAU).toBe(
      money.total,
    );
  });
});

describe("laneMoney", () => {
  it("scopes the strip to one lane", () => {
    const b2b = laneMoney(PEOPLE_SEATS, "pd-b2b");
    expect(b2b.total).toBe(45500);
    expect(b2b.funding.BOOST).toBe(45500);
    expect(b2b.funding.BAU).toBe(0);
  });
});

describe("supplierRollup", () => {
  it("rolls in-budget external cost by firm, largest first", () => {
    const rows = supplierRollup(PEOPLE_SEATS);
    expect(rows.map((row) => row.supplier)).toEqual(
      expect.arrayContaining(["Malt", "CI&T", "Thiga", "Thoughtworks", "Nogaro"]),
    );
    expect(rows[0].total).toBeGreaterThanOrEqual(rows[1].total);
    const malt = rows.find((row) => row.supplier === "Malt");
    const maltSeats = PEOPLE_SEATS.filter(
      (seat) => seat.supplier === "Malt" && seat.inBudget,
    );
    expect(malt?.count).toBe(maltSeats.length);
    expect(malt?.total).toBe(
      maltSeats.reduce((sum, seat) => sum + seat.annualCostFromStart, 0),
    );
  });
});
