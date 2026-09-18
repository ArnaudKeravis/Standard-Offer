import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import {
  PEOPLE_ACCESS_COOKIE,
  expectedPeopleToken,
} from "./auth";

export async function hasPeopleAccess(): Promise<boolean> {
  const expected = expectedPeopleToken();
  const jar = await cookies();
  const token = jar.get(PEOPLE_ACCESS_COOKIE)?.value;
  if (!token) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
