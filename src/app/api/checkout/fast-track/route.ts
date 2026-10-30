import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

// GET /api/checkout/fast-track?submission=<id>
// Kept for links in confirmation emails already sent; checkout now lives at
// /api/checkout/submission.
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("submission") ?? "";
  return NextResponse.redirect(
    `${SITE.url}/api/checkout/submission?submission=${encodeURIComponent(id)}&fast=1`,
    303
  );
}
