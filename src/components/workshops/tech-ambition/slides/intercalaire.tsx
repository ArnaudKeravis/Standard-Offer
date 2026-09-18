"use client";

import { INTERCALAIRES, blockById } from "@/lib/workshops/tech-ambition/run-of-show";
import type { BlockId } from "@/lib/workshops/tech-ambition/types";

export function IntercalaireSlide({ blockId }: { blockId: BlockId }) {
  const block = blockById(blockId);
  const copy = INTERCALAIRES[blockId];
  if (!copy) return null;

  return (
    <div
      className="relative flex h-full w-full flex-col justify-end overflow-hidden px-[6vw] pb-[11vh] text-white"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 100% 0%, color-mix(in srgb, ${block.accent} 38%, transparent), transparent 55%),
          linear-gradient(160deg, #10162c 0%, #182046 55%, ${block.accent} 160%)
        `,
      }}
    >
      <p className="ws-display text-[clamp(4rem,10vw,8rem)] leading-none text-white/25">
        {copy.number}
      </p>
      <h1 className="ws-display mt-4 max-w-5xl text-[clamp(2.8rem,6vw,5.4rem)]">
        {copy.title}
      </h1>
      <p className="mt-6 max-w-3xl text-[clamp(1.15rem,2vw,1.6rem)] text-white/70">
        {copy.detail}
      </p>
      <p className="mt-10 text-sm font-semibold tracking-[0.12em] text-white/50">
        {block.start}
        {block.durationMin ? ` · ${block.durationMin}'` : ""}
      </p>
    </div>
  );
}
