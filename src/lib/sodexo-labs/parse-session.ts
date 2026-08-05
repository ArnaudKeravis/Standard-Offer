import { LabsArea, LabsAudience, LabsLang } from "./schemas/session";
import type {
  LabsArea as Area,
  LabsAudience as Audience,
  LabsLang as Lang,
} from "./schemas/session";

export type ParsedLabsSession = {
  lang: Lang | null;
  audience: Audience | null;
  area: Area | null;
};

function first(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseLabsSession(
  params: Record<string, string | string[] | undefined>,
): ParsedLabsSession {
  const langParsed = LabsLang.safeParse(first(params.lang));
  const audienceParsed = LabsAudience.safeParse(first(params.audience));
  const areaParsed = LabsArea.safeParse(first(params.area));

  const audience = audienceParsed.success ? audienceParsed.data : null;
  const area = areaParsed.success ? areaParsed.data : null;

  // Back-compat: deep links with audience+area but no lang default to EN.
  let lang: Lang | null = langParsed.success ? langParsed.data : null;
  if (!lang && audience && area) lang = "en";

  return { lang, audience, area };
}

export function labsSessionQuery(parts: {
  lang?: Lang | null;
  audience?: Audience | null;
  area?: Area | null;
}): string {
  const qs = new URLSearchParams();
  if (parts.lang) qs.set("lang", parts.lang);
  if (parts.audience) qs.set("audience", parts.audience);
  if (parts.area) qs.set("area", parts.area);
  const s = qs.toString();
  return s ? `?${s}` : "";
}
