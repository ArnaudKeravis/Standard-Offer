"use client";

import { motion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import {
  STRATEGY_COVERS,
  STRATEGY_SETUP,
  WALKOUTS,
  WORKSHOP,
} from "@/lib/workshops/tech-ambition/run-of-show";

export function StrategyBriefSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-define)]">Henri & Kevin · 30 minutes</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        Vision, trends, and the agentic platform
      </h1>
      <div className="mt-10 grid flex-1 grid-cols-2 gap-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ws-muted)]">
            What this block covers
          </h2>
          <StaggerIn className="mt-5 space-y-4">
            {STRATEGY_COVERS.map((line) => (
              <motion.p
                key={line}
                variants={staggerItem}
                className="text-[1.15rem] leading-snug text-[var(--ws-ink)]"
              >
                {line}
              </motion.p>
            ))}
          </StaggerIn>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ws-muted)]">
            What it has to set up
          </h2>
          <StaggerIn className="mt-5 space-y-4">
            {STRATEGY_SETUP.map((line) => (
              <motion.p
                key={line}
                variants={staggerItem}
                className="text-[1.15rem] leading-snug text-[var(--ws-ink)]"
              >
                {line}
              </motion.p>
            ))}
          </StaggerIn>
        </section>
      </div>
      <p className="text-sm text-[var(--ws-muted)]">
        Fifteen of the thirty minutes should be the maturity picture, run live.
      </p>
    </div>
  );
}

export function CloseWalkoutSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-test)]">16:20-16:30</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        If it is not written, owned and dated, it did not happen
      </h1>
      <StaggerIn className="mt-10 grid flex-1 grid-cols-3 gap-6">
        {WALKOUTS.map((item) => (
          <motion.article
            key={item.n}
            variants={staggerItem}
            className="rounded-[28px] bg-white px-7 py-8 shadow-[0_16px_40px_rgba(20,27,58,0.06)]"
          >
            <p className="ws-display text-[2rem] text-[var(--ws-test)]">{item.n}</p>
            <h2 className="ws-display mt-5 text-[1.7rem] text-[var(--ws-ink)]">
              {item.title}
            </h2>
            <p className="mt-4 text-[1.05rem] text-[var(--ws-muted)]">{item.body}</p>
          </motion.article>
        ))}
      </StaggerIn>
      <p className="mt-4 text-sm text-[var(--ws-muted)]">
        One hour back each week is twenty-three hours a week. Roughly six hundred hours a year.
      </p>
    </div>
  );
}

export function ThanksSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[12vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 85% 15%, color-mix(in srgb, var(--ws-test) 32%, transparent), transparent 58%), linear-gradient(165deg, #10162c, #293896)",
        }}
      />
      <div className="relative z-10">
        <p className="ws-kicker text-white/50">
          {WORKSHOP.where} · {WORKSHOP.when}
        </p>
        <h1 className="ws-display mt-4 text-[clamp(3.4rem,8vw,6.5rem)]">Thank you.</h1>
        <p className="mt-8 text-[1.2rem] text-white/70">
          arnaud.keravis@sodexo.com
        </p>
        <p className="mt-3 text-sm text-white/45">{WORKSHOP.audience}</p>
      </div>
    </div>
  );
}
