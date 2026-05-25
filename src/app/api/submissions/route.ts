import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Pricing } from "@prisma/client";

const submissionSchema = z.object({
  name: z.string().min(2).max(80),
  url: z.string().url(),
  tagline: z.string().max(160).optional().nullable(),
  description: z.string().max(4000).optional().nullable(),
  category: z.string().min(1),
  pricing: z.enum(["FREE", "FREEMIUM", "FREE_TRIAL", "PAID"]),
  priceFrom: z.string().max(40).optional().nullable(),
  founded: z.string().max(8).optional().nullable(),
  contactName: z.string().min(1).max(80),
  email: z.string().email(),
  role: z.string().max(80).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  terms: z.literal(true),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const v = parsed.data;
  const submission = await prisma.submission.create({
    data: {
      name: v.name,
      url: v.url,
      tagline: v.tagline ?? null,
      description: v.description ?? null,
      pricing: v.pricing as Pricing,
      priceFrom: v.priceFrom ?? null,
      founded: v.founded ?? null,
      categorySlug: v.category,
      contactName: v.contactName,
      email: v.email,
      role: v.role ?? null,
      notes: v.notes ?? null,
    },
    select: { id: true },
  });

  return NextResponse.json({ id: submission.id }, { status: 201 });
}
