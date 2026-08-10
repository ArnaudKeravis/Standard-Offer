"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import { labsSpringUi } from "@/lib/sodexo-labs/motion";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function KpiSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();
  const kpis = pack.kpis ?? [];
  const [hero, ...rest] = kpis;

  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[var(--labs-paper)] px-[6vw] py-[8vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 90% 10%, color-mix(in srgb, var(--labs-blue) 12%, transparent), transparent 60%)",
        }}
      />
      <SlideAccent
        src="/labs/elements/accent-welcome.png"
        className="absolute right-[-2vw] top-[12vh] hidden w-[min(32vw,360px)] lg:block"
        delay={0.25}
      />

      <div className="relative z-10 max-w-5xl">
        <motion.p
          className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : labsSpringUi}
        >
          {pack.chrome.kpiEyebrow}
        </motion.p>
        <motion.h1
          className="labs-display mb-12 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce ? { duration: 0 } : { ...labsSpringUi, delay: 0.04 }
          }
        >
          {pack.chrome.kpiHeadline}
        </motion.h1>

        {hero ? (
          <motion.div
            className="mb-12"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce ? { duration: 0 } : { ...labsSpringUi, delay: 0.08 }
            }
          >
            <p className="labs-display text-[clamp(4rem,9vw,7.5rem)] leading-none text-[var(--labs-navy)]">
              {hero.value}
            </p>
            <p className="mt-4 max-w-md text-[clamp(1.05rem,1.6vw,1.25rem)] leading-snug text-[var(--labs-muted)]">
              {hero.label}
            </p>
          </motion.div>
        ) : null}

        <StaggerIn className="grid gap-8 border-t border-[var(--labs-line)] pt-8 sm:grid-cols-3">
          {rest.map((kpi) => (
            <motion.article key={kpi.label} variants={staggerItem}>
              <p className="labs-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none text-[var(--labs-navy)]">
                {kpi.value}
              </p>
              <p className="mt-3 text-[clamp(0.95rem,1.25vw,1.05rem)] leading-snug text-[var(--labs-muted)]">
                {kpi.label}
              </p>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
