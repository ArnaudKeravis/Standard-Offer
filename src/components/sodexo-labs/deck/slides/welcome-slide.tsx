import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function WelcomeSlide({ pack }: { pack: LabsPack }) {
  const pillars = pack.offers.slice(0, 3).map((offer) => offer.title);

  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-4 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Welcome
      </p>
      <h1 className="labs-display max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] text-[var(--labs-ink)] text-balance">
        {pack.copy.welcomeHeadline}
      </h1>
      <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.5rem)] leading-relaxed text-[var(--labs-muted)]">
        {pack.copy.welcomeBody}
      </p>
      <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
        {pillars.map((title) => (
          <li
            key={title}
            className="text-[clamp(1rem,1.6vw,1.25rem)] font-medium text-[var(--labs-navy)]"
          >
            <span
              className="mr-3 inline-block h-2 w-2 rounded-full align-middle"
              style={{ background: "var(--labs-accent)" }}
              aria-hidden
            />
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
