"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack, LabsZone } from "@/lib/sodexo-labs/schemas";

const ZONE_ART: Record<LabsZone["id"], string> = {
  theatre: "/labs/elements/accent-theatre-figure.png",
  immersion: "/labs/elements/zone-immersion.png",
  hub: "/labs/elements/zone-hub.png",
  garage: "/labs/elements/zone-garage.png",
};

export function ZonesSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #EEF3F8 0%, color-mix(in srgb, var(--labs-teal) 8%, #EEF3F8) 100%)",
        }}
      />
      <div className="relative z-10 px-[6vw] pt-[10vh]">
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          The space
        </p>
        <h1 className="labs-display mb-8 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
          Four zones — from spark to delivery
        </h1>
      </div>

      <StaggerIn className="relative z-10 grid min-h-[52vh] grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {pack.zones.map((zone) => (
          <motion.div
            key={zone.id}
            variants={staggerItem}
            className="group relative flex flex-col justify-end overflow-hidden px-6 py-8 sm:px-7 sm:py-10"
            style={{
              background: `linear-gradient(165deg, color-mix(in srgb, ${zone.accent} 88%, #0B1020), color-mix(in srgb, ${zone.accent} 55%, #0B1020))`,
            }}
          >
            <div className="pointer-events-none absolute -right-4 top-4 h-[42%] w-[70%] opacity-90 transition-transform duration-500 group-hover:scale-105">
              <Image
                src={ZONE_ART[zone.id]}
                alt=""
                fill
                className="object-contain object-right-top"
                sizes="25vw"
              />
            </div>
            <p className="relative text-xs font-semibold tracking-[0.2em] text-white/55 uppercase">
              Zone
            </p>
            <h2 className="labs-display relative mt-2 text-[clamp(1.85rem,3vw,2.75rem)] text-white">
              {zone.name}
            </h2>
            <p className="relative mt-4 max-w-[22ch] text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed text-white/75">
              {zone.verbs.join(" · ")}
            </p>
          </motion.div>
        ))}
      </StaggerIn>
    </div>
  );
}
