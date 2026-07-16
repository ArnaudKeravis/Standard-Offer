import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import type { UIKey } from "@/lib/persona-studio/utils/i18n";
import type { WorkshopUIKey } from "@/lib/persona-studio/utils/workshop-i18n";
import {
  buildNeedsMatrix,
  sectionByKey,
  type NeedsMatrix,
  type NeedThemeId,
} from "@/lib/persona-studio/utils/persona-view";

/**
 * Compare-view derivation.
 *
 * Every value produced here is derived ONLY from the personas' own structured
 * statements, behavioural tags and evidence coverage — nothing is invented.
 * Divergences are surfaced as prompts ("tensions to explore"), never asserted
 * as findings, in line with the product's evidence-transparency guarantees.
 *
 * Kept as a dependency-free pure function so it is unit-testable in isolation.
 */

export const MIN_COMPARE = 2;
export const MAX_COMPARE = 5;

export interface CompareDimensionConfig {
  id:
    | "goals"
    | "needs"
    | "frustrations"
    | "behaviours"
    | "food"
    | "moments";
  labelKey: WorkshopUIKey;
  /** Prioritised section keys, spanning both persona families. */
  keys: string[];
}

/** The side-by-side comparison dimensions, in reading order. */
export const COMPARE_DIMENSIONS: CompareDimensionConfig[] = [
  { id: "goals", labelKey: "dimensionGoals", keys: ["goals", "motivations"] },
  {
    id: "needs",
    labelKey: "dimensionNeeds",
    keys: ["key_expectations", "needs", "workplace_expectations", "expectations"],
  },
  { id: "frustrations", labelKey: "dimensionFrustrations", keys: ["frustrations", "pains"] },
  {
    id: "behaviours",
    labelKey: "dimensionBehaviours",
    keys: ["daily_job", "lifestyle", "context", "behaviours"],
  },
  { id: "food", labelKey: "dimensionFood", keys: ["food_hospitality", "food_expectations"] },
  {
    id: "moments",
    labelKey: "dimensionMoments",
    keys: ["key_eating_moments", "key_moments", "moments", "ideal_experience"],
  },
];

export interface CompareCell {
  personaId: string;
  statements: PersonaStatement[];
}

export interface CompareDimensionRow {
  id: CompareDimensionConfig["id"];
  labelKey: WorkshopUIKey;
  cells: CompareCell[];
}

export interface SharedTag {
  tag: string;
  personaIds: string[];
}

export interface NeedThemeRef {
  themeId: NeedThemeId;
  labelKey: UIKey;
}

/** A need theme every selected persona shows evidence for. */
export type UniversalNeed = NeedThemeRef;

/** A theme covered for some personas but absent for others. */
export interface Differentiator extends NeedThemeRef {
  coveredIds: string[];
  missingIds: string[];
}

/** A sharp divergence: strongly evidenced for some, absent for others. */
export interface Tension extends NeedThemeRef {
  strongIds: string[];
  absentIds: string[];
}

/** A theme shared by several (but see universal) personas — a broad opportunity. */
export interface Opportunity extends NeedThemeRef {
  personaIds: string[];
}

export interface CompareView {
  personas: Persona[];
  dimensions: CompareDimensionRow[];
  needsMatrix: NeedsMatrix;
  sharedTags: SharedTag[];
  universalNeeds: UniversalNeed[];
  differentiators: Differentiator[];
  tensions: Tension[];
  opportunities: Opportunity[];
}

/**
 * Build the full comparison from the selected personas. Dimensions that no
 * selected persona has any statement for are omitted, so the comparison never
 * advertises a dimension nobody was researched against.
 */
export function buildCompareView(personas: Persona[]): CompareView {
  const dimensions: CompareDimensionRow[] = COMPARE_DIMENSIONS.map((dim) => ({
    id: dim.id,
    labelKey: dim.labelKey,
    cells: personas.map((persona) => ({
      personaId: persona.id,
      statements: sectionByKey(persona, dim.keys)?.statements ?? [],
    })),
  })).filter((row) => row.cells.some((c) => c.statements.length > 0));

  const needsMatrix = buildNeedsMatrix(personas);

  const sharedTags = deriveSharedTags(personas);
  const universalNeeds: UniversalNeed[] = [];
  const differentiators: Differentiator[] = [];
  const tensions: Tension[] = [];
  const opportunities: Opportunity[] = [];

  for (const theme of needsMatrix.themes) {
    const ref: NeedThemeRef = { themeId: theme.id, labelKey: theme.labelKey };
    const covered: string[] = [];
    const missing: string[] = [];
    const strong: string[] = [];

    for (const row of needsMatrix.rows) {
      const cell = row.cells.find((c) => c.themeId === theme.id);
      const level = cell?.strength.level ?? "NONE";
      if (level === "NONE") missing.push(row.persona.id);
      else covered.push(row.persona.id);
      if (level === "STRONG") strong.push(row.persona.id);
    }

    if (missing.length === 0 && covered.length === personas.length) {
      universalNeeds.push(ref);
    }
    if (covered.length > 0 && missing.length > 0) {
      differentiators.push({ ...ref, coveredIds: covered, missingIds: missing });
    }
    // A tension is a sharp divergence: strongly evidenced for some, absent for others.
    if (strong.length > 0 && missing.length > 0) {
      tensions.push({ ...ref, strongIds: strong, absentIds: missing });
    }
    // An opportunity: a theme shared by more than one persona.
    if (covered.length >= 2) {
      opportunities.push({ ...ref, personaIds: covered });
    }
  }

  return {
    personas,
    dimensions,
    needsMatrix,
    sharedTags,
    universalNeeds,
    differentiators,
    tensions,
    opportunities,
  };
}

/** Behavioural tags shared by two or more personas (normalised, order-stable). */
function deriveSharedTags(personas: Persona[]): SharedTag[] {
  const byTag = new Map<string, { tag: string; personaIds: string[] }>();
  for (const persona of personas) {
    const seen = new Set<string>();
    for (const raw of persona.behaviouralTags) {
      const key = raw.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const entry = byTag.get(key) ?? { tag: raw, personaIds: [] };
      entry.personaIds.push(persona.id);
      byTag.set(key, entry);
    }
  }
  return [...byTag.values()]
    .filter((e) => e.personaIds.length >= 2)
    .sort((a, b) => b.personaIds.length - a.personaIds.length);
}

/**
 * Parse and clamp the `?ids=` query into an ordered, de-duplicated selection.
 * Accepts a comma-separated string or repeated params; caps at MAX_COMPARE.
 */
export function parseCompareIds(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  const parts = Array.isArray(raw) ? raw : [raw];
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const part of parts) {
    for (const id of part.split(",")) {
      const trimmed = id.trim();
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed);
        ids.push(trimmed);
      }
    }
  }
  return ids.slice(0, MAX_COMPARE);
}
