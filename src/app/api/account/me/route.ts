import { NextResponse } from "next/server";
import { currentMember, ownedTools } from "@/lib/owner-session";

// Who is signed in, for client components on otherwise static pages
// (navbar Sign in / Account link, "You manage this listing" bar).
export async function GET() {
  const email = await currentMember();
  const owns = email ? (await ownedTools(email)).map((t) => t.slug) : [];
  return NextResponse.json({ email, owns }, { headers: { "Cache-Control": "private, no-store" } });
}
