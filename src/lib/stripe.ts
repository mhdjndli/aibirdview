import Stripe from "stripe";

// Payments are optional: with no STRIPE_SECRET_KEY the paid same-day review
// is hidden everywhere and every submission goes through the free queue.
const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = secretKey ? new Stripe(secretKey) : null;

export function fastTrackEnabled() {
  return Boolean(stripe);
}

/** Price of a same-day review, in cents. */
export const FAST_TRACK_PRICE_CENTS = Number(process.env.FAST_TRACK_PRICE_CENTS || 900);

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
