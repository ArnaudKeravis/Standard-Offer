import Link from "next/link";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tUI } from "@/lib/persona-studio/utils/i18n";
import {
  canWriteStudio,
  isWriteGateEnabled,
} from "@/lib/persona-studio/auth/access";
import { UnlockForm } from "@/components/persona-studio/auth/unlock-form";

export const metadata = {
  title: "Unlock — Persona Studio",
};

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const lang = (await getLangPreference()) ?? "en";
  const gated = isWriteGateEnabled();
  const unlocked = await canWriteStudio();
  const nextPath =
    next && next.startsWith("/studio") ? next : "/studio";

  return (
    <>
      <StudioNav lang={lang} crumbs={[{ label: tUI(lang, "unlockTitle") }]} />
      <main className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <h1 className="studio-display text-3xl font-bold text-[var(--studio-ink)]">
          {tUI(lang, "unlockTitle")}
        </h1>
        <p className="mt-3 text-[var(--studio-muted)]">
          {gated
            ? tUI(lang, "unlockIntro")
            : tUI(lang, "unlockDisabled")}
        </p>

        {gated && !unlocked ? (
          <div className="mt-8">
            <UnlockForm next={nextPath} lang={lang} />
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-4 text-sm text-[var(--studio-ink)]">
            {unlocked
              ? tUI(lang, "unlockAlready")
              : tUI(lang, "unlockDisabled")}
          </p>
        )}

        <p className="mt-6">
          <Link
            href={nextPath}
            className="text-sm font-medium text-[var(--studio-accent)] hover:underline"
          >
            {tUI(lang, "back")}
          </Link>
        </p>
      </main>
    </>
  );
}
