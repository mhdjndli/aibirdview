"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();

  const hero = {
    eyebrow: (formData.get("hero_eyebrow") as string | null) || null,
    headline: (formData.get("hero_headline") as string) || "Find the AI that actually works.",
    subhead: (formData.get("hero_subhead") as string) ||
      "A premium, human-curated directory of the AI tools worth your time. Discover, compare, and launch with confidence.",
  };

  const stats = {
    listed: (formData.get("stat_listed") as string) || "1,200+",
    categories: (formData.get("stat_categories") as string) || "72",
    reviewTime: (formData.get("stat_reviewTime") as string) || "48hr",
    readers: (formData.get("stat_readers") as string) || "140k",
  };

  const social = {
    twitter: (formData.get("social_twitter") as string) || "",
    linkedin: (formData.get("social_linkedin") as string) || "",
    email: (formData.get("social_email") as string) || "",
  };

  const footer = {
    tagline: (formData.get("footer_tagline") as string) || "A premium, human-curated directory of the AI tools worth your time.",
  };

  await Promise.all([
    prisma.setting.upsert({ where: { key: "hero" },   update: { value: hero },   create: { key: "hero",   value: hero } }),
    prisma.setting.upsert({ where: { key: "stats" },  update: { value: stats },  create: { key: "stats",  value: stats } }),
    prisma.setting.upsert({ where: { key: "social" }, update: { value: social }, create: { key: "social", value: social } }),
    prisma.setting.upsert({ where: { key: "footer" }, update: { value: footer }, create: { key: "footer", value: footer } }),
  ]);

  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
