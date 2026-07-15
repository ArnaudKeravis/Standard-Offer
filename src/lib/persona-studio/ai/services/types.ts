import type { Persona, PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import type { Project } from "@/lib/persona-studio/ai/schemas/project";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type {
  BehaviouralCluster,
  ClusterSet,
  SourceAnalysisResult,
} from "@/lib/persona-studio/ai/schemas/analysis";
import type { PersonaAuditResult } from "@/lib/persona-studio/ai/schemas/chat";

/**
 * The AI service contract for Persona Studio's create/edit flows.
 *
 * Phase 2 ships a mocked, deterministic implementation; Phase 3/5 will provide
 * an OpenAI (Responses API, structured output) implementation behind the exact
 * same interface. Every method returns Zod-validated structured data — never
 * free text — and never fabricates evidence.
 */
export interface AnalyseSourcesInput {
  project: Pick<Project, "id" | "name" | "language" | "family">;
  sources: SourceDocument[];
}

export interface GenerateClustersInput {
  analysis: SourceAnalysisResult;
  desiredClusterCount?: number;
}

export interface GeneratePersonaInput {
  cluster: BehaviouralCluster;
  project: Pick<Project, "id" | "family" | "language">;
  template: PersonaTemplate;
}

export interface PersonaAiService {
  /** Surface recurring behavioural themes from the project's sources. */
  analyseResearchSources(
    input: AnalyseSourcesInput,
  ): Promise<SourceAnalysisResult>;

  /** Group analysed research into candidate behavioural clusters. */
  generateBehaviouralClusters(input: GenerateClustersInput): Promise<ClusterSet>;

  /** Draft a persona from an approved cluster (all content is a labelled draft). */
  generatePersonaFromCluster(input: GeneratePersonaInput): Promise<Persona>;

  /** Audit a persona for evidence integrity and stereotyping. */
  auditPersona(persona: Persona): Promise<PersonaAuditResult>;
}
