"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "cookie-consent";

function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function waitForGtag(timeoutMs = 4000): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (typeof window.gtag === "function") return Promise.resolve(true);

  return new Promise((resolve) => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (typeof window.gtag === "function") {
        window.clearInterval(timer);
        resolve(true);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 50);
  });
}

export async function updateConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const ready = await waitForGtag();
  if (!ready) return;

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export async function trackPageView(url: string) {
  if (!GA_ID?.startsWith("G-") || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const ready = await waitForGtag();
  if (!ready) return;

  // Ensure Consent Mode is granted before the hit (returning visitors).
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.origin + url,
    send_to: GA_ID,
  });
}

/** Tracks App Router navigations after analytics consent. */
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    void trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
