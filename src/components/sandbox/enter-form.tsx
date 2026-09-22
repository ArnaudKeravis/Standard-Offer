"use client";

import { useState, useTransition } from "react";
import { unlockSandboxAction } from "@/app/(sandbox)/enter/actions";

export function SandboxEnterForm({ next }: { next: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await unlockSandboxAction(formData);
          if (result?.error) setError(result.error);
        });
      }}
    >
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--spark-ink)]">
          Access code
        </span>
        <input
          name="secret"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-[var(--spark-line)] bg-white px-4 py-3 text-[var(--spark-ink)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2"
        />
      </label>
      {error ? (
        <p className="text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--spark-ink)] px-5 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-px active:translate-y-px disabled:opacity-60"
      >
        {pending ? "Unlocking…" : "Enter"}
      </button>
    </form>
  );
}
