// One-off: send the "your tool is live" email to the 15 submitters
// approved in the 2026-09-03 backfill.
// Run: set -a; source .env.local; set +a; export SITE_URL=https://aibirdview.com; npx tsx scripts/notify-approved.ts
import { prisma } from "@/lib/prisma";
import { notifySubmitterApproved } from "@/lib/approve-submission";

const IDS = [
  "cmqfyydfn0006l215psb9m5u3", // AccInt
  "cmqgwsoht0009l2150l6anu6h", // InstaPV
  "cmqhnqasf000dl2157myu54gt", // FPVTune
  "cmqib4xi2000gl2153rowkun2", // Roblox GUI Maker
  "cms20165t000jl2151qks3ops", // Blur Background
  "cms2017ci000ml2154wls8x2k", // Video Upscaler
  "cms20184f000pl215z7tnf64x", // Vedic Astrology Chart
  "cms278iyf000sl215ajct6i3a", // Image Describer
  "cms74q9ma000wl215xrl1y24t", // PDF Notes AI
  "cmsli9o66000zl215yih7ngvs", // JPG2Excel
  "cmt6lbbed0012l215kt10rden", // FreyaVideo Seedance 2.5
  "cmt7z1s4p0016l215brtefeib", // VidiRelay
  "cmta2cdn00019l215nfsj5kmc", // SameMuse
  "cmta3j92q001cl215asl4oplh", // SocialEcho
  "cmti1vlj6001fl2154wi2abbk", // Stream Bot
];

async function main() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
  if (!process.env.SITE_URL?.startsWith("https://")) throw new Error("SITE_URL must be the production URL");

  for (const id of IDS) {
    const sub = await prisma.submission.findUnique({
      where: { id },
      include: { tool: { select: { slug: true, name: true } } },
    });
    if (!sub || sub.status !== "APPROVED" || !sub.tool) {
      console.log(`skip ${id}: not an approved submission with a tool`);
      continue;
    }
    const res = await notifySubmitterApproved({
      toolName: sub.tool.name,
      contactName: sub.contactName,
      email: sub.email,
      toolSlug: sub.tool.slug,
    });
    console.log(`${res.ok ? "sent" : "FAILED"}: ${sub.tool.name} -> ${sub.email}${res.ok ? ` (${res.id})` : ` — ${res.error}`}`);
    await new Promise((r) => setTimeout(r, 600)); // stay under Resend's 2 req/s
  }
  await prisma.$disconnect();
}

main();
