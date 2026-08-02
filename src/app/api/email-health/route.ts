import { NextResponse } from "next/server";
import { getEmailConfig } from "@/lib/email/config";

const isProduction = process.env.NODE_ENV === "production";

/** Health check — geen secrets. In productie geen e-mailadressen blootstellen. */
export async function GET() {
  const config = getEmailConfig();

  if (!config) {
    return NextResponse.json({
      ok: false,
      configured: false,
      hasApiKey: Boolean(process.env.RESEND_API_KEY),
      hasFrom: Boolean(process.env.RESEND_FROM),
      hasNotifyTo: Boolean(process.env.RESEND_NOTIFY_TO),
    });
  }

  if (isProduction) {
    return NextResponse.json({
      ok: true,
      configured: true,
    });
  }

  const fromMatch = config.from.match(/<([^>]+)>/);
  const fromEmail = fromMatch?.[1] ?? config.from;

  return NextResponse.json({
    ok: true,
    configured: true,
    fromEmail,
    notifyTo: config.notifyTo,
  });
}
