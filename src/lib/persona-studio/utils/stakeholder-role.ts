import type { StakeholderRole } from "@/lib/persona-studio/ai/schemas/common";

/**
 * Derive Client / Operator / Consumer from an XP Catalogue slug
 * (`client-work`, `operator-heal`, `white-collar`, …).
 */
export function stakeholderRoleFromXpSlug(slug: string): StakeholderRole {
  if (slug.startsWith("client-")) return "CLIENT";
  if (slug.startsWith("operator-")) return "OPERATOR";
  return "CONSUMER";
}

export const STAKEHOLDER_ROLES: StakeholderRole[] = [
  "CLIENT",
  "OPERATOR",
  "CONSUMER",
];
