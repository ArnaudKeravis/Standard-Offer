"use client";

import { motion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";

const REGIONS = [
  "France · Paris Group HQ",
  "UK & Ireland",
  "United States",
  "Brazil",
  "India",
];

export function NetworkSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden px-[6vw] py-[8vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, #0B1020 0%, #14204A 55%, #1E2F9A 100%)",
        }}
      />
      <SlideAccent
        src="/labs/elements/network-ecosystem.png"
        className="absolute right-[-1vw] top-[50%] hidden w-[min(38vw,440px)] -translate-y-1/2 opacity-80 xl:block"
        sizes="38vw"
      />

      <div className="relative z-10 max-w-4xl">
        <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-white/50 uppercase">
          A glocal model
        </p>
        <h1 className="labs-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-balance">
          A worldwide network — local insight, global reach
        </h1>
        <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-white/70">
          We combine regional expertise with Sodexo&apos;s global innovation
          network to source ideas, benchmark best practice and scale what works.
        </p>
        <StaggerIn className="mt-12 flex flex-wrap gap-3">
          {REGIONS.map((region) => (
            <motion.span
              key={region}
              variants={staggerItem}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm"
            >
              {region}
            </motion.span>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
