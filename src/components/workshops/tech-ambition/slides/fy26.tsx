"use client";

import { motion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import {
  FY26_HERO,
  FY26_KPIS,
  FY26_OUTPUTS,
  FY26_QUESTIONS,
} from "@/lib/workshops/tech-ambition/run-of-show";

export function Fy26ResultsSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-blue)]">01 · CoDesign FY26</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2rem,4vw,3.4rem)] text-[var(--ws-ink)]">
        No longer a pilot. A commercial engine.
      </h1>
      <div className="mt-8 grid flex-1 grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-[3vw]">
        <div>
          <p className="ws-display text-[clamp(4.4rem,9vw,7.2rem)] leading-none text-[var(--ws-navy)]">
            {FY26_HERO.value}
          </p>
          <p className="mt-3 text-[1.2rem] font-semibold text-[var(--ws-ink)]">
            {FY26_HERO.label}
          </p>
          <p className="mt-2 max-w-sm text-[var(--ws-muted)]">{FY26_HERO.detail}</p>
        </div>
        <StaggerIn className="grid grid-cols-3 content-start gap-x-6 gap-y-8">
          {FY26_KPIS.map((kpi) => (
            <motion.article key={kpi.label} variants={staggerItem}>
              <p className="ws-display text-[clamp(2.2rem,4vw,3.2rem)] text-[var(--ws-navy)]">
                {kpi.value}
              </p>
              <p className="mt-2 font-semibold text-[var(--ws-ink)]">{kpi.label}</p>
              <p className="mt-1 text-sm text-[var(--ws-muted)]">{kpi.detail}</p>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-4 border-t border-[var(--ws-line)] pt-6">
        {FY26_OUTPUTS.map((item) => (
          <div key={item.label}>
            <p className="ws-display text-[1.8rem] text-[var(--ws-navy)]">{item.value}</p>
            <p className="mt-1 text-sm text-[var(--ws-muted)]">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Fy26QuestionsSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-blue)]">What I need from you</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        Three questions. Your answers write the FY27 plan.
      </h1>
      <StaggerIn className="mt-10 grid flex-1 grid-cols-3 gap-6">
        {FY26_QUESTIONS.map((item, index) => (
          <motion.article
            key={item.title}
            variants={staggerItem}
            className="flex flex-col justify-between rounded-[28px] bg-white px-7 py-8 shadow-[0_16px_40px_rgba(20,27,58,0.06)]"
          >
            <div>
              <p className="ws-display text-[2rem] text-[var(--ws-blue)]">
                0{index + 1}
              </p>
              <h2 className="ws-display mt-6 text-[1.55rem] leading-snug text-[var(--ws-ink)]">
                {item.title}
              </h2>
              <p className="mt-4 text-[1.05rem] text-[var(--ws-muted)]">{item.body}</p>
            </div>
          </motion.article>
        ))}
      </StaggerIn>
      <p className="mt-6 text-sm text-[var(--ws-muted)]">
        Twenty minutes is short on purpose. The time we save here goes into the build.
      </p>
    </div>
  );
}
