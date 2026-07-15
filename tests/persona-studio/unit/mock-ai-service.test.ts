import { describe, expect, it } from "vitest";
import { MockPersonaAiService } from "@/lib/persona-studio/ai/services/mock-service";
import {
  ClusterSet,
  SourceAnalysisResult,
} from "@/lib/persona-studio/ai/schemas/analysis";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { PersonaAuditResult } from "@/lib/persona-studio/ai/schemas/chat";
import { TDF_TEMPLATE } from "@/lib/persona-studio/data/templates";
import { collectStatements } from "@/lib/persona-studio/utils/confidence";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";

const service = new MockPersonaAiService();

const project = {
  id: "proj-x",
  name: "Test project",
  language: "English",
  family: "SPORTS_HOSPITALITY" as const,
};

const source: SourceDocument = {
  id: "src-1",
  projectId: "proj-x",
  name: "Interview 1",
  type: "text",
  category: "INTERVIEW",
  extractedText: "Guests said they value fast, seamless access and recognition.",
  processingStatus: "READY",
  confidentiality: "INTERNAL",
  createdAt: "2026-05-01T09:00:00.000Z",
};

describe("MockPersonaAiService", () => {
  it("produces schema-valid, labelled source analysis", async () => {
    const analysis = await service.analyseResearchSources({
      project,
      sources: [source],
    });
    expect(() => SourceAnalysisResult.parse(analysis)).not.toThrow();
    expect(analysis.meta.deterministic).toBe(true);
    expect(analysis.meta.disclaimer.length).toBeGreaterThan(0);
    expect(analysis.insights.length).toBeGreaterThan(0);
    for (const insight of analysis.insights) {
      expect(insight.sourceIds).toContain("src-1");
    }
  });

  it("is deterministic across runs", async () => {
    const a = await service.analyseResearchSources({ project, sources: [source] });
    const b = await service.analyseResearchSources({ project, sources: [source] });
    expect(a.insights.map((i) => i.theme)).toEqual(b.insights.map((i) => i.theme));
  });

  it("produces schema-valid behavioural clusters honouring the requested count", async () => {
    const analysis = await service.analyseResearchSources({
      project,
      sources: [source],
    });
    const clusters = await service.generateBehaviouralClusters({
      analysis,
      desiredClusterCount: 3,
    });
    expect(() => ClusterSet.parse(clusters)).not.toThrow();
    expect(clusters.clusters).toHaveLength(3);
    for (const c of clusters.clusters) {
      expect(c.confidence).toBe("LOW");
    }
  });

  it("drafts a persona that never presents generated content as evidence", async () => {
    const analysis = await service.analyseResearchSources({
      project,
      sources: [source],
    });
    const { clusters } = await service.generateBehaviouralClusters({
      analysis,
    });
    const persona = await service.generatePersonaFromCluster({
      cluster: clusters[0],
      project,
      template: TDF_TEMPLATE,
    });

    expect(() => Persona.parse(persona)).not.toThrow();
    expect(persona.status).toBe("DRAFT");
    expect(persona.confidenceLevel).toBe("LOW");
    expect(persona.quoteType).toBe("DRAFTED_HYPOTHESIS");
    expect(persona.evidenceCoverage).toBe(0);

    const statements = collectStatements([
      ...persona.commonSections,
      ...persona.domainSections,
    ]);
    expect(statements.length).toBeGreaterThan(0);
    // Nothing generated may claim to be EVIDENCE.
    expect(statements.every((s) => s.evidenceStatus !== "EVIDENCE")).toBe(true);
  });

  it("audits a persona and returns a schema-valid result", async () => {
    const analysis = await service.analyseResearchSources({
      project,
      sources: [source],
    });
    const { clusters } = await service.generateBehaviouralClusters({ analysis });
    const persona = await service.generatePersonaFromCluster({
      cluster: clusters[0],
      project,
      template: TDF_TEMPLATE,
    });
    const audit = await service.auditPersona(persona);
    expect(() => PersonaAuditResult.parse(audit)).not.toThrow();
    expect(audit.personaId).toBe(persona.id);
  });
});
