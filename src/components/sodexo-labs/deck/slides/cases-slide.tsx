import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CasesSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Proof
      </p>
      <h1 className="labs-display mb-10 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        {pack.cases.length === 1 ? "Case in point" : "Cases in point"}
      </h1>
      <ul
        className={`grid gap-8 ${pack.cases.length > 1 ? "lg:grid-cols-2" : "max-w-3xl"}`}
      >
        {pack.cases.map((item) => (
          <li key={item.id} className="min-w-0">
            <p className="mb-2 text-xs font-medium tracking-[0.16em] text-[var(--labs-accent)] uppercase">
              {item.client}
            </p>
            <h2 className="labs-display text-[clamp(1.5rem,2.5vw,2.25rem)] text-[var(--labs-navy)]">
              Challenge
            </h2>
            <p className="mt-2 text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-[var(--labs-muted)]">
              {item.challenge}
            </p>
            <h3 className="mt-5 text-sm font-semibold tracking-[0.08em] text-[var(--labs-ink)] uppercase">
              Approach
            </h3>
            <p className="mt-1 text-[clamp(0.9rem,1.3vw,1.05rem)] leading-relaxed text-[var(--labs-muted)]">
              {item.approach}
            </p>
            <h3 className="mt-5 text-sm font-semibold tracking-[0.08em] text-[var(--labs-ink)] uppercase">
              Outcome
            </h3>
            <p className="mt-1 text-[clamp(0.9rem,1.3vw,1.05rem)] leading-relaxed text-[var(--labs-ink)]">
              {item.outcome}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
