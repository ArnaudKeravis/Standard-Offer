import { cookies } from "next/headers";
import Link from "next/link";

import { SandboxEnterForm } from "@/components/sandbox/enter-form";
import {
  SANDBOX_ACCESS_COOKIE,
  hasSandboxCookie,
  safeSandboxNext,
} from "@/lib/sandbox/auth";

export const metadata = {
  title: "Enter · CoDesign sandbox",
  robots: { index: false, follow: false },
};

export default async function EnterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = safeSandboxNext(next);
  const jar = await cookies();
  const unlocked = await hasSandboxCookie(jar.get(SANDBOX_ACCESS_COOKIE)?.value);

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
        SODEXO · CODESIGN
      </p>
      <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[-0.03em] text-[var(--spark-ink)]">
        Internal sandbox
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
        Workshops, Labs, Studio and the rest of this site are for CoDesign
        teams. Enter the shared access code to continue.
      </p>
      {unlocked ? (
        <p className="mt-8 rounded-2xl border border-[var(--spark-line)] bg-white p-4 text-sm text-[var(--spark-ink)]">
          Already unlocked on this device.
        </p>
      ) : (
        <div className="mt-8">
          <SandboxEnterForm next={nextPath} />
        </div>
      )}
      {unlocked ? (
        <p className="mt-6">
          <Link
            href={nextPath}
            className="text-sm font-semibold text-[var(--spark-ink)] underline-offset-4 hover:underline"
          >
            Continue
          </Link>
        </p>
      ) : null}
    </main>
  );
}
