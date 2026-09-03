import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isEmailVerified } from "@/lib/email-verification";

const reviewSchema = z.object({
  toolSlug: z.string().min(1),
  name: z.string().trim().min(1, "Name is required.").max(80),
  email: z.string().trim().email("A valid email is required.").max(160),
  stars: z.number().int().min(1, "Pick a star rating.").max(5),
  text: z.string().trim().max(2000).optional().nullable(),
  // honeypot — real visitors never fill this
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(payload);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return NextResponse.json({ error: first || "Invalid review" }, { status: 422 });
  }
  const v = parsed.data;

  if (!(await isEmailVerified(v.email))) {
    return NextResponse.json(
      { error: "Verify your email first." },
      { status: 403 }
    );
  }

  const tool = await prisma.tool.findUnique({
    where: { slug: v.toolSlug },
    select: { id: true, slug: true, published: true },
  });
  if (!tool || !tool.published) {
    return NextResponse.json({ error: "Tool not found." }, { status: 404 });
  }

  const email = v.email.toLowerCase();
  // One review per email per tool — resubmitting updates the existing one.
  await prisma.review.upsert({
    where: { toolId_email: { toolId: tool.id, email } },
    create: {
      toolId: tool.id,
      name: v.name,
      email,
      stars: v.stars,
      text: v.text || null,
    },
    update: { name: v.name, stars: v.stars, text: v.text || null },
  });

  revalidatePath(`/tools/${tool.slug}`);
  return NextResponse.json({ ok: true }, { status: 201 });
}
