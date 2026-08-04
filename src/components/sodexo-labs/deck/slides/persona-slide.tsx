import Image from "next/image";

import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function PersonaSlide({ pack }: { pack: LabsPack }) {
  const { persona } = pack;

  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Persona
      </p>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
        {persona.portraitUrl ? (
          <div className="relative aspect-[3/4] w-full max-w-[18rem] overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--labs-navy)_10%,white)]">
            <Image
              src={persona.portraitUrl}
              alt=""
              fill
              className="object-cover"
              sizes="288px"
              priority={false}
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="flex aspect-[3/4] w-full max-w-[18rem] items-end rounded-2xl px-6 py-6"
            style={{
              background: `linear-gradient(160deg, color-mix(in srgb, var(--labs-accent) 35%, #0B1020), #0B1020)`,
            }}
          >
            <span className="labs-display text-4xl text-white/90">
              {persona.name.charAt(0)}
            </span>
          </div>
        )}

        <div className="min-w-0">
          <h1 className="labs-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-[var(--labs-ink)]">
            {persona.name}
          </h1>
          <p className="mt-2 text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium text-[var(--labs-accent)]">
            {persona.role}
          </p>
          <p className="mt-6 max-w-2xl text-[clamp(1.1rem,1.9vw,1.4rem)] leading-relaxed text-[var(--labs-muted)]">
            {persona.essence}
          </p>
          {persona.tensions.length > 0 ? (
            <ul className="mt-8 space-y-3">
              {persona.tensions.map((tension) => (
                <li
                  key={tension}
                  className="max-w-xl text-[clamp(0.95rem,1.4vw,1.15rem)] leading-snug text-[var(--labs-ink)]"
                >
                  <span
                    className="mr-3 inline-block h-1.5 w-1.5 rounded-full align-middle"
                    style={{ background: "var(--labs-accent)" }}
                    aria-hidden
                  />
                  {tension}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
