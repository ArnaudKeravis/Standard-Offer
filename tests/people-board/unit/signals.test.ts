import { describe, expect, it } from "vitest";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import { PEOPLE_SIGNALS, signalFor } from "@/lib/people-board/signals";

describe("coverage and arbitration signals", () => {
  it("flags Design System while DSM is a full-year external vacancy", () => {
    const signal = signalFor("design-system", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(true);
    expect(signal.lane).toBe("design-system");
    expect(signal.personIds).toEqual([
      "guillaume-sauvanon",
      "ismael-casado",
      "vacancy-dsm",
    ]);
    expect(signal.headline).toMatch(/vacancy/i);
    expect(signal.headline).toMatch(/year/i);
  });

  it("clears the Design System risk once the DSM vacancy is hired", () => {
    const seats = PEOPLE_SEATS.map((seat) =>
      seat.id === "vacancy-dsm"
        ? {
            ...seat,
            displayName: "DSM",
            budgetGap: false,
            inBudget: true,
          }
        : seat,
    );
    const signal = signalFor("design-system", seats);
    expect(signal.active).toBe(false);
  });

  it("flags B2B after Laura if the internal Lead is Pr2 with no budget", () => {
    const signal = signalFor("pd-b2b", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(true);
    expect(signal.personIds).toEqual(["laura-geley", "lead-pd-b2b"]);
    expect(signal.headline).toMatch(/B2B/i);
    expect(signal.headline).toMatch(/budget|Pr2/i);
  });

  it("binds Nikhil and the India Lead PD into one arbitration", () => {
    const signal = signalFor("india-b2c-soeze", PEOPLE_SEATS);
    expect(signal.kind).toBe("arbitrate");
    expect(signal.active).toBe(true);
    expect(signal.personIds).toEqual([
      "nikhil-soeze",
      "vacancy-b2c-india",
      "lead-pd-b2c",
    ]);
    expect(signal.headline).toMatch(/India/i);
  });

  it("registers the six signals in the catalogue", () => {
    expect(PEOPLE_SIGNALS.map((row) => row.id)).toEqual([
      "design-system",
      "pd-b2b",
      "india-b2c-soeze",
      "thomas-exit",
      "data-vacancy",
      "b2o-overlap",
    ]);
  });

  it("flags Thomas ending in July with no successor", () => {
    const signal = signalFor("thomas-exit", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(true);
    expect(signal.lane).toBe("management");
    expect(signal.personIds).toEqual(["thomas-didier"]);
    expect(signal.headline).toMatch(/Thomas/i);
    expect(signal.headline).toMatch(/P11|July/i);
  });

  it("clears the Data AI risk once Neha sits on the seat", () => {
    const signal = signalFor("data-vacancy", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(false);
    expect(signal.lane).toBe("pd-data");
    expect(signal.personIds).toEqual(["neha-b2c"]);
    expect(signal.headline).toMatch(/Neha/i);
    expect(signal.headline).toMatch(/AI/i);
  });

  it("flags Pedro and Lead PD B2O overlapping from P4", () => {
    const signal = signalFor("b2o-overlap", PEOPLE_SEATS);
    expect(signal.kind).toBe("arbitrate");
    expect(signal.active).toBe(true);
    expect(signal.personIds).toEqual(["pedro-ciat", "lead-pd-b2o"]);
    expect(signal.headline).toMatch(/overlap|both|double/i);
  });
});
