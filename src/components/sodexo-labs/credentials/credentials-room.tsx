"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CredentialCard } from "@/components/sodexo-labs/credentials/credential-card";
import { filterLabsCredentials } from "@/lib/sodexo-labs/filter-credentials";
import type {
  LabsArea,
  LabsAudience,
  LabsCredential,
} from "@/lib/sodexo-labs/schemas";

const AREAS: Array<LabsArea | "all"> = ["all", "work", "heal", "play", "learn"];

const AREA_LABEL: Record<LabsArea | "all", string> = {
  all: "All",
  work: "Work",
  heal: "Heal",
  play: "Play",
  learn: "Learn",
};

type CredentialsRoomProps = {
  credentials: LabsCredential[];
  defaultArea: LabsArea | "all";
  audience: LabsAudience | null;
};

export function CredentialsRoom({
  credentials,
  defaultArea,
  audience,
}: CredentialsRoomProps) {
  const searchId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<LabsArea | "all">(defaultArea);
  const [sector, setSector] = useState<string | "all">("all");
  const [region, setRegion] = useState<string | "all">("all");
  const [selected, setSelected] = useState<LabsCredential | null>(null);

  useEffect(() => {
    setArea(defaultArea);
  }, [defaultArea]);

  const sectors = useMemo(
    () =>
      [...new Set(credentials.flatMap((c) => c.sectors))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [credentials],
  );

  const regions = useMemo(
    () =>
      [...new Set(credentials.flatMap((c) => c.regions))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [credentials],
  );

  const filtered = useMemo(
    () =>
      filterLabsCredentials(credentials, {
        area,
        sector,
        region,
        query,
      }),
    [credentials, area, sector, region, query],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [selected]);

  function closeDetail() {
    setSelected(null);
  }

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-[4vw] border-b border-[color-mix(in_srgb,var(--labs-navy)_10%,transparent)] bg-[color-mix(in_srgb,var(--labs-paper)_92%,white)] px-[4vw] py-5 backdrop-blur-md">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-[16rem] flex-1">
              <label
                htmlFor={searchId}
                className="mb-2 block text-xs font-medium tracking-[0.14em] text-[var(--labs-muted)] uppercase"
              >
                Search
              </label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Client, challenge, outcome…"
                className="w-full max-w-xl rounded-xl border border-[color-mix(in_srgb,var(--labs-navy)_16%,transparent)] bg-white px-4 py-3 text-base text-[var(--labs-ink)] outline-none placeholder:text-[color-mix(in_srgb,var(--labs-muted)_70%,transparent)] focus-visible:border-[var(--labs-blue)] focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)]"
              />
            </div>
            <p className="pb-1 text-sm text-[var(--labs-muted)]" aria-live="polite">
              {filtered.length} of {credentials.length}
              {audience ? (
                <span className="ml-2 opacity-70">
                  · {audience === "internal" ? "Internal" : "External"}
                </span>
              ) : null}
            </p>
          </div>

          <FilterRow label="Territory">
            {AREAS.map((value) => (
              <Chip
                key={value}
                pressed={area === value}
                onClick={() => setArea(value)}
              >
                {AREA_LABEL[value]}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Sector">
            <Chip pressed={sector === "all"} onClick={() => setSector("all")}>
              All
            </Chip>
            {sectors.map((value) => (
              <Chip
                key={value}
                pressed={sector === value}
                onClick={() => setSector(value)}
              >
                {value}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Region">
            <Chip pressed={region === "all"} onClick={() => setRegion("all")}>
              All
            </Chip>
            {regions.map((value) => (
              <Chip
                key={value}
                pressed={region === value}
                onClick={() => setRegion(value)}
              >
                {value}
              </Chip>
            ))}
          </FilterRow>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 max-w-lg py-8">
          <h2 className="labs-display text-3xl text-[var(--labs-ink)]">
            No matching credentials
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--labs-muted)]">
            Try clearing a filter or broadening your search — the full set is
            still available under All.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {filtered.map((credential) => (
            <li key={credential.id}>
              <CredentialCard
                credential={credential}
                onOpen={setSelected}
              />
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className="labs-body m-auto w-[min(44rem,calc(100vw-2rem))] max-h-[min(90vh,52rem)] overflow-y-auto rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_14%,transparent)] bg-white p-0 text-[var(--labs-ink)] shadow-xl open:flex open:flex-col backdrop:bg-[color-mix(in_srgb,var(--labs-ink)_45%,transparent)]"
        onClose={closeDetail}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDetail();
        }}
        aria-labelledby={selected ? `credential-detail-${selected.id}` : undefined}
      >
        {selected ? (
          <div className="px-8 py-8 sm:px-10 sm:py-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium tracking-[0.12em] text-[var(--labs-blue)] uppercase">
                  {selected.client}
                </p>
                <h2
                  id={`credential-detail-${selected.id}`}
                  className="labs-display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-snug text-balance"
                >
                  {selected.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-[var(--labs-muted)] transition-colors hover:bg-[var(--labs-paper)] hover:text-[var(--labs-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)]"
              >
                Close
              </button>
            </div>

            <p className="mt-3 text-sm text-[var(--labs-muted)]">
              {selected.areas.map((a) => AREA_LABEL[a]).join(" · ")}
              {" · "}
              {selected.sectors.join(" · ")}
              {" · "}
              {selected.regions.join(" · ")}
              {selected.year ? ` · ${selected.year}` : null}
            </p>

            <DetailBlock title="Challenge">{selected.challenge}</DetailBlock>
            <DetailBlock title="Approach">{selected.approach}</DetailBlock>
            <DetailBlock title="Outcome">{selected.outcome}</DetailBlock>

            {selected.images.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {selected.images.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium tracking-[0.14em] text-[var(--labs-muted)] uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--labs-paper)] ${
        pressed
          ? "bg-[var(--labs-navy)] text-white"
          : "bg-[color-mix(in_srgb,white_70%,var(--labs-paper))] text-[var(--labs-ink)] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <section className="mt-8">
      <h3 className="text-xs font-medium tracking-[0.14em] text-[var(--labs-muted)] uppercase">
        {title}
      </h3>
      <p className="mt-2 text-lg leading-relaxed text-[var(--labs-ink)]">
        {children}
      </p>
    </section>
  );
}
