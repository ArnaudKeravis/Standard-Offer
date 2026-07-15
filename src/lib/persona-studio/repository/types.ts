import type {
  Persona,
  PersonaTemplate,
  PersonaVersion,
} from "@/lib/persona-studio/ai/schemas/persona";
import type { Project, User } from "@/lib/persona-studio/ai/schemas/project";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type { Journey } from "@/lib/persona-studio/ai/schemas/workshop";

/**
 * The data-access contract for Persona Studio. Server components and route
 * handlers depend on this interface, never on a concrete store. Phase 1 ships a
 * read-only seed implementation; later phases swap in a Supabase-backed
 * implementation (with RLS) without touching any UI.
 *
 * Client components must never import an implementation of this interface.
 */
export interface PersonaRepository {
  getCurrentUser(): Promise<User>;

  listProjects(): Promise<Project[]>;
  getProject(projectId: string): Promise<Project | null>;

  listPersonas(projectId: string): Promise<Persona[]>;
  getPersona(personaId: string): Promise<Persona | null>;
  getPersonasByIds(personaIds: string[]): Promise<Persona[]>;

  listSources(projectId: string): Promise<SourceDocument[]>;
  getSource(sourceId: string): Promise<SourceDocument | null>;

  listJourneys(projectId: string): Promise<Journey[]>;

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

  createTemplate(template: PersonaTemplate): Promise<PersonaTemplate>;
}
