import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/routing";
import {
  SANDBOX_ACCESS_COOKIE,
  hasSandboxCookie,
  isSandboxDevOpen,
  isSandboxPublicPath,
  shouldRunIntl,
} from "@/lib/sandbox/auth";

const intlMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

async function sandboxGate(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  if (isSandboxPublicPath(pathname) || isSandboxDevOpen()) {
    return null;
  }

  const token = request.cookies.get(SANDBOX_ACCESS_COOKIE)?.value;
  if (await hasSandboxCookie(token)) {
    return null;
  }

  const enter = request.nextUrl.clone();
  enter.pathname = "/enter";
  enter.search = `?next=${encodeURIComponent(`${pathname}${request.nextUrl.search}`)}`;
  return withNoIndex(NextResponse.redirect(enter));
}

export default async function middleware(request: NextRequest) {
  const blocked = await sandboxGate(request);
  if (blocked) return blocked;

  if (request.nextUrl.pathname === "/" || !shouldRunIntl(request.nextUrl.pathname)) {
    return withNoIndex(NextResponse.next());
  }

  const intlResponse = intlMiddleware(request);
  return withNoIndex(intlResponse);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data).*)"],
};
