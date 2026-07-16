import type {
  Persona,
  PersonaTemplate,
  PersonaVersion,
} from "@/lib/persona-studio/ai/schemas/persona";
import type { Project, User } from "@/lib/persona-studio/ai/schemas/project";
import type {
  EvidenceItem,
  SourceDocument,
} from "@/lib/persona-studio/ai/schemas/evidence";
import type { Journey } from "@/lib/persona-studio/ai/schemas/workshop";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * The data-access contract for Persona Studio. Server components and route
 * handlers depend on this interface, never on a concrete store. Phase 1 ships a
 * read-only seed implementation; later phases swap in a Supabase-backed
 * implementation (with RLS) without touching any UI.
 *
 * Content is authored bilingually (see `data/localized.ts`). Every read method
 * takes an optional `lang`; the returned domain objects are already resolved to
 * that language (plain strings), so downstream utils and components stay
 * language-agnostic. When `lang` is omitted, each entity resolves to its own
 * project's default language.
 *
 * Client components must never import an implementation of this interface.
 */
export interface PersonaRepository {
  getCurrentUser(): Promise<User>;

  listProjects(lang?: StudioLang): Promise<Project[]>;
  getProject(projectId: string, lang?: StudioLang): Promise<Project | null>;

  listPersonas(projectId: string, lang?: StudioLang): Promise<Persona[]>;
  getPersona(personaId: string, lang?: StudioLang): Promise<Persona | null>;
  getPersonasByIds(personaIds: string[], lang?: StudioLang): Promise<Persona[]>;

  listSources(projectId: string, lang?: StudioLang): Promise<SourceDocument[]>;
  getSource(sourceId: string, lang?: StudioLang): Promise<SourceDocument | null>;

  /** Retrievable evidence chunks derived from sources (Phase 5 grounding). */
  listEvidenceItems(
    projectId: string,
    opts?: { sourceIds?: string[] },
  ): Promise<EvidenceItem[]>;

  listJourneys(projectId: string, lang?: StudioLang): Promise<Journey[]>;

  listTemplates(): Promise<PersonaTemplate[]>;
  getTemplate(templateId: string): Promise<PersonaTemplate | null>;
}

/**
 * Metadata attached to a mutation that creates a persona version snapshot.
 */
export interface MutationContext {
  note?: string;
  createdBy?: string;
}

/**
 * The Phase 2 write contract. It extends the read-only {@link PersonaRepository}
 * so existing server components keep working unchanged, while the wizard, the
 * editor, source management and version history mutate through these methods.
 *
 * There is no database yet (Supabase is Phase 5): the concrete implementation
 * is an in-memory store seeded from the seed dataset. Because everything is
 * behind this interface, the Supabase-backed implementation can be swapped in
 * without touching any route, action or component.
 *
 * Client components must never import an implementation of this interface — all
 * writes go through server actions.
 */
export interface WritablePersonaRepository extends PersonaRepository {
  createProject(project: Project): Promise<Project>;
  updateProject(projectId: string, patch: Partial<Project>): Promise<Project>;

  createPersona(persona: Persona): Promise<Persona>;
  /**
   * Replace a persona with a new full state. The previous state is snapshotted
   * into version history and the persona's version counter is incremented.
   */
  updatePersona(
    personaId: string,
    next: Persona,
    ctx?: MutationContext,
  ): Promise<Persona>;
  deletePersona(personaId: string): Promise<void>;

  listPersonaVersions(personaId: string): Promise<PersonaVersion[]>;
  getPersonaVersion(
    personaId: string,
    version: number,
  ): Promise<PersonaVersion | null>;
  /** Snapshot the current state, then restore the persona to an earlier version. */
  restorePersonaVersion(
    personaId: string,
    version: number,
    ctx?: MutationContext,
  ): Promise<Persona>;

  createSource(source: SourceDocument): Promise<SourceDocument>;
  updateSource(
    sourceId: string,
    patch: Partial<SourceDocument>,
  ): Promise<SourceDocument>;
  deleteSource(sourceId: string): Promise<void>;

  /** Replace all evidence chunks for a source (used after ingest / re-chunk). */
  replaceEvidenceItemsForSource(
    sourceId: string,
    items: EvidenceItem[],
  ): Promise<EvidenceItem[]>;

  createTemplate(template: PersonaTemplate): Promise<PersonaTemplate>;
}
