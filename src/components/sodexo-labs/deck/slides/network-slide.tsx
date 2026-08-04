"use client";

import { SlideBackdrop } from "@/components/sodexo-labs/deck/slide-backdrop";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import { motion } from "framer-motion";

const REGIONS = [
  "France · Paris Group HQ",
  "UK & Ireland",
  "United States",
  "Brazil",
  "India",
];

export function NetworkSlide() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center px-[6vw] py-[8vh] text-white">
      <SlideBackdrop src="/labs/presentation/network.jpg" dim={0.5} />
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
