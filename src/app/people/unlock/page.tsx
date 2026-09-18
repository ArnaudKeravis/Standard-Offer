import Link from "next/link";
import { hasPeopleAccess } from "@/lib/people-board/access";
import { PeopleUnlockForm } from "@/components/people-board/unlock-form";

export const metadata = {
  title: "Unlock · FY27 people",
};

export default async function PeopleUnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath =
    next && next.startsWith("/people") && !next.startsWith("/people/unlock")
      ? next
      : "/people";
  const unlocked = await hasPeopleAccess();

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-lg flex-col justify-center px-6 py-16">
      <Link
        href="/"
        className="mb-8 text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)] hover:text-[var(--spark-ink)]"
      >
        ← Hub
      </Link>
      <p className="text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
        FY27 · PMO
      </p>
      <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[-0.03em] text-[var(--spark-ink)]">
        People coverage
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
        Shared access for you, your n-1 and finance PMO. Costs stay behind this
        gate.
      </p>
      {unlocked ? (
        <p className="mt-8 rounded-2xl border border-[var(--spark-line)] bg-white p-4 text-sm text-[var(--spark-ink)]">
          Already unlocked on this device.
        </p>
      ) : (
        <div className="mt-8">
          <PeopleUnlockForm next={nextPath} />
        </div>
      )}
      {unlocked ? (
        <p className="mt-6">
          <Link
            href={nextPath}
            className="text-sm font-semibold text-[var(--spark-ink)] underline-offset-4 hover:underline"
          >
            Open the board
          </Link>
        </p>
      ) : null}
    </main>
  );
}
