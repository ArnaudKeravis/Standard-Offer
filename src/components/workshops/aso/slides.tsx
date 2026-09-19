"use client";

import { motion } from "framer-motion";

import { StageProfile } from "@/components/workshops/aso/stage-profile";
import { SlideFrame, StaggerIn, staggerItem } from "@/components/workshops/aso/slide-frame";
import {
  CRITERIA,
  LEARNINGS,
  PERSONAS,
  PHASES,
  SENSES,
  THEMES_J1,
  THEMES_J2,
  WORKSHOP,
} from "@/lib/workshops/aso/run-of-show";
import type {
  DayId,
  PhaseId,
  ProfilePoint,
  ScreenKind,
  WorkshopScreen,
  WorkshopSequence,
} from "@/lib/workshops/aso/types";

function PhasePill({ phase }: { phase: PhaseId }) {
  const meta = PHASES[phase];
  return (
    <span
      className="aso-kicker inline-block px-2.5 py-1"
      style={{ background: meta.color, color: meta.ink }}
    >
      {meta.label}
    </span>
  );
}

export function CoverSlide({ day }: { day: DayId }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[10vh] text-white">
      <div className="aso-stripes absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
      <div className="relative z-10 max-w-5xl">
        <p className="aso-kicker text-[var(--aso-jaune)]">
          {WORKSHOP.client} · {WORKSHOP.where}
        </p>
        <h1 className="aso-display mt-5 text-[clamp(4.2rem,9vw,8rem)]">
          {WORKSHOP.title}
        </h1>
        <p className="mt-6 max-w-2xl text-[clamp(1.2rem,2vw,1.7rem)] text-white/80">
          {WORKSHOP.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-10 border-t border-white/20 pt-6 text-sm">
          <Fact label="Session" value={day === "j1" ? WORKSHOP.j1 : WORKSHOP.j2} />
          <Fact label="Dates" value={WORKSHOP.when} />
          <Fact label="Salle" value={WORKSHOP.audience} />
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="aso-kicker text-[var(--aso-jaune)]">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}

export function ProfileSlide({
  day,
  points,
  onSelect,
}: {
  day: DayId;
  points: ProfilePoint[];
  onSelect: (sequenceId: string) => void;
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--aso-noir)] px-[5vw] pb-[7vh] pt-[11vh] text-white">
      <p className="aso-kicker text-[var(--aso-jaune)]">
        {day === "j1" ? "Étape 1 · L’Itinérance" : "Étape 2 · Grand Départ / Grande Arrivée"}
      </p>
      <h1 className="aso-display mt-3 text-[clamp(2.8rem,5.5vw,5rem)]">
        Profil d’étape
      </h1>
      <p className="mt-3 max-w-2xl text-[1.15rem] text-white/65">
        L’axe X est l’heure. L’axe Y est l’intensité du collectif. Le col HC, c’est le travail
        en blocs.
      </p>
      <div className="mt-6 min-h-0 flex-1">
        <StageProfile points={points} onSelect={onSelect} />
      </div>
    </div>
  );
}

export function IntercalaireSlide({
  phase,
  title,
  detail,
}: {
  phase: PhaseId;
  title: string;
  detail: string;
}) {
  const meta = PHASES[phase];
  return (
    <div className="relative flex h-full w-full flex-col justify-end bg-[var(--aso-noir)] px-[6vw] pb-[12vh] text-white">
      <div
        className="absolute inset-y-0 left-0 w-3"
        style={{ background: meta.color }}
        aria-hidden
      />
      <p className="aso-kicker" style={{ color: meta.color }}>
        {meta.label}
      </p>
      <h1 className="aso-display mt-4 max-w-[16ch] text-[clamp(4rem,8vw,7.2rem)]">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-[1.4rem] text-white/70">{detail}</p>
    </div>
  );
}

