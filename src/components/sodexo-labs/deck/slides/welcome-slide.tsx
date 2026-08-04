"use client";

import { motion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function WelcomeSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden px-[6vw] py-[8vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 40% at 80% 70%, color-mix(in srgb, var(--labs-teal) 25%, transparent), transparent 55%),
            linear-gradient(180deg, #0B1020 0%, #152048 100%)
          `,
        }}
      />
      <SlideAccent
        src="/labs/elements/accent-immersion-figure.png"
        className="absolute right-[2vw] bottom-[6vh] hidden w-[min(30vw,340px)] lg:block"
      />

      <div className="relative z-10 max-w-4xl">
        <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-white/50 uppercase">
          Introduction
        </p>
        <h1 className="labs-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05] text-balance">
          {pack.copy.welcomeHeadline}
        </h1>
        <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.8vw,1.35rem)] leading-relaxed text-white/70">
          {pack.copy.welcomeBody}
        </p>
        <StaggerIn className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {["Teams", "Clients", "Partners"].map((label) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="rounded-2xl border border-white/15 bg-white/8 px-5 py-5 backdrop-blur-sm"
            >
              <p className="labs-display text-2xl text-white">{label}</p>
              <p className="mt-2 text-sm leading-snug text-white/55">
                Co-creating experiences that truly matter
              </p>
            </motion.div>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
