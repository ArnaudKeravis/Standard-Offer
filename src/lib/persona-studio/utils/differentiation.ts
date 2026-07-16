import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import {
  buildNeedsMatrix,
  type NeedThemeId,
} from "@/lib/persona-studio/utils/persona-view";

/**
 * Behaviour differentiation vs peers in the same project.
 *
 * Score = share of need themes + behavioural tags that are unique to this
 * persona (evidenced for them, absent or weaker for peers). Purely derived —
 * never invents traits.
 */

export interface DifferentiationResult {
  /** 0–1. Higher = more behaviourally distinct vs peers. */
  score: number;
  uniqueNeedThemes: NeedThemeId[];
  sharedNeedThemes: NeedThemeId[];
  uniqueTags: string[];
  sharedTags: string[];
  peerCount: number;
}

export function computeDifferentiation(
  persona: Persona,
  peers: Persona[],
): DifferentiationResult {
  const others = peers.filter((p) => p.id !== persona.id);
  if (others.length === 0) {
    return {
      score: 1,
      uniqueNeedThemes: [],
      sharedNeedThemes: [],
      uniqueTags: [...persona.behaviouralTags],
      sharedTags: [],
      peerCount: 0,
    };
  }

  const matrix = buildNeedsMatrix([persona, ...others]);
  const personaRow = matrix.rows.find((r) => r.persona.id === persona.id);
  const uniqueNeedThemes: NeedThemeId[] = [];
  const sharedNeedThemes: NeedThemeId[] = [];

  for (const theme of matrix.themes) {
    const self = personaRow?.cells.find((c) => c.themeId === theme.id);
    const selfLevel = self?.strength.level ?? "NONE";
    if (selfLevel === "NONE") continue;

    const peerCovered = others.some((peer) => {
      const row = matrix.rows.find((r) => r.persona.id === peer.id);
      const cell = row?.cells.find((c) => c.themeId === theme.id);
      const level = cell?.strength.level ?? "NONE";
      return level !== "NONE";
    });

    if (peerCovered) sharedNeedThemes.push(theme.id);
    else uniqueNeedThemes.push(theme.id);
  }

  const peerTagKeys = new Set(
    others.flatMap((p) =>
      p.behaviouralTags.map((t) => t.trim().toLowerCase()).filter(Boolean),
    ),
  );
  const uniqueTags: string[] = [];
  const sharedTags: string[] = [];
  const seen = new Set<string>();
  for (const raw of persona.behaviouralTags) {
    const key = raw.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    if (peerTagKeys.has(key)) sharedTags.push(raw);
    else uniqueTags.push(raw);
  }

  const needDenom = uniqueNeedThemes.length + sharedNeedThemes.length;
  const tagDenom = uniqueTags.length + sharedTags.length;
  const needShare = needDenom === 0 ? 0.5 : uniqueNeedThemes.length / needDenom;
  const tagShare = tagDenom === 0 ? 0.5 : uniqueTags.length / tagDenom;
  // Weight need themes slightly higher — they're the design differentiators.
  const score = Math.round((needShare * 0.65 + tagShare * 0.35) * 100) / 100;

  return {
    score,
    uniqueNeedThemes,
    sharedNeedThemes,
    uniqueTags,
    sharedTags,
    peerCount: others.length,
  };
}
