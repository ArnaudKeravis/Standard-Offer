import { describe, expect, it } from "vitest";
import {
  AGENDA,
  BLOCKS,
  CLINIC_TABLES,
  FY27_ACCEL,
  GBS_DECK,
  HOURBACK_STEPS,
  MATURITY,
  ROADMAP_TRACKS,
  SCREENS,
  WORKSHOP,
  blockById,
  clinicDuration,
  hourbackDuration,
} from "@/lib/workshops/tech-ambition/run-of-show";

describe("tech ambition run of show", () => {
  it("keeps unique screen ids in a known block", () => {
    const ids = SCREENS.map((screen) => screen.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const screen of SCREENS) {
      expect(BLOCKS.some((block) => block.id === screen.blockId)).toBe(true);
    }
  });

  it("has six live clinic tables and greys data out of the tables", () => {
    expect(CLINIC_TABLES).toHaveLength(6);
    expect(MATURITY.filter((row) => row.table === null).map((row) => row.id)).toEqual([
      "data",
    ]);
    expect(CLINIC_TABLES.every((table) => table.host.length > 0)).toBe(true);
  });

  it("uses the ritual durations from the run-of-show", () => {
    expect(blockById("proud").durationMin).toBe(30);
    expect(clinicDuration(1)).toBe(15 * 60_000);
    expect(clinicDuration("report")).toBe(3 * 60_000);
    expect(hourbackDuration(1)).toBe(15 * 60_000);
    expect(hourbackDuration(2)).toBe(5 * 60_000);
    expect(hourbackDuration(3)).toBe(20 * 60_000);
    expect(blockById("hourback").durationMin).toBe(40);
    expect(HOURBACK_STEPS.every((step) => step.example.length > 0)).toBe(true);
  });

  it("puts a 20-minute leader strategy sharing session before a 40-minute build", () => {
    expect(blockById("roadmap").start).toBe("15:20");
    expect(blockById("roadmap").durationMin).toBe(20);
    expect(blockById("roadmap").label).toBe("AI agents strategy sharing");
    expect(blockById("hourback").start).toBe("15:40");
    expect(blockById("hourback").durationMin).toBe(40);
    expect(AGENDA.map((item) => item.title)).toEqual([
      "CoDesign FY26",
      "What you need to know about AI",
      "Proud of",
      "AI Strategy & Agentic Platform",
      "Break",
      "AI Clinics",
      "AI agents strategy sharing",
      "Hands-on",
      "What walks out",
    ]);
    expect(AGENDA.find((item) => item.time === "15:20")).toMatchObject({
      mins: "20'",
      title: "AI agents strategy sharing",
    });
    expect(SCREENS.some((screen) => screen.kind === "roadmap-roster")).toBe(true);
    expect(SCREENS.filter((screen) => screen.kind === "roadmap-track")).toHaveLength(5);
    expect(SCREENS.filter((screen) => screen.kind === "gbs-deck")).toHaveLength(5);
  });

  it("opens with Arnaud and Henri, and only uses Albrand when others have last names", () => {
    expect(WORKSHOP.hosts).toEqual(["Arnaud Keravis", "Henri Abt"]);
    const clinicNames = CLINIC_TABLES.flatMap((table) => [
      table.round1,
      table.round2,
    ]).join(" · ");
    expect(clinicNames).not.toContain("Algrain");
    expect(clinicNames).not.toContain("Albrand");
    expect(clinicNames).toContain("Kevin");
    expect(ROADMAP_TRACKS.filter((track) => track.host.startsWith("Kevin")).map((track) => track.host)).toEqual([
      "Kevin Albrand",
      "Kevin Albrand",
    ]);
    expect(SCREENS.some((screen) => screen.kind === "fy26-brief")).toBe(true);
    expect(SCREENS.some((screen) => screen.id === "fy26-results")).toBe(false);
    expect(SCREENS.some((screen) => screen.id === "ai-philosophy")).toBe(false);
    const gbs = ROADMAP_TRACKS.find((track) => track.id === "gbs");
    expect(gbs).toMatchObject({
      host: "Anshul Bhardwaj",
      filled: true,
    });
    expect(GBS_DECK.scope.themes.map((theme) => theme.name)).toEqual([
      "P2P",
      "R2R",
      "O2C",
      "MDM",
      "Reporting",
      "HRSS",
    ]);
    expect(GBS_DECK.sut.rows).toHaveLength(4);
    expect(GBS_DECK.pipeline.rows).toHaveLength(14);
    expect(SCREENS.filter((screen) => screen.kind === "strategy-accel")).toHaveLength(7);
    expect(FY27_ACCEL.priorities.title).toBe(
      "AI Acceleration focuses on three priorities, each with a dedicated delivery model",
    );
    expect(FY27_ACCEL.factories.proofs[0]).toContain("Client360");
  });
});
