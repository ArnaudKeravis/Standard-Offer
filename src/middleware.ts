import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/routing";

const intlMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  // Root is the CoDesign sandbox hub (not locale-prefixed).
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|thales|studio|labs|hub|newsletters|api|.*\\..*).*)",
  ],
};
