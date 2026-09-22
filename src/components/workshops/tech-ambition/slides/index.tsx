"use client";

import type { RefObject } from "react";

import type { Clock } from "@/lib/workshops/tech-ambition/clock";
import type {
  BlockId,
  ClinicRound,
  HourbackStep,
  ScreenKind,
} from "@/lib/workshops/tech-ambition/types";

import { AiBuyingSlide, AiLayersSlide, AiWallSlide } from "./ai";
import { GbsDeckSlide } from "./gbs";
import { RoadmapRosterSlide, RoadmapTrackSlide } from "./roadmap";
import { Fy26BriefSlide, type Fy26BriefHandle } from "./fy26";
import { IntercalaireSlide } from "./intercalaire";
import { AgendaSlide, CoverSlide } from "./open";
import {
  BreakSlide,
  ClinicsRitualSlide,
  ClinicsScoresSlide,
  ClinicsTablesSlide,
  HourbackOverviewSlide,
  HourbackRitualSlide,
  ProudBriefSlide,
  ProudRitualSlide,
} from "./rituals";
import { StrategyAccelSlide } from "./strategy-accel";
import { CloseWalkoutSlide, StrategyBriefSlide, ThanksSlide } from "./strategy-close";

export type SlideClockApi = {
  remainingMs: number;
  running: boolean;
  clock: Clock;
  now: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export function renderWorkshopSlide(
  kind: ScreenKind,
  blockId: BlockId,
  screenId: string,
  api: {
    proud: SlideClockApi;
    clinic: SlideClockApi & {
      round: ClinicRound;
      onRound: (round: ClinicRound) => void;
    };
    hourback: SlideClockApi & {
      step: HourbackStep;
      onStep: (step: HourbackStep) => void;
    };
    block: SlideClockApi;
    fy26BriefRef: RefObject<Fy26BriefHandle | null>;
  },
) {
  switch (kind) {
    case "cover":
      return <CoverSlide />;
    case "agenda":
      return <AgendaSlide />;
    case "intercalaire":
      return <IntercalaireSlide blockId={blockId} />;
    case "fy26-brief":
      return <Fy26BriefSlide ref={api.fy26BriefRef} />;
    case "ai-wall":
      return <AiWallSlide />;
    case "ai-layers":
      return <AiLayersSlide />;
    case "ai-buying":
      return <AiBuyingSlide />;
    case "proud-brief":
      return <ProudBriefSlide />;
    case "proud-ritual":
      return <ProudRitualSlide {...api.proud} />;
    case "strategy-brief":
      return <StrategyBriefSlide />;
    case "strategy-accel":
      return <StrategyAccelSlide screenId={screenId} />;
    case "break":
      return <BreakSlide {...api.block} />;
    case "clinics-scores":
      return <ClinicsScoresSlide />;
    case "clinics-tables":
      return <ClinicsTablesSlide />;
    case "clinics-ritual":
      return <ClinicsRitualSlide {...api.clinic} />;
    case "roadmap-roster":
      return <RoadmapRosterSlide />;
    case "roadmap-track":
      return <RoadmapTrackSlide screenId={screenId} />;
    case "gbs-deck":
      return <GbsDeckSlide screenId={screenId} />;
    case "hourback-overview":
      return <HourbackOverviewSlide />;
    case "hourback-ritual":
      return <HourbackRitualSlide {...api.hourback} />;
    case "close-walkout":
      return <CloseWalkoutSlide />;
    case "thanks":
      return <ThanksSlide />;
    default:
      return null;
  }
}
