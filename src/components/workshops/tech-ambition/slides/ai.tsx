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

function LayerHead({
  n,
  title,
  role,
  accent,
}: {
  n: string;
  title: string;
  role: string;
  accent: string;
}) {
  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ws-muted)]">
        <span style={{ color: accent }}>{n}</span> {title}
      </p>
      <h2 className="ws-display mt-1.5 text-[1.55rem] text-[var(--ws-ink)]">{role}</h2>
    </div>
  );
}

function MetaRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <p className="grid grid-cols-[6.4rem_minmax(0,1fr)] items-baseline gap-2 text-[0.92rem] leading-snug">
      <span className="font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>
        {label}
      </span>
      <span className="text-[var(--ws-ink)]">{value}</span>
    </p>
  );
}

function ModelSchema() {
  return (
    <svg viewBox="0 0 160 160" className="h-[9.2rem] w-[9.2rem]" aria-hidden>
      <circle cx="80" cy="80" r="78" fill="#163D3C" />
      <circle cx="80" cy="80" r="58" fill="#2BB8B3" />
      <circle cx="80" cy="80" r="26" fill="white" />
      <text
        x="80"
        y="86"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#163D3C"
        fontFamily="inherit"
      >
        M
      </text>
    </svg>
  );
}

function ProductSchema() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full bg-white py-3.5 text-center text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[var(--ws-navy)]">
        Model(s)
      </div>
      <svg viewBox="0 0 32 34" className="my-2 h-8 w-8" aria-hidden>
        <path d="M16 2v18" stroke="#2B5CFF" strokeWidth="3" />
        <path d="M6 16l10 14 10-14" fill="#2B5CFF" />
      </svg>
      <div className="w-full bg-[#2B5CFF] py-4 text-center text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-white">
        Product logic + experience
      </div>
    </div>
  );
}

function HarnessSchema({ nodes }: { nodes: readonly string[] }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-[11rem] bg-[#F7E7B8] py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--ws-ink)]">
        Harness
      </div>
      <div className="h-5 w-px bg-[var(--ws-ink)]/30" />
      <div className="relative w-full">
        <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-[var(--ws-ink)]/30" />
        <div className="grid grid-cols-4">
          {nodes.map((node) => (
            <div key={node} className="flex flex-col items-center">
              <div className="h-5 w-px bg-[var(--ws-ink)]/30" />
              <div className="w-[calc(100%-10px)] border border-[var(--ws-ink)]/20 bg-white py-2.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[var(--ws-ink)]">
                {node}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AiLayersSlide() {
  const { model, product, harness } = AI_LAYERS;

  return (
    <div className="relative flex h-full w-full flex-col bg-white pb-0 pt-[10vh]">
      <div className="flex min-h-0 flex-1 flex-col px-[4.5vw]">
      <h1 className="ws-display text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        When someone says “AI”
      </h1>
      <div className="mt-5 h-px bg-[var(--ws-ink)]/10" />
      <StaggerIn className="mt-6 grid min-h-0 flex-1 grid-cols-3 gap-3">
        <motion.article
          variants={staggerItem}
          className="flex flex-col bg-[#f5f6f8] px-6 py-6"
          style={{ borderTop: `4px solid ${model.accent}` }}
        >
          <LayerHead {...model} />
          <div className="flex flex-1 items-center justify-center py-6">
            <ModelSchema />
          </div>
          <p className="text-center text-[0.98rem] text-[var(--ws-muted)]">{model.body}</p>
          <div className="mt-5 flex justify-center gap-6 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-navy)]">
            {model.kinds.map((kind) => (
              <span key={kind}>{kind}</span>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <MetaRow label="Examples" value={model.examples} accent={model.accent} />
          </div>
        </motion.article>

        <motion.article
          variants={staggerItem}
          className="flex flex-col bg-[#f5f6f8] px-6 py-6"
          style={{ borderTop: `4px solid ${product.accent}` }}
        >
          <LayerHead {...product} />
          <div className="flex flex-1 items-center justify-center py-6">
            <ProductSchema />
          </div>
          <p className="text-center text-[0.98rem] text-[var(--ws-muted)]">{product.body}</p>
          <div className="mt-auto space-y-2 pt-6">
            <MetaRow label="Examples" value={product.examples} accent={product.accent} />
            <MetaRow label="Channels" value={product.channels} accent={product.accent} />
          </div>
        </motion.article>

        <motion.article
          variants={staggerItem}
          className="flex flex-col bg-[#f5f6f8] px-6 py-6"
          style={{ borderTop: `4px solid ${harness.accent}` }}
        >
          <LayerHead {...harness} />
          <div className="flex flex-1 items-center justify-center py-6">
            <HarnessSchema nodes={harness.nodes} />
          </div>
          <p className="text-center text-[0.98rem] text-[var(--ws-muted)]">{harness.body}</p>
          <div className="mt-auto space-y-2 pt-6">
            <MetaRow label="Also includes" value={harness.includes} accent={harness.accent} />
            <MetaRow label="Access" value={harness.access} accent={harness.accent} />
          </div>
        </motion.article>
      </StaggerIn>
      </div>
      <div className="mt-3 grid grid-cols-3 bg-[var(--ws-ink)] text-center text-[0.95rem] font-semibold text-white">
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
