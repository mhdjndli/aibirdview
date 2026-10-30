import { SITE } from "@/lib/site";

const KIWI_DARK = "#467434";
const INK_900 = "#1d1d1f";
const INK_700 = "#2c2c2e";
const INK_500 = "#6e6e73";
const INK_300 = "#d2d2d7";
const INK_100 = "#f5f5f7";
const INK_50 = "#fbfbfd";

function shell({ preheader, content }: { preheader: string; content: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
<meta name="color-scheme" content="light only" />
<title>${SITE.name}</title>
</head>
<body style="margin:0;padding:0;background:${INK_50};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK_900};-webkit-font-smoothing:antialiased;">
  <span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:${INK_50};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${INK_50};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid ${INK_300};border-radius:18px;overflow:hidden;">
        <tr><td style="padding:24px 32px 8px;">
          <a href="${SITE.url}" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
            <img src="${SITE.url}/icon.png" width="32" height="32" alt="" style="display:inline-block;width:32px;height:32px;border:0;vertical-align:middle;" />
            <span style="font-size:16px;font-weight:600;letter-spacing:-0.022em;color:${INK_900};vertical-align:middle;">AI <span style="color:${KIWI_DARK};">BirdView</span></span>
          </a>
        </td></tr>
        ${content}
        <tr><td style="padding:24px 32px 28px;border-top:1px solid ${INK_100};color:${INK_500};font-size:12px;line-height:1.5;">
          You're receiving this email from <a href="${SITE.url}" style="color:${KIWI_DARK};text-decoration:none;">${SITE.url.replace(/^https?:\/\//,"")}</a>.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// -------- Submitter confirmation --------

export function submitterConfirmationEmail(args: {
  toolName: string;
  contactName: string;
  websiteUrl: string;
  categoryName: string;
  freeDays: number;
  /** Checkout link and price label for the paid same-day review, when offered. */
  fastTrack?: { url: string; price: string } | null;
}) {
  const subject = `We've got ${args.toolName}: review starts now`;
  const when = `within ${args.freeDays} days`;
  const preheader = args.fastTrack
    ? `Your submission is in the free queue (live ${when}). Need it live today? Same-day review is ${args.fastTrack.price}.`
    : `Your submission landed safely. It will be reviewed and go live ${when}.`;
  const fastTrackBlock = args.fastTrack
    ? `
      <tr><td style="padding:0 32px 8px;">
        <div style="border:1px solid ${KIWI_DARK};border-radius:14px;background:#f3faec;padding:18px 20px;">
          <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:${INK_900};">Launching soon? Get listed today.</p>
          <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${INK_700};">
            Skip the queue for ${escapeHtml(args.fastTrack.price)}: we review ${escapeHtml(args.toolName)} the same day and publish it within hours. If we can't list it, you get a full refund.
          </p>
          <a href="${escapeAttr(args.fastTrack.url)}" style="display:inline-block;background:${INK_900};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:11px 20px;border-radius:999px;">Get listed today for ${escapeHtml(args.fastTrack.price)} →</a>
        </div>
      </td></tr>`
    : "";

  const html = shell({
    preheader,
    content: `
      <tr><td style="padding:8px 32px 0;">
        <h1 style="margin:24px 0 8px;font-size:24px;line-height:1.25;letter-spacing:-0.022em;color:${INK_900};font-weight:600;">
          Thanks, ${escapeHtml(args.contactName)}. We've got it.
        </h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${INK_700};">
          Your submission for <strong style="color:${INK_900};">${escapeHtml(args.toolName)}</strong> landed safely in our free review queue. It will be reviewed and go live ${when}.
        </p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${INK_700};">
          As soon as it's published, we'll email you a link to your listing so you can see how it looks.
        </p>
      </td></tr>

      <tr><td style="padding:0 32px 8px;">
        <div style="border:1px solid ${INK_300};border-radius:14px;background:${INK_50};padding:18px 20px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${INK_500};">What we received</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:6px;font-size:14px;color:${INK_700};">
            <tr><td style="padding:6px 0;color:${INK_500};width:120px;">Tool</td><td style="padding:6px 0;color:${INK_900};font-weight:500;">${escapeHtml(args.toolName)}</td></tr>
            <tr><td style="padding:6px 0;color:${INK_500};">Website</td><td style="padding:6px 0;"><a href="${escapeAttr(args.websiteUrl)}" style="color:${KIWI_DARK};text-decoration:none;">${escapeHtml(args.websiteUrl)}</a></td></tr>
            <tr><td style="padding:6px 0;color:${INK_500};">Category</td><td style="padding:6px 0;color:${INK_900};">${escapeHtml(args.categoryName)}</td></tr>
          </table>
        </div>
      </td></tr>
${fastTrackBlock}
      <tr><td style="padding:18px 32px 24px;">
        <p style="margin:0 0 6px;font-size:14px;color:${INK_700};line-height:1.6;">
          While you wait, you can <a href="${SITE.url}/tools" style="color:${KIWI_DARK};text-decoration:none;">browse the directory</a> to see how other listings look.
        </p>
      </td></tr>
    `,
  });

  const text = `Thanks, ${args.contactName}.

We've received your submission for ${args.toolName}. It will be reviewed and go live ${when}, and we'll email you as soon as it's published.
${args.fastTrack ? `\nLaunching soon? Get listed today for ${args.fastTrack.price} (same-day review, full refund if we can't list it):\n${args.fastTrack.url}\n` : ""}
What we received:
  Tool:     ${args.toolName}
  Website:  ${args.websiteUrl}
  Category: ${args.categoryName}

Browse the directory while you wait: ${SITE.url}/tools

The AI BirdView team`;

  return { subject, html, text };
}

// -------- Admin notification --------

export function adminNotificationEmail(args: {
  toolName: string;
  tagline: string | null;
  description: string | null;
  websiteUrl: string;
  categorySlug: string;
  pricing: string;
  priceFrom: string | null;
  founded: string | null;
  contactName: string;
  contactEmail: string;
  contactRole: string | null;
  notes: string | null;
  submissionId: string;
  hasLogo: boolean;
  screenshotCount: number;
}) {
  const subject = `New submission: ${args.toolName}`;
  const preheader = `${args.contactName} <${args.contactEmail}> submitted ${args.toolName}. Review in admin.`;
  const reviewUrl = `${SITE.url}/admin/submissions/${args.submissionId}`;

  const html = shell({
    preheader,
    content: `
      <tr><td style="padding:8px 32px 0;">
        <p style="margin:18px 0 6px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${KIWI_DARK};">New submission</p>
        <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;letter-spacing:-0.022em;color:${INK_900};font-weight:600;">${escapeHtml(args.toolName)}</h1>
        ${args.tagline ? `<p style="margin:0 0 18px;font-size:16px;line-height:1.5;color:${INK_500};">${escapeHtml(args.tagline)}</p>` : ""}
      </td></tr>

      <tr><td style="padding:0 32px 16px;">
        <a href="${reviewUrl}" style="display:inline-block;background:${INK_900};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 22px;border-radius:999px;">Open in admin →</a>
      </td></tr>

      <tr><td style="padding:0 32px 12px;">
        <div style="border:1px solid ${INK_300};border-radius:14px;background:${INK_50};padding:18px 20px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${INK_500};">Submission</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;color:${INK_700};">
            <tr><td style="padding:6px 0;color:${INK_500};width:120px;">Website</td><td style="padding:6px 0;"><a href="${escapeAttr(args.websiteUrl)}" style="color:${KIWI_DARK};text-decoration:none;">${escapeHtml(args.websiteUrl)}</a></td></tr>
            <tr><td style="padding:6px 0;color:${INK_500};">Category</td><td style="padding:6px 0;color:${INK_900};">${escapeHtml(args.categorySlug)}</td></tr>
            <tr><td style="padding:6px 0;color:${INK_500};">Pricing</td><td style="padding:6px 0;color:${INK_900};">${escapeHtml(args.pricing.replace("_"," ").toLowerCase())}${args.priceFrom ? ` · from ${escapeHtml(args.priceFrom)}` : ""}</td></tr>
            ${args.founded ? `<tr><td style="padding:6px 0;color:${INK_500};">Founded</td><td style="padding:6px 0;color:${INK_900};">${escapeHtml(args.founded)}</td></tr>` : ""}
            <tr><td style="padding:6px 0;color:${INK_500};">Logo</td><td style="padding:6px 0;color:${INK_900};">${args.hasLogo ? "Uploaded" : "<span style=\"color:#b91c1c\">Missing</span>"}</td></tr>
            <tr><td style="padding:6px 0;color:${INK_500};">Screenshots</td><td style="padding:6px 0;color:${INK_900};">${args.screenshotCount} attached</td></tr>
          </table>
        </div>
      </td></tr>

      ${args.description ? `<tr><td style="padding:0 32px 12px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${INK_500};">Description</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:${INK_700};white-space:pre-wrap;">${escapeHtml(args.description)}</p>
      </td></tr>` : ""}

      <tr><td style="padding:0 32px 16px;">
        <div style="border:1px solid ${INK_300};border-radius:14px;background:${INK_50};padding:18px 20px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${INK_500};">Submitter</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;color:${INK_700};">
            <tr><td style="padding:6px 0;color:${INK_500};width:120px;">Name</td><td style="padding:6px 0;color:${INK_900};">${escapeHtml(args.contactName)}</td></tr>
            <tr><td style="padding:6px 0;color:${INK_500};">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeAttr(args.contactEmail)}" style="color:${KIWI_DARK};text-decoration:none;">${escapeHtml(args.contactEmail)}</a></td></tr>
            ${args.contactRole ? `<tr><td style="padding:6px 0;color:${INK_500};">Role</td><td style="padding:6px 0;color:${INK_900};">${escapeHtml(args.contactRole)}</td></tr>` : ""}
          </table>
        </div>
      </td></tr>

      ${args.notes ? `<tr><td style="padding:0 32px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${INK_500};">Submitter notes</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:${INK_700};white-space:pre-wrap;">${escapeHtml(args.notes)}</p>
      </td></tr>` : `<tr><td style="padding:0 32px 16px;"></td></tr>`}
    `,
  });

  const text = `New submission: ${args.toolName}
${args.tagline ?? ""}

Review in admin: ${reviewUrl}

Submission
  Website:     ${args.websiteUrl}
  Category:    ${args.categorySlug}
  Pricing:     ${args.pricing.replace("_", " ").toLowerCase()}${args.priceFrom ? ` (from ${args.priceFrom})` : ""}
  ${args.founded ? `Founded:     ${args.founded}\n  ` : ""}Logo:        ${args.hasLogo ? "Uploaded" : "MISSING"}
  Screenshots: ${args.screenshotCount} attached

${args.description ? `Description\n${args.description}\n\n` : ""}Submitter
  Name:  ${args.contactName}
  Email: ${args.contactEmail}
  ${args.contactRole ? `Role:  ${args.contactRole}\n` : ""}
${args.notes ? `Notes\n${args.notes}\n` : ""}`;

  return { subject, html, text };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(s: string) {
  return escapeHtml(s);
}

// -------- Submitter approval (tool is live) --------

export function submitterApprovedEmail(args: {
  toolName: string;
  contactName: string;
  toolUrl: string;
}) {
  const subject = `${args.toolName} is now live on ${SITE.name}`;
  const preheader = `Your listing has been approved and published. Take a look.`;

  const html = shell({
    preheader,
    content: `
      <tr><td style="padding:8px 32px 0;">
        <p style="margin:18px 0 6px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${KIWI_DARK};">Approved</p>
        <h1 style="margin:0 0 8px;font-size:24px;line-height:1.25;letter-spacing:-0.022em;color:${INK_900};font-weight:600;">
          ${escapeHtml(args.toolName)} is live.
        </h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${INK_700};">
          Good news, ${escapeHtml(args.contactName)}: your submission has been approved and <strong style="color:${INK_900};">${escapeHtml(args.toolName)}</strong> is now listed in the directory.
        </p>
      </td></tr>

      <tr><td style="padding:0 32px 28px;">
        <a href="${escapeAttr(args.toolUrl)}" style="display:inline-block;background:${INK_900};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 22px;border-radius:999px;">View your listing →</a>
        <p style="margin:18px 0 0;font-size:14px;line-height:1.6;color:${INK_700};">
          You own this listing. To update its description, pricing or images, <a href="${SITE.url}/signin" style="color:${KIWI_DARK};text-decoration:none;">sign in with this email address</a>.
        </p>
      </td></tr>
    `,
  });

  const text = `Good news, ${args.contactName}: ${args.toolName} has been approved and is now live on ${SITE.name}.

View your listing: ${args.toolUrl}

You own this listing. To update it, sign in with this email address: ${SITE.url}/signin

The ${SITE.name} team`;

  return { subject, html, text };
}

// -------- Email verification code --------

export function verificationCodeEmail(args: { code: string }) {
  const subject = `${args.code} is your ${SITE.name} verification code`;
  const preheader = `Enter this code to verify your email address. It expires in 15 minutes.`;

  const html = shell({
    preheader,
    content: `
      <tr><td style="padding:8px 32px 0;">
        <p style="margin:18px 0 6px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${KIWI_DARK};">Verify your email</p>
        <h1 style="margin:0 0 8px;font-size:24px;line-height:1.25;letter-spacing:-0.022em;color:${INK_900};font-weight:600;">
          Your verification code
        </h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${INK_700};">
          Enter this code on ${SITE.name} to confirm your email address. It expires in 15 minutes.
        </p>
      </td></tr>
      <tr><td style="padding:0 32px 24px;">
        <div style="display:inline-block;border:1px solid ${INK_300};border-radius:14px;background:${INK_50};padding:16px 28px;font-size:32px;font-weight:700;letter-spacing:0.35em;color:${INK_900};">
          ${escapeHtml(args.code)}
        </div>
        <p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:${INK_500};">
          Didn't request this? You can safely ignore this email.
        </p>
      </td></tr>
    `,
  });

  const text = `Your ${SITE.name} verification code: ${args.code}

Enter it on the site to confirm your email address. It expires in 15 minutes.

Didn't request this? You can safely ignore this email.`;

  return { subject, html, text };
}

// -------- Simple notices (payments, claims, edits) --------

function notice(args: { eyebrow: string; title: string; body: string[]; cta?: { label: string; url: string } }) {
  const paragraphs = args.body
    .map((p) => `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${INK_700};">${p}</p>`)
    .join("");
  const cta = args.cta
    ? `<tr><td style="padding:4px 32px 28px;"><a href="${escapeAttr(args.cta.url)}" style="display:inline-block;background:${INK_900};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 22px;border-radius:999px;">${escapeHtml(args.cta.label)} →</a></td></tr>`
    : "";
  return shell({
    preheader: args.title,
    content: `
      <tr><td style="padding:8px 32px 8px;">
        <p style="margin:18px 0 6px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${KIWI_DARK};">${escapeHtml(args.eyebrow)}</p>
        <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;letter-spacing:-0.022em;color:${INK_900};font-weight:600;">${escapeHtml(args.title)}</h1>
        ${paragraphs}
      </td></tr>
      ${cta}`,
  });
}

function plain(title: string, body: string[], cta?: { label: string; url: string }) {
  const strip = (p: string) => p.replace(/<[^>]+>/g, "");
  return [title, "", ...body.map(strip), ...(cta ? ["", `${cta.label}: ${cta.url}`] : []), "", `The ${SITE.name} team`].join("\n");
}

type PaidFeature = { label: string; endsAt: Date | null };

const formatDay = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });

