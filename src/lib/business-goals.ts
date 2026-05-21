export const BUSINESS_GOAL_IDS = ["g1", "g2", "g3", "g4"] as const;

export type BusinessGoalId = (typeof BUSINESS_GOAL_IDS)[number];

export const BUSINESS_GOAL_STYLES: Record<
  BusinessGoalId,
  { barClass: string; accentClass: string; panelClass: string }
> = {
  g1: {
    barClass: "bg-[var(--spark-xp)]",
    accentClass: "text-[var(--spark-xp)]",
    panelClass:
      "border-[color:color-mix(in_oklab,var(--spark-xp),transparent_78%)] bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_94%)]",
  },
  g2: {
    barClass: "bg-[var(--spark-os)]",
    accentClass: "text-[var(--spark-os)]",
    panelClass:
      "border-[color:color-mix(in_oklab,var(--spark-os),transparent_78%)] bg-[color:color-mix(in_oklab,var(--spark-os),transparent_94%)]",
  },
  g3: {
    barClass: "bg-[var(--spark-iq)]",
    accentClass: "text-[var(--spark-iq)]",
    panelClass:
      "border-[color:color-mix(in_oklab,var(--spark-iq),transparent_78%)] bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_94%)]",
  },
  g4: {
    barClass: "bg-[var(--spark-amber)]",
    accentClass: "text-[var(--spark-amber)]",
    panelClass:
      "border-[color:color-mix(in_oklab,var(--spark-amber),transparent_78%)] bg-[color:color-mix(in_oklab,var(--spark-amber-soft),transparent_55%)]",
  },
};
