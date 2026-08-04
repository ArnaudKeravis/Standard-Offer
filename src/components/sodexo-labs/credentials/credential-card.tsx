import type { LabsCredential } from "@/lib/sodexo-labs/schemas";

const AREA_LABEL: Record<string, string> = {
  work: "Work",
  heal: "Heal",
  play: "Play",
  learn: "Learn",
};

type CredentialCardProps = {
  credential: LabsCredential;
  onOpen: (credential: LabsCredential) => void;
};

export function CredentialCard({ credential, onOpen }: CredentialCardProps) {
  const image = credential.images[0];
  const meta = [
    credential.sectors.join(" · "),
    credential.regions.join(" · "),
    credential.year,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <button
      type="button"
      onClick={() => onOpen(credential)}
      aria-haspopup="dialog"
      aria-label={`Open credential: ${credential.client} — ${credential.title}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_14%,transparent)] bg-[color-mix(in_srgb,white_78%,var(--labs-paper))] text-left shadow-[0_1px_0_color-mix(in_srgb,var(--labs-navy)_5%,transparent)] outline-none transition-colors hover:border-[var(--labs-blue)] hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
    >
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          className="aspect-[16/9] w-full object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col px-7 py-7 sm:px-8 sm:py-8">
        <p className="text-sm font-medium tracking-[0.12em] text-[var(--labs-blue)] uppercase">
          {credential.client}
        </p>
        <h2 className="labs-display mt-2 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-snug text-[var(--labs-ink)] text-balance">
          {credential.title}
        </h2>
        <p className="mt-4 line-clamp-3 flex-1 text-base leading-relaxed text-[var(--labs-muted)]">
          {credential.challenge}
        </p>
        <p className="mt-6 text-sm text-[var(--labs-muted)]">
          <span className="text-[var(--labs-ink)]">
            {credential.areas.map((a) => AREA_LABEL[a] ?? a).join(" · ")}
          </span>
          {meta ? (
            <>
              <span aria-hidden className="mx-2 opacity-40">
                ·
              </span>
              {meta}
            </>
          ) : null}
        </p>
      </div>
    </button>
  );
}
