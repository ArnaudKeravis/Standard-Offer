"use client";

import { motion, useReducedMotion } from "framer-motion";

import { accentForLabsArea } from "@/lib/sodexo-labs/area-theme";
import { getLabsGateUi } from "@/lib/sodexo-labs/i18n/gates";
import type { LabsArea, LabsLang } from "@/lib/sodexo-labs/schemas";

type TerritoryGateProps = {
  lang: LabsLang;
  onSelect: (area: LabsArea) => void;
};

export function TerritoryGate({ lang, onSelect }: TerritoryGateProps) {
  const reduceMotion = useReducedMotion();
  const ui = getLabsGateUi(lang);
  const choices = (["work", "heal", "play", "learn"] as const).map((value) => ({
    value,
    ...ui.territoryChoices[value],
  }));

  return (
    <motion.section
      className="labs-body relative flex min-h-screen flex-col justify-center px-[6vw] py-[8vh]"
      aria-labelledby="labs-territory-title"
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
            "radial-gradient(ellipse 75% 55% at 80% 15%, color-mix(in srgb, var(--labs-navy) 16%, transparent), transparent 55%), radial-gradient(ellipse 60% 45% at 10% 85%, color-mix(in srgb, var(--labs-teal) 12%, transparent), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          {ui.territoryEyebrow}
        </p>
        <h1
          id="labs-territory-title"
          className="labs-display mb-3 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-[var(--labs-ink)]"
        >
          {ui.territoryTitle}
        </h1>
        <p className="mb-12 max-w-xl text-lg text-[var(--labs-muted)]">
          {ui.territoryLead}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {choices.map((choice, index) => {
            const accent = accentForLabsArea(choice.value);

            return (
              <motion.button
                key={choice.value}
                type="button"
                onClick={() => onSelect(choice.value)}
                className="group relative min-h-[12rem] overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_14%,transparent)] bg-[color-mix(in_srgb,white_74%,var(--labs-paper))] px-6 py-7 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
                style={{
                  boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 12%, transparent)`,
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion ? 0 : 0.06 + index * 0.05,
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: accent }}
                />
                <span
                  className="labs-display block text-[clamp(1.6rem,2.5vw,2.25rem)]"
                  style={{ color: accent }}
                >
                  {choice.label}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-[var(--labs-muted)]">
                  {choice.description}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
