import type { LaneId } from "./schemas";

export const LANE_ORDER: LaneId[] = [
  "management",
  "design-system",
  "pd-b2c",
  "pd-b2b",
  "pd-b2o",
  "pd-data",
  "codesign",
];

export const LANE_META: Record<
  LaneId,
  { label: string; area: "product" | "codesign"; succession: string | null }
> = {
  management: {
    label: "0. Management",
    area: "product",
    succession: "Nicolas Duval · Thomas Didier (ends July)",
  },
  "design-system": {
    label: "1. Design System",
    area: "product",
    succession: "Guillaume → Ismael through Dec · Vacancy DSM external all year",
  },
  "pd-b2c": {
    label: "2. Product Design B2C",
    area: "product",
    succession: "Lead PD (Pr1) · Aron interim to Dec · Nikhil · Vacancy B2C India (replaces Neha)",
  },
  "pd-b2b": {
    label: "3. Product Design B2B",
    area: "product",
    succession: "Laura interim → Vacancy Lead B2B all year (Pr2, no budget)",
  },
  "pd-b2o": {
    label: "4. Product Design B2O",
    area: "product",
    succession: "Lead PD (Pr1 internal) · Pedro interim · Jessica",
  },
  "pd-data": {
    label: "5. Product Design Data",
    area: "product",
    succession: "Javier · Neha on New Products / AI products",
  },
  codesign: {
    label: "Co-Design",
    area: "codesign",
    succession: "Gabriel DeRoquefeuil in since September · West US from November",
  },
};
