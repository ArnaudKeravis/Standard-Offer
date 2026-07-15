import type { Persona, PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
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