/** Receipt for a submitter's same-day review and/or featured placement, or an owner's featured placement. */
export function paymentReceivedEmail(args: { toolName: string; fastTrackHours: number | null; feature: PaidFeature | null; toolUrl?: string }) {
  const name = `<strong>${escapeHtml(args.toolName)}</strong>`;
  const title = args.fastTrackHours
    ? `Payment received: ${args.toolName} goes live today`
    : `Payment received: ${args.toolName} will be featured`;
  const body = [
    ...(args.fastTrackHours
      ? [`Thanks! Your same-day review for ${name} is paid. We'll review it today and publish it within ${args.fastTrackHours} hours.`]
      : []),
    ...(args.feature
      ? [
          args.feature.endsAt
            ? `${name} is featured on the ${SITE.name} homepage for ${escapeHtml(args.feature.label.toLowerCase())}, until ${formatDay(args.feature.endsAt)}.`
            : `${name} will be featured on the ${SITE.name} homepage for ${escapeHtml(args.feature.label.toLowerCase())}, starting the day it goes live.`,
        ]
      : []),
    args.toolUrl
      ? `Featured tools are marked Sponsored and appear in the "Featured this week" section.`
      : `We'll email you the link as soon as it's live. If we can't list it, we'll refund you in full.`,
  ];
  const cta = args.toolUrl ? { label: "View your listing", url: args.toolUrl } : undefined;
  return { subject: title, html: notice({ eyebrow: "Payment received", title, body, cta }), text: plain(title, body, cta) };
}

