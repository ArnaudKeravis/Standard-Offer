import { describe, expect, it } from "vitest";
import {
  isLeadSeat,
  matchesSeatFilters,
  parseSeatFilters,
  serializeSeatFilters,
} from "@/lib/people-board/filters";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

describe("seat filters", () => {
  it("treats empty chips as show all", () => {
    expect(
      PEOPLE_SEATS.every((seat) => matchesSeatFilters(seat, new Set())),
    ).toBe(true);
  });

  it("ORs selected chips", () => {
    const pr2 = PEOPLE_SEATS.filter((seat) =>
      matchesSeatFilters(seat, new Set(["pr2"])),
    );
    expect(pr2.every((seat) => seat.status === "pr2")).toBe(true);
    expect(pr2.length).toBeGreaterThan(0);

    const mixed = PEOPLE_SEATS.filter((seat) =>
      matchesSeatFilters(seat, new Set(["pr2", "external"])),
    );
    expect(mixed.every((seat) => seat.status === "pr2" || seat.kind === "external")).toBe(
      true,
    );
    expect(mixed.length).toBeGreaterThan(pr2.length);
  });

  it("marks lead seats from handoff or role", () => {
    expect(isLeadSeat(PEOPLE_SEATS.find((seat) => seat.id === "lead-pd-b2c")!)).toBe(
      true,
    );
    expect(isLeadSeat(PEOPLE_SEATS.find((seat) => seat.id === "aron")!)).toBe(true);
    expect(isLeadSeat(PEOPLE_SEATS.find((seat) => seat.id === "neha-b2c")!)).toBe(
      false,
    );
  });

  it("round-trips filter chips", () => {
    const raw = serializeSeatFilters(["pr2", "lead"]);
    expect(parseSeatFilters(raw)).toEqual(new Set(["pr2", "lead"]));
    expect(parseSeatFilters("pr2,nope")).toEqual(new Set(["pr2"]));
    expect(parseSeatFilters(null)).toEqual(new Set());
  });
});
