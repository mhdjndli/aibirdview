import { NextResponse } from "next/server";
import { z } from "zod";
import { issueVerificationCode } from "@/lib/email-verification";

const schema = z.object({ email: z.string().trim().email().max(160) });

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }
  const result = await issueVerificationCode(parsed.data.email);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
