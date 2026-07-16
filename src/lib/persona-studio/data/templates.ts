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
  { key: "essence", title: "Who I am", type: "text", order: 0, visible: true, scope: "COMMON" },
  { key: "context", title: "My context", type: "bullets", order: 1, visible: true, scope: "COMMON" },
  { key: "goals", title: "What I'm aiming for", type: "bullets", order: 2, visible: true, scope: "COMMON" },
  { key: "needs", title: "What I need", type: "needs", order: 3, visible: true, scope: "COMMON" },
  { key: "pains", title: "What gets in my way", type: "bullets", order: 4, visible: true, scope: "COMMON" },
  { key: "behaviours", title: "How I move through the day", type: "bullets", order: 5, visible: true, scope: "COMMON" },
  { key: "motivations", title: "What drives me", type: "bullets", order: 6, visible: true, scope: "COMMON" },
  { key: "frustrations", title: "What frustrates me", type: "bullets", order: 7, visible: true, scope: "COMMON" },
  { key: "tensions", title: "Where I feel torn", type: "bullets", order: 8, visible: false, scope: "COMMON" },
  { key: "expectations", title: "What I expect from the experience", type: "bullets", order: 9, visible: true, scope: "COMMON" },
  { key: "moments", title: "Moments that shape my day", type: "moments", order: 10, visible: true, scope: "COMMON" },
  { key: "design_implications", title: "What this means for design", type: "bullets", order: 11, visible: false, scope: "COMMON" },
  { key: "questions_to_validate", title: "Still to validate with people", type: "bullets", order: 12, visible: true, scope: "COMMON" },
];

const CORPORATE_DOMAIN: PersonaSectionTemplate[] = [
  { key: "lifestyle", title: "How I live the day", type: "text", order: 20, visible: true, scope: "DOMAIN" },
  { key: "daily_job", title: "How my work day runs", type: "bullets", order: 21, visible: true, scope: "DOMAIN" },
  { key: "workplace_expectations", title: "What I expect from the workplace", type: "bullets", order: 22, visible: true, scope: "DOMAIN" },
  { key: "food_expectations", title: "What I expect from food", type: "bullets", order: 23, visible: true, scope: "DOMAIN" },
  { key: "key_eating_moments", title: "Eating moments that shape my day", type: "moments", order: 24, visible: true, scope: "DOMAIN" },
  { key: "must_have", title: "What I can't do without", type: "bullets", order: 25, visible: true, scope: "DOMAIN" },
];

const TDF_DOMAIN: PersonaSectionTemplate[] = [
  { key: "reasons_for_attending", title: "Why I'm here", type: "bullets", order: 20, visible: true, scope: "DOMAIN" },
  { key: "key_expectations", title: "What I need from the experience", type: "bullets", order: 21, visible: true, scope: "DOMAIN" },
  { key: "food_hospitality", title: "What I expect from food & hospitality", type: "bullets", order: 22, visible: true, scope: "DOMAIN" },
  { key: "fb_expectations", title: "What I expect from F&B", type: "bullets", order: 23, visible: true, scope: "DOMAIN" },
  { key: "ideal_experience", title: "The experience I hope for", type: "text", order: 24, visible: true, scope: "DOMAIN" },
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
