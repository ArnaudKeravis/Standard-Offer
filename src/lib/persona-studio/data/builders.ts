import type { ConfidenceLevel, EvidenceStatus, SectionType } from "@/lib/persona-studio/ai/schemas/common";
import type {
  LocalizedText,
  PersonaSectionSource,
  PersonaStatementSource,
} from "@/lib/persona-studio/data/localized";

/**
 * Ergonomic builders for authoring seed personas by hand. They keep the seed
 * files readable while still producing fully-typed, schema-valid objects.
 *
 * Content fields accept {@link LocalizedText}: a plain string (same in both
 * languages) or a `{ en, fr }` pair. The repository resolves these to a single
 * language at the data-access boundary.
 *
 * Seeds use a fixed timestamp so snapshots and tests are deterministic.
 */
export const SEED_TIMESTAMP = "2026-05-01T09:00:00.000Z";

type StatementInput = {
  content: LocalizedText;
  /** Defaults to EVIDENCE for seeded, sourced content. */
  status?: EvidenceStatus;
  confidence?: ConfidenceLevel;
  sourceIds?: string[];
  label?: LocalizedText;
  editable?: boolean;
};

/**
 * Build a single statement. `idPrefix` + `index` produce a stable id so seeds
 * are reproducible across runs.
 */
export function statement(
  idPrefix: string,
  index: number,
  input: StatementInput,
): PersonaStatementSource {
  return {
    id: `${idPrefix}-s${index}`,
    label: input.label,
    content: input.content,
    evidenceStatus: input.status ?? "EVIDENCE",
    confidence: input.confidence ?? "MEDIUM",
    sourceIds: input.sourceIds ?? [],
    editable: input.editable ?? true,
  };
}

type SectionInput = {
  key: string;
  title: LocalizedText;
  type?: SectionType;
  order: number;
  visible?: boolean;
  description?: LocalizedText;
  /** Statement inputs; ids are derived from the section id. */
  items: StatementInput[];
};

/**
 * Build a section with its statements. Statement ids derive from the section id
 * so everything stays stable and collision-free within a persona.
 */
export function section(
  personaId: string,
  input: SectionInput,
): PersonaSectionSource {
  const sectionId = `${personaId}-${input.key}`;
  return {
    id: sectionId,
    key: input.key,
    title: input.title,
    type: input.type ?? "bullets",
    order: input.order,
    visible: input.visible ?? true,
    description: input.description,
    statements: input.items.map((item, i) => statement(sectionId, i + 1, item)),
  };
}
