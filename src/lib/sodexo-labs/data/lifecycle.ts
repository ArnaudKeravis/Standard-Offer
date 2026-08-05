import type { LabsLifecycleStage } from "../schemas";

/** CoDesign contract lifecycle — bid → strategic partner. */
export const LABS_LIFECYCLE: LabsLifecycleStage[] = [
  {
    id: "bid",
    year: "Year -1 · New bid",
    claim: "We understand your needs precisely",
    phase: "Prospection",
    items: [
      "User & stakeholder research",
      "Journey mapping (as-is / to-be)",
      "Experience & service concepts",
      "Innovation vision for the bid",
    ],
    accent: "#14B8A6",
    accentSoft: "#E6FAF7",
  },
  {
    id: "mobilisation",
    year: "Year 1 · Mobilisation",
    claim: "We do the basics brilliantly",
    phase: "Contract mobilisation",
    items: [
      "Discovery & prioritisation",
      "Service & experience blueprints",
      "Digital & data readiness",
      "MVP for priority innovations",
    ],
    accent: "#2563EB",
    accentSoft: "#EBF1FE",
  },
  {
    id: "execution",
    year: "Year 2+ · Execution",
    claim: "We are innovative and we deliver",
    phase: "Management & innovation",
    items: [
      "Yearly innovation review / QBR",
      "Co-design of new services",
      "Sodexo Labs journeys",
      "Learning expeditions",
    ],
    accent: "#1E3A8A",
    accentSoft: "#E8ECF8",
  },
  {
    id: "retention",
    year: "Year 3, 4, 5+ · Retention",
    claim: "We are your strategic partner",
    phase: "Contract retention",
    items: [
      "Long-term experience roadmap",
      "Advanced user & operator research",
      "Innovation Days & executive storytelling",
      "Rebid preparation, early",
    ],
    accent: "#7C3AED",
    accentSoft: "#F3ECFE",
  },
];
