import type { User } from "@/lib/persona-studio/ai/schemas/project";
import type { PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import type {
  JourneySource,
  PersonaSource,
  ProjectSource,
  SourceDocumentSource,
} from "../localized";

import { SEED_TEMPLATES } from "../templates";
import {
  SEED_PROJECTS,
  SEED_PROJECT_SOURCES,
  SEED_USER,
} from "./projects";
import { SEED_JOURNEYS, SEED_JOURNEY_SOURCES } from "./journeys";
import {
  TDF_PERSONAS,
  TDF_PERSONA_SOURCES,
  TDF_SOURCES,
  TDF_SOURCE_SOURCES,
} from "./tdf-personas";
import {
  CORPORATE_PERSONAS,
  CORPORATE_PERSONA_SOURCES,
  CORPORATE_SOURCES,
  CORPORATE_SOURCE_SOURCES,
} from "./corporate-personas";
import {
  XP_WORK_PERSONAS,
  XP_WORK_PERSONA_SOURCES,
  XP_WORK_SOURCES,
  XP_WORK_SOURCE_SOURCES,
} from "./xp-work-personas";
import {
  XP_HEAL_PERSONAS,
  XP_HEAL_PERSONA_SOURCES,
  XP_HEAL_SOURCES,
  XP_HEAL_SOURCE_SOURCES,
} from "./xp-heal-personas";
import {
  XP_LEARN_PERSONAS,
  XP_LEARN_PERSONA_SOURCES,
  XP_LEARN_SOURCES,
  XP_LEARN_SOURCE_SOURCES,
} from "./xp-learn-personas";
import {
  XP_PLAY_PERSONAS,
  XP_PLAY_PERSONA_SOURCES,
  XP_PLAY_SOURCES,
  XP_PLAY_SOURCE_SOURCES,
} from "./xp-play-personas";

/**
 * The complete, in-memory seed dataset for Persona Studio.
 *
 * Content is stored in its bilingual *authoring* (`*Source`) form; the
 * repository resolves each entity to the requested language at the data-access
 * boundary (see `repository/*`). Templates and the user are not localised.
 */
export interface SeedData {
  user: User;
  projects: ProjectSource[];
  personas: PersonaSource[];
  sources: SourceDocumentSource[];
  journeys: JourneySource[];
  templates: PersonaTemplate[];
}

export const SEED_DATA: SeedData = {
  user: SEED_USER,
  projects: SEED_PROJECT_SOURCES,
  personas: [
    ...XP_WORK_PERSONA_SOURCES,
    ...XP_HEAL_PERSONA_SOURCES,
    ...XP_LEARN_PERSONA_SOURCES,
    ...XP_PLAY_PERSONA_SOURCES,
    ...TDF_PERSONA_SOURCES,
    ...CORPORATE_PERSONA_SOURCES,
  ],
  sources: [
    ...XP_WORK_SOURCE_SOURCES,
    ...XP_HEAL_SOURCE_SOURCES,
    ...XP_LEARN_SOURCE_SOURCES,
    ...XP_PLAY_SOURCE_SOURCES,
    ...TDF_SOURCE_SOURCES,
    ...CORPORATE_SOURCE_SOURCES,
  ],
  journeys: SEED_JOURNEY_SOURCES,
  templates: SEED_TEMPLATES,
};

export {
  SEED_PROJECTS,
  SEED_USER,
  SEED_JOURNEYS,
  SEED_TEMPLATES,
  TDF_PERSONAS,
  CORPORATE_PERSONAS,
  TDF_SOURCES,
  CORPORATE_SOURCES,
  XP_WORK_PERSONAS,
  XP_HEAL_PERSONAS,
  XP_LEARN_PERSONAS,
  XP_PLAY_PERSONAS,
  XP_WORK_SOURCES,
  XP_HEAL_SOURCES,
  XP_LEARN_SOURCES,
  XP_PLAY_SOURCES,
};
