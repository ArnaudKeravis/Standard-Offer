import { LabsArea, LabsAudience } from "./schemas/session";
import type { LabsArea as Area, LabsAudience as Audience } from "./schemas/session";

export type ParsedLabsSession = {
  audience: Audience | null;
  area: Area | null;
};

export function parseLabsSession(
  params: Record<string, string | string[] | undefined>,
): ParsedLabsSession {
  const rawAudience = Array.isArray(params.audience)
    ? params.audience[0]
    : params.audience;
  const rawArea = Array.isArray(params.area) ? params.area[0] : params.area;

  const audienceParsed = LabsAudience.safeParse(rawAudience);
  const areaParsed = LabsArea.safeParse(rawArea);

  return {
    audience: audienceParsed.success ? audienceParsed.data : null,
    area: areaParsed.success ? areaParsed.data : null,
  };
}
