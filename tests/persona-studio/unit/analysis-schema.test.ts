import { describe, expect, it } from "vitest";
import {
  BehaviouralCluster,
  ClusterSet,
  GenerationMeta,
  SourceAnalysisResult,
  SourceInsight,
} from "@/lib/persona-studio/ai/schemas/analysis";
import { Project, ProjectVisibility } from "@/lib/persona-studio/ai/schemas/project";

const meta = {
  service: "mock:test",
  deterministic: true,
  disclaimer: "Not research.",
  generatedAt: "2026-05-01T09:00:00.000Z",
};

describe("analysis schemas", () => {
  it("validates generation metadata", () => {
    expect(() => GenerationMeta.parse(meta)).not.toThrow();
    expect(() => GenerationMeta.parse({ ...meta, generatedAt: "nope" })).toThrow();
  });

  it("applies defaults on a source insight", () => {
    const insight = SourceInsight.parse({
      id: "i1",
      theme: "Time pressure",
      summary: "Guests are time-pressed.",
    });
    expect(insight.sourceIds).toEqual([]);
    expect(insight.frequency).toBe(0);
  });

  it("validates a full analysis result", () => {
    const result = SourceAnalysisResult.parse({
      meta,
      insights: [
        { id: "i1", theme: "T", summary: "S", sourceIds: ["src-1"] },
      ],
    });
    expect(result.insights).toHaveLength(1);
  });

  it("clamps and validates a behavioural cluster", () => {
    const cluster = BehaviouralCluster.parse({
      id: "c1",
      label: "Time-pressed",
      summary: "…",
      suggestedArchetype: "The Time-Pressed Guest",
      estimatedShare: 0.25,
    });
    expect(cluster.confidence).toBe("LOW");
    expect(() =>
      BehaviouralCluster.parse({
        id: "c2",
        label: "x",
        summary: "y",
        suggestedArchetype: "z",
        estimatedShare: 1.4,
      }),
    ).toThrow();
  });

  it("validates a cluster set", () => {
    expect(() => ClusterSet.parse({ meta, clusters: [] })).not.toThrow();
  });
});

describe("project visibility (Phase 2 additive field)", () => {
  it("accepts the three visibilities", () => {
    for (const v of ["PRIVATE", "TEAM", "CLIENT_SHARED"]) {
      expect(ProjectVisibility.parse(v)).toBe(v);
    }
  });

  it("keeps visibility optional so legacy projects stay valid", () => {
    const base = {
      id: "p",
      name: "P",
      client: "C",
      family: "CORPORATE",
      segment: "S",
      region: "R",
      language: "English",
      researchMode: "PROTO_PERSONA",
      ownerId: "u",
      createdAt: "2026-05-01T09:00:00.000Z",
      updatedAt: "2026-05-01T09:00:00.000Z",
    };
    expect(() => Project.parse(base)).not.toThrow();
    expect(() => Project.parse({ ...base, visibility: "TEAM" })).not.toThrow();
    expect(() => Project.parse({ ...base, visibility: "NOPE" })).toThrow();
  });
});
