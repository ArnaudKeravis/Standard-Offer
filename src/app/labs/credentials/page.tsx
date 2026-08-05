import Link from "next/link";

import { CredentialsRoom } from "@/components/sodexo-labs/credentials/credentials-room";
import { LABS_CREDENTIALS } from "@/lib/sodexo-labs/data/credentials";
import { parseLabsSession } from "@/lib/sodexo-labs/parse-session";

export default async function LabsCredentialsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { lang, audience, area } = parseLabsSession(params);

  const qs = new URLSearchParams();
  if (lang) qs.set("lang", lang);
  if (audience) qs.set("audience", audience);
  if (area) qs.set("area", area);
  const backHref = qs.size > 0 ? `/labs?${qs.toString()}` : "/labs";

  return (
    <main className="labs-body relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 0%, color-mix(in srgb, var(--labs-blue) 14%, transparent), transparent 55%), radial-gradient(ellipse 60% 45% at 95% 20%, color-mix(in srgb, var(--labs-navy) 12%, transparent), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-[4vw] pt-[3vh] pb-[8vh]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--labs-navy)] transition-colors hover:text-[var(--labs-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
        >
          <span aria-hidden>←</span>
          Back to session
        </Link>

        <header className="mt-8 mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
            Sodexo Labs
          </p>
          <h1 className="labs-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-[var(--labs-ink)] text-balance">
            Credentials
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--labs-muted)]">
            Browse proof stories by territory, sector, and region — ready for
            the room.
          </p>
        </header>

        <CredentialsRoom
          credentials={LABS_CREDENTIALS}
          defaultArea={area ?? "all"}
          audience={audience}
        />
      </div>
    </main>
  );
}
