import { describe, expect, it } from "vitest";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import { PEOPLE_SIGNALS, signalFor } from "@/lib/people-board/signals";

describe("coverage and arbitration signals", () => {
  it("flags Design System uncovered from December while the internal seat is Pr2", () => {
    const signal = signalFor("design-system", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(true);
    expect(signal.lane).toBe("design-system");
    expect(signal.personIds).toEqual([
      "guillaume-sauvanon",
      "ismael-casado",
      "dsm-internal-pt",
    ]);
    expect(signal.headline).toMatch(/December/i);
    expect(signal.headline).toMatch(/Pr2/i);
  });

  it("clears the Design System risk once the internal seat is Pr1", () => {
    const seats = PEOPLE_SEATS.map((seat) =>
      seat.id === "dsm-internal-pt" ? { ...seat, status: "pr1" as const } : seat,
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
    expect(signal.personIds).toEqual(["nikhil-soeze", "lead-pd-b2c"]);
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

  it("flags the Data AI vacancy from P2", () => {
    const signal = signalFor("data-vacancy", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(true);
    expect(signal.lane).toBe("pd-data");
    expect(signal.personIds).toEqual(["vacancy-ai-products"]);
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
