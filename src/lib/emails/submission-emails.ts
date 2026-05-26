import { SITE } from "@/lib/site";

const KIWI = "#74b25c";
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
            <span style="display:inline-block;width:32px;height:32px;border-radius:8px;background:${KIWI};vertical-align:middle;line-height:32px;text-align:center;color:#0b0b0d;font-weight:700;">●</span>
            <span style="font-size:16px;font-weight:600;letter-spacing:-0.022em;color:${INK_900};vertical-align:middle;">AI <span style="color:${KIWI_DARK};">BirdView</span></span>
          </a>
        </td></tr>
        ${content}
        <tr><td style="padding:24px 32px 28px;border-top:1px solid ${INK_100};color:${INK_500};font-size:12px;line-height:1.5;">
          You're receiving this email from <a href="${SITE.url}" style="color:${KIWI_DARK};text-decoration:none;">${SITE.url.replace(/^https?:\/\//,"")}</a>.<br/>
          Reply to this email to reach our editors directly.
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
}) {
  const subject = `We've got ${args.toolName} — review starts now`;
  const preheader = `Your submission landed safely. Our editors will get back to you within 48 hours.`;

  const html = shell({
    preheader,
    content: `
      <tr><td style="padding:8px 32px 0;">
        <h1 style="margin:24px 0 8px;font-size:24px;line-height:1.25;letter-spacing:-0.022em;color:${INK_900};font-weight:600;">
          Thanks, ${escapeHtml(args.contactName)}. We've got it.
        </h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${INK_700};">
          Your submission for <strong style="color:${INK_900};">${escapeHtml(args.toolName)}</strong> landed safely in our review queue. One of our editors will look at it within 48 hours.
        </p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${INK_700};">
          We test every tool with a real workflow before listing it. We'll either publish it, ask you a quick question, or let you know if it isn't a fit yet — either way, you'll hear back.
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

      <tr><td style="padding:18px 32px 24px;">
        <p style="margin:0 0 6px;font-size:14px;color:${INK_700};line-height:1.6;">
          While you wait, you can <a href="${SITE.url}/tools" style="color:${KIWI_DARK};text-decoration:none;">browse the directory</a> to see how other listings look.
        </p>
      </td></tr>
    `,
  });

  const text = `Thanks, ${args.contactName}.

We've received your submission for ${args.toolName}. One of our editors will review it within 48 hours and email you back.

What we received:
  Tool:     ${args.toolName}
  Website:  ${args.websiteUrl}
  Category: ${args.categoryName}

Browse the directory while you wait: ${SITE.url}/tools

— The AI BirdView team`;

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
  const preheader = `${args.contactName} <${args.contactEmail}> submitted ${args.toolName} — review in admin.`;
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
