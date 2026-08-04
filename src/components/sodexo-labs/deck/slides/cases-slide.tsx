"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CasesSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Proof
      </p>
      <h1 className="labs-display mb-8 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        {pack.cases.length === 1 ? "Case in point" : "Cases in point"}
      </h1>

      <StaggerIn
        className={`grid gap-6 ${pack.cases.length > 1 ? "lg:grid-cols-2" : "max-w-4xl"}`}
      >
        {pack.cases.map((item) => (
          <motion.article
            key={item.id}
            variants={staggerItem}
            className="overflow-hidden rounded-2xl border border-[var(--labs-line)] bg-white shadow-[0_18px_40px_rgba(30,47,154,0.06)]"
          >
            {item.imageSrc ? (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={item.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,16,32,0.55)] to-transparent" />
                <p className="absolute bottom-4 left-5 text-xs font-semibold tracking-[0.16em] text-white uppercase">
                  {item.client}
                </p>
              </div>
            ) : (
              <p className="px-6 pt-5 text-xs font-semibold tracking-[0.16em] text-[var(--labs-accent)] uppercase">
                {item.client}
              </p>
            )}
            <div className="space-y-4 p-6">
              <div>
                <h2 className="text-xs font-semibold tracking-[0.12em] text-[var(--labs-muted)] uppercase">
                  Challenge
                </h2>
                <p className="mt-1.5 text-[clamp(0.95rem,1.35vw,1.1rem)] leading-relaxed text-[var(--labs-ink)]">
                  {item.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-[0.12em] text-[var(--labs-muted)] uppercase">
                  Outcome
                </h3>
                <p className="mt-1.5 text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-[var(--labs-muted)]">
                  {item.outcome}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}
