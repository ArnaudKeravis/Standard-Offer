import { describe, expect, it } from "vitest";
import { chunkText, evidenceItemsFromText } from "@/lib/persona-studio/ai/ingestion/chunk-text";
import { computeDifferentiation } from "@/lib/persona-studio/utils/differentiation";
import { verifyAccessSecret, isWriteGateEnabled } from "@/lib/persona-studio/auth/access";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";

describe("chunkText", () => {
  it("splits long text into overlapping windows", () => {
    const text = "Alpha paragraph.\n\n" + "word ".repeat(200);
    const chunks = chunkText(text, { maxChars: 120, overlap: 20 });
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.every((c) => c.length > 0)).toBe(true);
  });

  it("builds evidence items from text", () => {
    const items = evidenceItemsFromText({
      projectId: "proj-1",
      sourceId: "src-1",
      text: "First block.\n\nSecond block with enough content for a chunk.",
    });
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].sourceId).toBe("src-1");
    expect(items[0].projectId).toBe("proj-1");
  });
});

describe("computeDifferentiation", () => {
  function stubPersona(
    id: string,
    tags: string[],
    needs: string[],
  ): Persona {
    return {
      id,
      projectId: "p",
      name: id,
      archetype: "A",
      category: "c",
      family: "WORK",
      oneLineEssence: "e",
      accentColor: "#000",
      quote: "",
      quoteType: "NONE",
      confidenceLevel: "MEDIUM",
      confidenceExplanation: "x",
      evidenceCoverage: 0.5,
      demographicContext: {},
      behaviouralTags: tags,
      commonSections: [
        {
          id: `${id}-needs`,
          key: "needs",
          title: "Needs",
          type: "bullets",
          order: 1,
          visible: true,
          statements: needs.map((content, i) => ({
            id: `${id}-n-${i}`,
            content,
            evidenceStatus: "EVIDENCE" as const,
            confidence: "HIGH" as const,
            sourceIds: ["s1"],
            editable: true,
          })),
        },
      ],
      domainSections: [],
      sourceIds: ["s1"],
      status: "PUBLISHED",
      version: 1,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
  }

  it("scores unique personas higher than clones", () => {
    const a = stubPersona("a", ["fast", "solo"], ["Need quiet focus"]);
    const b = stubPersona("b", ["fast", "team"], ["Need social lunch"]);
    const clone = stubPersona("c", ["fast", "solo"], ["Need quiet focus"]);
    const uniqueScore = computeDifferentiation(a, [b]).score;
    const cloneScore = computeDifferentiation(a, [clone]).score;
    expect(uniqueScore).toBeGreaterThan(cloneScore);
  });
});

describe("access gate helpers", () => {
  it("treats missing secret as open write access", () => {
    const prev = process.env.PERSONA_STUDIO_ACCESS_SECRET;
    delete process.env.PERSONA_STUDIO_ACCESS_SECRET;
    expect(isWriteGateEnabled()).toBe(false);
    expect(verifyAccessSecret("anything")).toBe(true);
    if (prev !== undefined) process.env.PERSONA_STUDIO_ACCESS_SECRET = prev;
  });
});
