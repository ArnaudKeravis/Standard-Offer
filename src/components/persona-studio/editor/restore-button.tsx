"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { Button } from "@/components/persona-studio/shared/form-controls";
import { restoreVersionAction } from "@/app/studio/projects/[projectId]/personas/actions";

/**
 * Client control that restores a persona to an earlier version. The server
 * action snapshots the current state before restoring, so restoring is itself
 * reversible.
 */
export function RestoreButton({
  projectId,
  personaId,
  version,
  lang = "en",
}: {
  projectId: string;
  personaId: string;
  version: number;
  lang?: StudioLang;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function restore() {
    if (!window.confirm(tUI(lang, "restoreConfirm"))) return;
    setError(null);
    startTransition(async () => {
      try {
        await restoreVersionAction(projectId, personaId, version);
        router.push(`/studio/projects/${projectId}/personas/${personaId}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Restore failed");
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="secondary" onClick={restore} disabled={pending}>
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <RotateCcw className="size-4" />
        )}
        {tUI(lang, "restore")}
      </Button>
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </div>
  );
}
