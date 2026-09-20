"use client";

import { INTERCALAIRES, blockById } from "@/lib/workshops/tech-ambition/run-of-show";
import type { BlockId } from "@/lib/workshops/tech-ambition/types";

export function IntercalaireSlide({ blockId }: { blockId: BlockId }) {
  const block = blockById(blockId);
  const copy = INTERCALAIRES[blockId];
  if (!copy) return null;

  return (
    <div
      className="relative flex h-full w-full overflow-hidden text-white"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 100% 0%, color-mix(in srgb, ${block.accent} 38%, transparent), transparent 55%),
          linear-gradient(160deg, var(--ws-dark) 0%, color-mix(in srgb, var(--ws-dark) 82%, ${block.accent}) 55%, ${block.accent} 160%)
        `,
      }}
    >
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-end px-[6vw] pb-[11vh]">
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
      {copy.portrait ? (
        <div className="relative hidden w-[38vw] shrink-0 md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={copy.portrait.src}
            alt={copy.portrait.alt}
            className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-24"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--ws-dark) 88%, transparent), transparent)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
