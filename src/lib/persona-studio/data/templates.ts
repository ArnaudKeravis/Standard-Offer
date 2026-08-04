import type { PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSectionTemplate } from "@/lib/persona-studio/ai/schemas/section";
import { SEED_TIMESTAMP } from "./builders";

/**
 * Templates scaffold new personas. The Personix / WORK sheet is the
 * **reference structure for all Studio personas**:
 * Who I am · Lifestyle · Goals · Frustrations · Daily job · Workplace
 * expectations · Food expectations · Key eating moments (Eating Moments study).
 */

/**
 * Personix Standard Persona Profile structure — reference for every family.
 * Domain food sections are grounded in the Eating Moments study (Ipsos).
 */
const PERSONIX_REFERENCE: PersonaSectionTemplate[] = [
  { key: "essence", title: "Who I am", type: "text", order: 0, visible: true, scope: "COMMON" },
  { key: "lifestyle", title: "How I live the day", type: "text", order: 1, visible: true, scope: "COMMON" },
  { key: "context", title: "My context", type: "bullets", order: 2, visible: true, scope: "COMMON" },
  { key: "goals", title: "What I'm aiming for", type: "bullets", order: 3, visible: true, scope: "COMMON" },
  { key: "needs", title: "What I need", type: "needs", order: 4, visible: true, scope: "COMMON" },
  { key: "motivations", title: "What drives me", type: "bullets", order: 5, visible: true, scope: "COMMON" },
  { key: "frustrations", title: "What frustrates me", type: "bullets", order: 6, visible: true, scope: "COMMON" },
  { key: "questions_to_validate", title: "Still to validate with people", type: "bullets", order: 7, visible: true, scope: "COMMON" },
  { key: "daily_job", title: "How my work day runs", type: "bullets", order: 20, visible: true, scope: "DOMAIN" },
  { key: "workplace_expectations", title: "What I expect from the workplace", type: "bullets", order: 21, visible: true, scope: "DOMAIN" },
  { key: "food_expectations", title: "What I expect from food", type: "bullets", order: 22, visible: true, scope: "DOMAIN" },
  { key: "key_eating_moments", title: "Eating moments that shape my day", type: "moments", order: 23, visible: true, scope: "DOMAIN" },
  { key: "moments", title: "Moments that shape my day", type: "moments", order: 24, visible: true, scope: "DOMAIN" },
];

const TDF_DOMAIN: PersonaSectionTemplate[] = [
  { key: "reasons_for_attending", title: "Why I'm here", type: "bullets", order: 20, visible: true, scope: "DOMAIN" },
  { key: "key_expectations", title: "What I need from the experience", type: "bullets", order: 21, visible: true, scope: "DOMAIN" },
  { key: "food_hospitality", title: "What I expect from food & hospitality", type: "bullets", order: 22, visible: true, scope: "DOMAIN" },
  { key: "fb_expectations", title: "What I expect from F&B", type: "bullets", order: 23, visible: true, scope: "DOMAIN" },
  { key: "ideal_experience", title: "The experience I hope for", type: "text", order: 24, visible: true, scope: "DOMAIN" },
];

/** WORK / Personix — canonical Studio sheet (reference for all personas). */
export const CORPORATE_TEMPLATE: PersonaTemplate = {
  id: "tpl-corporate-workplace",
  name: "Personix — Standard Persona Profile",
  family: "WORK",
  description:
    "Reference sheet for all Studio personas (Personix PDF). Lifestyle, daily job, workplace & food expectations, and key eating moments from the Eating Moments study (Ipsos × Sodexo). Goals and frustrations are localised per site.",
  accentColor: "#1e3a8a",
  sections: PERSONIX_REFERENCE,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

/** Alias — same reference structure for HEAL / LEARN / PLAY scaffolding. */
export const WORK_REFERENCE_TEMPLATE = CORPORATE_TEMPLATE;

export const TDF_TEMPLATE: PersonaTemplate = {
  id: "tpl-tdf-hospitality",
  name: "Sports Hospitality — Tour de France",
  family: "PLAY",
  description:
    "Hospitality guest personas on the Personix-inspired sheet: attendance context, expectations, motivations, frustrations and F&B.",
  accentColor: "#111111",
  sections: [
    ...PERSONIX_REFERENCE.filter((s) => s.scope === "COMMON"),
    ...TDF_DOMAIN,
  ],
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const SEED_TEMPLATES: PersonaTemplate[] = [
  CORPORATE_TEMPLATE,
  TDF_TEMPLATE,
];
