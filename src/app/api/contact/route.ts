import { NextResponse } from "next/server";
import { sendFormEmails } from "@/lib/email/send";
import {
  hasValidConsent,
  isRateLimited,
  isValidEmail,
  maskEmailError,
  publicApiError,
  trimString,
  MAX_TEXTAREA_LENGTH,
} from "@/lib/api/form-security";

const isProduction = process.env.NODE_ENV === "production";

interface ContactFormData {
  org?: string;
  scope?: string;
  timeline?: string;
  name?: string;
  email?: string;
  message?: string;
  orgLabel?: string;
  scopeLabel?: string;
  timelineLabel?: string;
  tierName?: string;
  tierPrice?: string;
  consent?: boolean | string;
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return publicApiError("Te veel aanvragen. Probeer later opnieuw.", 429);
    }

    const body = (await request.json()) as ContactFormData;

    const name = trimString(body.name);
    const email = trimString(body.email, 254);
    const message = trimString(body.message, MAX_TEXTAREA_LENGTH);
    const orgLabel = trimString(body.orgLabel);
    const scopeLabel = trimString(body.scopeLabel);
    const timelineLabel = trimString(body.timelineLabel);
    const tierName = trimString(body.tierName);
    const tierPrice = trimString(body.tierPrice);

    if (
      !name ||
      !isValidEmail(email) ||
      !message ||
      !orgLabel ||
      !scopeLabel ||
      !timelineLabel
    ) {
      return publicApiError("Vul alle verplichte velden in.");
    }

    if (!hasValidConsent(body.consent)) {
      return publicApiError(
        "Geef toestemming voor de verwerking van je gegevens."
      );
    }

    const estimate =
      tierName && tierPrice ? `${tierName} (${tierPrice})` : undefined;

    const result = await sendFormEmails({
      notifySubject: `Nieuwe projectaanvraag — ${name}`,
      notifyTitle: "Nieuwe projectaanvraag",
      notifyIntro:
        "Er is een nieuwe aanvraag binnengekomen via het contactformulier op focusfirst.be.",
      notifyFields: {
        Naam: name,
        "E-mail": email,
        Organisatie: orgLabel,
        Scope: scopeLabel,
        Timing: timelineLabel,
        Inschatting: estimate,
        Bericht: message,
        "Privacy-toestemming": "Ja",
      },
      customerEmail: email,
      customerName: name,
      customerSubject: "We hebben je projectaanvraag ontvangen — Focus First",
      customerIntro:
        "Bedankt voor je bericht. We bekijken je aanvraag en nemen binnen 24 uur persoonlijk contact op.",
      replyTo: email,
    });

    if (!result.ok) {
      console.error("Contact e-mail mislukt:", result.error);
      const status =
        result.error === "E-mail is niet geconfigureerd." ? 503 : 500;
      return NextResponse.json(
        { error: maskEmailError(result.error, isProduction) },
        { status }
      );
    }

    return NextResponse.json({ ok: true, success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return publicApiError("Er ging iets mis.", 500);
  }
}
