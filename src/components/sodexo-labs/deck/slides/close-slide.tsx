"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CloseSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[12vh] pt-[8vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 45% at 90% 15%, color-mix(in srgb, var(--labs-accent) 30%, transparent), transparent 55%),
            linear-gradient(180deg, #0B1020 0%, #1E2F9A 100%)
          `,
        }}
      />
      <SlideAccent
        src="/labs/elements/accent-theatre-figure.png"
        className="absolute right-[4vw] top-[10vh] hidden w-[min(28vw,300px)] lg:block"
      />

      <motion.div
        className="relative z-10 max-w-4xl"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.25, 1, 0.5, 1] }}
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
          {pack.chrome.closeEyebrow}
        </p>
        <h1 className="labs-display text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.05] text-balance">
          {pack.copy.closeHeadline}
        </h1>
        <p className="mt-8 text-[clamp(1.15rem,2vw,1.5rem)] text-white/75">
          {pack.copy.closeCta}
        </p>
      </motion.div>
    </div>
  );
}
