import { z } from "zod";
import { LabsArea, LabsAudience } from "./session";

export const LabsOffer = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  whenLabel: z.string(),
  internalExtra: z.string().optional(),
});

export const LabsPersonaSpot = z.object({
  area: LabsArea,
  name: z.string(),
  role: z.string(),
  essence: z.string(),
  tensions: z.array(z.string()).max(4),
  portraitUrl: z.string().optional(),
  sourceRef: z.string(),
});

export const LabsCaseSpot = z.object({
  id: z.string(),
  area: LabsArea,
  client: z.string(),
  challenge: z.string(),
  approach: z.string(),
  outcome: z.string(),
  imageSrc: z.string().optional(),
});

export const LabsZone = z.object({
  id: z.enum(["theatre", "immersion", "hub", "garage"]),
  name: z.string(),
  verbs: z.array(z.string()),
  accent: z.string(),
});

export const LabsKpi = z.object({
  value: z.string(),
  label: z.string(),
});

export const LabsGrowthImpact = z.object({
  title: z.string(),
  outcome: z.string(),
});

export const LabsGrowth = z.object({
  headline: z.string(),
  body: z.string(),
  impacts: z.array(LabsGrowthImpact).length(4),
});

export const LabsEngagement = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  framing: z.string(),
  summary: z.string(),
  investment: z.string().optional(),
});

export const LabsLifecycleStage = z.object({
  id: z.string(),
  year: z.string(),
  claim: z.string(),
  phase: z.string(),
  items: z.array(z.string()).min(2).max(6),
  accent: z.string(),
  accentSoft: z.string(),
});

export const LabsPack = z.object({
  session: z.object({ audience: LabsAudience, area: LabsArea }),
  offers: z.array(LabsOffer).length(4),
  persona: LabsPersonaSpot,
  cases: z.array(LabsCaseSpot).min(1).max(2),
  zones: z.array(LabsZone).length(4),
  engagements: z.array(LabsEngagement).length(4),
  lifecycle: z.array(LabsLifecycleStage).length(4),
  kpis: z.array(LabsKpi).length(4).optional(),
  growth: LabsGrowth.optional(),
  copy: z.object({
    coverSubtitle: z.string(),
    welcomeHeadline: z.string(),
    welcomeBody: z.string(),
    methodNote: z.string().optional(),
    closeHeadline: z.string(),
    closeCta: z.string(),
  }),
});

export type LabsOffer = z.infer<typeof LabsOffer>;
export type LabsPersonaSpot = z.infer<typeof LabsPersonaSpot>;
export type LabsCaseSpot = z.infer<typeof LabsCaseSpot>;
export type LabsZone = z.infer<typeof LabsZone>;
export type LabsKpi = z.infer<typeof LabsKpi>;
export type LabsGrowthImpact = z.infer<typeof LabsGrowthImpact>;
export type LabsGrowth = z.infer<typeof LabsGrowth>;
export type LabsEngagement = z.infer<typeof LabsEngagement>;
export type LabsLifecycleStage = z.infer<typeof LabsLifecycleStage>;
export type LabsPack = z.infer<typeof LabsPack>;
