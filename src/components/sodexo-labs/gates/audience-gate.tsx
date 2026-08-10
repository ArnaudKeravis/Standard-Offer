"use client";

import { motion, useReducedMotion } from "framer-motion";

import { getLabsGateUi } from "@/lib/sodexo-labs/i18n/gates";
import { labsSpringChrome } from "@/lib/sodexo-labs/motion";
import type { LabsAudience, LabsLang } from "@/lib/sodexo-labs/schemas";

type AudienceGateProps = {
  lang: LabsLang;
  onSelect: (audience: LabsAudience) => void;
};

export function AudienceGate({ lang, onSelect }: AudienceGateProps) {
  const reduceMotion = useReducedMotion();
  const ui = getLabsGateUi(lang);
  const choices = (["internal", "external"] as const).map((value) => ({
    value,
    ...ui.audienceChoices[value],
  }));

  return (
    <motion.section
      className="labs-body relative flex min-h-screen flex-col justify-center px-[6vw] py-[8vh]"
      aria-labelledby="labs-audience-title"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, color-mix(in srgb, var(--labs-blue) 18%, transparent), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, color-mix(in srgb, var(--labs-navy) 14%, transparent), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          {ui.audienceEyebrow}
        </p>
        <h1
          id="labs-audience-title"
          className="labs-display mb-3 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-[var(--labs-ink)]"
        >
          {ui.audienceTitle}
        </h1>
        <p className="mb-12 max-w-xl text-lg text-[var(--labs-muted)]">
          {ui.audienceLead}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {choices.map((choice, index) => (
            <motion.button
              key={choice.value}
              type="button"
              onClick={() => onSelect(choice.value)}
              className="group relative min-h-[11rem] rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_18%,transparent)] bg-[color-mix(in_srgb,white_72%,var(--labs-paper))] px-8 py-8 text-left shadow-[0_1px_0_color-mix(in_srgb,var(--labs-navy)_6%,transparent)] outline-none transition-colors hover:border-[var(--labs-blue)] hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...labsSpringChrome, delay: 0.08 + index * 0.05 }
              }
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <span className="labs-display block text-[clamp(1.75rem,3vw,2.5rem)] text-[var(--labs-navy)]">
                {choice.label}
              </span>
              <span className="mt-3 block text-base leading-relaxed text-[var(--labs-muted)]">
                {choice.description}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
