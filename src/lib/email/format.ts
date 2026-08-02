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
      return `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;color:#6b6965;font-size:14px;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 0;font-size:14px;color:#1a1915;">${escapeHtml(display)}</td></tr>`;
    })
    .join("");
}

export function buildEmailHtml(
  title: string,
  intro: string,
  rows: string
): string {
  return `<!DOCTYPE html>
<html lang="nl">
<body style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1915;max-width:600px;margin:0 auto;padding:24px;">
  <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#059669;margin:0 0 8px;">Focus First</p>
  <h1 style="font-size:20px;font-weight:600;margin:0 0 16px;">${escapeHtml(title)}</h1>
  <p style="font-size:15px;color:#6b6965;margin:0 0 24px;">${escapeHtml(intro)}</p>
  <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(26,25,21,0.1);">
    ${rows}
  </table>
</body>
</html>`;
}
