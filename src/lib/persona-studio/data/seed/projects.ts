import type { User } from "@/lib/persona-studio/ai/schemas/project";
import { SEED_TIMESTAMP } from "../builders";
import { localizeProject, type ProjectSource } from "../localized";
import { langFromLanguage } from "@/lib/persona-studio/utils/i18n";
import {
  TDF_PERSONA_SOURCES,
  TDF_SOURCE_SOURCES,
} from "./tdf-personas";
import {
  CORPORATE_PERSONA_SOURCES,
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

const WORK_PERSONA_COUNT =
  XP_WORK_PERSONA_SOURCES.length + CORPORATE_PERSONA_SOURCES.length;
const WORK_SOURCE_COUNT =
  XP_WORK_SOURCE_SOURCES.length + CORPORATE_SOURCE_SOURCES.length;
const PLAY_PERSONA_COUNT =
  XP_PLAY_PERSONA_SOURCES.length + TDF_PERSONA_SOURCES.length;
const PLAY_SOURCE_COUNT =
  XP_PLAY_SOURCE_SOURCES.length + TDF_SOURCE_SOURCES.length;

export const XP_WORK_PROJECT_SOURCE: ProjectSource = {
  id: XP_WORK_PROJECT_ID,
  name: {
    en: "Work",
    fr: "Work",
  },
  client: "Sodexo",
  family: "WORK",
  segment: { en: "Corporate Services — Work", fr: "Services aux entreprises — Work" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "WORK personas: XP Catalogue workplace profiles plus the Personix corporate archetypes — one Studio sheet format for every role.",
    fr: "Personas WORK : profils catalogue XP du lieu de travail et archétypes Personix corporate — un seul format de fiche Studio pour chaque rôle.",
  },
  workshopObjective: {
    en: "Design workplace services that fit client, operator, employee and Personix archetype journeys.",
    fr: "Concevoir des services workplace adaptés aux parcours client, opérateur, collaborateur et archétypes Personix.",
  },
  audience: [
    { en: "Clients & operators", fr: "Clients & opérateurs" },
    { en: "White / blue / grey collar", fr: "Cols blancs / bleus / gris" },
    { en: "Personix archetypes", fr: "Archétypes Personix" },
    { en: "Military", fr: "Militaire" },
  ],
  desiredPersonaCount: WORK_PERSONA_COUNT,
  templateId: "tpl-corporate-workplace",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: WORK_PERSONA_COUNT,
  sourceCount: WORK_SOURCE_COUNT,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const XP_HEAL_PROJECT_SOURCE: ProjectSource = {
  id: XP_HEAL_PROJECT_ID,
  name: {
    en: "Heal",
    fr: "Heal",
  },
  client: "Sodexo",
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
    en: "Learn",
    fr: "Learn",
  },
  client: "Sodexo",
  family: "LEARN",
  segment: { en: "Education — Learn", fr: "Éducation — Learn" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "LEARN-area personas from the Sodexo XP Catalogue — campus and school journeys for clients, operators, students, parents and teachers.",
    fr: "Personas du territoire LEARN du catalogue XP Sodexo — parcours campus et école pour clients, opérateurs, étudiants, parents et enseignants.",
  },
  workshopObjective: {
    en: "Design campus and school services that help students thrive.",
    fr: "Concevoir des services campus et scolaires qui aident les élèves et étudiants à s'épanouir.",
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
    en: "Play",
    fr: "Play",
  },
  client: "Sodexo",
  family: "PLAY",
  segment: { en: "Sports & Leisure — Play", fr: "Sports & Loisirs — Play" },
  region: "Global",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description: {
    en: "PLAY personas: XP Catalogue event and venue profiles plus Tour de France hospitality guests — one Studio sheet format for every experience.",
    fr: "Personas PLAY : profils catalogue XP événementiels et personas d'hospitalité Tour de France — un seul format de fiche Studio pour chaque expérience.",
  },
  workshopObjective: {
    en: "Design hospitality and event experiences that work for very different guest types.",
    fr: "Concevoir des expériences d'hospitalité et d'événement qui fonctionnent pour des types d'invités très différents.",
  },
  audience: [
    { en: "Clients & operators", fr: "Clients & opérateurs" },
    { en: "Fans & VIP guests", fr: "Fans & invités VIP" },
    { en: "Tour de France hospitality", fr: "Hospitalité Tour de France" },
    { en: "Participants & travellers", fr: "Participants & voyageurs" },
  ],
  desiredPersonaCount: PLAY_PERSONA_COUNT,
  templateId: "tpl-tdf-hospitality",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: PLAY_PERSONA_COUNT,
  sourceCount: PLAY_SOURCE_COUNT,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

/** Four area projects only — Corporate lives in WORK, TdF in PLAY. */
export const SEED_PROJECT_SOURCES: ProjectSource[] = [
  XP_WORK_PROJECT_SOURCE,
  XP_HEAL_PROJECT_SOURCE,
  XP_LEARN_PROJECT_SOURCE,
  XP_PLAY_PROJECT_SOURCE,
];

/** Resolved to each project's own default language for direct consumers. */
export const SEED_PROJECTS = SEED_PROJECT_SOURCES.map((p) =>
  localizeProject(p, langFromLanguage(p.language)),
);
