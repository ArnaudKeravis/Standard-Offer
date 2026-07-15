import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { Project, User } from "@/lib/persona-studio/ai/schemas/project";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type { Journey } from "@/lib/persona-studio/ai/schemas/workshop";
import type { PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";

import { SEED_TEMPLATES } from "../templates";
import { SEED_PROJECTS, SEED_USER } from "./projects";
import { SEED_JOURNEYS } from "./journeys";
import { TDF_PERSONAS, TDF_SOURCES } from "./tdf-personas";
import { CORPORATE_PERSONAS, CORPORATE_SOURCES } from "./corporate-personas";

/** The complete, in-memory seed dataset for Persona Studio. */
export interface SeedData {
  user: User;
  projects: Project[];
  personas: Persona[];
  sources: SourceDocument[];
  journeys: Journey[];
  templates: PersonaTemplate[];
}

export const SEED_DATA: SeedData = {
  user: SEED_USER,
  projects: SEED_PROJECTS,
  personas: [...TDF_PERSONAS, ...CORPORATE_PERSONAS],
  sources: [...TDF_SOURCES, ...CORPORATE_SOURCES],
  journeys: SEED_JOURNEYS,
  templates: SEED_TEMPLATES,
};

export {
  SEED_PROJECTS,
  SEED_USER,
  SEED_JOURNEYS,
  SEED_TEMPLATES,
  TDF_PERSONAS,
  CORPORATE_PERSONAS,
};
