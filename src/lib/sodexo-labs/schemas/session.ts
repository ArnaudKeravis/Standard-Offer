import { z } from "zod";

export const LabsLang = z.enum(["en", "fr"]);
export const LabsAudience = z.enum(["internal", "external"]);
export const LabsArea = z.enum(["work", "heal", "play", "learn"]);

export const LabsSessionConfig = z.object({
  lang: LabsLang,
  audience: LabsAudience,
  area: LabsArea,
});

export type LabsLang = z.infer<typeof LabsLang>;
export type LabsAudience = z.infer<typeof LabsAudience>;
export type LabsArea = z.infer<typeof LabsArea>;
export type LabsSessionConfig = z.infer<typeof LabsSessionConfig>;
