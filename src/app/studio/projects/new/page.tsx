import type { Metadata } from "next";
import { getRepository } from "@/lib/persona-studio/repository";
import { getSessionUser } from "@/lib/persona-studio/auth/mock-auth";
import { redirectUnlessCanWrite } from "@/lib/persona-studio/auth/require-write-page";
import { tUI } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { CreateProjectWizard } from "@/components/persona-studio/create/create-project-wizard";

export const metadata: Metadata = {
  title: "New project — Persona Studio",
};

export default async function NewProjectPage() {
  await redirectUnlessCanWrite("/studio/projects/new");
  const repo = getRepository();
  const [templates, user] = await Promise.all([
    repo.listTemplates(),
    getSessionUser(),
  ]);
  const lang = (await getLangPreference()) ?? "en";

  return (
    <>
      <StudioNav lang={lang} crumbs={[{ label: tUI(lang, "newProject") }]} />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
        <CreateProjectWizard templates={templates} ownerId={user.id} />
      </main>
    </>
  );
}
