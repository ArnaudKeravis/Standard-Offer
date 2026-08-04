const LOCATIONS = [
  "France · Paris HQ",
  "UK & Ireland",
  "USA",
  "Brazil",
  "India",
] as const;

export function NetworkSlide() {
  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Network
      </p>
      <h1 className="labs-display max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-[var(--labs-ink)] text-balance">
        A glocal model
      </h1>
      <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.45rem)] leading-relaxed text-[var(--labs-muted)]">
        Local Labs connected to a global CoDesign practice — one method, many
        territories.
      </p>
      <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-5">
        {LOCATIONS.map((place) => (
          <li
            key={place}
            className="labs-display text-[clamp(1.35rem,2.4vw,2rem)] text-[var(--labs-navy)]"
          >
            {place}
          </li>
        ))}
      </ul>
    </div>
  );
}
