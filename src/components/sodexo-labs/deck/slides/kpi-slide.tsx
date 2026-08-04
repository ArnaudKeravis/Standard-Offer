"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function KpiSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();
  const kpis = pack.kpis ?? [];

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
          transition={{ duration: reduce ? 0 : 0.4 }}
        >
          Proof · CoDesign
        </motion.p>
        <motion.h1
          className="labs-display mb-12 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.05 }}
        >
          Not an experiment — a commercial engine
        </motion.h1>

        <StaggerIn className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <motion.article
              key={kpi.label}
              variants={staggerItem}
              className="rounded-2xl border border-[var(--labs-line)] bg-white/90 px-6 py-7 shadow-[0_12px_32px_rgba(30,47,154,0.06)]"
            >
              <p className="labs-display text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none text-[var(--labs-navy)]">
                {kpi.value}
              </p>
              <p className="mt-4 text-[clamp(0.9rem,1.2vw,1.05rem)] leading-snug text-[var(--labs-muted)]">
                {kpi.label}
              </p>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
