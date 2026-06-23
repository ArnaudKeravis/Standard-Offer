import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/routing";

/** Legacy shortcut — canonical route is /[locale]/demos/thales */
export default function ThalesRedirectPage() {
  redirect(`/${defaultLocale}/demos/thales`);
}
