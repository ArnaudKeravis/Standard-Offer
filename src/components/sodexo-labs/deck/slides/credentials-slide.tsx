import Link from "next/link";

import type { LabsPack } from "@/lib/sodexo-labs/schemas";

export function CredentialsSlide({ pack }: { pack: LabsPack }) {
  const { audience, area } = pack.session;
  const href = `/labs/credentials?audience=${audience}&area=${area}`;

  return (
    <div className="flex h-full w-full flex-col justify-center px-[6vw] py-[8vh]">
      <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
        Credentials
      </p>
      <h1 className="labs-display max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-[var(--labs-ink)] text-balance">
        Explore the proof room
      </h1>
      <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.45rem)] leading-relaxed text-[var(--labs-muted)]">
        Filter by territory, sector and region — curated CoDesign credentials
        ready for client conversations.
      </p>
      <div className="mt-12">
        <Link
          href={href}
          className="inline-flex items-center rounded-full bg-[var(--labs-navy)] px-8 py-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium text-white transition-colors hover:bg-[var(--labs-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
        >
          Open credentials
        </Link>
      </div>
    </div>
  );
}
