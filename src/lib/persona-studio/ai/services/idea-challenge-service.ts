import { getRepository } from "@/lib/persona-studio/repository";
import type { IdeaChallengeResponse } from "@/lib/persona-studio/ai/schemas/challenge";
import type { IdeaChallengeRequest } from "@/lib/persona-studio/ai/schemas/challenge-request";
import { buildPersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import { defaultRetriever } from "@/lib/persona-studio/ai/retrieval/keyword-retriever";
import { getIdeaChallengeProvider } from "@/lib/persona-studio/ai/providers/idea-challenge-provider";
import { langFromLanguage, type StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Server-side orchestration for Idea Challenge. Never imported by clients.
 */
export class ChallengeNotFoundError extends Error {}

export interface RunIdeaChallengeResult {
  response: IdeaChallengeResponse;
  provider: string;
  isMock: boolean;
}

export async function runIdeaChallenge(
  args: IdeaChallengeRequest,
): Promise<RunIdeaChallengeResult> {
  const repo = getRepository();
  const projectMeta = await repo.getProject(args.projectId, args.lang);
  const lang: StudioLang =
    args.lang ?? langFromLanguage(projectMeta?.language);

  const project = await repo.getProject(args.projectId, lang);
  if (!project) {
    throw new ChallengeNotFoundError("Project not found.");
  }

  const personas = await repo.getPersonasByIds(args.personaIds, lang);
  const inProject = personas.filter((p) => p.projectId === project.id);
  if (inProject.length === 0) {
    throw new ChallengeNotFoundError("No personas found for this project.");
  }

  // Preserve request order.
  const ordered = args.personaIds
    .map((id) => inProject.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const projectSources = await repo.listSources(project.id, lang);
  const contexts = await Promise.all(
    ordered.map(async (persona) => {
      const referenced = new Set<string>(persona.sourceIds);
      for (const section of [
        ...persona.commonSections,
        ...persona.domainSections,
      ]) {
        for (const st of section.statements) {
          for (const id of st.sourceIds) referenced.add(id);
        }
      }
      const evidenceItems = await repo.listEvidenceItems(project.id, {
        sourceIds: [...referenced],
      });
      return buildPersonaGroundingContext(
        persona,
        projectSources,
        lang,
        evidenceItems,
      );
    }),
  );

  const provider = getIdeaChallengeProvider();
  const response = await provider.generate({
    idea: {
      title: args.ideaTitle,
      description: args.ideaDescription,
      journeyMoment: args.journeyMoment,
      intendedBenefit: args.intendedBenefit,
      operationalConstraints: args.operationalConstraints,
    },
    contexts,
    retriever: defaultRetriever,
    lang,
  });

  return { response, provider: provider.id, isMock: provider.isMock };
}
