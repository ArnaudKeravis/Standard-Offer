import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import type { PersonaRepository } from "./types";

/**
 * Read-only, in-memory repository backed by the seed dataset.
 *
 * This makes the entire Phase 1 product real and navigable with zero external
 * services. Writes (editor, workshop) and a Supabase implementation arrive in
 * later phases behind the same {@link PersonaRepository} interface.
 */
export class SeedRepository implements PersonaRepository {
  async getCurrentUser() {
    return SEED_DATA.user;
  }

  async listProjects() {
    return SEED_DATA.projects;
  }

  async getProject(projectId: string) {
    return SEED_DATA.projects.find((p) => p.id === projectId) ?? null;
  }

  async listPersonas(projectId: string) {
    return SEED_DATA.personas.filter((p) => p.projectId === projectId);
  }

  async getPersona(personaId: string) {
    return SEED_DATA.personas.find((p) => p.id === personaId) ?? null;
  }

  async getPersonasByIds(personaIds: string[]) {
    const set = new Set(personaIds);
    // Preserve the caller's requested order.
    return personaIds
      .map((id) => SEED_DATA.personas.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p) && set.has(p!.id));
  }

  async listSources(projectId: string) {
    return SEED_DATA.sources.filter((s) => s.projectId === projectId);
  }

  async getSource(sourceId: string) {
    return SEED_DATA.sources.find((s) => s.id === sourceId) ?? null;
  }

  async listJourneys(projectId: string) {
    return SEED_DATA.journeys.filter((j) => j.projectId === projectId);
  }

  async listTemplates() {
    return SEED_DATA.templates;
  }

  async getTemplate(templateId: string) {
    return SEED_DATA.templates.find((t) => t.id === templateId) ?? null;
  }
}
