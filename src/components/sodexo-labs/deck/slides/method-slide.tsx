import type { LabsPack } from "@/lib/sodexo-labs/schemas";

const PHASES = [
  { id: "discover", label: "Discover" },
  { id: "define", label: "Define" },
  { id: "co-create", label: "Co-Create" },
  { id: "test-deliver", label: "Test & Deliver" },
];

export function MethodSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Method
      </p>
      <h1 className="labs-display mb-4 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        Double diamond
      </h1>
      <p className="mb-12 max-w-2xl text-[clamp(1.05rem,1.8vw,1.35rem)] text-[var(--labs-muted)]">
        From insight to tested experience — a shared path for every Labs session.
      </p>

      <ol className="grid gap-4 sm:grid-cols-4 sm:gap-5">
        {PHASES.map((phase, i) => (
          <li key={phase.id} className="relative">
            <div
              className="flex min-h-[9rem] flex-col justify-between rounded-2xl px-5 py-5"
              style={{
                background:
                  i < 2
                    ? "color-mix(in srgb, var(--labs-navy) 8%, var(--labs-paper))"
                    : "color-mix(in srgb, var(--labs-accent) 12%, white)",
              }}
            >
              <span className="text-xs tracking-[0.16em] text-[var(--labs-muted)] uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="labs-display text-[clamp(1.35rem,2.2vw,1.85rem)] text-[var(--labs-ink)]">
                {phase.label}
              </span>
            </div>
          </li>
        ))}
      </ol>

      {pack.copy.methodNote ? (
        <p className="mt-10 max-w-3xl text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-[var(--labs-ink)]">
          {pack.copy.methodNote}
        </p>
      ) : null}
    </div>
  );
}
