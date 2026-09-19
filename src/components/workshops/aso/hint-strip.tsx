"use client";

export function HintStrip({
  dark,
  onDismiss,
}: {
  dark: boolean;
  onDismiss: () => void;
}) {
  const tone = dark
    ? "border-white/15 bg-black/55 text-white"
    : "border-[var(--aso-hair)] bg-[var(--aso-papier)] text-[var(--aso-ink)]";

  return (
    <div
      className={`pointer-events-auto mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border px-4 py-2 text-sm ${tone}`}
      data-aso-hud
    >
      <p className="min-w-0">
        <Kbd dark={dark}>→</Kbd> suivant
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>espace</Kbd> minuteur
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>R</Kbd> reset
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>G</Kbd> profil
        <span className="mx-2 opacity-40">/</span>
        <Kbd dark={dark}>1</Kbd>/<Kbd dark={dark}>2</Kbd> jour
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className={`px-3 py-1 text-xs font-semibold ${
          dark ? "bg-white text-black" : "bg-[var(--aso-noir)] text-white"
        }`}
      >
        OK
      </button>
    </div>
  );
}

function Kbd({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <kbd
      className={`mx-0.5 inline-flex min-w-6 items-center justify-center px-1.5 py-0.5 text-xs font-semibold ${
        dark ? "bg-white/12" : "bg-white"
      }`}
    >
      {children}
    </kbd>
  );
}
