import type { User } from "@/lib/persona-studio/ai/schemas/project";
import { SEED_TIMESTAMP } from "../builders";
import { localizeProject, type ProjectSource } from "../localized";
import { langFromLanguage } from "@/lib/persona-studio/utils/i18n";
import {
  TDF_PERSONA_SOURCES,
  TDF_PROJECT_ID,
  TDF_SOURCE_SOURCES,
} from "./tdf-personas";
import {
  CORPORATE_PERSONA_SOURCES,
  CORPORATE_PROJECT_ID,
  CORPORATE_SOURCE_SOURCES,
} from "./corporate-personas";

export const SEED_USER: User = {
  id: "user-facilitator",
  name: "CoDesign Facilitator",
  email: "facilitator@codesign.example",
  role: "FACILITATOR",
};

export const TDF_PROJECT_SOURCE: ProjectSource = {
  id: TDF_PROJECT_ID,
  name: {
    fr: "Personas Hospitalité Tour de France",
    en: "Tour de France Hospitality Personas",
  },
  client: "Hospitalité Tour de France",
  family: "SPORTS_HOSPITALITY",
  segment: { fr: "Sports & Loisirs", en: "Sports & Leisure" },
  region: "France",
  language: "Français",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    fr: "Quatre personas d'invités de l'hospitalité — client VIP business, invité famille, invité sportif et sponsor — pour concevoir des expériences de journée d'étape différenciées.",
    en: "Four hospitality guest personas — business VIP client, family guest, sports fan guest and sponsor — to design differentiated stage-day experiences.",
  },
  workshopObjective: {
    fr: "Concevoir une offre d'hospitalité qui fonctionne pour quatre types d'invités très différents.",
    en: "Design a hospitality offer that works for four very different types of guest.",
  },
  audience: [
    { fr: "Clients VIP", en: "VIP clients" },
    { fr: "Familles", en: "Families" },
    { fr: "Passionnés de sport", en: "Sports enthusiasts" },
    { fr: "Sponsors", en: "Sponsors" },
  ],
  desiredPersonaCount: 4,
  templateId: "tpl-tdf-hospitality",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: TDF_PERSONA_SOURCES.length,
  sourceCount: TDF_SOURCE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const CORPORATE_PROJECT_SOURCE: ProjectSource = {
  id: CORPORATE_PROJECT_ID,
  name: {
    en: "Corporate Workplace Personas",
    fr: "Personas d'environnement de travail",
  },
  client: "Standard Personix Library",
  family: "CORPORATE",
  segment: { en: "Corporate Services", fr: "Services aux entreprises" },
  region: "Global",
  language: "English",
  researchMode: "PROTO_PERSONA",
  description: {
    en: "The eight standard Personix workplace archetypes, ready to localise with client HR & operations data before a workshop.",
    fr: "Les huit archétypes standard Personix de l'environnement de travail, prêts à être localisés avec les données RH et opérationnelles du client avant un atelier.",
  },
  workshopObjective: {
    en: "Localise the standard archetypes to a specific client site.",
    fr: "Localiser les archétypes standard sur un site client spécifique.",
  },
  audience: [
    { en: "Leaders", fr: "Dirigeants" },
    { en: "Managers", fr: "Managers" },
    { en: "Support roles", fr: "Fonctions support" },
    { en: "Experts", fr: "Experts" },
    { en: "New joiners", fr: "Nouveaux arrivants" },
    { en: "Frontline operators", fr: "Opérateurs de première ligne" },
  ],
  desiredPersonaCount: 8,
  templateId: "tpl-corporate-workplace",
  ownerId: SEED_USER.id,
  status: "IN_REVIEW",
  personaCount: CORPORATE_PERSONA_SOURCES.length,
  sourceCount: CORPORATE_SOURCE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

/** Bilingual authoring sources (fed to the repository, resolved per request). */
export const SEED_PROJECT_SOURCES: ProjectSource[] = [
  TDF_PROJECT_SOURCE,
  CORPORATE_PROJECT_SOURCE,
];

/** Resolved to each project's own default language for direct consumers. */
export const SEED_PROJECTS = SEED_PROJECT_SOURCES.map((p) =>
  localizeProject(p, langFromLanguage(p.language)),
);
