import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// Tool-owner sessions: a signed, HTTP-only cookie holding the verified email.
// Separate from the admin (NextAuth) session on purpose.
const COOKIE = "abv_member";
const MAX_AGE_S = 30 * 24 * 60 * 60;

function secret() {
  const s = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (!s) throw new Error("NEXTAUTH_SECRET is not set");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function encode(email: string, expiresAt: number) {
  const payload = Buffer.from(JSON.stringify({ e: email, x: expiresAt })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(token: string): string | null {
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof e === "string" && typeof x === "number" && x > Date.now() ? e : null;
  } catch {
    return null;
  }
}

/** Starts a session for a verified email and records the member. Call from a Server Action or Route Handler. */
export async function startMemberSession(email: string) {
  await prisma.member.upsert({
    where: { email },
    create: { email },
    update: { lastSignInAt: new Date() },
  });
  const store = await cookies();
  store.set(COOKIE, encode(email, Date.now() + MAX_AGE_S * 1000), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S,
  });
}

export async function endMemberSession() {
  (await cookies()).delete(COOKIE);
}

/** The signed-in member's email, or null. */
export async function currentMember(): Promise<string | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? decode(token) : null;
}

/** Tools the email actively owns, as { toolId, slug }. */
export async function ownedTools(email: string) {
  const rows = await prisma.toolOwner.findMany({
    where: { email, status: "ACTIVE" },
    select: { tool: { select: { id: true, slug: true } } },
  });
  return rows.map((r) => r.tool);
}
