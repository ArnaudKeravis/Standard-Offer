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

  it("keeps the Portugal internalization seat as Design System Manager", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "dsm-internal-pt");
    expect(seat?.role).toBe("Design System Manager");
    expect(seat?.status).toBe("pr2");
    expect(seat?.startPeriod).toBe(4);
    expect(seat?.chainId).toBe("design-system");
    expect(seat?.lane).toBe("design-system");
  });

  it("places Aron as named B2C interim lead, not a vacancy", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "aron");
    expect(seat?.displayName).toBe("Aron");
    expect(seat?.role).toMatch(/interim/i);
    expect(seat?.lane).toBe("pd-b2c");
    expect(seat?.displayName).not.toMatch(/vacancy/i);
  });

  it("ends Thomas Didier in July in Management", () => {
    const seat = PEOPLE_SEATS.find((row) => row.id === "thomas-didier");
    expect(seat?.endPeriod).toBe(11);
    expect(seat?.lane).toBe("management");
  });

  it("includes Neha on B2C with Nikhil", () => {
    const neha = PEOPLE_SEATS.find((row) => row.id === "neha-b2c");
    const nikhil = PEOPLE_SEATS.find((row) => row.id === "nikhil-soeze");
    expect(neha?.lane).toBe("pd-b2c");
    expect(nikhil?.lane).toBe("pd-b2c");
    expect(neha?.kind).toBe("external");
    expect(neha?.fte).toBe(1);
    expect(neha?.dailyRate).toBe(450);
    expect(neha?.endPeriod).toBe(11);
    expect(neha?.annualCostFromStart).toBe(107550);
  });
});
