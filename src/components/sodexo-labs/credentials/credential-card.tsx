"use client";

import Image from "next/image";
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
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--labs-line)] bg-white text-left shadow-[0_14px_36px_rgba(30,47,154,0.06)] outline-none transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--labs-blue)] hover:shadow-[0_22px_48px_rgba(30,47,154,0.1)] focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--labs-navy)]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--labs-blue) 55%, transparent), transparent 55%), linear-gradient(145deg, #0B1020, #1E2F9A)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,16,32,0.55)] to-transparent" />
        <p className="absolute bottom-3 left-4 text-xs font-semibold tracking-[0.14em] text-white/90 uppercase">
          {credential.client}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <h2 className="labs-display text-[clamp(1.25rem,2vw,1.55rem)] leading-snug text-[var(--labs-ink)] text-balance">
          {credential.title}
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--labs-muted)]">
          {credential.challenge}
        </p>
        <p className="mt-5 text-xs text-[var(--labs-muted)]">
          <span className="font-medium text-[var(--labs-ink)]">
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
