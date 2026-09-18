import { z } from "zod";

export const PersonKind = z.enum(["internal", "external"]);
export const ValidationStatus = z.enum(["pr0", "pr1", "pr2", "external"]);
export const Funding = z.enum(["BOOST", "ACC", "BAU"]);
export const SignalKind = z.enum(["coverage-risk", "arbitrate"]);

export const PersonSeat = z.object({
  id: z.string().min(1),
  team: z.string().min(1),
  costCenter: z.string().min(1),
  role: z.string().min(1),
  displayName: z.string().min(1),
  kind: PersonKind,
  status: ValidationStatus,
  category: z.string().min(1),
  location: z.string().min(1),
  fte: z.number().positive(),
  dailyRate: z.number().nullable(),
  capexRatio: z.number().min(0).max(1),
  startPeriod: z.number().int().min(1).max(13),
  endPeriod: z.number().int().min(1).max(13),
  days: z.number().nullable(),
  theoreticalAnnualCost: z.number().nullable(),
  annualCostFromStart: z.number(),
  opex: z.number(),
  capex: z.number(),
  vacancyId: z.string().nullable(),
  funding: Funding,
  inBudget: z.boolean(),
  chainId: z.string().nullable(),
  decisionId: z.string().nullable(),
  notes: z.string().nullable(),
});

export type PersonSeat = z.infer<typeof PersonSeat>;
export type PersonKind = z.infer<typeof PersonKind>;
export type ValidationStatus = z.infer<typeof ValidationStatus>;
export type Funding = z.infer<typeof Funding>;
export type SignalKind = z.infer<typeof SignalKind>;

export const PeopleSignal = z.object({
  id: z.string().min(1),
  kind: SignalKind,
  headline: z.string().min(1),
  detail: z.string().min(1),
  personIds: z.array(z.string().min(1)).min(1),
  active: z.boolean(),
});

export type PeopleSignal = z.infer<typeof PeopleSignal>;
