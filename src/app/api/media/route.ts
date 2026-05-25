import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 8 MB limit" }, { status: 413 });
  }

  const alt = (form.get("alt") as string | null)?.trim() || null;
  const bytes = Buffer.from(await file.arrayBuffer());

  const media = await prisma.media.create({
    data: {
      filename: file.name,
      contentType: file.type,
      size: bytes.length,
      altText: alt,
      data: bytes,
    },
    select: { id: true, filename: true, contentType: true, size: true, altText: true },
  });

  return NextResponse.json(media, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { id: true, filename: true, contentType: true, size: true, altText: true, createdAt: true },
  });
  return NextResponse.json({ items });
}
