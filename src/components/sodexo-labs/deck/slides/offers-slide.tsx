"use client";

import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function OffersSlide({ pack }: { pack: LabsPack }) {
  const showInternal = pack.session.audience === "internal";

  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        {pack.chrome.offersEyebrow}
      </p>
      <h1 className="labs-display mb-10 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        {pack.chrome.offersHeadline}
      </h1>
      <StaggerIn className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:gap-8">
        {pack.offers.map((offer, i) => (
          <motion.article
            key={offer.id}
            variants={staggerItem}
            className="rounded-2xl border border-[var(--labs-line)] bg-white/80 p-6 shadow-[0_10px_28px_rgba(30,47,154,0.04)]"
          >
            <p className="mb-1 text-xs font-semibold tracking-[0.14em] text-[var(--labs-accent)] uppercase">
              {String(i + 1).padStart(2, "0")} · {offer.whenLabel}
            </p>
            <h2 className="labs-display text-[clamp(1.5rem,2.4vw,2.15rem)] text-[var(--labs-navy)]">
              {offer.title}
            </h2>
            <p className="mt-2 max-w-md text-[clamp(0.95rem,1.35vw,1.1rem)] leading-relaxed text-[var(--labs-muted)]">
              {offer.summary}
            </p>
            {showInternal && offer.internalExtra ? (
              <p className="mt-3 max-w-md border-l-2 border-[var(--labs-accent)] pl-3 text-[clamp(0.85rem,1.2vw,0.98rem)] leading-snug text-[var(--labs-ink)]">
                {offer.internalExtra}
              </p>
            ) : null}
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}
