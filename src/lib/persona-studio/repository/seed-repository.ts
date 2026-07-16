import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import {
  localizeJourney,
  localizePersona,
  localizeProject,
  localizeSource,
  type PersonaSource,
  type SourceDocumentSource,
} from "@/lib/persona-studio/data/localized";
import { langFromLanguage, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import type { PersonaRepository } from "./types";

/** Default display language for each project (its authored `language`). */
function projectDefaultLang(projectId: string | undefined): StudioLang {
  const project = SEED_DATA.projects.find((p) => p.id === projectId);
  return langFromLanguage(project?.language);
}

/**
 * Read-only, in-memory repository backed by the seed dataset.
 *
 * Content is authored bilingually; each read resolves entities to the requested
 * `lang` (falling back to each project's own default language) so downstream
 * code only ever sees plain strings.
 *
 * Writes (editor, workshop) and a Supabase implementation arrive in later
 * phases behind the same {@link PersonaRepository} interface.
 */
export class SeedRepository implements PersonaRepository {
  async getCurrentUser() {
    return SEED_DATA.user;
  }

  async listProjects(lang?: StudioLang) {
    return SEED_DATA.projects.map((p) =>
      localizeProject(p, lang ?? langFromLanguage(p.language)),
    );
  }

  async getProject(projectId: string, lang?: StudioLang) {
    const project = SEED_DATA.projects.find((p) => p.id === projectId);
    return project
      ? localizeProject(project, lang ?? langFromLanguage(project.language))
      : null;
  }

  async listPersonas(projectId: string, lang?: StudioLang) {
    const resolved = lang ?? projectDefaultLang(projectId);
    return SEED_DATA.personas
      .filter((p) => p.projectId === projectId)
      .map((p) => localizePersona(p, resolved));
  }

  async getPersona(personaId: string, lang?: StudioLang) {
    const persona = SEED_DATA.personas.find((p) => p.id === personaId);
    if (!persona) return null;
    return localizePersona(persona, lang ?? projectDefaultLang(persona.projectId));
  }

  async getPersonasByIds(personaIds: string[], lang?: StudioLang) {
    const set = new Set(personaIds);
    // Preserve the caller's requested order.
    return personaIds
      .map((id) => SEED_DATA.personas.find((p) => p.id === id))
      .filter((p): p is PersonaSource => Boolean(p) && set.has(p!.id))
      .map((p) => localizePersona(p, lang ?? projectDefaultLang(p.projectId)));
  }

  async listSources(projectId: string, lang?: StudioLang) {
    const resolved = lang ?? projectDefaultLang(projectId);
    return SEED_DATA.sources
      .filter((s) => s.projectId === projectId)
      .map((s) => localizeSource(s, resolved));
  }

  async getSource(sourceId: string, lang?: StudioLang) {
    const source = SEED_DATA.sources.find((s) => s.id === sourceId);
    if (!source) return null;
    return localizeSource(
      source as SourceDocumentSource,
      lang ?? projectDefaultLang(source.projectId),
    );
  }

  async listJourneys(projectId: string, lang?: StudioLang) {
    const resolved = lang ?? projectDefaultLang(projectId);
    return SEED_DATA.journeys
      .filter((j) => j.projectId === projectId)
      .map((j) => localizeJourney(j, resolved));
  }

  async listTemplates() {
    return SEED_DATA.templates;
  }

  async getTemplate(templateId: string) {
    return SEED_DATA.templates.find((t) => t.id === templateId) ?? null;
  }
}
