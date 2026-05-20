import linksJson from "../../data/solution-links.json";
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
