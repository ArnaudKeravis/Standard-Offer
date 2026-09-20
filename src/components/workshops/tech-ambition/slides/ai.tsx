"use client";

import { motion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import { AI_BUYING, AI_LAYERS, AI_WALL } from "@/lib/workshops/tech-ambition/run-of-show";

export function AiWallSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[6vw] pb-[8vh] pt-[11vh]">
      <h1 className="ws-display text-[clamp(2.1rem,4.2vw,3.4rem)] text-[var(--ws-ink)]">
        If you have a real day-job… I’ve got your back!
      </h1>
      <p className="mt-5 text-center text-[clamp(1.2rem,2vw,1.55rem)] text-[var(--ws-muted)]">
        Has AI / LLMs hit a wall yet?
      </p>
      <div className="mt-10 flex flex-1 items-center">
        <StaggerIn className="w-full rounded-[2.4rem] bg-[var(--ws-ink)] px-[3.2vw] py-[4.2vh] text-white">
          {AI_WALL.map((item) => (
            <motion.div
              key={item.when}
              variants={staggerItem}
              className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-6 border-b border-white/10 py-3.5 last:border-b-0"
            >
              <p className="text-[1.05rem] font-semibold text-white/55">{item.when}</p>
              <p className="text-[clamp(1.05rem,1.7vw,1.28rem)] leading-snug text-white">
                {item.text}
              </p>
            </motion.div>
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}

export function AiPhilosophySlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[6vw] pb-[7vh] pt-[10vh]">
      <h1 className="ws-display text-[clamp(2rem,3.8vw,3.1rem)] text-[var(--ws-ink)]">
        If you’re philosophy-inclined
      </h1>
      <div className="mt-6 flex flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/workshops/tech-ambition/philosophy.png"
          alt="A submarine facing a whale through an empty frame"
          className="max-h-full max-w-[72vw] object-contain"
        />
      </div>
    </div>
  );
}

export function AiLayersSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[5.5vw] pb-0 pt-[10vh]">
      <h1 className="ws-display px-[0.5vw] text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        When someone says “AI”
      </h1>
      <StaggerIn className="mt-8 grid flex-1 grid-cols-3 gap-4 px-[0.5vw]">
        {AI_LAYERS.map((layer) => (
          <motion.article
            key={layer.n}
            variants={staggerItem}
            className="flex flex-col rounded-t-[4px] bg-[#f4f6fb] px-6 py-7"
            style={{ borderTop: `5px solid ${layer.n === "02" ? "var(--ws-blue)" : "transparent"}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ws-muted)]">
              {layer.n} {layer.title}
            </p>
            <h2 className="ws-display mt-3 text-[1.7rem] text-[var(--ws-ink)]">
              {layer.role}
            </h2>
            <p className="mt-5 text-[1.05rem] text-[var(--ws-muted)]">{layer.body}</p>
            <p className="mt-auto pt-8 text-sm font-semibold text-[var(--ws-navy)]">
              {layer.examples}
            </p>
          </motion.article>
        ))}
      </StaggerIn>
      <div className="grid grid-cols-3 bg-[var(--ws-ink)] text-center text-[0.95rem] font-semibold text-white">
        <p className="px-4 py-4">GPT-5.2 = model</p>
        <p className="px-4 py-4">ChatGPT = product</p>
        <p className="px-4 py-4">Skills + MCP + APIs = harness</p>
      </div>
    </div>
  );
}

export function AiBuyingSlide() {
  const accents = ["#ef7a4c", "#2bb8b3", "#e0b34a", "#2a295c"];

  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[5.5vw] pb-[8vh] pt-[10vh]">
      <h1 className="ws-display max-w-5xl text-[clamp(2rem,3.8vw,3.1rem)] text-[var(--ws-ink)]">
        Buying AI capabilities is becoming ever more complex
      </h1>
      <StaggerIn className="mt-12 grid flex-1 grid-cols-4 gap-6">
        {AI_BUYING.map((item, index) => (
          <motion.article key={item.title} variants={staggerItem} className="flex flex-col">
            <span className="h-1.5 w-10" style={{ background: accents[index] }} />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ws-muted)]">
              {item.title}
            </p>
            <p
              className="ws-display mt-4 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none"
              style={{ color: accents[index] }}
            >
              {item.kicker}
            </p>
            <p className="mt-5 text-[1.02rem] leading-snug text-[var(--ws-muted)]">
              {item.body}
            </p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}