export function adminPaymentEmail(args: {
  toolName: string;
  submissionId?: string;
  toolSlug?: string;
  publishBy?: Date | null;
  fastTrack: boolean;
  feature: PaidFeature | null;
}) {
  const bought = [args.fastTrack && "a same-day review", args.feature && `featuring for ${args.feature.label.toLowerCase()}`]
    .filter(Boolean)
    .join(" and ");
  const title = `Paid: ${args.toolName}`;
  const body = [
    `${escapeHtml(args.toolName)} paid for ${escapeHtml(bought)}.`,
    ...(args.fastTrack && args.publishBy
      ? [`It publishes automatically at ${args.publishBy.toUTCString()} unless you review it first.`]
      : []),
    ...(args.feature
      ? [args.feature.endsAt ? `Featured until ${args.feature.endsAt.toUTCString()}.` : "The featured slot starts when the tool goes live."]
      : []),
  ];
  const cta = args.submissionId
    ? { label: "Review submission", url: `${SITE.url}/admin/submissions/${args.submissionId}` }
    : { label: "Open listing", url: `${SITE.url}/admin/tools/${args.toolSlug}/edit` };
  return { subject: title, html: notice({ eyebrow: "Paid", title, body, cta }), text: plain(title, body, cta) };
}

export function submitterRejectedEmail(args: { toolName: string; reason: string | null; refunded: boolean }) {
  const title = `We couldn't list ${args.toolName}`;
  const body = [
    `Thanks for submitting <strong>${escapeHtml(args.toolName)}</strong>. After review, we weren't able to add it to the directory.`,
    ...(args.reason ? [`Reason: ${escapeHtml(args.reason)}`] : []),
    ...(args.refunded ? [`Your payment has been refunded in full. It can take 5 to 10 days to appear on your statement.`] : []),
  ];
  return { subject: title, html: notice({ eyebrow: "Submission update", title, body }), text: plain(title, body) };
}

