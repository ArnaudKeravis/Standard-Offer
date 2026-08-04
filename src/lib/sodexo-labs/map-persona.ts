import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import { localizePersona } from "@/lib/persona-studio/data/localized";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { LabsArea, LabsPersonaSpot } from "./schemas";

const FLAGSHIP_PERSONA_IDS: Record<LabsArea, string> = {
  work: "persona-xp-white-collar",
  heal: "persona-xp-patient",
  learn: "persona-xp-student",
  play: "persona-thomas-garcia",
};

function findSectionText(persona: Persona, key: string): string | undefined {
  const sections = [...persona.commonSections, ...persona.domainSections];
  const match = sections.find((s) => s.key === key);
  return match?.statements[0]?.content;
}

function extractTensions(persona: Persona): string[] {
  const sections = [...persona.commonSections, ...persona.domainSections];
  const frustrations = sections.find((s) => s.key === "frustrations");
  if (!frustrations) return [];

  return frustrations.statements
    .map((s) => s.content)
    .filter(Boolean)
    .slice(0, 3);
}

export function mapPersonaToLabsSpot(area: LabsArea): LabsPersonaSpot {
  const personaId = FLAGSHIP_PERSONA_IDS[area];
  const source = SEED_DATA.personas.find((p) => p.id === personaId);
  if (!source) {
    throw new Error(`Flagship persona not found in seed: ${personaId}`);
  }

  const persona = localizePersona(source, "en");
  const essence =
    persona.oneLineEssence || findSectionText(persona, "essence") || persona.name;
  const tensions = extractTensions(persona);

  return {
    area,
    name: persona.name,
    role: persona.archetype || persona.category,
    essence,
    tensions: tensions.length >= 2 ? tensions : tensions.length === 1 ? [tensions[0], tensions[0]] : [essence],
    portraitUrl: persona.portraitUrl,
    sourceRef: persona.id,
  };
}
