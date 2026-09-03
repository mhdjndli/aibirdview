import { NextResponse } from "next/server";
import { z } from "zod";
import { confirmVerificationCode } from "@/lib/email-verification";

const schema = z.object({
  email: z.string().trim().email().max(160),
  code: z.string().trim().min(4).max(8),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter the 6-digit code from the email." }, { status: 422 });
  }
  const result = await confirmVerificationCode(parsed.data.email, parsed.data.code);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
