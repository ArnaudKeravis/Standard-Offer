"use client";

export function TimeFlash({ word }: { word: "TIME" | null }) {
  if (!word) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="aso-time-flash pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-[var(--aso-pois)]"
    >
      <p className="aso-display text-[clamp(6rem,18vw,12rem)] text-white">{word}</p>
    </div>
  );
}
