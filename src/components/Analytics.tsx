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

export function trackPageView(url: string) {
  if (!GA_ID?.startsWith("G-") || typeof window === "undefined" || !window.gtag) {
    return;
  }
  if (!hasAnalyticsConsent()) {
    return;
  }
  window.gtag("event", "page_view", {
    page_path: url,
    send_to: GA_ID,
  });
}

export function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
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
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
