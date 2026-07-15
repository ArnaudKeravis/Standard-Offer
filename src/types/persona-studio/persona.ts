/**
 * Inferred persona types. Import domain types from here; the runtime schemas
 * live in `@/lib/persona-studio/ai/schemas`.
 */
export type {
  Persona,
  PersonaVersion,
  PersonaTemplate,
  DemographicContext,
} from "@/lib/persona-studio/ai/schemas/persona";
export type {
  PersonaSection,
  PersonaSectionTemplate,
} from "@/lib/persona-studio/ai/schemas/section";
export type {
  PersonaStatement,
  SourceExcerpt,
} from "@/lib/persona-studio/ai/schemas/statement";
export type {
  EvidenceStatus,
  ConfidenceLevel,
  QuoteType,
  PersonaFamily,
  SectionType,
  LifecycleStatus,
} from "@/lib/persona-studio/ai/schemas/common";
