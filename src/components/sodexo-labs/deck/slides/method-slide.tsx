"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  StaggerIn,
  staggerItem,
} from "@/components/sodexo-labs/deck/slide-frame";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function MethodSlide({ pack }: { pack: LabsPack }) {
  const reduce = useReducedMotion();
  const gradId = `ddg-${useId().replace(/:/g, "")}`;
  const { chrome, methodPhases } = pack;

  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[var(--labs-paper)] px-[5vw] py-[6vh]">
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          {chrome.methodEyebrow}
        </p>
        <h1 className="labs-display mb-3 max-w-4xl text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] text-[var(--labs-ink)]">
          {chrome.methodHeadlineLead}{" "}
          <span className="text-[color-mix(in_srgb,#7C3AED_85%,var(--labs-ink))]">
            {chrome.methodHeadlineAccent}
          </span>
        </h1>
        <p className="mb-6 max-w-3xl text-[clamp(0.95rem,1.35vw,1.15rem)] leading-relaxed text-[var(--labs-muted)]">
          {chrome.methodLeadBefore}{" "}
          <strong className="font-semibold text-[var(--labs-ink)]">
            {chrome.methodLeadDo}
          </strong>{" "}
          {chrome.methodLeadMid}{" "}
          <strong className="font-semibold text-[var(--labs-ink)]">
            {chrome.methodLeadThink}
          </strong>{" "}
          {chrome.methodLeadAfter}
        </p>

        <motion.div
          className="overflow-hidden rounded-3xl border border-[var(--labs-line)] bg-white px-[clamp(1.25rem,3vw,2.75rem)] py-[clamp(1.25rem,2.5vw,2.25rem)] shadow-[0_16px_40px_rgba(30,47,154,0.06)]"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.svg
            className="block w-full"
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.65,
              delay: reduce ? 0 : 0.12,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="38%" stopColor="#2563EB" />
                <stop offset="66%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <polygon points="20,100 260,20 260,180" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.5" />
            <polygon points="260,20 500,100 260,180" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.5" />
            <polygon points="500,100 740,20 740,180" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.5" />
            <polygon points="740,20 980,100 740,180" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.5" />
            <line x1="20" y1="100" x2="980" y2="100" stroke="#D4D1C7" strokeWidth="1" strokeDasharray="3 5" />
          </motion.svg>

          <StaggerIn className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3.5">
            {methodPhases.map((phase) => (
              <motion.article
                key={phase.id}
                variants={staggerItem}
                className="rounded-2xl border border-[var(--labs-line)] bg-[var(--labs-paper)]/80 px-4 py-4 sm:px-5 sm:py-5"
              >
                <span
                  className="inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-white uppercase"
                  style={{ background: phase.color }}
                >
                  {phase.flag}
                </span>
                <h2 className="labs-display mt-3 text-[clamp(1.15rem,1.8vw,1.45rem)] text-[var(--labs-ink)]">
                  {phase.label}
                </h2>
                <p className="mt-2 text-[clamp(0.8rem,1.05vw,0.92rem)] leading-snug text-[var(--labs-muted)]">
                  {phase.body}
                </p>
              </motion.article>
            ))}
          </StaggerIn>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[10px] font-semibold tracking-[0.12em] text-[var(--labs-muted)] uppercase">
            <span>{chrome.methodAxisRational}</span>
            <span className="hidden sm:inline">{chrome.methodAxisFlow}</span>
            <span>{chrome.methodAxisEmotional}</span>
          </div>
        </motion.div>

        {pack.copy.methodNote ? (
          <p className="mt-5 max-w-3xl text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-[var(--labs-ink)]">
            {pack.copy.methodNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
