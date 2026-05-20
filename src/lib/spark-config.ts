/** XP Experience Catalogue — production URL */
export const XP_CATALOGUE_URL =
  process.env.NEXT_PUBLIC_XP_CATALOGUE_URL ?? "https://xpcatalogue.vercel.app";

export type RoadmapTier = "70" | "20" | "10";

export function catalogueSolutionsUrl(tier?: RoadmapTier, extra?: Record<string, string>) {
  const params = new URLSearchParams();
  if (tier) params.set("tier", tier);
  if (extra) {
    for (const [k, v] of Object.entries(extra)) params.set(k, v);
  }
  const qs = params.toString();
  return `${XP_CATALOGUE_URL}/solutions${qs ? `?${qs}` : ""}`;
}

export function catalogueSolutionUrl(catalogueId: string, from = "standard-offer") {
  return `${XP_CATALOGUE_URL}/solutions/${catalogueId}?from=${from}`;
}

export function catalogueJourneyUrl(
  area: string,
  personaId: string,
  momentId: string,
) {
  return `${XP_CATALOGUE_URL}/${area}/${personaId}/moment/${momentId}`;
}
