import type { Project, User } from "@/lib/persona-studio/ai/schemas/project";
import { SEED_TIMESTAMP } from "../builders";
import {
  TDF_PERSONAS,
  TDF_PROJECT_ID,
  TDF_SOURCES,
} from "./tdf-personas";
import {
  CORPORATE_PERSONAS,
  CORPORATE_PROJECT_ID,
  CORPORATE_SOURCES,
} from "./corporate-personas";

export const SEED_USER: User = {
  id: "user-facilitator",
  name: "CoDesign Facilitator",
  email: "facilitator@codesign.example",
  role: "FACILITATOR",
};

export const TDF_PROJECT: Project = {
  id: TDF_PROJECT_ID,
  name: "Tour de France Hospitality Personas",
  client: "Tour de France Hospitality",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Leisure",
  region: "France",
  language: "English",
  researchMode: "RESEARCH_GROUNDED",
  description:
    "Four hospitality guest personas — VIP business client, family guest, sports enthusiast and sponsor — to design differentiated stage-day experiences.",
  workshopObjective:
    "Design a hospitality offer that works across four very different guest types.",
  audience: ["VIP clients", "Families", "Sports fans", "Sponsors"],
  desiredPersonaCount: 4,
  templateId: "tpl-tdf-hospitality",
  ownerId: SEED_USER.id,
  status: "PUBLISHED",
  personaCount: TDF_PERSONAS.length,
  sourceCount: TDF_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const CORPORATE_PROJECT: Project = {
  id: CORPORATE_PROJECT_ID,
  name: "Corporate Workplace Personas",
  client: "Standard Personix Library",
  family: "CORPORATE",
  segment: "Corporate Services",
  region: "Global",
  language: "English",
  researchMode: "PROTO_PERSONA",
  description:
    "The eight standard Personix workplace archetypes, ready to localise with client HR & operations data before a workshop.",
  workshopObjective:
    "Localise the standard archetypes to a specific client site.",
  audience: [
    "Leaders",
    "Managers",
    "Support roles",
    "Experts",
    "New joiners",
    "Frontline operators",
  ],
  desiredPersonaCount: 8,
  templateId: "tpl-corporate-workplace",
  ownerId: SEED_USER.id,
  status: "IN_REVIEW",
  personaCount: CORPORATE_PERSONAS.length,
  sourceCount: CORPORATE_SOURCES.length,
  workshopCount: 0,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
};

export const SEED_PROJECTS: Project[] = [TDF_PROJECT, CORPORATE_PROJECT];
