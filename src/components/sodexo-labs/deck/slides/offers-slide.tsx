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
      <StaggerIn className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
        {pack.offers.map((offer, i) => (
          <motion.article
            key={offer.id}
            variants={staggerItem}
            className="relative border-t border-[var(--labs-line)] pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0 xl:pl-7"
          >
            <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[var(--labs-accent)] uppercase">
              {String(i + 1).padStart(2, "0")} · {offer.whenLabel}
            </p>
            <h2 className="labs-display text-[clamp(1.45rem,2.3vw,2rem)] text-[var(--labs-navy)]">
              {offer.title}
            </h2>
            <p className="mt-3 max-w-[28ch] text-[clamp(0.95rem,1.3vw,1.08rem)] leading-relaxed text-[var(--labs-muted)]">
              {offer.summary}
            </p>
            {showInternal && offer.internalExtra ? (
              <p className="mt-4 max-w-[28ch] border-l-2 border-[var(--labs-accent)] pl-3 text-[clamp(0.85rem,1.15vw,0.95rem)] leading-snug text-[var(--labs-ink)]">
                {offer.internalExtra}
              </p>
            ) : null}
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}
