import type {
  Persona,
  PersonaTemplate,
  PersonaVersion,
} from "@/lib/persona-studio/ai/schemas/persona";
import type { Project } from "@/lib/persona-studio/ai/schemas/project";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import {
  localizeJourney,
  localizePersona,
  localizeProject,
  localizeSource,
  type JourneySource,
  type PersonaSource,
  type ProjectSource,
  type SourceDocumentSource,
} from "@/lib/persona-studio/data/localized";
import {
  collectStatements,
  computeEvidenceCoverage,
} from "@/lib/persona-studio/utils/confidence";
import { langFromLanguage, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import type {
  MutationContext,
  WritablePersonaRepository,
} from "./types";

/**
 * In-memory, writable repository for Phase 2.
 *
 * It deep-clones the seed dataset on construction so that:
 *  - reads behave exactly like the Phase 1 `SeedRepository`, and
 *  - writes never mutate the shared `SEED_DATA` (which the seed-integrity tests
 *    validate and which other server code reads).
 *
 * Content is authored bilingually (`*Source` types with `LocalizedText`) and
 * resolved to the requested `lang` on read. Because a plain `string` is a valid
 * `LocalizedText`, runtime objects created through the editor/wizard (plain
 * strings) are stored as-is and resolve identically in both languages.
 *
 * State lives for the lifetime of the server process. This is intentional and
 * documented: it makes the whole create/edit product real and navigable with
 * zero external services, and the same {@link WritablePersonaRepository}
 * contract is satisfied later by a Supabase + RLS implementation with no UI
 * change. It is not a production store — a process restart resets to seed.
 */
export class MemoryRepository implements WritablePersonaRepository {
  private user = clone(SEED_DATA.user);
  private projects: ProjectSource[] = clone(SEED_DATA.projects);
  private personas: PersonaSource[] = clone(SEED_DATA.personas);
  private sources: SourceDocumentSource[] = clone(SEED_DATA.sources);
  private journeys: JourneySource[] = clone(SEED_DATA.journeys);
  private templates: PersonaTemplate[] = clone(SEED_DATA.templates);
  private versions: PersonaVersion[] = [];

  private projectDefaultLang(projectId: string | undefined): StudioLang {
    const project = this.projects.find((p) => p.id === projectId);
    return langFromLanguage(project?.language);
  }

  // ---- Reads -------------------------------------------------------------

  async getCurrentUser() {
    return this.user;
  }

  async listProjects(lang?: StudioLang) {
    return this.projects.map((p) =>
      localizeProject(p, lang ?? langFromLanguage(p.language)),
    );
  }

  async getProject(projectId: string, lang?: StudioLang) {
    const project = this.projects.find((p) => p.id === projectId);
    return project
      ? localizeProject(project, lang ?? langFromLanguage(project.language))
      : null;
  }

  async listPersonas(projectId: string, lang?: StudioLang) {
    const resolved = lang ?? this.projectDefaultLang(projectId);
    return this.personas
      .filter((p) => p.projectId === projectId)
      .map((p) => localizePersona(p, resolved));
  }

  async getPersona(personaId: string, lang?: StudioLang) {
    const persona = this.personas.find((p) => p.id === personaId);
    if (!persona) return null;
    return localizePersona(persona, lang ?? this.projectDefaultLang(persona.projectId));
  }

  async getPersonasByIds(personaIds: string[], lang?: StudioLang) {
    const set = new Set(personaIds);
    return personaIds
      .map((id) => this.personas.find((p) => p.id === id))
      .filter((p): p is PersonaSource => Boolean(p) && set.has(p!.id))
      .map((p) => localizePersona(p, lang ?? this.projectDefaultLang(p.projectId)));
  }

  async listSources(projectId: string, lang?: StudioLang) {
    const resolved = lang ?? this.projectDefaultLang(projectId);
    return this.sources
      .filter((s) => s.projectId === projectId)
      .map((s) => localizeSource(s, resolved));
  }

  async getSource(sourceId: string, lang?: StudioLang) {
    const source = this.sources.find((s) => s.id === sourceId);
    if (!source) return null;
    return localizeSource(source, lang ?? this.projectDefaultLang(source.projectId));
  }

  async listJourneys(projectId: string, lang?: StudioLang) {
    const resolved = lang ?? this.projectDefaultLang(projectId);
    return this.journeys
      .filter((j) => j.projectId === projectId)
      .map((j) => localizeJourney(j, resolved));
  }

  async listTemplates() {
    return this.templates;
  }

  async getTemplate(templateId: string) {
    return this.templates.find((t) => t.id === templateId) ?? null;
  }

  // ---- Projects ----------------------------------------------------------

  async createProject(project: Project) {
    const stored = clone(project);
    this.projects = [stored, ...this.projects];
    return stored;
  }

  async updateProject(projectId: string, patch: Partial<Project>) {
    const idx = this.projects.findIndex((p) => p.id === projectId);
    if (idx === -1) throw new Error(`Project not found: ${projectId}`);
    const lang = langFromLanguage(this.projects[idx].language);
    const next: Project = {
      ...localizeProject(this.projects[idx], lang),
      ...clone(patch),
      id: projectId,
      updatedAt: nowIso(),
    };
    this.projects[idx] = next;
    return next;
  }

  // ---- Personas ----------------------------------------------------------

  async createPersona(persona: Persona) {
    const stored = withCoverage(clone(persona));
    this.personas = [...this.personas, stored];
    this.bumpPersonaCount(stored.projectId);
    return stored;
  }

  async updatePersona(
    personaId: string,
    next: Persona,
    ctx: MutationContext = {},
  ) {
    const idx = this.personas.findIndex((p) => p.id === personaId);
    if (idx === -1) throw new Error(`Persona not found: ${personaId}`);
    const current = this.personas[idx];
    const lang = this.projectDefaultLang(current.projectId);

    // Snapshot the current state (resolved to the project language) before
    // overwriting it.
    this.versions.push({
      id: `${personaId}-v${current.version}`,
      personaId,
      version: current.version,
      snapshot: localizePersona(clone(current), lang),
      createdAt: nowIso(),
      createdBy: ctx.createdBy,
      note: ctx.note,
    });

    const stored = withCoverage({
      ...clone(next),
      id: personaId,
      projectId: current.projectId,
      version: current.version + 1,
      createdAt: current.createdAt,
      updatedAt: nowIso(),
    });
    this.personas[idx] = stored;
    return stored;
  }

  async deletePersona(personaId: string) {
    const persona = this.personas.find((p) => p.id === personaId);
    if (!persona) return;
    this.personas = this.personas.filter((p) => p.id !== personaId);
    this.versions = this.versions.filter((v) => v.personaId !== personaId);
    this.bumpPersonaCount(persona.projectId);
  }

  async listPersonaVersions(personaId: string) {
    return this.versions
      .filter((v) => v.personaId === personaId)
      .sort((a, b) => b.version - a.version);
  }

  async getPersonaVersion(personaId: string, version: number) {
    return (
      this.versions.find(
        (v) => v.personaId === personaId && v.version === version,
      ) ?? null
    );
  }

  async restorePersonaVersion(
    personaId: string,
    version: number,
    ctx: MutationContext = {},
  ) {
    const target = await this.getPersonaVersion(personaId, version);
    if (!target) {
      throw new Error(`Version ${version} not found for persona ${personaId}`);
    }
    // Restoring is itself a mutation: snapshot current, then apply the old state.
    const restored: Persona = clone(target.snapshot);
    return this.updatePersona(personaId, restored, {
      note: ctx.note ?? `Restored from version ${version}`,
      createdBy: ctx.createdBy,
    });
  }

  // ---- Sources -----------------------------------------------------------

  async createSource(source: SourceDocument) {
    const stored = clone(source);
    this.sources = [...this.sources, stored];
    this.bumpSourceCount(stored.projectId);
    return stored;
  }

  async updateSource(sourceId: string, patch: Partial<SourceDocument>) {
    const idx = this.sources.findIndex((s) => s.id === sourceId);
    if (idx === -1) throw new Error(`Source not found: ${sourceId}`);
    const lang = this.projectDefaultLang(this.sources[idx].projectId);
    const next: SourceDocument = {
      ...localizeSource(this.sources[idx], lang),
      ...clone(patch),
      id: sourceId,
    };
    this.sources[idx] = next;
    return next;
  }

  async deleteSource(sourceId: string) {
    const source = this.sources.find((s) => s.id === sourceId);
    if (!source) return;
    this.sources = this.sources.filter((s) => s.id !== sourceId);
    this.bumpSourceCount(source.projectId);
  }

  // ---- Templates ---------------------------------------------------------

  async createTemplate(template: PersonaTemplate) {
    const stored = clone(template);
    this.templates = [...this.templates, stored];
    return stored;
  }

  // ---- Internals ---------------------------------------------------------

  private bumpPersonaCount(projectId: string) {
    const idx = this.projects.findIndex((p) => p.id === projectId);
    if (idx === -1) return;
    this.projects[idx] = {
      ...this.projects[idx],
      personaCount: this.personas.filter((p) => p.projectId === projectId)
        .length,
      updatedAt: nowIso(),
    };
  }

  private bumpSourceCount(projectId: string) {
    const idx = this.projects.findIndex((p) => p.id === projectId);
    if (idx === -1) return;
    this.projects[idx] = {
      ...this.projects[idx],
      sourceCount: this.sources.filter((s) => s.projectId === projectId).length,
      updatedAt: nowIso(),
    };
  }
}

/** Recompute honest evidence coverage from the persona's own statements. */
function withCoverage(persona: Persona): Persona {
  const statements = collectStatements([
    ...persona.commonSections,
    ...persona.domainSections,
  ]);
  return { ...persona, evidenceCoverage: computeEvidenceCoverage(statements) };
}

function nowIso(): string {
  return new Date().toISOString();
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
