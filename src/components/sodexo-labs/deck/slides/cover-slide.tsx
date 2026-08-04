import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CoverSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center px-[6vw] py-[8vh] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 80% 20%, color-mix(in srgb, var(--labs-accent) 35%, transparent), transparent 55%),
            radial-gradient(ellipse 50% 40% at 15% 85%, color-mix(in srgb, var(--labs-blue) 28%, transparent), transparent 50%),
            linear-gradient(145deg, #0B1020 0%, #121a36 45%, #1E2F9A 100%)
          `,
        }}
      />
      <div className="relative z-10 max-w-5xl">
        <p className="mb-5 text-sm font-medium tracking-[0.22em] text-white/50 uppercase">
          Sodexo Labs
        </p>
        <h1 className="labs-display text-[clamp(3rem,8vw,6.5rem)] leading-[1.02] text-balance">
          Co-creating the future of experiences
        </h1>
        <p className="mt-8 max-w-2xl text-[clamp(1.125rem,2.2vw,1.75rem)] leading-snug text-white/70">
          {pack.copy.coverSubtitle}
        </p>
      </div>
    </div>
  );
}
