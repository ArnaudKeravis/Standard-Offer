import type { LabsFormat } from "../schemas";

export const LABS_FORMATS: LabsFormat[] = [
  {
    id: "flash-tour",
    name: "Flash Tour",
    duration: "45 minutes",
    summary:
      "A fast orientation to Sodexo Labs — the space, our method and how we co-create with clients.",
  },
  {
    id: "half-day",
    name: "Half-day",
    duration: "3–4 hours",
    summary:
      "Focused immersion on one challenge — personas, journey mapping and prioritised opportunities.",
  },
  {
    id: "full-day",
    name: "Full-day",
    duration: "Full day",
    summary:
      "End-to-end co-creation sprint from discovery through to tested concepts and a phased roadmap.",
  },
  {
    id: "custom",
    name: "Custom",
    duration: "Tailored",
    summary:
      "Multi-day or multi-site programmes shaped around your bid, renewal or transformation agenda.",
  },
];
