"use client";

import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

const PHASES = [
  { id: "discover", label: "Discover", hint: "Divergent · research & insight" },
  { id: "define", label: "Define", hint: "Convergent · shared intent" },
  { id: "co-create", label: "Co-Create", hint: "Divergent · ideas with people" },
  { id: "test-deliver", label: "Test & Deliver", hint: "Convergent · tangible value" },
];

export function MethodSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Method
      </p>
      <h1 className="labs-display mb-4 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        Double diamond
      </h1>
      <p className="mb-12 max-w-2xl text-[clamp(1.05rem,1.8vw,1.35rem)] text-[var(--labs-muted)]">
        From insight to tested experience — a shared path for every Labs session.
      </p>

      <StaggerIn className="grid gap-4 sm:grid-cols-4 sm:gap-5">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.id}
            variants={staggerItem}
            className="relative flex min-h-[10rem] flex-col justify-between overflow-hidden rounded-2xl px-5 py-5"
            style={{
              background:
                i % 2 === 0
                  ? "color-mix(in srgb, var(--labs-navy) 10%, var(--labs-paper))"
                  : "color-mix(in srgb, var(--labs-accent) 14%, white)",
            }}
          >
            <span className="text-xs font-semibold tracking-[0.16em] text-[var(--labs-muted)] uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="labs-display block text-[clamp(1.35rem,2.2vw,1.85rem)] text-[var(--labs-ink)]">
                {phase.label}
              </span>
              <span className="mt-2 block text-sm text-[var(--labs-muted)]">
                {phase.hint}
              </span>
            </div>
          </motion.div>
        ))}
      </StaggerIn>

      {pack.copy.methodNote ? (
        <p className="mt-10 max-w-3xl text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-[var(--labs-ink)]">
          {pack.copy.methodNote}
        </p>
      ) : null}
    </div>
  );
}
