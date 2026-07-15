import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/i18n/routing";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!_next|thales|studio|api|.*\\..*).*)"],
};

