import { describe, expect, it } from "vitest";

import { profileLine, profilePath, stagePoints, timeToMinutes } from "@/lib/workshops/aso/profile";
import { parseSnapshot } from "@/lib/workshops/aso/persist";
import {
  SCREENS,
  SEQUENCES,
  profileFor,
  screensFor,
  sequenceById,
  sequencesFor,
} from "@/lib/workshops/aso/run-of-show";

describe("ASO run of show", () => {
  it("keeps unique sequence and screen ids", () => {
    const sequenceIds = SEQUENCES.map((sequence) => sequence.id);
    const screenIds = SCREENS.map((screen) => screen.id);
    expect(new Set(sequenceIds).size).toBe(sequenceIds.length);
    expect(new Set(screenIds).size).toBe(screenIds.length);
  });

  it("covers J1 itinerance from 08:45 to 17:30", () => {
    const j1 = sequencesFor("j1");
    expect(j1[0]?.start).toBe("08:45");
    expect(j1[0]?.id).toBe("accueil");
    const last = j1[j1.length - 1];
    expect(last?.id).toBe("close-j1");
    expect(timeToMinutes(last.start) + last.durationMin).toBe(timeToMinutes("17:30"));
    expect(sequenceById("themes").col).toBe("hc");
    expect(sequenceById("vote").col).toBe("sprint");
  });

  it("seeds eight J2 working sequences for GD / GA", () => {
    expect(sequencesFor("j2")).toHaveLength(8);
    expect(sequencesFor("j2").every((sequence) => sequence.day === "j2")).toBe(true);
  });

  it("ties every sequence screen to a known sequence", () => {
    for (const screen of SCREENS) {
      const sequenceId = screen.sequenceId;
      if (!sequenceId) continue;
      expect(() => sequenceById(sequenceId)).not.toThrow();
    }
    expect(screensFor("j1").some((screen) => screen.kind === "profile")).toBe(true);
    expect(screensFor("j1").some((screen) => screen.kind === "proof")).toBe(true);
  });
});

describe("ASO stage profile", () => {
  it("places points in time order with the HC climb highest", () => {
    const points = profileFor("j1");
    const xs = points.map((point) => point.x);
    expect(xs).toEqual([...xs].sort((a, b) => a - b));
    const peak = [...points].sort((a, b) => b.y - a.y)[0];
    expect(peak.sequenceId).toBe("themes");
    expect(profilePath(points, 1000, 400)).toContain("M");
    expect(profileLine(points, 1000, 400)).toContain("M");
    expect(stagePoints([]).length).toBe(0);
  });
});

describe("ASO persist", () => {
  it("rejects broken snapshots", () => {
    expect(parseSnapshot(null)).toBeNull();
    expect(parseSnapshot("{")).toBeNull();
    expect(parseSnapshot(JSON.stringify({ version: 2, day: "j1", index: 0 }))).toBeNull();
    expect(
      parseSnapshot(
        JSON.stringify({ version: 1, day: "j1", index: 3, hintDismissed: true, blackout: false }),
      ),
    ).toEqual({
      version: 1,
      day: "j1",
      index: 3,
      hintDismissed: true,
      blackout: false,
    });
  });
});
