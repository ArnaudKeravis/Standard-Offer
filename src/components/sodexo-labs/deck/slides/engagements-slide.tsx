"use client";

import { motion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function EngagementsSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[var(--labs-paper)]">
      <SlideAccent
        src="/labs/elements/session-collage.png"
        className="absolute right-[-4vw] top-[10vh] hidden w-[min(40vw,480px)] opacity-90 lg:block"
        sizes="40vw"
      />

      <div className="relative z-10 px-[6vw] py-[8vh]">
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          {pack.chrome.engagementsEyebrow}
        </p>
        <h1 className="labs-display mb-3 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
          {pack.chrome.engagementsHeadline}
        </h1>
        <p className="mb-10 max-w-xl text-[clamp(1rem,1.4vw,1.15rem)] text-[var(--labs-muted)]">
          {pack.chrome.engagementsLead}
        </p>

        <StaggerIn className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {pack.engagements.map((item) => (
            <motion.article
              key={item.id}
              variants={staggerItem}
              className="rounded-2xl border border-[var(--labs-line)] bg-white/95 p-6 shadow-[0_12px_32px_rgba(30,47,154,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,47,154,0.1)]"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-[var(--labs-blue)] uppercase">
                {item.framing}
              </p>
              <h2 className="labs-display mt-2 text-[clamp(1.35rem,2.1vw,1.75rem)] text-[var(--labs-navy)]">
                {item.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-[var(--labs-ink)]">
                {item.duration}
              </p>
              <p className="mt-3 text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-[var(--labs-muted)]">
                {item.summary}
              </p>
              {item.investment ? (
                <p className="mt-4 text-xs font-semibold tracking-[0.08em] text-[var(--labs-navy)] uppercase">
                  {item.investment}
                </p>
              ) : null}
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
