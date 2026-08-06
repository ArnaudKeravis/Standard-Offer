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
        <p className="mb-12 max-w-3xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-[var(--labs-muted)]">
          {growth.body}
        </p>

        <StaggerIn className="grid max-w-4xl gap-8 sm:grid-cols-2">
          {growth.impacts.map((impact, i) => (
            <motion.article
              key={impact.title}
              variants={staggerItem}
              className="border-t border-[var(--labs-line)] pt-5"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--labs-accent)] uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="labs-display mt-2 text-[clamp(1.35rem,2.1vw,1.7rem)] text-[var(--labs-navy)]">
                {impact.title}
              </h2>
              <p className="mt-3 text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-[var(--labs-muted)]">
                {impact.outcome}
              </p>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
