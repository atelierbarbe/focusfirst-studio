import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Focus First brand tokens — keep in sync with globals.css */
const brand = {
  white: "#ffffff",
  cream: "#f9f8f6",
  lightGray: "#f0eee8",
  mediumGray: "#a9a8a1",
  darkGray: "#3a3935",
  nearBlack: "#1a1915",
  accent: "#059669",
  accentDark: "#047857",
  accentLight: "#ecfdf5",
  border: "rgba(26,25,21,0.1)",
  fontSans:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  fontMono:
    "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatFieldRows(
  fields: Record<string, string | string[] | undefined | null>
): string {
  return Object.entries(fields)
    .filter(([, value]) => {
      if (value == null) return false;
      if (Array.isArray(value)) return value.length > 0;
      return String(value).trim() !== "";
    })
    .map(([label, value]) => {
      const display = Array.isArray(value) ? value.join(", ") : String(value);
      return `<tr>
  <td style="padding:10px 16px 10px 0;vertical-align:top;color:${brand.mediumGray};font-size:13px;font-family:${brand.fontMono};letter-spacing:0.02em;white-space:nowrap;">${escapeHtml(label)}</td>
  <td style="padding:10px 0;font-size:15px;color:${brand.nearBlack};line-height:1.5;">${escapeHtml(display)}</td>
</tr>`;
    })
    .join("");
}

function brandMarkHtml(): string {
  return `
    <p style="margin:0 0 4px;font-family:${brand.fontSans};font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${brand.nearBlack};">
      ${escapeHtml(SITE_NAME)}
    </p>
    <p style="margin:0;font-family:${brand.fontMono};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.accent};">
      Digital Lab
    </p>`;
}

function emailShell(options: {
  preview: string;
  title: string;
  body: string;
}): string {
  const { preview, title, body } = options;

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${brand.cream};color:${brand.nearBlack};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    ${escapeHtml(preview)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${brand.cream};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:${brand.white};border:1px solid ${brand.border};">
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background-color:${brand.accent};">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px;font-family:${brand.fontSans};">
              ${brandMarkHtml()}
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px;background-color:${brand.accentLight};border-top:1px solid rgba(4,120,87,0.15);font-family:${brand.fontSans};">
              <p style="margin:0 0 6px;font-size:12px;color:${brand.accentDark};">
                <a href="${SITE_URL}" style="color:${brand.accentDark};text-decoration:none;font-weight:600;">focusfirst.be</a>
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:${brand.mediumGray};">
                Focus First Digital Lab — van idee naar werkend bewijs.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Internal notify email (form payload for the studio). */
export function buildEmailHtml(
  title: string,
  intro: string,
  rows: string
): string {
  const body = `
    <h1 style="margin:28px 0 12px;font-size:22px;font-weight:600;line-height:1.3;color:${brand.nearBlack};">
      ${escapeHtml(title)}
    </h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${brand.darkGray};">
      ${escapeHtml(intro)}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${brand.border};">
      ${rows}
    </table>`;

  return emailShell({
    preview: intro,
    title,
    body,
  });
}

type CustomerEmailOptions = {
  name: string;
  intro: string;
  title?: string;
};

/** Auto-reply to the lead — Focus First brand identity. */
export function buildCustomerEmailHtml({
  name,
  intro,
  title = "We hebben je aanvraag ontvangen",
}: CustomerEmailOptions): string {
  const firstName = name.trim().split(/\s+/)[0] || name;
  const safeName = escapeHtml(firstName);

  const body = `
    <h1 style="margin:28px 0 12px;font-size:24px;font-weight:600;line-height:1.25;color:${brand.nearBlack};">
      ${escapeHtml(title)}
    </h1>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:${brand.darkGray};">
      Hallo ${safeName},
    </p>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:${brand.darkGray};">
      ${escapeHtml(intro)}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:${brand.cream};border:1px solid ${brand.border};">
      <tr>
        <td style="padding:18px 20px;border-left:3px solid ${brand.accent};">
          <p style="margin:0 0 6px;font-family:${brand.fontMono};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.accent};">
            Wat volgt
          </p>
          <p style="margin:0;font-size:15px;line-height:1.55;color:${brand.nearBlack};">
            We lezen je aanvraag aandachtig en nemen binnen 24 uur persoonlijk contact op.
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:${brand.darkGray};">
      Met vriendelijke groet,
    </p>
    <p style="margin:0;font-size:15px;font-weight:600;line-height:1.6;color:${brand.nearBlack};">
      ${escapeHtml(SITE_NAME)}
    </p>`;

  return emailShell({
    preview: intro,
    title,
    body,
  });
}
