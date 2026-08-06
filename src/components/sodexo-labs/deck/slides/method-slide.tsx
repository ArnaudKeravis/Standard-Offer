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
          <span className="text-[var(--labs-blue)]">
            {chrome.methodHeadlineAccent}
          </span>
        </h1>
        <p className="mb-8 max-w-3xl text-[clamp(0.95rem,1.35vw,1.15rem)] leading-relaxed text-[var(--labs-muted)]">
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

        <motion.svg
          className="mb-2 block w-full"
          viewBox="0 0 1000 200"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 0.65,
            delay: reduce ? 0 : 0.08,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2BB8B0" />
              <stop offset="38%" stopColor="#1968FF" />
              <stop offset="66%" stopColor="#1E2F9A" />
              <stop offset="100%" stopColor="#0B1020" />
            </linearGradient>
          </defs>
          <polygon
            points="20,100 260,20 260,180"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.5"
          />
          <polygon
            points="260,20 500,100 260,180"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.5"
          />
          <polygon
            points="500,100 740,20 740,180"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.5"
          />
          <polygon
            points="740,20 980,100 740,180"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.5"
          />
          <line
            x1="20"
            y1="100"
            x2="980"
            y2="100"
            stroke="color-mix(in srgb, var(--labs-navy) 18%, transparent)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </motion.svg>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs font-semibold tracking-[0.1em] text-[var(--labs-muted)] uppercase">
          <span>{chrome.methodAxisRational}</span>
          <span className="hidden sm:inline">{chrome.methodAxisFlow}</span>
          <span>{chrome.methodAxisEmotional}</span>
        </div>

        <StaggerIn className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {methodPhases.map((phase) => (
            <motion.article key={phase.id} variants={staggerItem}>
              <p
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: phase.color }}
              >
                {phase.flag}
              </p>
              <h2 className="labs-display mt-2 text-[clamp(1.25rem,2vw,1.55rem)] text-[var(--labs-ink)]">
                {phase.label}
              </h2>
              <p className="mt-2 text-[clamp(0.9rem,1.15vw,1rem)] leading-snug text-[var(--labs-muted)]">
                {phase.body}
              </p>
            </motion.article>
          ))}
        </StaggerIn>

        {pack.copy.methodNote ? (
          <p className="mt-8 max-w-3xl border-t border-[var(--labs-line)] pt-5 text-[clamp(0.95rem,1.25vw,1.08rem)] leading-relaxed text-[var(--labs-ink)]">
            {pack.copy.methodNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
