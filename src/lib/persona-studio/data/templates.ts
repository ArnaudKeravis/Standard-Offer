import type { PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSectionTemplate } from "@/lib/persona-studio/ai/schemas/section";
import { SEED_TIMESTAMP } from "./builders";

/**
 * Templates are the mechanism that lets one product serve two persona families.
 * A template is just an ordered list of section definitions plus a default
 * theme accent. Editing/creating a persona scaffolds from these; nothing about
 * the two families is hard-coded into components.
 */

const COMMON_CORE: PersonaSectionTemplate[] = [
  { key: "essence", title: "Essence", type: "text", order: 0, visible: true, scope: "COMMON" },
  { key: "context", title: "Context", type: "bullets", order: 1, visible: true, scope: "COMMON" },
  { key: "goals", title: "Goals", type: "bullets", order: 2, visible: true, scope: "COMMON" },
  { key: "needs", title: "Needs", type: "needs", order: 3, visible: true, scope: "COMMON" },
  { key: "pains", title: "Pains", type: "bullets", order: 4, visible: true, scope: "COMMON" },
  { key: "behaviours", title: "Behaviours & rituals", type: "bullets", order: 5, visible: true, scope: "COMMON" },
  { key: "motivations", title: "Motivations", type: "bullets", order: 6, visible: true, scope: "COMMON" },
  { key: "frustrations", title: "Frustrations", type: "bullets", order: 7, visible: true, scope: "COMMON" },
  { key: "tensions", title: "Tensions & contradictions", type: "bullets", order: 8, visible: false, scope: "COMMON" },
  { key: "expectations", title: "Expectations", type: "bullets", order: 9, visible: true, scope: "COMMON" },
  { key: "moments", title: "Moments that matter", type: "moments", order: 10, visible: false, scope: "COMMON" },
  { key: "design_implications", title: "Design implications", type: "bullets", order: 11, visible: false, scope: "COMMON" },
  { key: "questions_to_validate", title: "Questions to validate", type: "bullets", order: 12, visible: true, scope: "COMMON" },
];

const CORPORATE_DOMAIN: PersonaSectionTemplate[] = [
  { key: "lifestyle", title: "Lifestyle", type: "text", order: 20, visible: true, scope: "DOMAIN" },
  { key: "daily_job", title: "Daily job characteristics", type: "bullets", order: 21, visible: true, scope: "DOMAIN" },
  { key: "workplace_expectations", title: "Workplace expectations", type: "bullets", order: 22, visible: true, scope: "DOMAIN" },
  { key: "food_expectations", title: "Food expectations", type: "bullets", order: 23, visible: true, scope: "DOMAIN" },
  { key: "key_eating_moments", title: "Key eating moments", type: "moments", order: 24, visible: true, scope: "DOMAIN" },
  { key: "must_have", title: "Must-have requirements", type: "bullets", order: 25, visible: true, scope: "DOMAIN" },
];

const TDF_DOMAIN: PersonaSectionTemplate[] = [
  { key: "reasons_for_attending", title: "Reasons for attending", type: "bullets", order: 20, visible: true, scope: "DOMAIN" },
  { key: "key_expectations", title: "Key expectations", type: "bullets", order: 21, visible: true, scope: "DOMAIN" },
  { key: "food_hospitality", title: "Food & hospitality expectations", type: "bullets", order: 22, visible: true, scope: "DOMAIN" },
  { key: "fb_expectations", title: "F&B expectations", type: "bullets", order: 23, visible: true, scope: "DOMAIN" },
  { key: "ideal_experience", title: "Ideal experience", type: "text", order: 24, visible: true, scope: "DOMAIN" },
];

export const CORPORATE_TEMPLATE: PersonaTemplate = {
  id: "tpl-corporate-workplace",
  name: "Corporate Workplace",
  family: "CORPORATE",
  description:
    "Personix-aligned workplace personas: behaviour-first, structured around daily job, workplace and food expectations and key eating moments.",
  accentColor: "#1e3a8a",
  sections: [...COMMON_CORE, ...CORPORATE_DOMAIN],
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const TDF_TEMPLATE: PersonaTemplate = {
  id: "tpl-tdf-hospitality",
  name: "Sports Hospitality — Tour de France",
  family: "SPORTS_HOSPITALITY",
  description:
    "Hospitality guest personas: attendance context, expectations, motivations, frustrations and F&B, with a per-guest accent colour.",
  accentColor: "#111111",
  sections: [...COMMON_CORE, ...TDF_DOMAIN],
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const SEED_TEMPLATES: PersonaTemplate[] = [
  CORPORATE_TEMPLATE,
  TDF_TEMPLATE,
];
