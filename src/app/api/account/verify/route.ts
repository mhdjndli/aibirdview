import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { confirmVerificationCode, normalizeEmail } from "@/lib/email-verification";
import { startMemberSession } from "@/lib/owner-session";
import { checkClaim } from "@/lib/claim-domain";
import { sendEmail, ADMIN_NOTIFY_EMAIL } from "@/lib/email";
import { adminClaimEmail } from "@/lib/emails/submission-emails";

const schema = z.object({
  email: z.string().trim().email().max(160),
  code: z.string().trim().min(4).max(8),
  slug: z.string().max(120).optional(),
});

// Confirms an emailed code and signs the member in within the same request,
// so a session can only come from someone holding the code. With a slug, it
// also claims that listing when the email is on the tool's domain.
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter the 6-digit code from the email." }, { status: 422 });
  }
  const email = normalizeEmail(parsed.data.email);
  const result = await confirmVerificationCode(email, parsed.data.code);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });

  // One code, one sign-in.
  await prisma.emailVerification.update({ where: { email }, data: { expiresAt: new Date() } });
  await startMemberSession(email);

  if (!parsed.data.slug) return NextResponse.json({ ok: true, redirect: "/account" });

  const tool = await prisma.tool.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true, slug: true, name: true, url: true },
  });
  if (!tool || !checkClaim(email, tool.url).ok) {
    return NextResponse.json({ ok: true, redirect: "/account" });
  }
  await prisma.toolOwner.upsert({
    where: { toolId_email: { toolId: tool.id, email } },
    create: { toolId: tool.id, email, method: "EMAIL_DOMAIN" },
    update: { status: "ACTIVE", method: "EMAIL_DOMAIN" },
  });
  const mail = adminClaimEmail({ toolName: tool.name, toolSlug: tool.slug, email, pending: false });
  void sendEmail({ to: ADMIN_NOTIFY_EMAIL, ...mail, tags: [{ name: "type", value: "admin_claim" }] });
  return NextResponse.json({ ok: true, redirect: `/account/tools/${tool.slug}?claimed=1` });
}
