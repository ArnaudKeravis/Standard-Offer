"use client";

export function HintStrip({
  dark,
  onDismiss,
}: {
  dark: boolean;
  onDismiss: () => void;
}) {
  const tone = dark
    ? "border-white/12 bg-[color-mix(in_srgb,#10162c_70%,transparent)] text-white"
    : "border-[color-mix(in_srgb,var(--ws-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--ws-paper)_86%,white)] text-[var(--ws-ink)]";

  return (
    <div
      className={`pointer-events-auto mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-sm shadow-[0_8px_28px_rgba(16,22,44,0.08)] backdrop-blur-xl ${tone}`}
      data-ws-hud
    >
      <p className="min-w-0">
        <Kbd dark={dark}>F</Kbd> fullscreen
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>→</Kbd> next
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>T</Kbd> timer
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>R</Kbd> reset
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-transform active:scale-95 ${
          dark ? "bg-white/12 text-white" : "bg-[var(--ws-ink)] text-white"
        }`}
      >
        Got it
      </button>
    </div>
  );
}

function Kbd({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <kbd
      className={`mx-0.5 inline-flex min-w-6 items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-semibold ${
        dark ? "bg-white/12" : "bg-white"
      }`}
    >
      {children}
    </kbd>
  );
}
