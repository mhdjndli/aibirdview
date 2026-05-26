import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const media = await prisma.media.findUnique({
    where: { id },
    select: { data: true, contentType: true, filename: true },
  });
  if (!media) return new NextResponse("Not found", { status: 404 });

  // HTTP headers must be ASCII (RFC 7230). Build an ASCII-safe filename
  // for the legacy parameter and provide the real one via RFC 5987 filename*.
  // (macOS screenshot filenames contain narrow no-break spaces, U+202F.)
  const safeAscii =
    media.filename
      // eslint-disable-next-line no-control-regex
      .replace(/[^\x20-\x7E]/g, "_")
      .replace(/[\\"]/g, "")
      .slice(0, 120) || "file";
  const utf8Encoded = encodeURIComponent(media.filename);

  return new NextResponse(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${safeAscii}"; filename*=UTF-8''${utf8Encoded}`,
    },
  });
}
