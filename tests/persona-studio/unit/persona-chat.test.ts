import { describe, expect, it } from "vitest";
import { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import {
  TDF_PERSONAS,
  CORPORATE_PERSONAS,
} from "@/lib/persona-studio/data/seed";
import { TDF_SOURCES } from "@/lib/persona-studio/data/seed/tdf-personas";
import { CORPORATE_SOURCES } from "@/lib/persona-studio/data/seed/corporate-personas";
import { buildPersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import { enforceGrounding } from "@/lib/persona-studio/ai/grounding/enforce";
import {
  KeywordEvidenceRetriever,
  defaultRetriever,
} from "@/lib/persona-studio/ai/retrieval/keyword-retriever";
import { MockPersonaChatProvider } from "@/lib/persona-studio/ai/providers/mock-provider";
import { INSUFFICIENT_EVIDENCE_SENTENCE } from "@/lib/persona-studio/utils/chat-i18n";

const thomas = TDF_PERSONAS.find((p) => p.id === "persona-thomas-garcia")!;
const corporate = CORPORATE_PERSONAS[0];

function frenchContext() {
  return buildPersonaGroundingContext(thomas, TDF_SOURCES, "Français");
}

function englishContext() {
  return buildPersonaGroundingContext(
    corporate,
    CORPORATE_SOURCES,
    "English",
  );
}

describe("Grounding context", () => {
  it("flattens a persona into provenance-preserving statements", () => {
    const ctx = frenchContext();
    expect(ctx.lang).toBe("fr");
    expect(ctx.statements.length).toBeGreaterThan(0);
    // Only sources the persona references are included.
    expect(ctx.sources.map((s) => s.id)).toContain("src-tdf-brief");
    for (const s of ctx.statements) {
      expect(s.id).toBeTruthy();
      expect(s.sectionKey).toBeTruthy();
    }
  });
});

describe("Keyword retriever", () => {
  it("finds a persona's own statements by accent-insensitive keyword", () => {
    const ctx = frenchContext();
    const results = new KeywordEvidenceRetriever().retrieve(
      "Qu'est-ce qui vous frustre avec l'attente ?",
      ctx,
    );
    expect(results.length).toBeGreaterThan(0);
    // The persona's own waiting statement is retrieved (accent-insensitive).
    expect(
      results.some((r) => r.statement.content.toLowerCase().includes("attente")),
    ).toBe(true);
    // Never returns anything outside the persona's own statements.
    const ids = new Set(ctx.statements.map((s) => s.id));
    for (const r of results) expect(ids.has(r.statement.id)).toBe(true);
  });

  it("returns nothing when no term matches", () => {
    const ctx = frenchContext();
    const results = defaultRetriever.retrieve("salaire revenu", ctx);
    expect(results).toHaveLength(0);
  });
});

describe("Mock persona chat provider", () => {
  const provider = new MockPersonaChatProvider();

  it("produces a schema-valid, grounded answer for a supported question", async () => {
    const ctx = frenchContext();
    const res = await provider.generate({
      context: ctx,
      question: "Qu'est-ce qui vous frustre le plus, notamment l'attente ?",
      history: [],
      retriever: defaultRetriever,
    });
    expect(() => PersonaChatResponse.parse(res)).not.toThrow();
    expect(res.personaResponse.length).toBeGreaterThan(0);
    expect(res.personaResponse).not.toBe(INSUFFICIENT_EVIDENCE_SENTENCE.fr);
    expect(res.basis.personaStatementIds.length).toBeGreaterThan(0);
  });

  it("cites only source and statement ids from the persona's own evidence", async () => {
    const ctx = frenchContext();
    const validStatementIds = new Set(ctx.statements.map((s) => s.id));
    const validSourceIds = new Set(ctx.sources.map((s) => s.id));

    const res = await provider.generate({
      context: ctx,
      question: "Quelles sont vos attentes en matière de restauration ?",
      history: [],
      retriever: defaultRetriever,
    });

    for (const id of res.basis.personaStatementIds) {
      expect(validStatementIds.has(id)).toBe(true);
    }
    for (const id of res.basis.sourceIds) {
      expect(validSourceIds.has(id)).toBe(true);
    }
    for (const e of res.basis.evidenceExcerpts) {
      expect(validSourceIds.has(e.sourceId)).toBe(true);
    }
  });

  it("takes the insufficient-evidence path and invents no facts (French)", async () => {
    const ctx = frenchContext();
    const res = await provider.generate({
      context: ctx,
      question: "Quel est votre salaire annuel exact ?",
      history: [],
      retriever: defaultRetriever,
    });
    expect(res.personaResponse.startsWith(INSUFFICIENT_EVIDENCE_SENTENCE.fr)).toBe(
      true,
    );
    expect(res.basis.confidence).toBe("LOW");
    // No fabricated evidence: no cited sources/statements/excerpts.
    expect(res.basis.sourceIds).toHaveLength(0);
    expect(res.basis.personaStatementIds).toHaveLength(0);
    expect(res.basis.evidenceExcerpts).toHaveLength(0);
    expect(res.basis.missingInformation.length).toBeGreaterThan(0);
    expect(typeof res.suggestedResearchQuestion).toBe("string");
  });

  it("uses the English insufficient sentence for an English project", async () => {
    const ctx = englishContext();
    const res = await provider.generate({
      context: ctx,
      question: "What is your exact annual salary in dollars?",
      history: [],
      retriever: defaultRetriever,
    });
    expect(
      res.personaResponse.startsWith(INSUFFICIENT_EVIDENCE_SENTENCE.en),
    ).toBe(true);
  });
});

describe("Grounding-enforcement net", () => {
  it("strips any ids the provider returned that are not the persona's own", () => {
    const ctx = frenchContext();
    const realStatementId = ctx.statements[0].id;

    const dirty = PersonaChatResponse.parse({
      personaResponse: "test",
      basis: {
        personaStatementIds: ["fabricated-statement", realStatementId],
        sourceIds: ["fabricated-source", "src-tdf-brief"],
        evidenceExcerpts: [
          { sourceId: "fabricated-source", excerpt: "made up" },
          { sourceId: "src-tdf-brief", excerpt: "real" },
        ],
        assumptionsUsed: [],
        missingInformation: [],
        confidence: "MEDIUM",
      },
      suggestedResearchQuestion: null,
    });

    const clean = enforceGrounding(dirty, ctx);
    expect(clean.basis.personaStatementIds).toEqual([realStatementId]);
    expect(clean.basis.sourceIds).toEqual(["src-tdf-brief"]);
    expect(clean.basis.evidenceExcerpts).toEqual([
      { sourceId: "src-tdf-brief", excerpt: "real" },
    ]);
  });
});
