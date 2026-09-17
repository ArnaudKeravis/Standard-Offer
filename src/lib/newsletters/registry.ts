import type { NewsletterIssue } from "./types";

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    id: "fy26-leadership-brief",
    title: "CoDesign & Labs · FY26 Leadership Brief",
    subtitle:
      "15-minute leadership story — impact, proof, FY27 priorities, then feedback & Q&A.",
    period: "Leadership brief · 15 min",
    href: "/newsletters/fy26-leadership-brief.html",
    coverImage: {
      src: "/labs/elements/zone-hub.png",
      alt: "Sodexo Labs hub zone illustration",
    },
  },
  {
    id: "fy26-yearly-retrospective",
    title: "CoDesign & Labs · FY26 Yearly Retrospective",
    subtitle:
      "Commercial impact, Labs sessions, wins and lessons from the field.",
    period: "Sept 2025 → Sept 2026",
    href: "/newsletters/fy26-yearly-retrospective.html",
    coverImage: {
      src: "/labs/elements/space-collage.png",
      alt: "Sodexo Labs co-creation space illustration",
    },
  },
];
