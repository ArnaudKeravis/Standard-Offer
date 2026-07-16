"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAiService } from "@/lib/persona-studio/ai/services";
import { getWritableRepository } from "@/lib/persona-studio/repository";
import { requireWriteAccess } from "@/lib/persona-studio/auth/access";
import {
  BehaviouralCluster,
  ClusterSet,
  SourceAnalysisResult,
} from "@/lib/persona-studio/ai/schemas/analysis";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { Project, ProjectVisibility } from "@/lib/persona-studio/ai/schemas/project";
import { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import {
  PersonaFamily,
  ResearchMode,
} from "@/lib/persona-studio/ai/schemas/common";
import { newId } from "@/lib/persona-studio/utils/persona-factory";

/**
 * Server actions for the create-project wizard.
 *
 * All AI steps go through the mocked {@link getAiService} (server-side only, so
 * a real key never reaches the browser). Persistence goes through the writable
 * repository. Everything is Zod-validated at the boundary.
 */

const ProjectContext = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  language: z.string().min(1),
  family: PersonaFamily,
});

const AnalyseInput = z.object({
  project: ProjectContext,
  sources: z.array(SourceDocument),
  desiredClusterCount: z.number().int().positive().optional(),
});

export async function analyseAndClusterAction(
  raw: z.input<typeof AnalyseInput>,
): Promise<{ analysis: SourceAnalysisResult; clusters: ClusterSet }> {
  const input = AnalyseInput.parse(raw);
  const ai = getAiService();
  const analysis = await ai.analyseResearchSources({
    project: {
      id: input.project.id,
      name: input.project.name,
      language: input.project.language,
      family: input.project.family,
    },
    sources: input.sources,
  });
  const clusters = await ai.generateBehaviouralClusters({
    analysis,
    desiredClusterCount: input.desiredClusterCount,
  });
  return { analysis, clusters };
}

const GenerateInput = z.object({
  clusters: z.array(BehaviouralCluster),
  project: z.object({
    id: z.string().min(1),
    family: PersonaFamily,
    language: z.string().min(1),
  }),
  templateId: z.string().min(1),
});

export async function generatePersonasAction(
  raw: z.input<typeof GenerateInput>,
): Promise<Persona[]> {
  const input = GenerateInput.parse(raw);
  const ai = getAiService();
  const repo = getWritableRepository();
  const template = await repo.getTemplate(input.templateId);
  if (!template) throw new Error(`Template not found: ${input.templateId}`);

  const personas: Persona[] = [];
  for (const cluster of input.clusters) {
    personas.push(
      await ai.generatePersonaFromCluster({
        cluster,
        project: input.project,
        template,
      }),
    );
  }
  return personas;
}

const CreateProjectInput = z.object({
  ownerId: z.string().min(1),
  project: z.object({
    name: z.string().min(1),
    client: z.string().min(1),
    family: PersonaFamily,
    segment: z.string().min(1),
    region: z.string().min(1),
    language: z.string().min(1),
    researchMode: ResearchMode,
    description: z.string().default(""),
    workshopObjective: z.string().optional(),
    audience: z.array(z.string()).default([]),
    desiredPersonaCount: z.number().int().positive().optional(),
    templateId: z.string().min(1),
    visibility: ProjectVisibility.optional(),
    shareNote: z.string().optional(),
  }),
  sources: z.array(SourceDocument),
  personas: z.array(Persona),
});

export async function createProjectAction(
  raw: z.input<typeof CreateProjectInput>,
): Promise<{ projectId: string }> {
  await requireWriteAccess();
  const input = CreateProjectInput.parse(raw);
  const repo = getWritableRepository();
  const now = new Date().toISOString();
  const projectId = newId("proj");

  const project = Project.parse({
    ...input.project,
    id: projectId,
    ownerId: input.ownerId,
    status: "PUBLISHED",
    personaCount: 0,
    sourceCount: 0,
    workshopCount: 0,
    createdAt: now,
    updatedAt: now,
  });
  await repo.createProject(project);

  for (const src of input.sources) {
    await repo.createSource(
      SourceDocument.parse({ ...src, projectId, processingStatus: "READY" }),
    );
  }

  for (const persona of input.personas) {
    await repo.createPersona(
      Persona.parse({
        ...persona,
        projectId,
        createdAt: now,
        updatedAt: now,
      }),
    );
  }

  revalidatePath("/studio");
  revalidatePath(`/studio/projects/${projectId}`);
  return { projectId };
}
