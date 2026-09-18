import { describe, expect, it } from "vitest";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import { PEOPLE_SIGNALS, signalFor } from "@/lib/people-board/signals";

describe("coverage and arbitration signals", () => {
  it("flags Design System uncovered from December while the internal seat is Pr2", () => {
    const signal = signalFor("design-system", PEOPLE_SEATS);
    expect(signal.kind).toBe("coverage-risk");
    expect(signal.active).toBe(true);
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

  it("binds Nikhil and the India Lead PD into one arbitration", () => {
    const signal = signalFor("india-b2c-soeze", PEOPLE_SEATS);
    expect(signal.kind).toBe("arbitrate");
    expect(signal.active).toBe(true);
    expect(signal.personIds).toEqual(["nikhil-soeze", "lead-pd-b2c-india"]);
    expect(signal.headline).toMatch(/India/i);
    expect(signal.headline).toMatch(/reallocate|arbitrate|align/i);
  });

  it("registers both signals in the catalogue", () => {
    expect(PEOPLE_SIGNALS.map((row) => row.id)).toEqual([
      "design-system",
      "india-b2c-soeze",
    ]);
  });
});
