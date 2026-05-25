import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ tools: [], categories: [] });

  const [tools, categories] = await Promise.all([
    prisma.tool.findMany({
      where: {
        published: true,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { tagline: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { tags: { some: { tag: { contains: q, mode: "insensitive" } } } },
        ],
      },
      take: 5,
      orderBy: [{ trending: "desc" }, { rating: "desc" }],
      select: { slug: true, name: true, tagline: true },
    }),
    prisma.category.findMany({
      where: { name: { contains: q, mode: "insensitive" } },
      take: 2,
      select: { slug: true, name: true },
    }),
  ]);

  return NextResponse.json({ tools, categories });
}