export function adminClaimEmail(args: { toolName: string; toolSlug: string; email: string; pending: boolean; note?: string | null }) {
  const title = args.pending ? `Claim needs review: ${args.toolName}` : `Listing claimed: ${args.toolName}`;
  const body = [
    `${escapeHtml(args.email)} ${args.pending ? "asked to manage" : "verified an address on the tool's domain and now manages"} <strong>${escapeHtml(args.toolName)}</strong>.`,
    ...(args.note ? [`Their note: ${escapeHtml(args.note)}`] : []),
    args.pending ? "Approve or decline it in the admin." : "If this looks wrong, revoke it in the admin.",
  ];
  const cta = { label: "Open owners", url: `${SITE.url}/admin/edits` };
  return { subject: title, html: notice({ eyebrow: "Owners", title, body, cta }), text: plain(title, body, cta) };
}

export function adminEditEmail(args: { toolName: string; email: string; fields: string[] }) {
  const title = `Listing updated: ${args.toolName}`;
  const body = [
    `${escapeHtml(args.email)} updated ${escapeHtml(args.toolName)}: ${escapeHtml(args.fields.join(", "))}. The changes are live.`,
    "If anything looks wrong, revert it in the admin.",
  ];
  const cta = { label: "Owner edits", url: `${SITE.url}/admin/edits` };
  return { subject: title, html: notice({ eyebrow: "Owners", title, body, cta }), text: plain(title, body, cta) };
}

