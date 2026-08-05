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
        <h1 className="labs-display mb-8 max-w-4xl text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.08] text-[var(--labs-ink)]">
          {pack.chrome.lifecycleHeadlineLead}{" "}
          <span className="text-[color-mix(in_srgb,#7C3AED_85%,var(--labs-ink))]">
            {pack.chrome.lifecycleHeadlineAccent}
          </span>{" "}
          {pack.chrome.lifecycleHeadlineTail}
        </h1>

        <StaggerIn className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
          {pack.lifecycle.map((stage, index) => (
            <motion.article
              key={stage.id}
              variants={staggerItem}
              className="relative px-5 py-2 sm:px-6 sm:first:pl-0"
              style={{
                borderLeft:
                  index === 0
                    ? "none"
                    : `2px solid color-mix(in srgb, var(--labs-navy) 12%, transparent)`,
              }}
            >
              <div
                className="mb-4 size-3.5 rounded-full"
                style={{
                  background: stage.accent,
                  boxShadow: `0 0 0 5px ${stage.accentSoft}`,
                }}
              />
              <p className="text-[10px] font-semibold tracking-[0.12em] text-[var(--labs-muted)] uppercase">
                {stage.year}
              </p>
              <p className="labs-display mt-2.5 text-[clamp(1.15rem,1.9vw,1.45rem)] leading-snug text-[var(--labs-ink)] italic">
                &ldquo;{stage.claim}&rdquo;
              </p>
              <p
                className="mt-3 text-[10px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: stage.accent }}
              >
                {stage.phase}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 text-[clamp(0.8rem,1.05vw,0.92rem)] leading-snug text-[var(--labs-muted)]"
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
