import { describe, expect, it } from "vitest";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import { PersonSeat } from "@/lib/people-board/schemas";

describe("PEOPLE_SEATS seed", () => {
  it("validates every seat and has unique ids", () => {
    const parsed = PEOPLE_SEATS.map((seat) => PersonSeat.parse(seat));
    expect(parsed).toHaveLength(27);
    expect(parsed.some((seat) => seat.id === "clara-nigen")).toBe(false);
    const ids = parsed.map((seat) => seat.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("starts West US Labs manager in November as Pr1", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "labs-manager-west-us");
    expect(seat?.status).toBe("pr1");
    expect(seat?.startPeriod).toBe(3);
    expect(seat?.inBudget).toBe(true);
  });

  it("marks Brazil Labs manager as Pr1 from P4", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "labs-manager-brazil");
    expect(seat?.status).toBe("pr1");
    expect(seat?.startPeriod).toBe(4);
    expect(seat?.role).toMatch(/Brazil|BR/i);
  });

  it("keeps East US Labs manager Pr2 and out of budget", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "labs-manager-east-us");
    expect(seat?.status).toBe("pr2");
    expect(seat?.inBudget).toBe(false);
    expect(seat?.startPeriod).toBe(13);
  });

  it("puts Gabriel DeRoquefeuil in as Senior Service Designer from September", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "gabriel-deroquefeuil");
    expect(seat?.displayName).toBe("Gabriel DeRoquefeuil");
    expect(seat?.status).toBe("pr0");
    expect(seat?.startPeriod).toBe(1);
    expect(seat?.lane).toBe("codesign");
  });

  it("sets Lead PD B2C and B2O to Pr1, B2B to Pr2 with a budget gap", () => {
    expect(PEOPLE_SEATS.find((row) => row.id === "lead-pd-b2c")?.status).toBe("pr1");
    expect(PEOPLE_SEATS.find((row) => row.id === "lead-pd-b2o")?.status).toBe("pr1");
    const b2b = PEOPLE_SEATS.find((row) => row.id === "lead-pd-b2b");
    expect(b2b?.status).toBe("pr2");
    expect(b2b?.budgetGap).toBe(true);
    expect(b2b?.chainId).toBe("pd-b2b");
  });

  it("keeps DSM as a full-year external vacancy", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "vacancy-dsm");
    expect(seat?.role).toBe("Design System Manager");
    expect(seat?.kind).toBe("external");
    expect(seat?.startPeriod).toBe(1);
    expect(seat?.endPeriod).toBe(12);
    expect(seat?.budgetGap).toBe(true);
    expect(seat?.inBudget).toBe(false);
    expect(seat?.annualCostFromStart).toBe(0);
    expect(seat?.theoreticalAnnualCost).toBe(190530);
    expect(seat?.displayName).toMatch(/vacancy/i);
    expect(PEOPLE_SEATS.some((row) => row.id === "dsm-internal-pt")).toBe(false);
  });

  it("places Aron as named B2C interim lead, not a vacancy", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "aron");
    expect(seat?.displayName).toBe("Aron");
    expect(seat?.role).toMatch(/interim/i);
    expect(seat?.lane).toBe("pd-b2c");
    expect(seat?.displayName).not.toMatch(/vacancy/i);
    expect(seat?.endPeriod).toBe(4);
  });

  it("ends Thomas Didier in July in Management", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "thomas-didier");
    expect(seat?.endPeriod).toBe(11);
    expect(seat?.lane).toBe("management");
  });

  it("places Neha on Data / AI products and backfills B2C India", () => {
    const neha = PEOPLE_SEATS.find((row) => row.id === "neha-b2c");
    const nikhil = PEOPLE_SEATS.find((row) => row.id === "nikhil-soeze");
    const backfill = PEOPLE_SEATS.find((row) => row.id === "vacancy-b2c-india");
    expect(neha?.lane).toBe("pd-data");
    expect(neha?.role).toMatch(/AI/i);
    expect(neha?.displayName).toBe("Neha");
    expect(neha?.kind).toBe("external");
    expect(neha?.dailyRate).toBe(450);
    expect(neha?.endPeriod).toBe(11);
    expect(neha?.annualCostFromStart).toBe(107550);
    expect(nikhil?.lane).toBe("pd-b2c");
    expect(backfill?.lane).toBe("pd-b2c");
    expect(backfill?.displayName).toMatch(/vacancy/i);
    expect(backfill?.role).toMatch(/B2C India/i);
    expect(PEOPLE_SEATS.some((row) => row.id === "vacancy-ai-products")).toBe(
      false,
    );
  });

  it("puts supplier on named externals and strips firm prefixes from names", () => {
    const byId = Object.fromEntries(PEOPLE_SEATS.map((row) => [row.id, row]));
    expect(byId["nikhil-soeze"]?.displayName).toBe("Nikhil");
    expect(byId["nikhil-soeze"]?.supplier).toBe("Thoughtworks");
    expect(byId["laura-geley"]?.supplier).toBe("Malt");
    expect(byId["michael-watzke"]?.supplier).toBe("Malt");
    expect(byId["quentin-geiger"]?.supplier).toBe("Malt");
    expect(byId["guillaume-sauvanon"]?.supplier).toBe("Malt");
    expect(byId["neha-b2c"]?.displayName).toBe("Neha");
    expect(byId["neha-b2c"]?.supplier).toBe("Nogaro");
    expect(byId["javier-mora"]?.supplier).toBe("Thiga");
    expect(byId["ismael-casado"]?.supplier).toBe("Thiga");
    expect(byId["pedro-ciat"]?.displayName).toBe("Pedro");
    expect(byId["pedro-ciat"]?.supplier).toBe("CI&T");
    expect(byId["jessica-ciat"]?.displayName).toBe("Jessica");
    expect(byId["jessica-ciat"]?.supplier).toBe("CI&T");
    expect(byId["aron"]?.supplier).toBe("CI&T");
    expect(byId["nicolas-duval"]?.supplier).toBeNull();
  });

  it("wires lead intern/extern pairs and keeps Jessica off the B2O lead chain", () => {
    const byId = Object.fromEntries(PEOPLE_SEATS.map((row) => [row.id, row]));
    expect(byId["ismael-casado"]?.handoffId).toBe("lead-ds");
    expect(byId["vacancy-dsm"]?.handoffId).toBeNull();
    expect(byId["michael-watzke"]?.handoffId).toBeNull();
    expect(byId["aron"]?.handoffId).toBe("lead-b2c");
    expect(byId["lead-pd-b2c"]?.handoffId).toBe("lead-b2c");
    expect(byId["laura-geley"]?.handoffId).toBe("lead-b2b");
    expect(byId["lead-pd-b2b"]?.handoffId).toBe("lead-b2b");
    expect(byId["pedro-ciat"]?.handoffId).toBe("lead-b2o");
    expect(byId["lead-pd-b2o"]?.handoffId).toBe("lead-b2o");
    expect(byId["jessica-ciat"]?.handoffId).toBeNull();
    expect(byId["jessica-ciat"]?.chainId).toBeNull();
    expect(byId["vacancy-dsm"]?.sortOrder).toBeLessThan(
      byId["michael-watzke"]?.sortOrder ?? 99,
    );
  });
});
