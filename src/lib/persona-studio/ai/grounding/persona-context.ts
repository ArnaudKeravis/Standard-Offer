import type {
  ConfidenceLevel,
  EvidenceStatus,
  PersonaFamily,
  QuoteType,
} from "@/lib/persona-studio/ai/schemas/common";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type {
  EvidenceItem,
  SourceDocument,
} from "@/lib/persona-studio/ai/schemas/evidence";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { langFromLanguage } from "@/lib/persona-studio/utils/i18n";

/**
 * The grounding layer for "Talk to a persona".
 *
 * A {@link PersonaGroundingContext} is the *only* material a provider may use to
 * answer as the persona. It is a flattened, provenance-preserving projection of
 * the persona's structured data + linked sources — so every provider (mock or
 * OpenAI) is physically constrained to the persona's own evidence, and every
 * cited id can be traced back to a real statement or source.
 */

/** A persona statement flattened for grounding, keeping its provenance. */
export interface GroundingStatement {
  id: string;
  sectionKey: string;
  sectionTitle: string;
  label?: string;
  content: string;
  evidenceStatus: EvidenceStatus;
  confidence: ConfidenceLevel;
  sourceIds: string[];
  excerpts: { sourceId: string; excerpt: string; locator?: string }[];
}

/** A source flattened for grounding (never carries real participant identity). */
export interface GroundingSource {
  id: string;
  name: string;
  category: string;
  confidentiality: string;
  participantRef?: string;
}

export interface PersonaGroundingContext {
  lang: StudioLang;
  persona: {
    id: string;
    projectId: string;
    name: string;
    archetype: string;
    category: string;
    family: PersonaFamily;
    segment?: string;
    oneLineEssence: string;
    quote: string;
    quoteType: QuoteType;
    confidenceLevel: ConfidenceLevel;
    confidenceExplanation: string;
    evidenceCoverage: number;
    behaviouralTags: string[];
    demographicContext: Persona["demographicContext"];
    sourceIds: string[];
  };
  statements: GroundingStatement[];
  sources: GroundingSource[];
}

/**
 * Build the grounding context from a persona and its linked sources. Only
 * sources referenced by the persona (or one of its statements) are included, so
 * the model can never cite a document that does not belong to this persona.
 *
 * When `evidenceItems` are provided, each chunk becomes a synthetic grounding
 * statement (`sectionKey: source_chunk`) so the keyword retriever can surface
 * source snippets alongside persona statements — without inventing content.
 */
export function buildPersonaGroundingContext(
  persona: Persona,
  projectSources: SourceDocument[],
  language?: string,
  evidenceItems: EvidenceItem[] = [],
): PersonaGroundingContext {
  const lang = langFromLanguage(language);

  const statements: GroundingStatement[] = [
    ...persona.commonSections,
    ...persona.domainSections,
  ]
    .filter((section) => section.visible)
    .flatMap((section) =>
      section.statements.map((s) => ({
        id: s.id,
        sectionKey: section.key,
        sectionTitle: section.title,
        label: s.label,
        content: s.content,
        evidenceStatus: s.evidenceStatus,
        confidence: s.confidence,
        sourceIds: s.sourceIds,
        excerpts: (s.sourceExcerpts ?? []).map((e) => ({
          sourceId: e.sourceId,
          excerpt: e.excerpt,
          locator: e.locator,
        })),
      })),
    );

  // Only sources that the persona actually references may be grounded against.
  const referenced = new Set<string>(persona.sourceIds);
  for (const st of statements) for (const id of st.sourceIds) referenced.add(id);

  const sources: GroundingSource[] = projectSources
    .filter((s) => referenced.has(s.id))
    .map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      confidentiality: s.confidentiality,
      participantRef: s.participantRef,
    }));

  const sourceName = new Map(sources.map((s) => [s.id, s.name]));
  for (const item of evidenceItems) {
    if (!referenced.has(item.sourceId)) continue;
    statements.push({
      id: item.id,
      sectionKey: "source_chunk",
      sectionTitle: sourceName.get(item.sourceId) ?? "Source excerpt",
      label: "Source excerpt",
      content: item.content,
      evidenceStatus: "EVIDENCE",
      confidence: "MEDIUM",
      sourceIds: [item.sourceId],
      excerpts: [
        {
          sourceId: item.sourceId,
          excerpt: item.content.slice(0, 280),
        },
      ],
    });
  }

  return {
    lang,
    persona: {
      id: persona.id,
      projectId: persona.projectId,
      name: persona.name,
      archetype: persona.archetype,
      category: persona.category,
      family: persona.family,
      segment: persona.segment,
      oneLineEssence: persona.oneLineEssence,
      quote: persona.quote,
      quoteType: persona.quoteType,
      confidenceLevel: persona.confidenceLevel,
      confidenceExplanation: persona.confidenceExplanation,
      evidenceCoverage: persona.evidenceCoverage,
      behaviouralTags: persona.behaviouralTags,
      demographicContext: persona.demographicContext,
      sourceIds: persona.sourceIds,
    },
    statements,
    sources,
  };
}

/** The set of ids the model is allowed to cite, for the enforcement net. */
export function groundedIdSets(context: PersonaGroundingContext): {
  statementIds: Set<string>;
  sourceIds: Set<string>;
} {
  return {
    statementIds: new Set(context.statements.map((s) => s.id)),
    sourceIds: new Set(context.sources.map((s) => s.id)),
  };
}
