"use client";

type TimeFlashProps = {
  word: "TIME" | "SWAP" | null;
};

export function TimeFlash({ word }: TimeFlashProps) {
  if (!word) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="ws-time-flash pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-[#e24b4b]"
    >
      <p className="ws-timer text-[clamp(6rem,18vw,12rem)] font-bold leading-none tracking-[-0.04em] text-white">
        {word}
      </p>
    </div>
  );
}
