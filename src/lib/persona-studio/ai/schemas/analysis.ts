import { z } from "zod";
import { ConfidenceLevel, Id } from "./common";

/**
 * Phase 2 analysis schemas.
 *
 * These describe the *structured* outputs of the research-analysis and
 * cluster-generation steps of the project-creation wizard. They exist now (with
 * a real Zod contract) so the mocked deterministic service and the later
 * OpenAI-backed service produce exactly the same shape — never Markdown to be
 * parsed. Everything generated is explicitly marked as machine-produced so the
 * UI can never present it as field research.
 */

/**
 * Provenance for anything a service (mock or real) produces. `deterministic`
 * distinguishes the Phase 2 mock from a live model; `disclaimer` is surfaced in
 * the UI so generated material is never mistaken for evidence.
 */
export const GenerationMeta = z.object({
  service: z.string().min(1),
  deterministic: z.boolean(),
  disclaimer: z.string().min(1),
  generatedAt: z.string().datetime({ offset: true }),
});
export type GenerationMeta = z.infer<typeof GenerationMeta>;

/**
 * A single theme surfaced when analysing the project's sources. It always cites
 * the sources it was derived from so the pattern is traceable.
 */
export const SourceInsight = z.object({
  id: Id,
  theme: z.string().min(1),
  summary: z.string().min(1),
  sourceIds: z.array(Id).default([]),
  supportingExcerpts: z.array(z.string()).default([]),
  /** How often the theme appears across sources (mock: derived count). */
  frequency: z.number().int().nonnegative().default(0),
});
export type SourceInsight = z.infer<typeof SourceInsight>;

export const SourceAnalysisResult = z.object({
  meta: GenerationMeta,
  insights: z.array(SourceInsight).default([]),
});
export type SourceAnalysisResult = z.infer<typeof SourceAnalysisResult>;

/**
 * A behavioural cluster proposed from the analysed sources. Clusters are the
 * bridge between raw research and personas: a facilitator approves the clusters
 * that should become personas. Differentiated by behaviour/needs/tensions, not
 * demographics (product principle #1).
 */
export const BehaviouralCluster = z.object({
  id: Id,
  label: z.string().min(1),
  summary: z.string().min(1),
  suggestedArchetype: z.string().min(1),
  behaviouralTags: z.array(z.string()).default([]),
  needSignals: z.array(z.string()).default([]),
  frustrationSignals: z.array(z.string()).default([]),
  sourceIds: z.array(Id).default([]),
  /** Estimated share of the sampled participants, 0–1 (mock: even split). */
  estimatedShare: z.number().min(0).max(1).default(0),
  /** Confidence in the cluster itself (mock defaults MEDIUM/LOW). */
  confidence: ConfidenceLevel.default("LOW"),
});
export type BehaviouralCluster = z.infer<typeof BehaviouralCluster>;

export const ClusterSet = z.object({
  meta: GenerationMeta,
  clusters: z.array(BehaviouralCluster).default([]),
});
export type ClusterSet = z.infer<typeof ClusterSet>;
