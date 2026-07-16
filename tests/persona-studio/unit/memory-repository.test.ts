import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRepository } from "@/lib/persona-studio/repository/memory-repository";
import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import { CORPORATE_TEMPLATE } from "@/lib/persona-studio/data/templates";
import { scaffoldPersona } from "@/lib/persona-studio/utils/persona-factory";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";

const PROJECT_ID = "proj-xp-play";

function draftPersona(overrides: Partial<Persona> = {}): Persona {
  return {
    ...scaffoldPersona({
      projectId: PROJECT_ID,
      template: CORPORATE_TEMPLATE,
      family: "CORPORATE",
      name: "Draft One",
      archetype: "The Draft",
      category: "Test",
    }),
    ...overrides,
  };
}

describe("MemoryRepository", () => {
  let repo: MemoryRepository;

  beforeEach(() => {
    repo = new MemoryRepository();
  });

  it("never mutates the shared seed dataset", async () => {
    const seedPersonaCount = SEED_DATA.personas.length;
    const seedSourceCount = SEED_DATA.sources.length;
    await repo.createPersona(draftPersona({ id: "p-new" }));
    await repo.deletePersona(SEED_DATA.personas[0].id);
    expect(SEED_DATA.personas.length).toBe(seedPersonaCount);
    expect(SEED_DATA.sources.length).toBe(seedSourceCount);
  });

  it("creates a persona and updates the project counter", async () => {
    const before = (await repo.listPersonas(PROJECT_ID)).length;
    await repo.createPersona(draftPersona({ id: "p-new" }));
    const after = await repo.listPersonas(PROJECT_ID);
    expect(after.length).toBe(before + 1);
    const project = await repo.getProject(PROJECT_ID);
    expect(project?.personaCount).toBe(after.length);
  });

  it("recomputes evidence coverage on create", async () => {
    const persona = draftPersona({ id: "p-cov" });
    persona.commonSections[0].statements = [
      {
        id: "s1",
        content: "Backed by a source.",
        evidenceStatus: "EVIDENCE",
        confidence: "HIGH",
        sourceIds: ["src-1"],
        editable: true,
      },
      {
        id: "s2",
        content: "An assumption.",
        evidenceStatus: "ASSUMPTION",
        confidence: "LOW",
        sourceIds: [],
        editable: true,
      },
    ];
    persona.evidenceCoverage = 0.99; // wrong on purpose
    const created = await repo.createPersona(persona);
    expect(created.evidenceCoverage).toBe(0.5);
  });

  it("snapshots the prior state and increments version on update", async () => {
    const created = await repo.createPersona(draftPersona({ id: "p-v" }));
    expect(created.version).toBe(1);

    const updated = await repo.updatePersona(
      "p-v",
      { ...created, name: "Renamed" },
      { note: "rename" },
    );
    expect(updated.version).toBe(2);
    expect(updated.name).toBe("Renamed");

    const versions = await repo.listPersonaVersions("p-v");
    expect(versions).toHaveLength(1);
    expect(versions[0].version).toBe(1);
    expect(versions[0].snapshot.name).toBe("Draft One");
    expect(versions[0].note).toBe("rename");
  });

  it("restores an earlier version as a new version", async () => {
    const created = await repo.createPersona(draftPersona({ id: "p-r" }));
    await repo.updatePersona("p-r", { ...created, name: "Second" });
    const current = await repo.getPersona("p-r");
    expect(current?.name).toBe("Second");
    expect(current?.version).toBe(2);

    const restored = await repo.restorePersonaVersion("p-r", 1);
    expect(restored.name).toBe("Draft One");
    expect(restored.version).toBe(3);

    // Two prior states are now retained (v1 and v2).
    const versions = await repo.listPersonaVersions("p-r");
    expect(versions.map((v) => v.version).sort()).toEqual([1, 2]);
  });

  it("supports source CRUD and keeps the counter honest", async () => {
    const before = (await repo.listSources(PROJECT_ID)).length;
    const source: SourceDocument = {
      id: "src-new",
      projectId: PROJECT_ID,
      name: "Interview 12",
      type: "text",
      category: "INTERVIEW",
      extractedText: "notes",
      processingStatus: "READY",
      confidentiality: "INTERNAL",
      createdAt: new Date().toISOString(),
    };
    await repo.createSource(source);
    expect((await repo.listSources(PROJECT_ID)).length).toBe(before + 1);
    let project = await repo.getProject(PROJECT_ID);
    expect(project?.sourceCount).toBe(before + 1);

    await repo.deleteSource("src-new");
    expect((await repo.listSources(PROJECT_ID)).length).toBe(before);
    project = await repo.getProject(PROJECT_ID);
    expect(project?.sourceCount).toBe(before);
  });

  it("creates a custom template", async () => {
    const before = (await repo.listTemplates()).length;
    await repo.createTemplate({
      ...CORPORATE_TEMPLATE,
      id: "tpl-custom",
      name: "Custom",
    });
    expect((await repo.listTemplates()).length).toBe(before + 1);
    expect(await repo.getTemplate("tpl-custom")).not.toBeNull();
  });

  it("cleans up versions when a persona is deleted", async () => {
    const created = await repo.createPersona(draftPersona({ id: "p-del" }));
    await repo.updatePersona("p-del", { ...created, name: "Changed" });
    expect((await repo.listPersonaVersions("p-del")).length).toBe(1);
    await repo.deletePersona("p-del");
    expect(await repo.getPersona("p-del")).toBeNull();
    expect((await repo.listPersonaVersions("p-del")).length).toBe(0);
  });
});
