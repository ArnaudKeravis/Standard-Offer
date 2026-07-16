"use client";

import { useState, useTransition } from "react";
import { unlockStudioAction } from "@/app/studio/unlock/actions";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import {
  Button,
  Field,
  TextInput,
} from "@/components/persona-studio/shared/form-controls";

export function UnlockForm({
  next,
  lang = "en",
}: {
  next: string;
  lang?: StudioLang;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await unlockStudioAction(formData);
          if (result?.error) setError(result.error);
        });
      }}
    >
      <input type="hidden" name="next" value={next} />
      <Field label={tUI(lang, "accessCode")} required>
        {({ id }) => (
          <TextInput
            id={id}
            name="secret"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
        )}
      </Field>
      {error ? (
        <p className="text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? tUI(lang, "unlocking") : tUI(lang, "unlock")}
      </Button>
    </form>
  );
}
