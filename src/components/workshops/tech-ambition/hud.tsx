"use client";

import { BLOCKS } from "@/lib/workshops/tech-ambition/run-of-show";
import type { BlockId } from "@/lib/workshops/tech-ambition/types";

type WorkshopHudProps = {
  blockId: BlockId;
  label: string;
  start: string;
  index: number;
  total: number;
  dark: boolean;
  reserveClock?: boolean;
  onJumpBlock: (blockId: BlockId) => void;
};

export function WorkshopHud({
  blockId,
  label,
  start,
  index,
  total,
  dark,
  reserveClock = false,
  onJumpBlock,
}: WorkshopHudProps) {
  const tone = dark
    ? {
        shell:
          "border-white/12 bg-[color-mix(in_srgb,#10162c_58%,transparent)] text-white/80",
        strong: "text-white",
        muted: "text-white/55",
        pill: "text-white/70 hover:bg-white/10",
        pillActive: "bg-white text-[var(--ws-ink)]",
      }
    : {
        shell:
          "border-[color-mix(in_srgb,var(--ws-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--ws-paper)_78%,white)] text-[var(--ws-muted)]",
        strong: "text-[var(--ws-ink)]",
        muted: "text-[var(--ws-muted)]",
        pill: "text-[var(--ws-navy)] hover:bg-white",
        pillActive: "bg-[var(--ws-ink)] text-white",
      };

  return (
    <header
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 px-[3vw] pt-[2.2vh] ${
        reserveClock ? "pr-[min(22rem,34vw)]" : ""
      }`}
      data-ws-hud
    >
      <div
        className={`ws-hud-material pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between gap-3 rounded-2xl border px-4 py-2 shadow-[0_8px_28px_rgba(16,22,44,0.08)] backdrop-blur-xl ${tone.shell}`}
      >
        <p className="min-w-0 truncate text-sm">
          <span className={`font-semibold ${tone.strong}`}>Tech Ambition</span>
          <span className={`mx-2 ${tone.muted}`}>/</span>
          <span className={`font-semibold ${tone.strong}`}>{label}</span>
          <span className={`ml-2 ${tone.muted}`}>{start}</span>
        </p>

        <nav
          aria-label="Workshop blocks"
          className="hidden flex-wrap items-center justify-end gap-1.5 lg:flex"
        >
          {BLOCKS.map((block) => (
            <button
              key={block.id}
              type="button"
              onClick={() => onJumpBlock(block.id)}
              aria-current={block.id === blockId ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-transform active:scale-95 ${
                block.id === blockId ? tone.pillActive : tone.pill
              }`}
            >
              {block.short}
            </button>
          ))}
        </nav>

        <p className={`shrink-0 text-sm tabular-nums ${tone.muted}`}>
          {index + 1} / {total}
        </p>
      </div>
    </header>
  );
}
