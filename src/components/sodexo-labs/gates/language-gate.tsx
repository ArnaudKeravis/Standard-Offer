"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { LabsLang } from "@/lib/sodexo-labs/schemas";

const CHOICES: {
  value: LabsLang;
  label: string;
  description: string;
}[] = [
  {
    value: "en",
    label: "English",
    description: "Presentation in English · Présentation en anglais",
  },
  {
    value: "fr",
    label: "Français",
    description: "Présentation en français · Presentation in French",
  },
];

type LanguageGateProps = {
  onSelect: (lang: LabsLang) => void;
};

export function LanguageGate({ onSelect }: LanguageGateProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="labs-body relative flex min-h-screen flex-col justify-center px-[6vw] py-[8vh]"
      aria-labelledby="labs-language-title"
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
            "radial-gradient(ellipse 80% 60% at 15% 20%, color-mix(in srgb, var(--labs-teal) 16%, transparent), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 75%, color-mix(in srgb, var(--labs-blue) 14%, transparent), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          Sodexo Labs
        </p>
        <h1
          id="labs-language-title"
          className="labs-display mb-3 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-[var(--labs-ink)]"
        >
          Choose your language
          <span className="mt-2 block text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal text-[var(--labs-muted)]">
            Choisissez votre langue
          </span>
        </h1>
        <p className="mb-12 max-w-xl text-lg text-[var(--labs-muted)]">
          Then pick audience and territory. · Ensuite audience et territoire.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {CHOICES.map((choice, index) => (
            <motion.button
              key={choice.value}
              type="button"
              onClick={() => onSelect(choice.value)}
              className="group relative min-h-[11rem] rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_18%,transparent)] bg-[color-mix(in_srgb,white_72%,var(--labs-paper))] px-8 py-8 text-left shadow-[0_1px_0_color-mix(in_srgb,var(--labs-navy)_6%,transparent)] outline-none transition-colors hover:border-[var(--labs-blue)] hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : 0.08 + index * 0.06,
              }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
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
