// Uploads an image as a tool's listing screenshot (slot 1 by default).
//
//   npx tsx --env-file=.env.local scripts/set-tool-screenshot.ts <slug> <image.jpg|png|webp> [1|2|3]
//
// The image is stored in the Media table and linked to the tool; the
// previous Media row for that slot is left in place.

import { readFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const TYPES: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const prisma = new PrismaClient();

async function main() {
  const [slug, file, slotArg = "1"] = process.argv.slice(2);
  if (!slug || !file) throw new Error("usage: set-tool-screenshot.ts <slug> <image> [1|2|3]");
  const slot = Number(slotArg);
  if (![1, 2, 3].includes(slot)) throw new Error("slot must be 1, 2 or 3");
  const contentType = TYPES[path.extname(file).toLowerCase()];
  if (!contentType) throw new Error(`unsupported image type ${path.extname(file)}`);

  const tool = await prisma.tool.findUnique({ where: { slug }, select: { id: true, name: true } });
  if (!tool) throw new Error(`unknown tool ${slug}`);

  const data = readFileSync(file);
  const media = await prisma.media.create({
    data: {
      filename: `${slug}-screenshot-${slot}${path.extname(file).toLowerCase()}`,
      contentType,
      size: data.length,
      altText: `${tool.name} screenshot`,
      data,
    },
  });
  await prisma.tool.update({ where: { id: tool.id }, data: { [`screenshot${slot}MediaId`]: media.id } });
  console.log(`${slug}: screenshot ${slot} set to /api/media/${media.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
