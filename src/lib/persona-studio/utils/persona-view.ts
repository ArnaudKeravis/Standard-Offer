import type {
  ConfidenceLevel,
  EvidenceStatus,
  PersonaFamily,
} from "@/lib/persona-studio/ai/schemas/common";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import type { UIKey } from "@/lib/persona-studio/utils/i18n";

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

/* ---------------------------------------------------------------------------
   Empathy map
   ---------------------------------------------------------------------------
   The empathy map is a recognisable workshop artifact. It is built entirely
   from the persona's OWN sections — never fabricated — by mapping a prioritised
   list of section keys into each quadrant. Both families resolve because the
   key lists span Corporate and Sports-Hospitality vocabularies.
--------------------------------------------------------------------------- */
export type EmpathyQuadrantId =
  | "motivations"
  | "frustrations"
  | "needs"
  | "context";

type QuadrantConfig = {
  id: EmpathyQuadrantId;
  labelKey: UIKey;
  keys: string[];
};

/** Quadrant definitions in visual (reading) order: top-left → bottom-right. */
export const EMPATHY_QUADRANTS: QuadrantConfig[] = [
  { id: "motivations", labelKey: "empathyMotivations", keys: ["motivations", "goals"] },
  { id: "frustrations", labelKey: "empathyFrustrations", keys: ["frustrations", "pains"] },
  {
    id: "needs",
    labelKey: "empathyNeeds",
    keys: ["key_expectations", "needs", "workplace_expectations", "expectations"],
  },
  { id: "context", labelKey: "empathyContext", keys: ["context", "essence", "lifestyle"] },
];

export type EmpathyQuadrant = {
  id: EmpathyQuadrantId;
  labelKey: UIKey;
  section?: PersonaSection;
  statements: PersonaStatement[];
};

/**
 * Resolve the four empathy-map quadrants for a persona. Each quadrant carries
 * the matched section (if any) and up to `limit` of its statements. Quadrants
 * with no matching section return an empty statement list (rendered as a gap,
 * never invented content).
 */
export function empathyQuadrants(persona: Persona, limit = 4): EmpathyQuadrant[] {
  return EMPATHY_QUADRANTS.map((q) => {
    const section = sectionByKey(persona, q.keys);
    return {
      id: q.id,
      labelKey: q.labelKey,
      section,
      statements: section ? section.statements.slice(0, limit) : [],
    };
  });
}

/* ---------------------------------------------------------------------------
   Needs coverage map (honest matrix)
   ---------------------------------------------------------------------------
   A compact personas × need-theme matrix. Each cell's strength is derived ONLY
   from the persona's real statements, using confidence as an explicit, labelled
   proxy. Where a persona has no matching statement the cell is "unknown" (—).
   This is evidence COVERAGE of needs, never satisfaction.
--------------------------------------------------------------------------- */
export type NeedThemeId = "motivations" | "needs" | "frustrations" | "food";

type NeedThemeConfig = {
  id: NeedThemeId;
  labelKey: UIKey;
  keys: string[];
};

export const NEED_THEMES: NeedThemeConfig[] = [
  { id: "motivations", labelKey: "empathyMotivations", keys: ["motivations", "goals"] },
  {
    id: "needs",
    labelKey: "empathyNeeds",
    keys: ["key_expectations", "needs", "workplace_expectations", "expectations"],
  },
  { id: "frustrations", labelKey: "empathyFrustrations", keys: ["frustrations", "pains"] },
  { id: "food", labelKey: "foodHospitality", keys: ["food_hospitality", "food_expectations"] },
];

export type NeedStrengthLevel = "STRONG" | "MODERATE" | "EMERGING" | "NONE";

export type NeedStrength = {
  level: NeedStrengthLevel;
  /** Number of statements backing the theme for this persona. */
  count: number;
  /** Average confidence score (1–3), 0 when there are no statements. */
  score: number;
};

const CONFIDENCE_SCORE: Record<ConfidenceLevel, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

/**
 * Strength of a need theme from its statements, using confidence as the labelled
 * proxy. Returns NONE (unknown) when there are no statements — never invented.
 */
export function needStrength(statements: PersonaStatement[]): NeedStrength {
  if (statements.length === 0) return { level: "NONE", count: 0, score: 0 };
  const total = statements.reduce(
    (sum, s) => sum + CONFIDENCE_SCORE[s.confidence],
    0,
  );
  const score = Math.round((total / statements.length) * 100) / 100;
  let level: NeedStrengthLevel;
  if (score >= 2.5) level = "STRONG";
  else if (score >= 1.5) level = "MODERATE";
  else level = "EMERGING";
  return { level, count: statements.length, score };
}

export type NeedsMatrixCell = { themeId: NeedThemeId; strength: NeedStrength };
export type NeedsMatrixRow = { persona: Persona; cells: NeedsMatrixCell[] };
export type NeedsMatrix = {
  themes: NeedThemeConfig[];
  rows: NeedsMatrixRow[];
};

/**
 * Build a needs coverage matrix over the given personas. Columns are limited to
 * the need themes that at least one persona actually has a section for, so the
 * matrix never advertises a theme nobody was researched against.
 */
export function buildNeedsMatrix(personas: Persona[]): NeedsMatrix {
  const themes = NEED_THEMES.filter((theme) =>
    personas.some((p) => sectionByKey(p, theme.keys) !== undefined),
  );
  const rows: NeedsMatrixRow[] = personas.map((persona) => ({
    persona,
    cells: themes.map((theme) => {
      const section = sectionByKey(persona, theme.keys);
      return {
        themeId: theme.id,
        strength: needStrength(section?.statements ?? []),
      };
    }),
  }));
  return { themes, rows };
}
