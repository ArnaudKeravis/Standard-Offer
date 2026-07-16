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
  personas: [...TDF_PERSONA_SOURCES, ...CORPORATE_PERSONA_SOURCES],
  sources: [...TDF_SOURCE_SOURCES, ...CORPORATE_SOURCE_SOURCES],
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
};
