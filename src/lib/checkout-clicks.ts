import { prisma } from "@/lib/prisma";

// Where a checkout link was clicked. Each link carries one of these as `src`.
export const CHECKOUT_SOURCES = {
  form: "Submit form",
  submitted: "After submitting",
  email: "Confirmation email",
  thanks: "Thanks page",
  account: "Owner account",
} as const;

export type CheckoutSource = keyof typeof CHECKOUT_SOURCES;

export function checkoutSource(value: string | null | undefined): CheckoutSource | null {
  return value && value in CHECKOUT_SOURCES ? (value as CheckoutSource) : null;
}

export type CheckoutClickInput = {
  email: string;
  toolName: string;
  submissionId?: string;
  toolId?: string;
  fastTrack: boolean;
  featurePlan: string | null;
  amountCents: number;
  source: CheckoutSource | null;
  stripeSessionId: string;
};

/**
 * Logs that someone opened a Stripe Checkout. Never throws: tracking must not
 * stand between a buyer and the payment page.
 */
export async function recordCheckoutClick(click: CheckoutClickInput) {
  try {
    await prisma.checkoutClick.create({
      data: { ...click, email: click.email.trim().toLowerCase() },
    });
  } catch (err) {
    console.error("[checkout] Failed to record click", (err as Error).message);
  }
}

/** Marks the click behind a completed checkout as paid. Never throws. */
export async function markCheckoutClickPaid(stripeSessionId: string) {
  try {
    await prisma.checkoutClick.updateMany({
      where: { stripeSessionId, paidAt: null },
      data: { paidAt: new Date() },
    });
  } catch (err) {
    console.error("[checkout] Failed to mark click paid", (err as Error).message);
  }
}
