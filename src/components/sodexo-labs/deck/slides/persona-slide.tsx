"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function PersonaSlide({ pack }: { pack: LabsPack }) {
  const { persona } = pack;

  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        {pack.chrome.personaEyebrow}
      </p>
      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
        <motion.div
          className="relative min-h-[42vh] overflow-hidden rounded-3xl bg-[color-mix(in_srgb,var(--labs-navy)_12%,white)] shadow-[0_24px_60px_rgba(30,47,154,0.12)]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        >
          {persona.portraitUrl ? (
            <Image
              src={persona.portraitUrl}
              alt=""
              fill
              className="object-cover"
              sizes="352px"
              priority
            />
          ) : (
            <div
              className="flex h-full min-h-[42vh] items-end px-7 py-7"
              style={{
                background: `linear-gradient(160deg, color-mix(in srgb, var(--labs-accent) 40%, #0B1020), #0B1020)`,
              }}
            >
              <span className="labs-display text-6xl text-white/90">
                {persona.name.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        <div className="flex min-w-0 flex-col justify-center">
          <h1 className="labs-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-[var(--labs-ink)]">
            {persona.name}
          </h1>
          <p className="mt-2 text-[clamp(1.1rem,1.8vw,1.4rem)] font-semibold text-[var(--labs-accent)]">
            {persona.role}
          </p>
          <p className="mt-6 max-w-2xl text-[clamp(1.1rem,1.9vw,1.35rem)] leading-relaxed text-[var(--labs-muted)]">
            {persona.essence}
          </p>
          {persona.tensions.length > 0 ? (
            <StaggerIn className="mt-8 space-y-3">
              {persona.tensions.map((tension) => (
                <motion.p
                  key={tension}
                  variants={staggerItem}
                  className="max-w-xl border-l-2 pl-4 text-[clamp(0.95rem,1.35vw,1.1rem)] leading-snug text-[var(--labs-ink)]"
                  style={{ borderColor: "var(--labs-accent)" }}
                >
                  {tension}
                </motion.p>
              ))}
            </StaggerIn>
          ) : null}
        </div>
      </div>
    </div>
  );
}
