import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tUI } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaMethodContent } from "@/components/persona-studio/method/persona-method-content";

export default async function PersonaMethodPage() {
  const lang = (await getLangPreference()) ?? "en";

  return (
    <>
      <StudioNav
        lang={lang}
        crumbs={[
          { label: tUI(lang, "areasCrumb"), href: "/studio" },
          { label: tUI(lang, "methodNav") },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
        <PersonaMethodContent lang={lang} />
      </main>
    </>
  );
}
