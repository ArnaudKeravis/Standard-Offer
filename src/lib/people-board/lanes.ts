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
    succession: "Guillaume → Ismael → Internal DSM (Pr2, uncovered from December if not validated)",
  },
  "pd-b2c": {
    label: "2. Product Design B2C",
    area: "product",
    succession: "Lead PD (Pr1 internal) · Aron interim · Quentin · Nikhil · Neha",
  },
  "pd-b2b": {
    label: "3. Product Design B2B",
    area: "product",
    succession: "Laura interim → Lead PD (Pr2, no budget, recruitment not validated)",
  },
  "pd-b2o": {
    label: "4. Product Design B2O",
    area: "product",
    succession: "Lead PD (Pr1 internal) · Pedro interim · Jessica",
  },
  "pd-data": {
    label: "5. Product Design Data",
    area: "product",
    succession: "Javier · New AI products vacancy",
  },
  codesign: {
    label: "Co-Design",
    area: "codesign",
    succession: "Gabriel DeRoquefeuil in since September · West US from November",
  },
};
