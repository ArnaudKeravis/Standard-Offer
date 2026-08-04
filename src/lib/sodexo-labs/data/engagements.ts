import type { LabsEngagement } from "../schemas";

/** CoDesign engagement models — how clients buy the work. */
export const LABS_ENGAGEMENTS: LabsEngagement[] = [
  {
    id: "one-shot",
    name: "One-Shot Workshop",
    duration: "1 week",
    framing: "Time-to-value",
    summary:
      "Facilitated workshop + synthesis, proto-persona & proto-journey — a fast shared start.",
    investment: "No recharge",
  },
  {
    id: "light",
    name: "Light Engagement",
    duration: "2 weeks",
    framing: "Time-to-value",
    summary:
      "Light research, service playbook, experience roadmap & concept sheets.",
    investment: "Availability-based",
  },
  {
    id: "medium",
    name: "Medium Engagement",
    duration: "4–8 weeks",
    framing: "Experience quality",
    summary:
      "Personas, journeys, concept sheets, opportunity maps & recommendations.",
    investment: "€5–10K account investment",
  },
  {
    id: "premium",
    name: "Premium Engagement",
    duration: "8–12 weeks",
    framing: "Retention & upsell",
    summary:
      "Full report, impact map, D&AI experience roadmap & value proposition.",
    investment: "€15–20K account investment",
  },
];
