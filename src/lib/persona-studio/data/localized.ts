import type { EvidenceStatus } from "@/lib/persona-studio/ai/schemas/common";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import type { Project } from "@/lib/persona-studio/ai/schemas/project";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type { Journey, JourneyStep } from "@/lib/persona-studio/ai/schemas/workshop";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Bilingual authoring layer for Persona Studio seed content.
 *
 * The runtime domain types (`Persona`, `Project`, `Journey`, `SourceDocument`)
 * stay plain-string so every downstream util, component and test is unchanged.
 * Seed content is instead *authored* against the `*Source` types below, where
 * every human-readable field is a {@link LocalizedText}. The repository resolves
 * a source into a plain runtime object at the data-access boundary via the
 * `localize*` helpers, so only one language is ever handed to the UI.
 *
 * A plain `string` is a valid `LocalizedText`, which means a runtime object
 * (e.g. a persona created through the editor) is structurally assignable to its
 * `*Source` type: content created in one language is simply stored as the same
 * string for both languages, and resolves identically.
 */
export type LocalizedText = string | { en: string; fr: string };

/** Resolve a bilingual value to a plain string in the requested language. */
export function resolveText(value: LocalizedText, lang: StudioLang): string {
  return typeof value === "string" ? value : value[lang];
}

/* --------------------------------------------------------------------------
   Authoring ("source") types — runtime types with LocalizedText text fields.
-------------------------------------------------------------------------- */

export type PersonaStatementSource = Omit<PersonaStatement, "content" | "label"> & {
  content: LocalizedText;
  label?: LocalizedText;
};

export type PersonaSectionSource = Omit<
  PersonaSection,
  "title" | "description" | "statements"
> & {
  title: LocalizedText;
  description?: LocalizedText;
  statements: PersonaStatementSource[];
};

export type DemographicContextSource = {
  /** Age band is a descriptor, not localised. */
  ageRange?: string;
  location?: LocalizedText;
  tenure?: LocalizedText;
  authorityLevel?: LocalizedText;
  incomeLevel?: LocalizedText;
  relevanceNote?: LocalizedText;
};

export type PersonaSource = Omit<
  Persona,
  | "name"
  | "archetype"
  | "category"
  | "segment"
  | "oneLineEssence"
  | "quote"
  | "confidenceExplanation"
  | "demographicContext"
  | "behaviouralTags"
  | "commonSections"
  | "domainSections"
> & {
  name: LocalizedText;
  archetype: LocalizedText;
  category: LocalizedText;
  segment?: LocalizedText;
  oneLineEssence: LocalizedText;
  quote: LocalizedText;
  confidenceExplanation: LocalizedText;
  demographicContext: DemographicContextSource;
  behaviouralTags: LocalizedText[];
  commonSections: PersonaSectionSource[];
  domainSections: PersonaSectionSource[];
};

export type ProjectSource = Omit<
  Project,
  "name" | "description" | "segment" | "audience" | "workshopObjective" | "shareNote"
> & {
  name: LocalizedText;
  description: LocalizedText;
  segment: LocalizedText;
  audience: LocalizedText[];
  workshopObjective?: LocalizedText;
  shareNote?: LocalizedText;
};

export type JourneyStepSource = Omit<JourneyStep, "title"> & { title: LocalizedText };
export type JourneySource = Omit<Journey, "name" | "steps"> & {
  name: LocalizedText;
  steps: JourneyStepSource[];
};

export type SourceDocumentSource = Omit<SourceDocument, "name"> & {
  name: LocalizedText;
};

/* --------------------------------------------------------------------------
   Resolvers — source → plain runtime object for a single language.
-------------------------------------------------------------------------- */

function opt(value: LocalizedText | undefined, lang: StudioLang): string | undefined {
  return value === undefined ? undefined : resolveText(value, lang);
}

function localizeStatement(
  s: PersonaStatementSource,
  lang: StudioLang,
): PersonaStatement {
  return {
    ...s,
    content: resolveText(s.content, lang),
    label: opt(s.label, lang),
  };
}

function localizeSection(
  s: PersonaSectionSource,
  lang: StudioLang,
): PersonaSection {
  return {
    ...s,
    title: resolveText(s.title, lang),
    description: opt(s.description, lang),
    statements: s.statements.map((st) => localizeStatement(st, lang)),
  };
}

export function localizePersona(src: PersonaSource, lang: StudioLang): Persona {
  return {
    ...src,
    name: resolveText(src.name, lang),
    archetype: resolveText(src.archetype, lang),
    category: resolveText(src.category, lang),
    segment: opt(src.segment, lang),
    oneLineEssence: resolveText(src.oneLineEssence, lang),
    quote: resolveText(src.quote, lang),
    confidenceExplanation: resolveText(src.confidenceExplanation, lang),
    demographicContext: {
      ageRange: src.demographicContext.ageRange,
      location: opt(src.demographicContext.location, lang),
      tenure: opt(src.demographicContext.tenure, lang),
      authorityLevel: opt(src.demographicContext.authorityLevel, lang),
      incomeLevel: opt(src.demographicContext.incomeLevel, lang),
      relevanceNote: opt(src.demographicContext.relevanceNote, lang),
    },
    behaviouralTags: src.behaviouralTags.map((t) => resolveText(t, lang)),
    commonSections: src.commonSections.map((s) => localizeSection(s, lang)),
    domainSections: src.domainSections.map((s) => localizeSection(s, lang)),
  };
}

export function localizeProject(src: ProjectSource, lang: StudioLang): Project {
  return {
    ...src,
    name: resolveText(src.name, lang),
    description: resolveText(src.description, lang),
    segment: resolveText(src.segment, lang),
    audience: src.audience.map((a) => resolveText(a, lang)),
    workshopObjective: opt(src.workshopObjective, lang),
    shareNote: opt(src.shareNote, lang),
  };
}

export function localizeJourney(src: JourneySource, lang: StudioLang): Journey {
  return {
    ...src,
    name: resolveText(src.name, lang),
    steps: src.steps.map((step) => ({ ...step, title: resolveText(step.title, lang) })),
  };
}

export function localizeSource(
  src: SourceDocumentSource,
  lang: StudioLang,
): SourceDocument {
  return { ...src, name: resolveText(src.name, lang) };
}

/** Evidence coverage from source sections (language-independent). */
export function sourceEvidenceCoverage(sections: PersonaSectionSource[]): number {
  const statements = sections.flatMap((s) => s.statements);
  if (statements.length === 0) return 0;
  const evidenced = statements.filter(
    (s: { evidenceStatus: EvidenceStatus }) => s.evidenceStatus === "EVIDENCE",
  ).length;
  return Math.round((evidenced / statements.length) * 100) / 100;
}
