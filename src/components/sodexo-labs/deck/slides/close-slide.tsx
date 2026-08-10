"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { SlideAccent } from "@/components/sodexo-labs/deck/slide-accent";
import { labsSessionQuery } from "@/lib/sodexo-labs/parse-session";
import { labsSpringUi } from "@/lib/sodexo-labs/motion";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CloseSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();
  const { lang, audience, area } = pack.session;
  const credentialsHref = `/labs/credentials${labsSessionQuery({ lang, audience, area })}`;

  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[12vh] pt-[8vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 45% at 90% 15%, color-mix(in srgb, var(--labs-accent) 30%, transparent), transparent 55%),
            linear-gradient(180deg, #0B1020 0%, #1E2F9A 100%)
          `,
        }}
      />
      <SlideAccent
        src="/labs/elements/accent-theatre-figure.png"
        className="absolute right-[4vw] top-[10vh] hidden w-[min(28vw,300px)] lg:block"
      />

      <motion.div
        className="relative z-10 max-w-4xl"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : labsSpringUi}
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
          {pack.chrome.closeEyebrow}
        </p>
        <h1 className="labs-display text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.05] text-balance">
          {pack.copy.closeHeadline}
        </h1>
        <p className="mt-8 text-[clamp(1.15rem,2vw,1.5rem)] text-white/75">
          {pack.copy.closeCta}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={credentialsHref}
            className="text-[clamp(1rem,1.5vw,1.15rem)] font-semibold text-white underline decoration-white/35 underline-offset-8 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1020]"
          >
            {pack.chrome.credentialsCta}
          </Link>
          <p
            className="text-sm tracking-[0.08em] text-white/45 uppercase"
            style={{ color: "color-mix(in srgb, var(--labs-accent) 70%, white)" }}
          >
            {pack.chrome.coverEyebrow} · {area}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
