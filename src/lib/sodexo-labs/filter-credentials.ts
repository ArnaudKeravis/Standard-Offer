import type { LabsArea, LabsCredential } from "./schemas";

export type CredentialFilters = {
  area?: LabsArea | "all";
  sector?: string | "all";
  region?: string | "all";
  query?: string;
};

export function filterLabsCredentials(
  items: LabsCredential[],
  filters: CredentialFilters,
): LabsCredential[] {
  const q = filters.query?.trim().toLowerCase() ?? "";
  return items.filter((c) => {
    if (filters.area && filters.area !== "all" && !c.areas.includes(filters.area))
      return false;
    if (
      filters.sector &&
      filters.sector !== "all" &&
      !c.sectors.includes(filters.sector)
    )
      return false;
    if (
      filters.region &&
      filters.region !== "all" &&
      !c.regions.some((r) => r.toLowerCase() === filters.region!.toLowerCase())
    )
      return false;
    if (!q) return true;
    const blob = [c.client, c.title, c.challenge, c.approach, c.outcome, ...c.sectors]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}
