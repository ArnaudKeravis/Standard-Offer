"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function FormatsSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <Image
          src="/labs/presentation/formats.jpg"
          alt=""
          fill
          className="object-cover object-left"
          sizes="42vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--labs-paper)] via-[color-mix(in_srgb,var(--labs-paper)_70%,transparent)] to-transparent" />
      </div>

      <div className="relative z-10 px-[6vw] py-[8vh]">
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          Book a session
        </p>
        <h1 className="labs-display mb-10 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
          4 experiences · 4 lengths · 4 opportunities
        </h1>

        <StaggerIn className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {pack.formats.map((format) => (
            <motion.article
              key={format.id}
              variants={staggerItem}
              className="rounded-2xl border border-[var(--labs-line)] bg-white/90 p-6 shadow-[0_12px_32px_rgba(30,47,154,0.05)] backdrop-blur-sm"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-[var(--labs-blue)] uppercase">
                {format.duration}
              </p>
              <h2 className="labs-display mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] text-[var(--labs-navy)]">
                {format.name}
              </h2>
              <p className="mt-3 text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-[var(--labs-muted)]">
                {format.summary}
              </p>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
