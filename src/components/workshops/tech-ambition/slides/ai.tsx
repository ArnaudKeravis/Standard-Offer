"use client";

import { motion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import { AI_BUYING, AI_LAYERS, AI_WALL } from "@/lib/workshops/tech-ambition/run-of-show";

export function AiWallSlide() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-[5.5vw] pb-[8vh] pt-[12vh] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 50% at 90% 10%, color-mix(in srgb, var(--ws-discover) 34%, transparent), transparent 60%), #10162c",
        }}
      />
      <div className="relative z-10">
        <p className="ws-kicker text-white/50">If you have a real day-job</p>
        <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
          Has AI hit a wall yet?
        </h1>
      </div>
      <StaggerIn className="relative z-10 mt-10 grid flex-1 grid-cols-3 content-start gap-5">
        {AI_WALL.map((item) => (
          <motion.article
            key={item.when}
            variants={staggerItem}
            className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-5"
          >
            <p className="ws-kicker text-[color-mix(in_srgb,var(--ws-discover)_70%,white)]">
              {item.when}
            </p>
            <p className="mt-3 text-[1.05rem] leading-snug text-white/82">{item.text}</p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}

export function AiLayersSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-discover)]">When someone says AI</p>
      <h1 className="ws-display mt-3 text-[clamp(2.1rem,4vw,3.4rem)] text-[var(--ws-ink)]">
        Model. Product. Harness.
      </h1>
      <StaggerIn className="mt-10 grid flex-1 grid-cols-3 gap-6">
        {AI_LAYERS.map((layer) => (
          <motion.article
            key={layer.n}
            variants={staggerItem}
            className="flex flex-col rounded-[28px] bg-white px-7 py-8 shadow-[0_16px_40px_rgba(20,27,58,0.06)]"
          >
            <p className="ws-display text-[2rem] text-[var(--ws-discover)]">{layer.n}</p>
            <h2 className="ws-display mt-5 text-[2rem] text-[var(--ws-ink)]">
              {layer.title}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ws-muted)]">
              {layer.role}
            </p>
            <p className="mt-5 flex-1 text-[1.05rem] text-[var(--ws-muted)]">{layer.body}</p>
            <p className="mt-6 text-sm font-semibold text-[var(--ws-navy)]">
              {layer.examples}
            </p>
          </motion.article>
        ))}
      </StaggerIn>
      <p className="mt-6 text-sm text-[var(--ws-muted)]">
        GPT-5.2 is a model. ChatGPT is a product. Skills + MCP + APIs is a harness.
      </p>
    </div>
  );
}

export function AiBuyingSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-discover)]">Buying AI</p>
      <h1 className="ws-display mt-3 max-w-4xl text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        Capabilities are getting cheaper. The bill is not.
      </h1>
      <StaggerIn className="mt-10 grid flex-1 grid-cols-2 gap-5">
        {AI_BUYING.map((item) => (
          <motion.article
            key={item.title}
            variants={staggerItem}
            className="rounded-[28px] bg-white px-7 py-7 shadow-[0_16px_40px_rgba(20,27,58,0.06)]"
          >
            <p className="ws-kicker text-[var(--ws-blue)]">{item.kicker}</p>
            <h2 className="ws-display mt-3 text-[1.7rem] text-[var(--ws-ink)]">
              {item.title}
            </h2>
            <p className="mt-3 text-[1.05rem] text-[var(--ws-muted)]">{item.body}</p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}
