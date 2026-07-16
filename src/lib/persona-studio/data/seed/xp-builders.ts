import type { ConfidenceLevel, EvidenceStatus, PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";
import { SEED_TIMESTAMP, section } from "../builders";
import {
  resolveText,
  sourceEvidenceCoverage,
  type LocalizedText,
  type PersonaSectionSource,
  type PersonaSource,
  type SourceDocumentSource,
} from "../localized";

export type XpMoment = {
  title: LocalizedText;
  content: LocalizedText;
};

export type XpPersonaSpec = {
  slug: string;
  name: string;
  archetype: LocalizedText;
  category: LocalizedText;
  oneLineEssence: LocalizedText;
  quote: LocalizedText;
  accentColor: string;
  tags: LocalizedText[];
  workplace: LocalizedText[];
  goals: LocalizedText[];
  motivations: LocalizedText[];
  needs: LocalizedText[];
  pains: LocalizedText[];
  journey: XpMoment[];
  /** Thin catalogue profiles — statements marked TO_VALIDATE / LOW. */
  thin?: boolean;
  confidenceLevel?: ConfidenceLevel;
  confidenceExplanation?: LocalizedText;
};

export type XpAreaConfig = {
  projectId: string;
  family: Extract<PersonaFamily, "WORK" | "HEAL" | "LEARN" | "PLAY">;
  segment: LocalizedText;
  sourceId: string;
  sourceName: LocalizedText;
  sourceExtract: string;
};

/** Studio section titles — same format as the original persona sheets, with UX voice. */
const TITLES = {
  essence: { en: "Who I am", fr: "Qui je suis" },
  context: { en: "My context", fr: "Mon contexte" },
  goals: { en: "What I'm aiming for", fr: "Ce que je vise" },
  needs: { en: "What I need", fr: "Ce dont j'ai besoin" },
  motivations: { en: "What drives me", fr: "Ce qui me motive" },
  frustrations: { en: "What frustrates me", fr: "Ce qui me frustre" },
  moments: { en: "Moments that shape my day", fr: "Les moments qui rythment ma journée" },
} as const;

function items(
  texts: LocalizedText[],
  sourceIds: string[],
  opts: { status: EvidenceStatus; confidence: ConfidenceLevel },
) {
  return texts.map((content) => ({
    content,
    sourceIds,
    status: opts.status,
    confidence: opts.confidence,
  }));
}

/** Prefer a human essence over meta "catalogue profile" scaffolding. */
function polishEssence(spec: XpPersonaSpec): LocalizedText {
  const en = resolveText(spec.oneLineEssence, "en");
  const fr = resolveText(spec.oneLineEssence, "fr");
  const meta =
    /catalogue profile|profil catalogue|centres on|centré sur/i.test(en) ||
    /catalogue profile|profil catalogue|centres on|centré sur/i.test(fr);

  if (!meta) return spec.oneLineEssence;

  const quoteEn = resolveText(spec.quote, "en").replace(/^["«]|["»]$/g, "").trim();
  const quoteFr = resolveText(spec.quote, "fr").replace(/^["«]|["»]$/g, "").trim();
  const clip = (s: string, n = 160) =>
    s.length <= n ? s : `${s.slice(0, s.lastIndexOf(" ", n - 1))}…`;

  return {
    en: clip(quoteEn) || resolveText(spec.goals[0] ?? spec.archetype, "en"),
    fr: clip(quoteFr) || resolveText(spec.goals[0] ?? spec.archetype, "fr"),
  };
}

export function buildXpSource(config: XpAreaConfig): SourceDocumentSource {
  return {
    id: config.sourceId,
    projectId: config.projectId,
    name: config.sourceName,
    type: "url",
    date: SEED_TIMESTAMP,
    author: "Sodexo XP Catalogue",
    category: "EXISTING_PERSONA",
    extractedText: config.sourceExtract,
    processingStatus: "READY",
    confidentiality: "INTERNAL",
    createdAt: SEED_TIMESTAMP,
  };
}

/**
 * Map XP Catalogue content into the **original Persona Studio sheet format**
 * (common + domain sections). Same rendering as Corporate / TdF — no second layout.
 */
export function buildXpPersona(
  config: XpAreaConfig,
  spec: XpPersonaSpec,
): PersonaSource {
  const S = [config.sourceId];
  const thin = Boolean(spec.thin);
  const status: EvidenceStatus = thin ? "TO_VALIDATE" : "EVIDENCE";
  const confidence: ConfidenceLevel = thin ? "LOW" : "MEDIUM";
  const evidenceOpts = { status, confidence };
  const essence = polishEssence(spec);
  const id = `persona-xp-${spec.slug}`;

  const commonSections: PersonaSectionSource[] = [
    section(id, {
      key: "essence",
      title: TITLES.essence,
      type: "text",
      order: 0,
      items: [{ content: essence, sourceIds: S, status, confidence }],
    }),
    section(id, {
      key: "context",
      title: TITLES.context,
      type: "bullets",
      order: 1,
      items: items(spec.workplace, S, evidenceOpts),
    }),
    section(id, {
      key: "goals",
      title: TITLES.goals,
      type: "bullets",
      order: 2,
      items: items(spec.goals, S, evidenceOpts),
    }),
    section(id, {
      key: "needs",
      title: TITLES.needs,
      type: "needs",
      order: 3,
      items: items(spec.needs, S, evidenceOpts),
    }),
    section(id, {
      key: "motivations",
      title: TITLES.motivations,
      type: "bullets",
      order: 6,
      items: items(spec.motivations, S, evidenceOpts),
    }),
    section(id, {
      key: "frustrations",
      title: TITLES.frustrations,
      type: "bullets",
      order: 7,
      items: items(spec.pains, S, evidenceOpts),
    }),
    section(id, {
      key: "moments",
      title: TITLES.moments,
      type: "moments",
      order: 10,
      items: spec.journey.map((m) => ({
        label: m.title,
        content: m.content,
        sourceIds: S,
        status,
        confidence,
      })),
    }),
  ];

  const domainSections: PersonaSectionSource[] = [];

  const confidenceLevel = spec.confidenceLevel ?? (thin ? "LOW" : "MEDIUM");
  const confidenceExplanation = spec.confidenceExplanation ?? {
    en: thin
      ? "XP Catalogue profile with thin or pilot content. Fields are preserved faithfully but tagged TO_VALIDATE until fuller research is available."
      : "Content from the Sodexo XP Catalogue, rendered in the Persona Studio sheet format. Catalogue-sourced traits; field behaviours remain to validate in client workshops.",
    fr: thin
      ? "Profil XP Catalogue au contenu mince ou pilote. Les champs sont repris fidèlement mais marqués À VALIDER jusqu'à une recherche plus complète."
      : "Contenu du catalogue XP Sodexo, rendu au format fiche Persona Studio. Traits sourcés catalogue ; comportements terrain à valider en atelier client.",
  };

  return {
    id,
    projectId: config.projectId,
    name: spec.name,
    archetype: spec.archetype,
    category: spec.category,
    family: config.family,
    segment: config.segment,
    oneLineEssence: essence,
    portraitUrl: `/persona-studio/xp/portraits/${spec.slug}.png`,
    accentColor: spec.accentColor,
    quote: spec.quote,
    quoteType: "COMPOSITE",
    confidenceLevel,
    confidenceExplanation,
    evidenceCoverage: sourceEvidenceCoverage([...commonSections, ...domainSections]),
    demographicContext: {
      relevanceNote: {
        en: "Role and workplace mix come from the XP Catalogue; they frame behaviour, not stereotypes.",
        fr: "Le rôle et le mix de lieux de travail viennent du catalogue XP ; ils cadrent le comportement, pas des stéréotypes.",
      },
    },
    behaviouralTags: spec.tags,
    sourceIds: S,
    status: "PUBLISHED",
    version: 1,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
    commonSections,
    domainSections,
  };
}
