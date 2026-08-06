"use client";

import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function LifecycleSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[var(--labs-paper)] px-[5vw] py-[6vh]">
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          {pack.chrome.lifecycleEyebrow}
        </p>
        <h1 className="labs-display mb-10 max-w-4xl text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.08] text-[var(--labs-ink)]">
          {pack.chrome.lifecycleHeadlineLead}{" "}
          <span className="text-[var(--labs-blue)]">
            {pack.chrome.lifecycleHeadlineAccent}
          </span>{" "}
          {pack.chrome.lifecycleHeadlineTail}
        </h1>

        <StaggerIn className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
          {pack.lifecycle.map((stage) => (
            <motion.article key={stage.id} variants={staggerItem}>
              <div
                className="mb-4 size-3.5 rounded-full"
                style={{
                  background: stage.accent,
                  boxShadow: `0 0 0 5px ${stage.accentSoft}`,
                }}
              />
              <p className="text-xs font-semibold tracking-[0.1em] text-[var(--labs-muted)] uppercase">
                {stage.year}
              </p>
              <p className="labs-display mt-3 text-[clamp(1.2rem,2vw,1.55rem)] leading-snug text-[var(--labs-ink)]">
                {stage.claim}
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-[0.1em] uppercase"
                style={{ color: stage.accent }}
              >
                {stage.phase}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {stage.items.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 text-[clamp(0.92rem,1.2vw,1.05rem)] leading-snug text-[var(--labs-muted)]"
                  >
                    <span
                      className="absolute left-0 top-0"
                      style={{ color: stage.accent }}
                      aria-hidden
                    >
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
