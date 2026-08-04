"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CoverSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[12vh] pt-[8vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 85% 20%, color-mix(in srgb, var(--labs-accent) 35%, transparent), transparent 55%),
            linear-gradient(165deg, #0B1020 0%, #121A38 45%, #1E2F9A 100%)
          `,
        }}
      />
      <SlideAccent
        src="/labs/elements/space-collage.png"
        className="absolute right-[-2vw] top-[8vh] w-[min(52vw,640px)] opacity-95"
        sizes="52vw"
        delay={0.15}
      />

      <motion.div
        className="relative z-10 max-w-5xl"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0 : 0.65,
          ease: [0.25, 1, 0.5, 1],
          delay: reduce ? 0 : 0.15,
        }}
      >
        <p className="mb-5 text-sm font-semibold tracking-[0.22em] text-white/55 uppercase">
          Sodexo Labs
        </p>
        <h1 className="labs-display text-[clamp(3rem,7.5vw,6.25rem)] leading-[1.02] text-balance">
          Co-creating the future of{" "}
          <span className="text-[color-mix(in_srgb,var(--labs-accent)_85%,white)]">
            experiences
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-[clamp(1.125rem,2.1vw,1.65rem)] leading-snug text-white/72">
          {pack.copy.coverSubtitle}
        </p>
      </motion.div>

      <motion.p
        className="relative z-10 mt-14 text-xs font-semibold tracking-[0.2em] text-white/45 uppercase"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.7, duration: reduce ? 0 : 0.5 }}
      >
        Click or → to continue
      </motion.p>
    </div>
  );
}
