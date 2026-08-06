"use client";

import { motion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

const REGIONS = [
  "France · Paris Group HQ",
  "UK & Ireland",
  "United States",
  "Brazil",
  "India",
];

export function NetworkSlide({ pack }: { pack: LabsPack }) {
  const { chrome } = pack;

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
          {chrome.networkEyebrow}
        </p>
        <h1 className="labs-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-balance">
          {chrome.networkHeadline}
        </h1>
        <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-white/70">
          {chrome.networkBody}
        </p>
        <StaggerIn className="mt-12 flex max-w-xl flex-col gap-0 border-t border-white/20">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region}
              variants={staggerItem}
              className="flex items-baseline gap-4 border-b border-white/15 py-3.5"
            >
              <span className="w-8 shrink-0 text-xs font-semibold tracking-[0.12em] text-[color-mix(in_srgb,var(--labs-teal)_85%,white)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(1rem,1.4vw,1.15rem)] text-white/90">
                {region}
              </span>
            </motion.div>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
