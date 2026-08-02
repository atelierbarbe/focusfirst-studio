import { Resend } from "resend";
import { getEmailConfig } from "./config";
import { buildEmailHtml, formatFieldRows } from "./format";

type SendPairOptions = {
  notifySubject: string;
  notifyTitle: string;
  notifyIntro: string;
  notifyFields: Record<string, string | string[] | undefined | null>;
  customerEmail: string;
  customerName: string;
  customerSubject: string;
  customerIntro: string;
  replyTo?: string;
};

export async function sendFormEmails(
  options: SendPairOptions
): Promise<{ ok: true } | { ok: false; error: string }> {
  const config = getEmailConfig();
  if (!config) {
    return { ok: false, error: "E-mail is niet geconfigureerd." };
  }

  const resend = new Resend(config.apiKey);
  const notifyRows = formatFieldRows(options.notifyFields);
  const notifyHtml = buildEmailHtml(
    options.notifyTitle,
    options.notifyIntro,
    notifyRows
  );
  const notifyText = Object.entries(options.notifyFields)
    .filter(
      ([, v]) =>
        v != null && (Array.isArray(v) ? v.length > 0 : String(v).trim() !== "")
    )
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  const { error: notifyError } = await resend.emails.send({
    from: config.from,
    to: [config.notifyTo],
    replyTo: options.replyTo ? [options.replyTo] : undefined,
    subject: options.notifySubject,
    html: notifyHtml,
    text: notifyText,
  });

  if (notifyError) {
    return { ok: false, error: notifyError.message };
  }

  const customerHtml = buildEmailHtml(
    "Bedankt voor je aanvraag",
    options.customerIntro,
    formatFieldRows({ Naam: options.customerName })
  );

  const { error: customerError } = await resend.emails.send({
    from: config.from,
    to: [options.customerEmail],
    replyTo: [config.notifyTo],
    subject: options.customerSubject,
    html: customerHtml,
    text: `${options.customerIntro}\n\nMet vriendelijke groet,\nFocus First`,
  });

  if (customerError) {
    return { ok: false, error: customerError.message };
  }

  return { ok: true };
}
