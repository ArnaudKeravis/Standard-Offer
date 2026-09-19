export type DayId = "j1" | "j2";

export type PhaseId = "discover" | "define" | "develop" | "decide" | "pause";

export type ColCategory = "flat" | "4" | "3" | "2" | "1" | "hc" | "sprint" | "ravito";

export type ScreenKind =
  | "cover"
  | "profile"
  | "intercalaire"
  | "sequence"
  | "proof"
  | "themes"
  | "senses"
  | "vote"
  | "thanks";

export type ScreenTone = "dark" | "light";

export type WorkshopSequence = {
  id: string;
  day: DayId;
  start: string;
  durationMin: number;
  phase: PhaseId;
  title: string;
  role: string;
  body: string[];
  rules: string[];
  stop?: string;
  output?: string;
  script?: string;
  intensity: number;
  col: ColCategory;
};

export type WorkshopScreen = {
  id: string;
  day: DayId;
  sequenceId?: string;
  kind: ScreenKind;
  label: string;
  tone: ScreenTone;
  timed?: boolean;
  durationSec?: number;
};

export type ProfilePoint = {
  sequenceId: string;
  title: string;
  start: string;
  durationMin: number;
  phase: PhaseId;
  x: number;
  y: number;
  intensity: number;
  col: ColCategory;
};
