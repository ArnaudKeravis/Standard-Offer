import type { LabsAudience } from "../schemas";

type LabsCopy = {
  coverSubtitle: string;
  welcomeHeadline: string;
  welcomeBody: string;
  methodNote?: string;
  closeHeadline: string;
  closeCta: string;
};

const EXTERNAL_COPY: LabsCopy = {
  coverSubtitle: "Co-create the experiences your people deserve",
  welcomeHeadline: "Welcome to Sodexo Labs",
  welcomeBody:
    "A living space where we explore the future of workplace, care, campus and hospitality experiences — together with you.",
  closeHeadline: "Let's co-create your next experience",
  closeCta: "Book a Labs session with our team",
};

const INTERNAL_COPY: LabsCopy = {
  coverSubtitle: "The Growth Engine in action",
  welcomeHeadline: "Welcome to Sodexo Labs",
  welcomeBody:
    "Our commercial co-creation engine — a space to win bids, accelerate renewals and make innovation tangible for clients.",
  methodNote:
    "Every Labs session connects to the CoDesign four-offer model and Growth Engine KPIs. Use it in pre-bid, renewal and account expansion cycles.",
  closeHeadline: "Mobilise Labs in your next bid or renewal",
  closeCta: "Talk to the CoDesign team about your account",
};

export function getLabsCopy(audience: LabsAudience): LabsCopy {
  return audience === "internal" ? INTERNAL_COPY : EXTERNAL_COPY;
}
