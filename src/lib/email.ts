import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_FROM =
  process.env.EMAIL_FROM || "AI BirdView <support@aibirdview.com>";

// Where admin notifications go. Defaults to the bare address from EMAIL_FROM.
export const ADMIN_NOTIFY_EMAIL =
  process.env.ADMIN_NOTIFY_EMAIL || "support@aibirdview.com";

export type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
};

/**
 * Send an email via Resend. Throws nothing — failures are logged but never
 * break the request flow that called us (e.g. a tool submission must succeed
 * even if email delivery flakes).
 */
export async function sendEmail(args: SendArgs): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing — skipping send", { subject: args.subject });
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  try {
    const res = await resend.emails.send({
      from: EMAIL_FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
      replyTo: args.replyTo,
      tags: args.tags,
    });
    if (res.error) {
      console.error("[email] Resend error", res.error);
      return { ok: false, error: res.error.message };
    }
    return { ok: true, id: res.data?.id };
  } catch (err) {
    console.error("[email] Send threw", err);
    return { ok: false, error: (err as Error).message };
  }
}
