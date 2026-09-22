export type BlockId =
  | "open"
  | "fy26"
  | "ai"
  | "proud"
  | "strategy"
  | "break"
  | "clinics"
  | "roadmap"
  | "hourback"
  | "close";

export type ScreenKind =
  | "cover"
  | "agenda"
  | "intercalaire"
  | "fy26-brief"
  | "ai-wall"
  | "ai-layers"
  | "ai-buying"
  | "proud-brief"
  | "proud-ritual"
  | "strategy-brief"
  | "strategy-accel"
  | "break"
  | "clinics-scores"
  | "clinics-tables"
  | "clinics-ritual"
  | "roadmap-roster"
  | "roadmap-track"
  | "hourback-overview"
  | "hourback-ritual"
  | "close-walkout"
  | "thanks";

export type ScreenTone = "dark" | "light";

export type ClinicRound = 1 | 2 | "report";
export type HourbackStep = 1 | 2 | 3;

export type WorkshopBlock = {
  id: BlockId;
  label: string;
  short: string;
  start: string;
  durationMin: number | null;
  accent: string;
};

export type WorkshopScreen = {
  id: string;
  blockId: BlockId;
  kind: ScreenKind;
  label: string;
  tone: ScreenTone;
  timed?: boolean;
  durationSec?: number;
  swapAtSec?: number;
};
