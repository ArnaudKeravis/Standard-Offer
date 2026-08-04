import { z } from "zod";
import { LabsArea } from "./session";

export const LabsCredential = z.object({
  id: z.string(),
  client: z.string(),
  title: z.string(),
  areas: z.array(LabsArea).min(1),
  sectors: z.array(z.string()).min(1),
  regions: z.array(z.string()).min(1),
  audienceHint: z.enum(["internal", "external", "both"]),
  challenge: z.string(),
  approach: z.string(),
  outcome: z.string(),
  year: z.string().optional(),
  images: z.array(z.object({ src: z.string(), alt: z.string() })),
});

export type LabsCredential = z.infer<typeof LabsCredential>;
