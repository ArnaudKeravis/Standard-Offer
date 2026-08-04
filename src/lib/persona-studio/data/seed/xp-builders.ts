import type { ConfidenceLevel, EvidenceStatus, PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";
import { UX_SECTION_TITLES } from "@/lib/persona-studio/data/ux-section-titles";
import { stakeholderRoleFromXpSlug } from "@/lib/persona-studio/utils/stakeholder-role";
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
  /**
   * Optional Personix reference layer (Standard Persona Profiles).
   * When set, food expectations + eating moments cite the Eating Moments study
   * and the sheet follows the Personix structure used as Studio template.
   */
  personix?: {
    lifestyle: LocalizedText;
    dailyJob: LocalizedText[];
    workplaceExpectations: LocalizedText[];
    foodExpectations: LocalizedText[];
    eatingMoments: { title: LocalizedText; content: LocalizedText }[];
    eatingSourceIds?: string[];
    personixSourceIds?: string[];
  };
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

/** Studio section titles — Personix reference voice. */
const TITLES = {
  essence: UX_SECTION_TITLES.essence,
  lifestyle: UX_SECTION_TITLES.lifestyle,
  context: UX_SECTION_TITLES.context,
  goals: UX_SECTION_TITLES.goals,
  needs: UX_SECTION_TITLES.needs,
  motivations: UX_SECTION_TITLES.motivations,
  frustrations: UX_SECTION_TITLES.frustrations,
  moments: UX_SECTION_TITLES.moments,
  daily_job: UX_SECTION_TITLES.daily_job,
  workplace_expectations: UX_SECTION_TITLES.workplace_expectations,
  food_expectations: UX_SECTION_TITLES.food_expectations,
  key_eating_moments: UX_SECTION_TITLES.key_eating_moments,
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
    ...(spec.personix
      ? [
          section(id, {
            key: "lifestyle",
            title: TITLES.lifestyle,
            type: "text" as const,
            order: 1,
            items: [
              {
                content: spec.personix.lifestyle,
                sourceIds: spec.personix.personixSourceIds ?? S,
                status,
                confidence,
              },
            ],
          }),
        ]
      : []),
    section(id, {
      key: "context",
      title: TITLES.context,
      type: "bullets",
      order: 2,
      items: items(spec.workplace, S, evidenceOpts),
    }),
    section(id, {
      key: "goals",
      title: TITLES.goals,
      type: "bullets",
      order: 3,
      items: items(spec.goals, S, evidenceOpts),
    }),
    section(id, {
      key: "needs",
      title: TITLES.needs,
      type: "needs",
      order: 4,
      items: items(spec.needs, S, evidenceOpts),
    }),
    section(id, {
      key: "motivations",
      title: TITLES.motivations,
      type: "bullets",
      order: 5,
      items: items(spec.motivations, S, evidenceOpts),
    }),
    section(id, {
      key: "frustrations",
      title: TITLES.frustrations,
      type: "bullets",
      order: 6,
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

  const px = spec.personix;
  const eatingIds = px?.eatingSourceIds ?? S;
  const personixIds = px?.personixSourceIds ?? S;

  const domainSections: PersonaSectionSource[] = px
    ? [
        section(id, {
          key: "daily_job",
          title: TITLES.daily_job,
          type: "bullets",
          order: 20,
          items: items(px.dailyJob, personixIds, evidenceOpts),
        }),
        section(id, {
          key: "workplace_expectations",
          title: TITLES.workplace_expectations,
          type: "bullets",
          order: 21,
          items: items(px.workplaceExpectations, personixIds, evidenceOpts),
        }),
        section(id, {
          key: "food_expectations",
          title: TITLES.food_expectations,
          type: "bullets",
          order: 22,
          items: items(px.foodExpectations, eatingIds, evidenceOpts),
        }),
        section(id, {
          key: "key_eating_moments",
          title: TITLES.key_eating_moments,
          type: "moments",
          order: 23,
          items: px.eatingMoments.map((m) => ({
            label: m.title,
            content: m.content,
            sourceIds: eatingIds,
            status,
            confidence,
          })),
        }),
      ]
    : [];

  const confidenceLevel = spec.confidenceLevel ?? (thin ? "LOW" : "MEDIUM");
  const confidenceExplanation = spec.confidenceExplanation ?? {
    en: thin
      ? "XP Catalogue profile with thin or pilot content. Fields are preserved faithfully but tagged TO_VALIDATE until fuller research is available."
      : px
        ? "Sheet follows the Personix Standard Persona Profile template. Food expectations and key eating moments are evidenced by the Eating Moments study (Ipsos × Sodexo). Goals and frustrations come from the XP Catalogue and remain to validate on site."
        : "Content from the Sodexo XP Catalogue, rendered in the Persona Studio sheet format. Catalogue-sourced traits; field behaviours remain to validate in client workshops.",
    fr: thin
      ? "Profil XP Catalogue au contenu mince ou pilote. Les champs sont repris fidèlement mais marqués À VALIDER jusqu'à une recherche plus complète."
      : px
        ? "Fiche alignée sur le modèle Personix Standard Persona Profile. Attentes food et eating moments étayés par l'étude Eating Moments (Ipsos × Sodexo). Goals et frustrations issus du catalogue XP — à valider sur site."
        : "Contenu du catalogue XP Sodexo, rendu au format fiche Persona Studio. Traits sourcés catalogue ; comportements terrain à valider en atelier client.",
  };

  return {
    id,
    projectId: config.projectId,
    name: spec.name,
    archetype: spec.archetype,
    category: spec.category,
    family: config.family,
    stakeholderRole: stakeholderRoleFromXpSlug(spec.slug),
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
    sourceIds: px
      ? Array.from(new Set([...S, ...personixIds, ...eatingIds]))
      : S,
    status: "PUBLISHED",
    version: 1,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
    commonSections,
    domainSections,
  };
}
