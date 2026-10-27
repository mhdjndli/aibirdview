import type { Prisma, Pricing } from "@prisma/client";

// Listing fields an owner may change. Editorial content (the "More context"
// section, ratings, category, badges) stays with the editors.
export type EditData = Partial<{
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  pricing: Pricing;
  priceFrom: string | null;
  founded: string | null;
  features: string[];
  logoMediaId: string | null;
  screenshot1MediaId: string | null;
  screenshot2MediaId: string | null;
  screenshot3MediaId: string | null;
}>;

/** What ToolEdit.data stores: the changes plus the values they replaced, for reverting. */
export type StoredEdit = EditData & { _previous?: EditData };

const SCALARS = [
  "name", "tagline", "description", "longDescription", "url", "pricing", "priceFrom", "founded",
  "logoMediaId", "screenshot1MediaId", "screenshot2MediaId", "screenshot3MediaId",
] as const;

/** Writes a set of listing changes to a tool inside a transaction. */
export async function applyToolChanges(tx: Prisma.TransactionClient, toolId: string, changes: EditData) {
  const update: Prisma.ToolUpdateInput = {};
  for (const key of SCALARS) {
    if (key in changes) (update as Record<string, unknown>)[key] = changes[key];
  }
  if (Object.keys(update).length) await tx.tool.update({ where: { id: toolId }, data: update });
  if (changes.features) {
    await tx.toolFeature.deleteMany({ where: { toolId } });
    await tx.toolFeature.createMany({ data: changes.features.map((text, order) => ({ toolId, text, order })) });
  }
}

/** Splits stored edit data into the changes and the values they replaced. */
export function splitStoredEdit(data: StoredEdit): { changes: EditData; previous: EditData | null } {
  const { _previous, ...changes } = data;
  return { changes, previous: _previous ?? null };
}
