import { NextResponse } from "next/server";

export const MAX_FIELD_LENGTH = 500;
export const MAX_TEXTAREA_LENGTH = 5000;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function trimString(value: unknown, maxLength = MAX_FIELD_LENGTH): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function hasValidConsent(value: unknown): boolean {
  return value === true || value === "true";
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export function isRateLimited(request: Request): boolean {
  const ip = getClientIp(request);
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export function publicApiError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

export function maskEmailError(error: string, isProduction: boolean): string {
  if (!isProduction) return error;
  if (error === "E-mail is niet geconfigureerd.") return error;
  return "Verzenden mislukt. Probeer later opnieuw of mail info@focusfirst.be.";
}
