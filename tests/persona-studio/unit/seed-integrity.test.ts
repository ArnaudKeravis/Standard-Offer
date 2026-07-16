import { describe, expect, it } from "vitest";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { Project } from "@/lib/persona-studio/ai/schemas/project";
import { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { Journey } from "@/lib/persona-studio/ai/schemas/workshop";
import { PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import {
  localizeJourney,
  localizePersona,
  localizeProject,
  localizeSource,
} from "@/lib/persona-studio/data/localized";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { collectStatements } from "@/lib/persona-studio/utils/confidence";

const LANGS: StudioLang[] = ["en", "fr"];

describe("Seed data integrity", () => {
  it("seeds four area projects (WORK, HEAL, LEARN, PLAY)", () => {
    expect(SEED_DATA.projects).toHaveLength(4);
    const families = SEED_DATA.projects.map((p) => p.family).sort();
    expect(families).toEqual(["HEAL", "LEARN", "PLAY", "WORK"]);
  });

  it("places Corporate Personix in WORK and Tour de France in PLAY", () => {
    const work = SEED_DATA.personas.filter((p) => p.projectId === "proj-xp-work");
    const play = SEED_DATA.personas.filter((p) => p.projectId === "proj-xp-play");
    expect(work.some((p) => p.id.startsWith("persona-corp-"))).toBe(true);
    expect(work.filter((p) => p.id.startsWith("persona-corp-"))).toHaveLength(8);
    expect(
      play.filter((p) =>
        [
          "persona-david-richardson",
          "persona-sophie-lambert",
          "persona-thomas-garcia",
          "persona-claire-dubois",
        ].includes(p.id),
      ),
    ).toHaveLength(4);
  });

  it("seeds four area projects with personas and portraits", () => {
    const xpIds = [
      "proj-xp-work",
      "proj-xp-heal",
      "proj-xp-learn",
      "proj-xp-play",
    ] as const;
    for (const projectId of xpIds) {
      const project = SEED_DATA.projects.find((p) => p.id === projectId);
      expect(project, projectId).toBeDefined();
      expect(project!.status).toBe("PUBLISHED");
      expect(project!.researchMode).toBe("RESEARCH_GROUNDED");
      const personas = SEED_DATA.personas.filter((p) => p.projectId === projectId);
      expect(personas.length, projectId).toBeGreaterThanOrEqual(5);
      for (const persona of personas) {
        expect(persona.portraitUrl).toMatch(/^\/persona-studio\/.+\.png$/);
      }
    }
  });

  it("every project validates against the schema in both languages", () => {
    for (const lang of LANGS)
      for (const p of SEED_DATA.projects)
        expect(() => Project.parse(localizeProject(p, lang))).not.toThrow();
  });

  it("every persona validates against the schema in both languages", () => {
    for (const lang of LANGS)
      for (const p of SEED_DATA.personas)
        expect(() => Persona.parse(localizePersona(p, lang))).not.toThrow();
  });

  it("every source, journey and template validates in both languages", () => {
    for (const lang of LANGS) {
      for (const s of SEED_DATA.sources)
        expect(() => SourceDocument.parse(localizeSource(s, lang))).not.toThrow();
      for (const j of SEED_DATA.journeys)
        expect(() => Journey.parse(localizeJourney(j, lang))).not.toThrow();
    }
    for (const t of SEED_DATA.templates)
      expect(() => PersonaTemplate.parse(t)).not.toThrow();
  });

  it("seeds the four Tour de France personas inside PLAY", () => {
    const tdf = SEED_DATA.personas.filter((p) =>
      [
        "persona-david-richardson",
        "persona-sophie-lambert",
        "persona-thomas-garcia",
        "persona-claire-dubois",
      ].includes(p.id),
    );
    expect(tdf.every((p) => p.projectId === "proj-xp-play" && p.family === "PLAY")).toBe(
      true,
    );
    // Names are proper nouns — identical in both languages.
    expect(tdf.map((p) => localizePersona(p, "en").name).sort()).toEqual([
      "Claire Dubois",
      "David Richardson",
      "Sophie Lambert",
      "Thomas Garcia",
    ]);
  });

  it("seeds the eight Corporate archetypes inside WORK", () => {
    const corp = SEED_DATA.personas.filter((p) => p.id.startsWith("persona-corp-"));
    expect(corp).toHaveLength(8);
    expect(corp.every((p) => p.projectId === "proj-xp-work" && p.family === "WORK")).toBe(
      true,
    );
  });

  it("leaves Corporate local goals & frustrations as TO_VALIDATE", () => {
    const corp = SEED_DATA.personas.filter((p) => p.id.startsWith("persona-corp-"));
    for (const persona of corp) {
      const goals = persona.commonSections.find((s) => s.key === "goals");
      const frustrations = persona.commonSections.find(
        (s) => s.key === "frustrations",
      );
      expect(goals?.statements.every((s) => s.evidenceStatus === "TO_VALIDATE")).toBe(true);
      expect(
        frustrations?.statements.every((s) => s.evidenceStatus === "TO_VALIDATE"),
      ).toBe(true);
    }
  });

  it("grounds Tour de France statements in the seeded brief", () => {
    const tdf = SEED_DATA.personas.filter((p) =>
      p.id.startsWith("persona-") &&
      [
        "persona-david-richardson",
        "persona-sophie-lambert",
        "persona-thomas-garcia",
        "persona-claire-dubois",
      ].includes(p.id),
    );
    for (const persona of tdf) {
      const resolved = localizePersona(persona, "fr");
      const evidenced = collectStatements([
        ...resolved.commonSections,
        ...resolved.domainSections,
      ]).filter((s) => s.evidenceStatus === "EVIDENCE");
      expect(evidenced.length).toBeGreaterThan(0);
      for (const s of evidenced) {
        expect(s.sourceIds).toContain("src-tdf-brief");
      }
    }
  });

  it("documents Thomas Garcia's waiting-time frustration in both languages", () => {
    const thomas = SEED_DATA.personas.find((p) => p.id === "persona-thomas-garcia");
    expect(thomas).toBeDefined();

    const patterns: Record<StudioLang, RegExp> = {
      fr: /attente|attend/i,
      en: /wait/i,
    };

    for (const lang of LANGS) {
      const resolved = localizePersona(thomas!, lang);
      const frustrations = resolved.commonSections.find(
        (s) => s.key === "frustrations",
      );
      const hasWaiting = frustrations?.statements.some((s) =>
        patterns[lang].test(s.content),
      );
      expect(hasWaiting, `waiting-time frustration missing in ${lang}`).toBe(true);
    }
  });
});
