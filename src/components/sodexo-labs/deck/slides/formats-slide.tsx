import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function FormatsSlide({ pack }: { pack: LabsPack }) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Formats
      </p>
      <h1 className="labs-display mb-10 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-[var(--labs-ink)]">
        How a session can look
      </h1>
      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
        {pack.formats.map((format, i) => (
          <li
            key={format.id}
            className="flex min-h-[12rem] flex-col rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_12%,transparent)] bg-white/60 px-5 py-6"
          >
            <span className="text-xs tracking-[0.16em] text-[var(--labs-muted)] uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="labs-display mt-3 text-[clamp(1.5rem,2.3vw,2rem)] text-[var(--labs-navy)]">
              {format.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-[var(--labs-accent)]">
              {format.duration}
            </p>
            <p className="mt-4 text-[clamp(0.9rem,1.25vw,1.05rem)] leading-relaxed text-[var(--labs-muted)]">
              {format.summary}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
