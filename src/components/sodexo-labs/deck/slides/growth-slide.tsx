"use client";

import { motion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function GrowthSlide({ pack }: { pack: LabsPack }) {
  const growth = pack.growth;
  if (!growth) return null;

  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[var(--labs-paper)] px-[6vw] py-[8vh]">
      <SlideAccent
        src="/labs/elements/accent-collab.png"
        className="absolute right-[2vw] bottom-[6vh] hidden w-[min(28vw,320px)] xl:block"
      />

      <div className="relative z-10 max-w-6xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          {pack.chrome.growthEyebrow}
        </p>
        <h1 className="labs-display mb-5 max-w-4xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] text-[var(--labs-ink)]">
          {growth.headline}
        </h1>
        <p className="mb-10 max-w-3xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-[var(--labs-muted)]">
          {growth.body}
        </p>

        <StaggerIn className="grid gap-4 sm:grid-cols-2">
          {growth.impacts.map((impact) => (
            <motion.article
              key={impact.title}
              variants={staggerItem}
              className="rounded-2xl border border-[var(--labs-line)] bg-white/90 p-6 shadow-[0_10px_28px_rgba(30,47,154,0.05)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <h2 className="labs-display text-[clamp(1.25rem,2vw,1.55rem)] text-[var(--labs-navy)]">
                {impact.title}
              </h2>
              <p className="mt-3 text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-[var(--labs-muted)]">
                {impact.outcome}
              </p>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
