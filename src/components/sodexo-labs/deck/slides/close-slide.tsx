"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SlideBackdrop } from "@/components/sodexo-labs/deck/slide-backdrop";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CloseSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full w-full flex-col justify-end px-[6vw] pb-[12vh] pt-[8vh] text-white">
      <SlideBackdrop src="/labs/presentation/close.jpg" dim={0.4} />
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.25, 1, 0.5, 1] }}
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
          Bring your challenge
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
