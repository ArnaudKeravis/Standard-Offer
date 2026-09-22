"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import type { Clock } from "@/lib/workshops/tech-ambition/clock";
import {
  CLINIC_ROUND_COPY,
  CLINIC_TABLES,
  HOURBACK_CONTAINERS,
  HOURBACK_STEPS,
  MATURITY,
  PROUD_DONT,
  PROUD_SAY,
} from "@/lib/workshops/tech-ambition/run-of-show";
import type { ClinicRound, HourbackStep } from "@/lib/workshops/tech-ambition/types";

type ClockProps = {
  clock: Clock;
  now: number;
  remainingMs: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export function ProudBriefSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-cocreate)]">Everyone · 30 minutes</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        One thing you built. One to two minutes.
      </h1>
      <div className="mt-10 grid flex-1 grid-cols-2 gap-8">
        <section className="rounded-[28px] bg-white px-8 py-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ws-cocreate)]">
            What to say
          </h2>
          <ul className="mt-5 space-y-4 text-[1.2rem] text-[var(--ws-ink)]">
            {PROUD_SAY.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-[28px] bg-white px-8 py-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ws-define)]">
            What not to do
          </h2>
          <ul className="mt-5 space-y-4 text-[1.2rem] text-[var(--ws-ink)]">
            {PROUD_DONT.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </div>
      <p className="text-sm text-[var(--ws-muted)]">
        The order is random. Arnaud keeps time and cuts at two minutes.
      </p>
    </div>
  );
}

export function ProudRitualSlide({
  remainingMs,
  running,
  onStart,
  onPause,
  onReset,
}: ClockProps & { running: boolean }) {
  return (
    <RitualStage
      kicker="Proud of"
      title="Your turn"
      remainingMs={remainingMs}
      running={running}
      onStart={onStart}
      onPause={onPause}
      onReset={onReset}
      resetLabel="Cut"
      note="Name. Area. What you shipped. What it changed. One number."
    />
  );
}

export function BreakSlide({
  remainingMs,
  running,
  onStart,
  onPause,
  onReset,
}: ClockProps & { running: boolean }) {
  return (
    <RitualStage
      kicker="14:35"
      title="Break"
      remainingMs={remainingMs}
      running={running}
      onStart={onStart}
      onPause={onPause}
      onReset={onReset}
      note="Back at 14:45 for AI Clinics."
    />
  );
}

