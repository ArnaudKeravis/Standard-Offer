import Link from "next/link";
import { LayoutTemplate, Plus } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import {
  AreasExplorer,
  type AreaCard,
  type StudioAreaId,
} from "@/components/persona-studio/areas/areas-explorer";

const AREA_ORDER: StudioAreaId[] = ["WORK", "HEAL", "LEARN", "PLAY"];

const AREA_META: Record<
  StudioAreaId,
  { projectId: string; description: Record<StudioLang, string> }
> = {
  WORK: {
    projectId: "proj-xp-work",
    description: {
      en: "Sodexo makes every workday more inspiring and fulfilling, with spaces & services that support well-being, connection and productivity.",
      fr: "Sodexo rend chaque journée de travail plus inspirante et épanouissante, avec des espaces et services qui soutiennent le bien-être, le lien et la productivité.",
    },
  },
  HEAL: {
    projectId: "proj-xp-heal",
    description: {
      en: "Sodexo cares for every moment of life, ensuring comfort, nutrition and safety for patients, residents and caregivers alike.",
      fr: "Sodexo prend soin de chaque moment de vie, en assurant confort, nutrition et sécurité pour les patients, résidents et soignants.",
    },
  },
  LEARN: {
    projectId: "proj-xp-learn",
    description: {
      en: "Sodexo helps students thrive by creating healthy, welcoming and motivating places to learn, grow and connect.",
      fr: "Sodexo aide les élèves et étudiants à s'épanouir en créant des lieux sains, accueillants et motivants pour apprendre, grandir et se connecter.",
    },
  },
  PLAY: {
    projectId: "proj-xp-play",
    description: {
      en: "Sodexo Live! transforms every event into an unforgettable experience, where great food, hospitality and emotion come together.",
      fr: "Sodexo Live! transforme chaque événement en expérience inoubliable, où gastronomie, hospitalité et émotion se rejoignent.",
    },
  },
};

export default async function StudioLibraryPage() {
  const repo = getRepository();
  const lang = (await getLangPreference()) ?? "en";
  const projects = await repo.listProjects(lang);

  const areas: AreaCard[] = AREA_ORDER.map((id) => {
    const meta = AREA_META[id];
    const project = projects.find((p) => p.id === meta.projectId);
    return {
      id,
      projectId: meta.projectId,
      href: `/studio/projects/${meta.projectId}`,
      label: id,
      description: meta.description[lang],
      personaCount: project?.personaCount ?? 0,
    };
  });

  return (
    <>
      <StudioNav
        lang={lang}
        actions={
          <>
            <Link
              href="/studio/templates"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <LayoutTemplate aria-hidden className="size-4" />
              {tUI(lang, "templates")}
            </Link>
            <Link
              href="/studio/projects/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Plus aria-hidden className="size-4" />
              {tUI(lang, "newProject")}
            </Link>
          </>
        }
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
          Persona Studio
        </p>

        <AreasExplorer lang={lang} areas={areas} />
      </main>
    </>
  );
}
