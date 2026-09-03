import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { verificationCodeEmail } from "@/lib/emails/submission-emails";

const CODE_TTL_MS = 15 * 60 * 1000; // a code is valid for 15 minutes
const VERIFIED_TTL_MS = 2 * 60 * 60 * 1000; // verified status lasts 2 hours
const RESEND_COOLDOWN_MS = 60 * 1000; // max one code email per minute per address
const MAX_ATTEMPTS = 5;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type Result = { ok: true } | { ok: false; error: string; status: number };

export async function issueVerificationCode(rawEmail: string): Promise<Result> {
  const email = normalizeEmail(rawEmail);

  const existing = await prisma.emailVerification.findUnique({ where: { email } });
  if (existing && Date.now() - existing.lastSentAt.getTime() < RESEND_COOLDOWN_MS) {
    return {
      ok: false,
      error: "Please wait a minute before requesting another code.",
      status: 429,
    };
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + CODE_TTL_MS);
  await prisma.emailVerification.upsert({
    where: { email },
    create: { email, code, expiresAt },
    update: { code, expiresAt, attempts: 0, lastSentAt: new Date() },
  });

  const mail = verificationCodeEmail({ code });
  const sent = await sendEmail({
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    tags: [{ name: "type", value: "email_verification" }],
  });
  if (!sent.ok) {
    return {
      ok: false,
      error: "We couldn't send the code right now — please try again shortly.",
      status: 502,
    };
  }
  return { ok: true };
}

export async function confirmVerificationCode(
  rawEmail: string,
  code: string
): Promise<Result> {
  const email = normalizeEmail(rawEmail);
  const row = await prisma.emailVerification.findUnique({ where: { email } });
  if (!row) {
    return { ok: false, error: "Request a code first.", status: 400 };
  }
  if (row.attempts >= MAX_ATTEMPTS) {
    return { ok: false, error: "Too many attempts — request a new code.", status: 429 };
  }
  if (row.expiresAt < new Date()) {
    return { ok: false, error: "That code has expired — request a new one.", status: 400 };
  }
  if (row.code !== code.trim()) {
    await prisma.emailVerification.update({
      where: { email },
      data: { attempts: { increment: 1 } },
    });
    return { ok: false, error: "That code doesn't match. Check and try again.", status: 400 };
  }
  await prisma.emailVerification.update({
    where: { email },
    data: { verifiedAt: new Date() },
  });
  return { ok: true };
}

export async function isEmailVerified(rawEmail: string): Promise<boolean> {
  const email = normalizeEmail(rawEmail);
  const row = await prisma.emailVerification.findUnique({ where: { email } });
  return (
    !!row?.verifiedAt && Date.now() - row.verifiedAt.getTime() < VERIFIED_TTL_MS
  );
}
