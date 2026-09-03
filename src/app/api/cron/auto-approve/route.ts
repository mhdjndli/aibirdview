import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { autoApprovePendingSubmissions } from "@/lib/approve-submission";

// Publishes every PENDING submission older than AUTO_APPROVE_AFTER_HOURS
// (default 24h). Triggered hourly from instrumentation.ts; can also be hit
// by an external scheduler with `Authorization: Bearer $CRON_SECRET`.

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return (
    req.headers.get("authorization") === `Bearer ${secret}` ||
    req.headers.get("x-cron-secret") === secret
  );
}

async function run(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await autoApprovePendingSubmissions();

  if (result.approved.length > 0) {
    revalidatePath("/");
    revalidatePath("/tools");
    for (const slug of new Set(result.approved.map((a) => a.categorySlug))) {
      revalidatePath(`/categories/${slug}`);
    }
    console.log(
      `[auto-approve] Published ${result.approved.length} submission(s):`,
      result.approved.map((a) => a.toolSlug).join(", ")
    );
  }

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  return run(req);
}

export async function GET(req: Request) {
  return run(req);
}
