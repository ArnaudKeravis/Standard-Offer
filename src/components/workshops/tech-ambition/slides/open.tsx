"use client";

import { motion, useReducedMotion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import { AGENDA, WORKSHOP } from "@/lib/workshops/tech-ambition/run-of-show";
import { labsSpringUi } from "@/lib/sodexo-labs/motion";

export function CoverSlide() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[11vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 55% at 88% 12%, color-mix(in srgb, var(--ws-blue) 42%, transparent), transparent 58%),
            linear-gradient(165deg, #0f1530 0%, #1a2460 48%, #293896 100%)
          `,
        }}
      />
      <motion.div
        className="relative z-10 max-w-5xl"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : labsSpringUi}
      >
        <p className="ws-kicker mb-5 text-white/55">
          {WORKSHOP.audience} · {WORKSHOP.where}
        </p>
        <h1 className="ws-display text-[clamp(3.2rem,7.2vw,6.4rem)] text-balance">
          CoDesign &{" "}
          <span className="text-[color-mix(in_srgb,var(--ws-blue)_80%,white)]">
            AI
          </span>{" "}
          Workshop
        </h1>
        <p className="mt-7 max-w-2xl text-[clamp(1.15rem,2vw,1.6rem)] text-white/72">
          {WORKSHOP.subtitle}
        </p>
        <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-white/55">
          {WORKSHOP.hosts.join("  ·  ")}
        </p>
        <p className="mt-3 text-sm text-white/45">
          {WORKSHOP.when} · {WORKSHOP.window}
        </p>
      </motion.div>
    </div>
  );
}

export function AgendaSlide() {
  return (
    <div className="relative flex h-full w-full bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <div className="grid h-full w-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-[4vw]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="ws-kicker text-[var(--ws-blue)]">Agenda</p>
            <h1 className="ws-display mt-4 max-w-[12ch] text-[clamp(2.6rem,5vw,4.6rem)] text-[var(--ws-ink)]">
              Three and a half hours
            </h1>
            <p className="mt-6 max-w-[28ch] text-[clamp(1.05rem,1.5vw,1.25rem)] text-[var(--ws-muted)]">
              We open on what the practice delivered, level everyone up on AI,
              then work.
            </p>
          </div>
          <p className="text-sm text-[var(--ws-muted)]">13:00 to 16:30</p>
        </div>
        <StaggerIn className="grid content-center gap-2">
          {AGENDA.map((item) => (
            <motion.article
              key={item.time}
              variants={staggerItem}
              className="grid grid-cols-[5.2rem_3.2rem_minmax(0,1fr)] items-baseline gap-4 border-t border-[var(--ws-line)] py-2.5 first:border-t-0"
            >
              <p className="ws-display text-[1.15rem] text-[var(--ws-navy)]">
                {item.time}
              </p>
              <p className="text-sm font-semibold text-[var(--ws-blue)]">
                {item.mins}
              </p>
              <div>
                <p className="text-[1.05rem] font-semibold text-[var(--ws-ink)]">
                  {item.title}
                </p>
                {item.who ? (
                  <p className="text-sm text-[var(--ws-muted)]">{item.who}</p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
