import type {
  ConfidenceLevel,
  EvidenceStatus,
  PersonaFamily,
  QuoteType,
} from "@/lib/persona-studio/ai/schemas/common";
import type { Persona, PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import type {
  PersonaSection,
  PersonaSectionTemplate,
} from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";

/**
 * Pure helpers to scaffold schema-valid personas, sections and statements.
 *
 * Shared by the manual editor (add block / statement), the create wizard and
 * the mocked AI generation service, so every path produces the same well-formed
 * shape. These are pure functions with no repository or IO dependency, which
 * keeps them usable on both server and client.
 */

/** Generate a reasonably-unique id with a readable prefix. */
export function newId(prefix: string): string {
  const rand =
    typeof globalThis.crypto?.randomUUID === "function"
      ? globalThis.crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rand}`;
}

/** Turn arbitrary text into a lowercase snake_case section key. */
export function slugifyKey(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return base.length > 0 ? base : "section";
}

export function blankStatement(
  idPrefix: string,
  overrides: Partial<PersonaStatement> = {},
): PersonaStatement {
  return {
    id: newId(`${idPrefix}-st`),
    content: "",
    evidenceStatus: "TO_VALIDATE",
    confidence: "LOW",
    sourceIds: [],
    editable: true,
    ...overrides,
  };
}

/** Build an empty section from a template definition. */
export function sectionFromTemplate(
  personaId: string,
  tmpl: PersonaSectionTemplate,
): PersonaSection {
  return {
    id: `${personaId}-${tmpl.key}`,
    key: tmpl.key,
    title: tmpl.title,
    type: tmpl.type,
    order: tmpl.order,
    visible: tmpl.visible,
    description: tmpl.description,
    statements: [],
  };
}

export function blankSection(
  order: number,
  overrides: Partial<PersonaSection> = {},
): PersonaSection {
  const title = overrides.title ?? "New section";
  return {
    id: newId("sec"),
    key: overrides.key ?? slugifyKey(`${title}_${order}`),
    title,
    type: overrides.type ?? "bullets",
    order,
    visible: overrides.visible ?? true,
    description: overrides.description,
    statements: overrides.statements ?? [],
  };
}

export interface ScaffoldPersonaInput {
  projectId: string;
  template: PersonaTemplate;
  name: string;
  archetype: string;
  category: string;
  family: PersonaFamily;
  oneLineEssence?: string;
  accentColor?: string;
  quote?: string;
  quoteType?: QuoteType;
  confidenceLevel?: ConfidenceLevel;
  confidenceExplanation?: string;
  behaviouralTags?: string[];
  sourceIds?: string[];
  now?: string;
  id?: string;
}

/**
 * Scaffold a blank, schema-valid persona from a template. Sections are created
 * empty (COMMON → commonSections, DOMAIN → domainSections); nothing is
 * evidenced yet, so coverage starts at 0 and confidence at LOW — an honest
 * starting point for a manually authored persona.
 */
export function scaffoldPersona(input: ScaffoldPersonaInput): Persona {
  const id = input.id ?? newId("persona");
  const now = input.now ?? new Date().toISOString();

  const commonSections = input.template.sections
    .filter((s) => s.scope === "COMMON")
    .map((s) => sectionFromTemplate(id, s));
  const domainSections = input.template.sections
    .filter((s) => s.scope === "DOMAIN")
    .map((s) => sectionFromTemplate(id, s));

  return {
    id,
    projectId: input.projectId,
    name: input.name,
    archetype: input.archetype,
    category: input.category,
    family: input.family,
    oneLineEssence:
      input.oneLineEssence && input.oneLineEssence.length > 0
        ? input.oneLineEssence
        : `Draft persona — ${input.archetype}.`,
    accentColor: input.accentColor ?? input.template.accentColor,
    quote: input.quote ?? "",
    quoteType: input.quoteType ?? "NONE",
    confidenceLevel: input.confidenceLevel ?? "LOW",
    confidenceExplanation:
      input.confidenceExplanation ??
      "New draft persona. Confidence is LOW until statements are backed by evidence.",
    evidenceCoverage: 0,
    demographicContext: {},
    commonSections,
    domainSections,
    behaviouralTags: input.behaviouralTags ?? [],
    sourceIds: input.sourceIds ?? [],
    status: "DRAFT",
    version: 1,
    createdAt: now,
    updatedAt: now,
  };
}

export const EVIDENCE_STATUSES: EvidenceStatus[] = [
  "EVIDENCE",
  "ASSUMPTION",
  "TO_VALIDATE",
];
export const CONFIDENCE_LEVELS: ConfidenceLevel[] = ["HIGH", "MEDIUM", "LOW"];
export const QUOTE_TYPES: QuoteType[] = [
  "VERBATIM",
  "COMPOSITE",
  "DRAFTED_HYPOTHESIS",
  "NONE",
];
