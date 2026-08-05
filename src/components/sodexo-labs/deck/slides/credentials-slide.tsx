"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import { LABS_CREDENTIALS } from "@/lib/sodexo-labs/data/credentials";
import { filterLabsCredentials } from "@/lib/sodexo-labs/filter-credentials";
import { labsSessionQuery } from "@/lib/sodexo-labs/parse-session";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CredentialsSlide({ pack }: { pack: LabsPack }) {
  const { lang, audience, area } = pack.session;
  const href = `/labs/credentials${labsSessionQuery({ lang, audience, area })}`;
  const teasers = filterLabsCredentials(LABS_CREDENTIALS, { area })
    .filter((c) => c.images.length > 0)
    .slice(0, 4);

  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
            {pack.chrome.credentialsEyebrow}
          </p>
          <h1 className="labs-display max-w-xl text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-[var(--labs-ink)] text-balance">
            {pack.chrome.credentialsHeadline}
          </h1>
          <p className="mt-6 max-w-lg text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed text-[var(--labs-muted)]">
            {pack.chrome.credentialsBody}
          </p>
          <Link
            href={href}
            className="mt-10 inline-flex items-center rounded-full bg-[var(--labs-navy)] px-8 py-4 text-[clamp(1rem,1.4vw,1.15rem)] font-semibold text-white transition-colors hover:bg-[var(--labs-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
          >
            {pack.chrome.credentialsCta}
          </Link>
        </div>

        <StaggerIn className="grid grid-cols-2 gap-3 sm:gap-4">
          {teasers.map((c) => (
            <motion.div
              key={c.id}
              variants={staggerItem}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={c.images[0]!.src}
                alt={c.images[0]!.alt}
                fill
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,16,32,0.7)] to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                {c.client}
              </p>
            </motion.div>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
