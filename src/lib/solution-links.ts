import linksJson from "../../data/solution-links.json";
import type { BusinessGoalId } from "@/lib/business-goals";
import { BUSINESS_GOAL_IDS } from "@/lib/business-goals";
import {
  catalogueJourneyUrl,
  catalogueSolutionUrl,
  catalogueSolutionsUrl,
  type RoadmapTier,
} from "@/lib/spark-config";

export type JourneyRef = {
  area: string;
  personaId: string;
  momentId: string;
  momentLabel: string;
};

export type SolutionLink = {
  slug: string;
  name: string;
  catalogueId: string | null;
  roadmapTier: RoadmapTier;
  layer: "iq" | "xp" | "os";
  serviceLines: ("food" | "hospitality" | "workplace")[];
  journeyRefs: JourneyRef[];
  businessGoal?: "g1" | "g2" | "g3" | "g4";
  clientOnly?: boolean;
};

const LINKS = linksJson as SolutionLink[];

export function getSolutionLinks(): SolutionLink[] {
  return LINKS;
}

export function getSolutionLinkBySlug(slug: string): SolutionLink | undefined {
  return LINKS.find((s) => s.slug === slug);
}

export function getLinksByTier(tier: RoadmapTier): SolutionLink[] {
  return LINKS.filter((s) => s.roadmapTier === tier);
}

export function getStandardSolutions(): SolutionLink[] {
  return LINKS.filter((s) => s.roadmapTier === "70" && !s.clientOnly);
}

export function getStandardSolutionsByGoal(): Record<
  BusinessGoalId,
  SolutionLink[]
> {
  const grouped = Object.fromEntries(
    BUSINESS_GOAL_IDS.map((id) => [id, [] as SolutionLink[]]),
  ) as Record<BusinessGoalId, SolutionLink[]>;

  for (const link of getStandardSolutions()) {
    if (link.businessGoal) grouped[link.businessGoal].push(link);
  }

  return grouped;
}

export function getCatalogueHref(link: SolutionLink): string | null {
  if (!link.catalogueId) return null;
  return catalogueSolutionUrl(link.catalogueId);
}

export function getJourneyHref(ref: JourneyRef): string {
  return catalogueJourneyUrl(ref.area, ref.personaId, ref.momentId);
}

export function getTierCatalogueHref(tier: RoadmapTier): string {
  return catalogueSolutionsUrl(tier, { from: "standard-offer" });
}

export { catalogueSolutionsUrl, catalogueSolutionUrl, catalogueJourneyUrl };
