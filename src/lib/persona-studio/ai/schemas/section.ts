import { z } from "zod";
import { Id, SectionKey, SectionType } from "./common";
import { PersonaStatement } from "./statement";

/**
 * A configurable block of persona content. Both persona families (Corporate and
 * Sports Hospitality) are expressed purely through the set of sections they
 * carry — there is no forked layout. `type` drives how the section renders;
 * `key` is the stable machine identifier; `title` is the human label.
 */
export const PersonaSection = z.object({
  id: Id,
  key: SectionKey,
  title: z.string().min(1),
  type: SectionType,
  statements: z.array(PersonaStatement).default([]),
  order: z.number().int().nonnegative(),
  visible: z.boolean().default(true),
  /** Optional short helper text shown under the section title. */
  description: z.string().optional(),
});
export type PersonaSection = z.infer<typeof PersonaSection>;

/**
 * A reusable section definition used by templates. It describes the shape of a
 * section without content, so new personas can be scaffolded consistently.
 */
export const PersonaSectionTemplate = z.object({
  key: SectionKey,
  title: z.string().min(1),
  type: SectionType,
  order: z.number().int().nonnegative(),
  visible: z.boolean().default(true),
  description: z.string().optional(),
  /** Whether this section belongs to the common core or a domain add-on. */
  scope: z.enum(["COMMON", "DOMAIN"]),
});
export type PersonaSectionTemplate = z.infer<typeof PersonaSectionTemplate>;
