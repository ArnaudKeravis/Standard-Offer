import type { EvidenceStatus, PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";

/** Return every section of a persona in render order. */
export function orderedSections(persona: Persona): PersonaSection[] {
  return [...persona.commonSections, ...persona.domainSections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);
}

/** Find the first section matching one of the given keys. */
export function sectionByKey(
  persona: Persona,
  keys: string[],
): PersonaSection | undefined {
  const all = [...persona.commonSections, ...persona.domainSections];
  for (const key of keys) {
    const found = all.find((s) => s.key === key);
    if (found) return found;
  }
  return undefined;
}

/**
 * Pull the top statements for a conceptual slot (e.g. "needs", "frustrations")
 * by trying a prioritised list of section keys. Used by the gallery cards.
 */
export function topStatements(
  persona: Persona,
  keys: string[],
  limit = 3,
): PersonaStatement[] {
  const section = sectionByKey(persona, keys);
  if (!section) return [];
  return section.statements.slice(0, limit);
}

export const NEEDS_KEYS = ["key_expectations", "needs", "workplace_expectations", "expectations"];
export const FRUSTRATION_KEYS = ["frustrations", "pains"];

/** Accessible label + short code for an evidence status (never colour-only). */
export function evidenceStatusMeta(status: EvidenceStatus): {
  label: string;
  code: string;
} {
  switch (status) {
    case "EVIDENCE":
      return { label: "Evidence", code: "EV" };
    case "ASSUMPTION":
      return { label: "Assumption", code: "AS" };
    case "TO_VALIDATE":
      return { label: "To validate", code: "TV" };
  }
}

export function familyLabel(family: PersonaFamily): string {
  return family === "CORPORATE"
    ? "Corporate workplace"
    : "Sports hospitality";
}

/** Theme token applied to a container via `data-studio-theme`. */
export function familyTheme(family: PersonaFamily): "corporate" | "tdf" {
  return family === "CORPORATE" ? "corporate" : "tdf";
}

/** Percentage string for evidence coverage (0–1 → "72%"). */
export function coveragePct(coverage: number): string {
  return `${Math.round(coverage * 100)}%`;
}
