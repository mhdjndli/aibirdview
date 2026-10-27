import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { issueVerificationCode, normalizeEmail } from "@/lib/email-verification";
import { checkClaim } from "@/lib/claim-domain";

const schema = z.object({
  email: z.string().trim().email().max(160),
  // When claiming a listing, the email must be on the tool's domain.
  slug: z.string().max(120).optional(),
});

function claimError(reason: "free-mail" | "mismatch" | "shared-host" | "bad-url", domain?: string) {
  const on = domain ? `@${domain}` : "the tool's own domain";
  switch (reason) {
    case "free-mail":
      return `Use your work email (${on}), not a personal address.`;
    case "mismatch":
      return `That email isn't on this tool's domain. Use an address ending in ${on}.`;
    case "shared-host":
      return "This tool is hosted on a shared domain, so it can't be claimed by email. Sign in and request a manual review instead.";
    case "bad-url":
      return "This listing's website address can't be verified. Contact us to claim it.";
  }
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }
  const email = normalizeEmail(parsed.data.email);

  if (parsed.data.slug) {
    const tool = await prisma.tool.findUnique({ where: { slug: parsed.data.slug }, select: { url: true } });
    if (!tool) return NextResponse.json({ error: "Tool not found." }, { status: 404 });
    const check = checkClaim(email, tool.url);
    if (!check.ok) return NextResponse.json({ error: claimError(check.reason, check.domain) }, { status: 422 });
  }

  const result = await issueVerificationCode(email);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
