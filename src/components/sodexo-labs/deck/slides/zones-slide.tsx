import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function ZonesSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        The space
      </p>
      <h1 className="labs-display mb-10 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        Four zones
      </h1>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
        {pack.zones.map((zone) => (
          <li
            key={zone.id}
            className="relative overflow-hidden rounded-2xl px-6 py-7"
            style={{
              background: `color-mix(in srgb, ${zone.accent} 12%, white)`,
              borderTop: `3px solid ${zone.accent}`,
            }}
          >
            <h2
              className="labs-display text-[clamp(1.75rem,2.8vw,2.5rem)]"
              style={{ color: zone.accent }}
            >
              {zone.name}
            </h2>
            <p className="mt-4 text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-[var(--labs-muted)]">
              {zone.verbs.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
