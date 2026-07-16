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
import {
  XP_WORK_PERSONA_SOURCES,
  XP_WORK_PROJECT_ID,
  XP_WORK_SOURCE_SOURCES,
} from "./xp-work-personas";
import {
  XP_HEAL_PERSONA_SOURCES,
  XP_HEAL_PROJECT_ID,
  XP_HEAL_SOURCE_SOURCES,
} from "./xp-heal-personas";
import {
  XP_LEARN_PERSONA_SOURCES,
  XP_LEARN_PROJECT_ID,
  XP_LEARN_SOURCE_SOURCES,
} from "./xp-learn-personas";
import {
  XP_PLAY_PERSONA_SOURCES,
  XP_PLAY_PROJECT_ID,
  XP_PLAY_SOURCE_SOURCES,
} from "./xp-play-personas";

export const SEED_USER: User = {
  id: "user-facilitator",
  name: "CoDesign Facilitator",
  email: "facilitator@codesign.example",
  role: "FACILITATOR",
};

export const XP_WORK_PROJECT_SOURCE: ProjectSource = {
  id: XP_WORK_PROJECT_ID,
  name: {
    en: "XP Catalogue — Work",
    fr: "Catalogue XP — Work",
  },
  client: "Sodexo XP Catalogue",
  family: "WORK",
  segment: { en: "Corporate Services — Work", fr: "Services aux entreprises — Work" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "WORK-area personas from the Sodexo XP Catalogue — client, operator and frontline profiles that shape everyday workplace experiences.",
    fr: "Personas du territoire WORK du catalogue XP Sodexo — profils client, opérateur et terrain qui façonnent les expériences de travail au quotidien.",
  },
  workshopObjective: {
    en: "Design workplace services that fit client, operator and employee journeys across the workday.",
    fr: "Concevoir des services sur le lieu de travail adaptés aux parcours client, opérateur et collaborateur sur la journée.",
  },
  audience: [
    { en: "Clients", fr: "Clients" },
    { en: "Operators", fr: "Opérateurs" },
    { en: "White / blue / grey collar", fr: "Cols blancs / bleus / gris" },
    { en: "Military", fr: "Militaire" },
  ],
  desiredPersonaCount: XP_WORK_PERSONA_SOURCES.length,
  templateId: "tpl-corporate-workplace",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: XP_WORK_PERSONA_SOURCES.length,
  sourceCount: XP_WORK_SOURCE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const XP_HEAL_PROJECT_SOURCE: ProjectSource = {
  id: XP_HEAL_PROJECT_ID,
  name: {
    en: "XP Catalogue — Heal",
    fr: "Catalogue XP — Heal",
  },
  client: "Sodexo XP Catalogue",
  family: "HEAL",
  segment: { en: "Healthcare — Heal", fr: "Santé — Heal" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "HEAL-area personas from the Sodexo XP Catalogue — clients, operators, clinicians, patients and residents across care journeys.",
    fr: "Personas du territoire HEAL du catalogue XP Sodexo — clients, opérateurs, soignants, patients et résidents sur les parcours de soin.",
  },
  workshopObjective: {
    en: "Design care-site services that support patients, residents and caregivers without adding friction.",
    fr: "Concevoir des services de site de soin qui soutiennent patients, résidents et soignants sans ajouter de friction.",
  },
  audience: [
    { en: "Clients", fr: "Clients" },
    { en: "Operators", fr: "Opérateurs" },
    { en: "Doctors & nurses", fr: "Médecins & infirmiers" },
    { en: "Patients & seniors", fr: "Patients & seniors" },
  ],
  desiredPersonaCount: XP_HEAL_PERSONA_SOURCES.length,
  templateId: "tpl-corporate-workplace",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: XP_HEAL_PERSONA_SOURCES.length,
  sourceCount: XP_HEAL_SOURCE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const XP_LEARN_PROJECT_SOURCE: ProjectSource = {
  id: XP_LEARN_PROJECT_ID,
  name: {
    en: "XP Catalogue — Learn",
    fr: "Catalogue XP — Learn",
  },
  client: "Sodexo XP Catalogue",
  family: "LEARN",
  segment: { en: "Education — Learn", fr: "Éducation — Learn" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "LEARN-area personas from the Sodexo XP Catalogue — campus clients and operators plus students, schoolchildren, parents and teachers.",
    fr: "Personas du territoire LEARN du catalogue XP Sodexo — clients et opérateurs de campus, plus étudiants, collégiens, parents et enseignants.",
  },
  workshopObjective: {
    en: "Design campus and school services that help learners, parents and staff thrive day to day.",
    fr: "Concevoir des services de campus et d'école qui aident apprenants, parents et personnels à s'épanouir au quotidien.",
  },
  audience: [
    { en: "Clients", fr: "Clients" },
    { en: "Operators", fr: "Opérateurs" },
    { en: "Students & schoolchildren", fr: "Étudiants & collégiens" },
    { en: "Parents & teachers", fr: "Parents & enseignants" },
  ],
  desiredPersonaCount: XP_LEARN_PERSONA_SOURCES.length,
  templateId: "tpl-corporate-workplace",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: XP_LEARN_PERSONA_SOURCES.length,
  sourceCount: XP_LEARN_SOURCE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const XP_PLAY_PROJECT_SOURCE: ProjectSource = {
  id: XP_PLAY_PROJECT_ID,
  name: {
    en: "XP Catalogue — Play",
    fr: "Catalogue XP — Play",
  },
  client: "Sodexo XP Catalogue",
  family: "PLAY",
  segment: { en: "Sports & Events — Play", fr: "Sports & Événements — Play" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "PLAY-area personas from the Sodexo XP Catalogue — venue clients and operators plus fans, VIP guests, participants and travellers.",
    fr: "Personas du territoire PLAY du catalogue XP Sodexo — clients et opérateurs de lieux, plus fans, invités VIP, participants et voyageurs.",
  },
  workshopObjective: {
    en: "Design event-day hospitality that scales from fan to VIP without losing emotion or flow.",
    fr: "Concevoir une hospitalité de jour J qui passe du fan au VIP sans perdre l'émotion ni la fluidité.",
  },
  audience: [
    { en: "Clients", fr: "Clients" },
    { en: "Operators", fr: "Opérateurs" },
    { en: "Fans & participants", fr: "Fans & participants" },
    { en: "VIP & travellers", fr: "VIP & voyageurs" },
  ],
  desiredPersonaCount: XP_PLAY_PERSONA_SOURCES.length,
  templateId: "tpl-tdf-hospitality",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: XP_PLAY_PERSONA_SOURCES.length,
  sourceCount: XP_PLAY_SOURCE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
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
  XP_WORK_PROJECT_SOURCE,
  XP_HEAL_PROJECT_SOURCE,
  XP_LEARN_PROJECT_SOURCE,
  XP_PLAY_PROJECT_SOURCE,
  TDF_PROJECT_SOURCE,
  CORPORATE_PROJECT_SOURCE,
];

/** Resolved to each project's own default language for direct consumers. */
export const SEED_PROJECTS = SEED_PROJECT_SOURCES.map((p) =>
  localizeProject(p, langFromLanguage(p.language)),
);
