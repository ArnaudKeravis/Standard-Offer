import type { LabsZone } from "../schemas";

export const LABS_ZONES: LabsZone[] = [
  {
    id: "theatre",
    name: "Theatre",
    verbs: ["Present", "Inspire", "Showcase"],
    accent: "#1E2F9A",
  },
  {
    id: "immersion",
    name: "Immersion",
    verbs: ["Feel", "Walk", "Experience"],
    accent: "#2BB8B0",
  },
  {
    id: "hub",
    name: "Hub",
    verbs: ["Connect", "Co-create", "Align"],
    accent: "#6D28D9",
  },
  {
    id: "garage",
    name: "Garage",
    verbs: ["Prototype", "Test", "Build"],
    accent: "#F97316",
  },
];
