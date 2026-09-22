export const SANDBOX_ACCESS_COOKIE = "sandbox-access";
const TOKEN_PAYLOAD = "sandbox-v1";

/**
 * SHA-256 of the shared door code. Used only when SANDBOX_ACCESS_SECRET is
 * unset so Vercel can ship without a dashboard secret. Override with the env
 * var when you want to rotate.
 */
const FALLBACK_DIGEST =
  "5dd95be675f359330c44005cdaa820919688946d7e4327bc5bda06b13bd52004";

const SKIP_INTL = [
  "/thales",
  "/studio",
  "/labs",
  "/hub",
  "/newsletters",
  "/people",
  "/workshops",
  "/api",
  "/enter",
] as const;

function sandboxSecret(): string | null {
  const secret = process.env.SANDBOX_ACCESS_SECRET?.trim();
  return secret ? secret : null;
}

export function isSandboxDevOpen(): boolean {
  return !sandboxSecret() && process.env.NODE_ENV !== "production";
}

export function isSandboxPublicPath(pathname: string): boolean {
  return (
    pathname === "/enter" ||
    pathname.startsWith("/enter/") ||
    pathname === "/robots.txt"
  );
}

export function shouldRunIntl(pathname: string): boolean {
  if (pathname === "/") return false;
  if (SKIP_INTL.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return false;
  }
  if (pathname.includes(".")) return false;
  return true;
}

export function safeSandboxNext(next: string | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  if (next === "/enter" || next.startsWith("/enter/") || next.startsWith("/enter?")) {
    return "/";
  }
  return next;
}

function equal(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

function hex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  return hex(await crypto.subtle.digest("SHA-256", data));
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return hex(signature);
}

function tokenKey(): string {
  return sandboxSecret() ?? FALLBACK_DIGEST;
}

export async function expectedSandboxToken(): Promise<string> {
  return hmacHex(tokenKey(), TOKEN_PAYLOAD);
}

export async function verifySandboxSecret(candidate: string): Promise<boolean> {
  const secret = sandboxSecret();
  if (secret) return equal(candidate, secret);
  const digest = await sha256Hex(candidate);
  return equal(digest, FALLBACK_DIGEST);
}

export async function hasSandboxCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const expected = await expectedSandboxToken();
  return equal(value, expected);
}
