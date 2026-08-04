import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CloseSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center px-[6vw] py-[8vh] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 20% 30%, color-mix(in srgb, var(--labs-accent) 32%, transparent), transparent 55%),
            radial-gradient(ellipse 45% 40% at 90% 75%, color-mix(in srgb, var(--labs-blue) 24%, transparent), transparent 50%),
            linear-gradient(155deg, #0B1020 0%, #121a36 50%, #1E2F9A 100%)
          `,
        }}
      />
      <div className="relative z-10 max-w-4xl">
        <p className="mb-5 text-sm font-medium tracking-[0.22em] text-white/50 uppercase">
          Sodexo Labs
        </p>
        <h1 className="labs-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] text-balance">
          {pack.copy.closeHeadline}
        </h1>
        <p className="mt-8 text-[clamp(1.2rem,2.4vw,1.85rem)] leading-snug text-white/75">
          {pack.copy.closeCta}
        </p>
      </div>
    </div>
  );
}