export function ownerEditDecisionEmail(args: { toolName: string; toolSlug: string; approved: boolean; reverted?: boolean; note?: string | null }) {
  const title = args.approved
    ? `Your changes to ${args.toolName} are live`
    : args.reverted
    ? `Your changes to ${args.toolName} were reverted`
    : `Your changes to ${args.toolName} weren't published`;
  const body = [
    args.approved
      ? `We reviewed and published your update to <strong>${escapeHtml(args.toolName)}</strong>.`
      : args.reverted
      ? `An editor reverted your latest update to <strong>${escapeHtml(args.toolName)}</strong>, so the listing shows its previous details again.`
      : `We reviewed your update to <strong>${escapeHtml(args.toolName)}</strong> but couldn't publish it as submitted.`,
    ...(args.note ? [`Note from the editor: ${escapeHtml(args.note)}`] : []),
  ];
  const cta = { label: "View your listing", url: `${SITE.url}/tools/${args.toolSlug}` };
  return { subject: title, html: notice({ eyebrow: "Listing update", title, body, cta }), text: plain(title, body, cta) };
}

export function ownerClaimApprovedEmail(args: { toolName: string }) {
  const title = `You can now manage ${args.toolName}`;
  const body = [
    `We verified your request. You can now update <strong>${escapeHtml(args.toolName)}</strong>'s description, pricing and images on ${SITE.name}.`,
    `Sign in with this email address to make changes.`,
  ];
  const cta = { label: "Sign in", url: `${SITE.url}/signin` };
  return { subject: title, html: notice({ eyebrow: "Owners", title, body, cta }), text: plain(title, body, cta) };
}
