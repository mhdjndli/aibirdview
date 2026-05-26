// Public-facing media upload — used by the /submit form.
// Stricter limits than the admin endpoint. No authentication required.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]);

// Very simple in-memory rate limit: 12 uploads per IP per 10 minutes.
// (Resets on cold start — good enough for a public submit form.)
const buckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (b.count >= 12) return false;
  b.count++;
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many uploads from your network — please try again in a few minutes." },
      { status: 429 }
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Please upload a PNG, JPEG, WebP, or SVG image." },
      { status: 415 }
    );
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Empty file." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Each image must be 4 MB or smaller." },
      { status: 413 }
    );
  }

  const alt = (form.get("alt") as string | null)?.trim().slice(0, 200) || null;
  const bytes = Buffer.from(await file.arrayBuffer());

  const media = await prisma.media.create({
    data: {
      filename: file.name.slice(0, 120),
      contentType: file.type,
      size: bytes.length,
      altText: alt,
      data: bytes,
    },
    select: { id: true, filename: true, contentType: true, size: true },
  });

  return NextResponse.json(media, { status: 201 });
}