export function ClinicsScoresSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-discover)]">FY26 self-assessment</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2rem,3.8vw,3.1rem)] text-[var(--ws-ink)]">
        Every dimension improved. Most are still below average.
      </h1>
      <StaggerIn className="mt-8 grid flex-1 grid-cols-4 gap-4">
        {MATURITY.map((row) => (
          <motion.article
            key={row.id}
            variants={staggerItem}
            className={`rounded-[24px] px-5 py-5 ${
              row.table === null
                ? "bg-[color-mix(in_srgb,var(--ws-muted)_12%,white)] text-[var(--ws-muted)]"
                : "bg-white text-[var(--ws-ink)]"
            }`}
          >
            <p className="ws-display text-[2.4rem] leading-none">{row.score}</p>
            <p className="mt-3 text-sm font-semibold">{row.label}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] opacity-60">
              FY25 {row.fy25}
              {row.table === null ? " · platform track" : ""}
            </p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}

export function ClinicsTablesSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[7vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-discover)]">Six tables</p>
      <h1 className="ws-display mt-3 text-[clamp(2rem,3.8vw,3rem)] text-[var(--ws-ink)]">
        The host stays for both rounds and is the only person who writes
      </h1>
      <StaggerIn className="mt-6 grid flex-1 grid-cols-3 gap-4">
        {CLINIC_TABLES.map((table) => (
          <motion.article
            key={table.n}
            variants={staggerItem}
            className="rounded-[24px] bg-white px-5 py-5"
          >
            <p className="ws-kicker text-[var(--ws-discover)]">
              Table {table.n} · {table.score}
            </p>
            <h2 className="ws-display mt-2 text-[1.25rem] text-[var(--ws-ink)]">
              {table.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ws-navy)]">
              {table.host}
            </p>
            <p className="mt-3 text-[0.98rem] text-[var(--ws-muted)]">{table.question}</p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}

export function ClinicsRitualSlide({
  remainingMs,
  running,
  round,
  onStart,
  onPause,
  onReset,
  onRound,
}: ClockProps & {
  running: boolean;
  round: ClinicRound;
  onRound: (round: ClinicRound) => void;
}) {
  const copy = CLINIC_ROUND_COPY[round];

  return (
    <div className="relative flex h-full w-full overflow-hidden text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 80% 0%, color-mix(in srgb, var(--ws-discover) 36%, transparent), transparent 58%), #10162c",
        }}
      />
      <div className="relative z-10 grid h-full w-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] gap-8 px-[5vw] pb-[8vh] pt-[12vh]">
        <div className="flex flex-col">
          <p className="ws-kicker text-white/50">AI Clinics</p>
          <h1 className="ws-display mt-3 text-[clamp(2.2rem,4vw,3.4rem)]">{copy.title}</h1>
          <ClockButtons
            running={running}
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
          />
          <p className="mt-6 max-w-md text-[1.1rem] text-white/70">{copy.rule}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {([1, 2, "report"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onRound(item)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-transform active:scale-95 ${
                  round === item ? "bg-white text-[var(--ws-ink)]" : "bg-white/10 text-white"
                }`}
              >
                {item === "report" ? "Report" : `Round ${item}`}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 content-start gap-3">
          {CLINIC_TABLES.map((table) => (
            <article
              key={table.n}
              className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                Table {table.n} · {table.host}
              </p>
              <p className="mt-2 font-semibold">{table.title}</p>
              <p className="mt-2 text-sm text-white/65">
                {round === 2 ? table.round2 : table.round1}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HourbackOverviewSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-cocreate)]">Hands-on · 40 minutes</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        Everyone leaves with something that runs
      </h1>
      <StaggerIn className="mt-8 grid flex-1 grid-cols-3 gap-5">
        {HOURBACK_STEPS.map((step) => (
          <motion.article
            key={step.step}
            variants={staggerItem}
            className="flex flex-col rounded-[28px] bg-white px-6 py-7"
          >
            <p className="ws-display text-[2rem] text-[var(--ws-cocreate)]">
              0{step.step}
            </p>
            <h2 className="ws-display mt-4 text-[1.55rem] text-[var(--ws-ink)]">
              {step.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ws-navy)]">
              {step.mins} · {step.who}
            </p>
            <p className="mt-4 text-[1.02rem] text-[var(--ws-muted)]">{step.body}</p>
            <p className="mt-auto pt-6 text-[0.98rem] leading-snug text-[var(--ws-ink)]">
              <span className="font-semibold text-[var(--ws-cocreate)]">Example. </span>
              {step.example}
            </p>
          </motion.article>
        ))}
      </StaggerIn>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {HOURBACK_CONTAINERS.map((item) => (
          <p key={item.title} className="text-sm text-[var(--ws-muted)]">
            <span className="font-semibold text-[var(--ws-ink)]">{item.title}.</span>{" "}
            {item.body}
          </p>
        ))}
      </div>
    </div>
  );
}

export function HourbackRitualSlide({
  remainingMs,
  running,
  step,
  onStart,
  onPause,
  onReset,
  onStep,
}: ClockProps & {
  running: boolean;
  step: HourbackStep;
  onStep: (step: HourbackStep) => void;
}) {
  const current = HOURBACK_STEPS[step - 1];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-[5.5vw] pb-[8vh] pt-[12vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 85% 0%, color-mix(in srgb, var(--ws-cocreate) 32%, transparent), transparent 58%), #10162c",
        }}
      />
      <div className="relative z-10 flex flex-wrap gap-2">
        {HOURBACK_STEPS.map((item) => (
          <button
            key={item.step}
            type="button"
            onClick={() => onStep(item.step)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-transform active:scale-95 ${
              step === item.step ? "bg-white text-[var(--ws-ink)]" : "bg-white/10"
            }`}
          >
            {item.mins} {item.title}
          </button>
        ))}
      </div>
      <div className="relative z-10 mt-8 flex flex-1 flex-col">
        <p className="ws-kicker text-white/50">{current.who}</p>
        <h1 className="ws-display mt-3 text-[clamp(2.4rem,5vw,4rem)]">{current.title}</h1>
        <ClockButtons
          running={running}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
        />
        <p className="mt-6 max-w-3xl text-[1.2rem] text-white/70">{current.body}</p>
      </div>
    </div>
  );
}

function RitualStage({
  kicker,
  title,
  remainingMs,
  running,
  onStart,
  onPause,
  onReset,
  resetLabel = "Reset",
  note,
}: {
  kicker: string;
  title: string;
  remainingMs: number;
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  resetLabel?: string;
  note: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden px-[6vw] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 80% 10%, color-mix(in srgb, var(--ws-cocreate) 30%, transparent), transparent 58%), #10162c",
        }}
      />
      <div className="relative z-10">
        <p className="ws-kicker text-white/50">{kicker}</p>
        <h1 className="ws-display mt-3 text-[clamp(2.4rem,5vw,4.2rem)]">{title}</h1>
        <ClockButtons
          running={running}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
          resetLabel={resetLabel}
        />
        <p className="mt-8 max-w-3xl text-[1.25rem] text-white/68">{note}</p>
      </div>
    </div>
  );
}

function ClockButtons({
  running,
  onStart,
  onPause,
  onReset,
  resetLabel = "Reset",
}: {
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={running ? onPause : onStart}
        className="inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[var(--ws-ink)] transition-transform active:scale-95"
      >
        {running ? <Pause className="size-5" /> : <Play className="size-5" />}
        {running ? "Pause" : "Start"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-14 items-center gap-2 rounded-full bg-white/12 px-8 py-4 text-base font-semibold text-white transition-transform active:scale-95"
      >
        <RotateCcw className="size-5" />
        {resetLabel}
      </button>
    </div>
  );
}