export function SequenceSlide({ sequence }: { sequence: WorkshopSequence }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--aso-papier)] px-[5.5vw] pb-[7vh] pt-[12vh]">
      <div className="flex items-end justify-between gap-6">
        <div>
          <PhasePill phase={sequence.phase} />
          <p className="aso-kicker mt-3 text-[var(--aso-pois)]">{sequence.role}</p>
          <h1 className="aso-display mt-3 max-w-[18ch] text-[clamp(2.6rem,5vw,4.6rem)]">
            {sequence.title}
          </h1>
        </div>
        <p className="aso-display text-[2rem] text-[var(--aso-gris)]">
          {sequence.start}
          <span className="ml-3 text-[1.2rem]">{sequence.durationMin}′</span>
        </p>
      </div>

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8">
        <div>
          {sequence.body.map((line) => (
            <p
              key={line}
              className="max-w-[42ch] text-[clamp(1.2rem,1.8vw,1.45rem)] text-[var(--aso-ink)]"
            >
              {line}
            </p>
          ))}
          {sequence.script ? (
            <p className="aso-quote mt-6 border-l-[3px] border-[var(--aso-jaune)] pl-4 text-[1.15rem] text-[#5a5040]">
              {sequence.script}
            </p>
          ) : null}
        </div>
        <div className="border border-[var(--aso-hair)] bg-white p-6">
          <p className="aso-kicker text-[var(--aso-pois)]">Consignes</p>
          <ol className="mt-4 space-y-3">
            {sequence.rules.map((rule, index) => (
              <li key={rule} className="flex gap-3 text-[1.15rem]">
                <span className="aso-display text-[1.3rem] text-[var(--aso-jaune-deep)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
          {sequence.stop ? (
            <p className="mt-5 border-t border-[var(--aso-hair)] pt-4 text-[1.05rem] font-semibold text-[var(--aso-pois)]">
              ✕ {sequence.stop}
            </p>
          ) : null}
        </div>
      </div>

      {sequence.id === "personae" ? <PersonaeStrip /> : null}

      {sequence.output ? (
        <p className="mt-4 border-l-[3px] border-[var(--aso-vert)] pl-4 text-[1.05rem] text-[var(--aso-ink)]">
          <span className="aso-kicker mr-3 text-[var(--aso-vert)]">Sortie</span>
          {sequence.output}
        </p>
      ) : null}
    </div>
  );
}

export function ProofSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--aso-papier)] px-[5vw] pb-[7vh] pt-[12vh]">
      <p className="aso-kicker text-[var(--aso-pois)]">Discover · 7 constats</p>
      <h1 className="aso-display mt-3 text-[clamp(2.6rem,5vw,4.4rem)]">
        Mur de preuves
      </h1>
      <StaggerIn className="mt-6 grid min-h-0 flex-1 grid-cols-2 gap-3">
        {LEARNINGS.map((item) => (
          <motion.article
            key={item.n}
            variants={staggerItem}
            className="border border-[var(--aso-hair)] bg-white p-4"
          >
            <p className="aso-display text-[1.6rem] text-[var(--aso-jaune-deep)]">{item.n}</p>
            <h2 className="mt-1 text-[1.15rem] font-semibold leading-tight">{item.title}</h2>
            <p className="aso-quote mt-2 text-[0.98rem] text-[#5a5040]">{item.proof}</p>
            <p className="aso-kicker mt-3 text-[var(--aso-gris)]">{item.terrains} terrains</p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}

export function ThemesSlide({ day }: { day: DayId }) {
  if (day === "j2") {
    return (
      <div className="relative flex h-full w-full flex-col bg-[var(--aso-papier)] px-[5vw] pb-[7vh] pt-[12vh]">
        <p className="aso-kicker text-[var(--aso-pois)]">Deux groupes</p>
        <h1 className="aso-display mt-3 text-[clamp(2.6rem,5vw,4.4rem)]">
          Grand Départ · Grande Arrivée
        </h1>
        <div className="mt-8 grid flex-1 grid-cols-2 gap-6">
          {["G1 · Grand Départ", "G2 · Grande Arrivée"].map((group) => (
            <section key={group} className="border border-[var(--aso-hair)] bg-white p-6">
              <p className="aso-kicker text-[var(--aso-pois)]">{group}</p>
              <ul className="mt-5 space-y-4">
                {THEMES_J2.filter((theme) => theme.group === group).map((theme) => (
                  <li key={theme.id} className="aso-display text-[2rem] leading-none">
                    {theme.title}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--aso-papier)] px-[5vw] pb-[7vh] pt-[12vh]">
      <p className="aso-kicker text-[var(--aso-pois)]">Define · format bloc</p>
      <h1 className="aso-display mt-3 text-[clamp(2.6rem,5vw,4.4rem)]">
        Six thématiques
      </h1>
      <StaggerIn className="mt-6 grid min-h-0 flex-1 grid-cols-3 gap-3">
        {THEMES_J1.map((theme, index) => (
          <motion.article
            key={theme.id}
            variants={staggerItem}
            className="border border-[var(--aso-hair)] bg-white p-5"
          >
            <p className="aso-display text-[1.8rem] text-[var(--aso-jaune-deep)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="aso-display mt-2 text-[1.7rem] leading-none">{theme.title}</h2>
            <p className="mt-3 text-[1.02rem] text-[var(--aso-ink)]">{theme.carries}</p>
            <p className="aso-kicker mt-4 text-[var(--aso-gris)]">{theme.targets}</p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}

export function SensesSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--aso-papier)] px-[5vw] pb-[7vh] pt-[12vh]">
      <p className="aso-kicker text-[var(--aso-vert)]">Develop · fiche idée</p>
      <h1 className="aso-display mt-3 max-w-[16ch] text-[clamp(2.4rem,4.6vw,4rem)]">
        Au moins trois registres
      </h1>
      <div className="mt-6 grid min-h-0 flex-1 grid-cols-3 gap-3">
        {SENSES.map((sense) => (
          <article key={sense.id} className="border border-[var(--aso-hair)] bg-white p-4">
            <h2 className="aso-display text-[1.8rem]">{sense.label}</h2>
            <p className="mt-2 text-[1.05rem] text-[var(--aso-muted)]">{sense.hint}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-[1.1rem] font-semibold text-[var(--aso-pois)]">
        Zéro innovation sensorielle sur le terrain. Trois lignes minimum, et une promesse.
      </p>
    </div>
  );
}

export function VoteSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--aso-papier)] px-[5vw] pb-[7vh] pt-[12vh]">
      <p className="aso-kicker text-[var(--aso-jaune-deep)]">Decide · 3 gommettes</p>
      <h1 className="aso-display mt-3 text-[clamp(2.6rem,5vw,4.4rem)]">
        Une voix par critère
      </h1>
      <div className="mt-8 grid flex-1 grid-cols-3 gap-4">
        {CRITERIA.map((item) => (
          <article
            key={item.id}
            className="border border-[var(--aso-hair)] bg-white p-6"
            style={{ borderTopWidth: 8, borderTopColor: item.color }}
          >
            <h2 className="aso-display text-[2.2rem] leading-none">{item.label}</h2>
            <p className="mt-5 text-[1.25rem]">{item.q}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[1.15rem]">
        Puis au mur : <strong>porteur · prochaine étape · date</strong>. Les trois, ou ce n’est
        pas retenu.
      </p>
    </div>
  );
}

export function ThanksSlide({ day }: { day: DayId }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[11vh] text-white">
      <div className="aso-stripes absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10">
        <p className="aso-kicker text-[var(--aso-jaune)]">{WORKSHOP.client}</p>
        <h1 className="aso-display mt-4 text-[clamp(4rem,8vw,7rem)]">
          {day === "j1" ? "Fin d'étape" : "Arrivée"}
        </h1>
        <p className="mt-5 max-w-xl text-[1.4rem] text-white/80">
          {day === "j1"
            ? "Photos des murs ce soir. Demain : Grand Départ et Grande Arrivée."
            : "La restitution part sous dix jours. Les engagements restent au mur."}
        </p>
      </div>
    </div>
  );
}

export function PersonaeStrip() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-3">
      {PERSONAS.map((persona) => (
        <article key={persona.id} className="border border-[var(--aso-hair)] bg-white p-4">
          <p className="aso-display text-[1.6rem]">{persona.name}</p>
          <p className="mt-1 text-[0.95rem] font-semibold">{persona.line}</p>
          <p className="mt-2 text-[0.95rem] text-[var(--aso-muted)]">{persona.pain}</p>
        </article>
      ))}
    </div>
  );
}

export function renderAsoSlide(
  screen: WorkshopScreen,
  sequence: WorkshopSequence | null,
  points: ProfilePoint[],
  onSelectSequence: (id: string) => void,
) {
  const kind: ScreenKind = screen.kind;
  switch (kind) {
    case "cover":
      return <CoverSlide day={screen.day} />;
    case "profile":
      return <ProfileSlide day={screen.day} points={points} onSelect={onSelectSequence} />;
    case "intercalaire":
      return (
        <IntercalaireSlide
          phase={sequence?.phase ?? "discover"}
          title={screen.label}
          detail={
            sequence?.phase === "define"
              ? "Nommer les problèmes. Écrire les How Might We."
              : sequence?.phase === "develop"
                ? "Faire les concepts. Les jouer. Ne pas expliquer."
                : sequence?.phase === "decide"
                  ? "Voter. Engager. Dater."
                  : "Recevoir la matière. Poser les faits."
          }
        />
      );
    case "proof":
      return <ProofSlide />;
    case "themes":
      return <ThemesSlide day={screen.day} />;
    case "senses":
      return <SensesSlide />;
    case "vote":
      return <VoteSlide />;
    case "thanks":
      return <ThanksSlide day={screen.day} />;
    case "sequence":
    default:
      if (!sequence) return <CoverSlide day={screen.day} />;
      return (
        <>
          <SequenceSlide sequence={sequence} />
        </>
      );
  }
}

export function AsoSlide({
  screen,
  sequence,
  points,
  direction,
  onSelectSequence,
}: {
  screen: WorkshopScreen;
  sequence: WorkshopSequence | null;
  points: ProfilePoint[];
  direction: number;
  onSelectSequence: (id: string) => void;
}) {
  return (
    <SlideFrame direction={direction}>
      {renderAsoSlide(screen, sequence, points, onSelectSequence)}
    </SlideFrame>
  );
}
