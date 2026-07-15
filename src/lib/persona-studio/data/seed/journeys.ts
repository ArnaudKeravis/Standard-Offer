import type { Journey } from "@/lib/persona-studio/ai/schemas/workshop";
import { SEED_TIMESTAMP } from "../builders";
import { TDF_PROJECT_ID } from "./tdf-personas";
import { CORPORATE_PROJECT_ID } from "./corporate-personas";

function steps(labels: string[]) {
  return labels.map((title, order) => ({
    id: `${order}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    key: title.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    title,
    order,
  }));
}

export const TDF_JOURNEY: Journey = {
  id: "journey-tdf-stage-day",
  projectId: TDF_PROJECT_ID,
  name: "Tour de France stage day",
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    "Invitation",
    "Preparation",
    "Arrival",
    "Accreditation",
    "Hospitality welcome",
    "Pre-race experience",
    "Food and beverage",
    "Race viewing",
    "Waiting between moments",
    "Departure",
    "Follow-up",
  ]),
};

export const CORPORATE_JOURNEY: Journey = {
  id: "journey-corporate-workday",
  projectId: CORPORATE_PROJECT_ID,
  name: "A day at work",
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    "Preparing for the workday",
    "Arrival",
    "Morning work",
    "Break",
    "Lunch",
    "Afternoon work",
    "Collaboration",
    "Departure",
  ]),
};

export const SEED_JOURNEYS: Journey[] = [TDF_JOURNEY, CORPORATE_JOURNEY];
