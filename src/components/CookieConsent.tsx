"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { trackPageView, updateConsent } from "@/components/Analytics";

type ConsentState = "pending" | "accepted" | "rejected";

const CONSENT_KEY = "cookie-consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export default function CookieConsent() {
  const t = useTranslations("cookies.banner");
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      updateConsent(stored === "accepted");
    }

    const openSettings = () => setConsent("pending");
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    updateConsent(true);
    trackPageView(window.location.pathname + window.location.search);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
    updateConsent(false);
  };

  if (!mounted || consent !== "pending") {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700 bg-near-black p-4 text-white sm:p-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 id="cookie-consent-title" className="font-semibold">
              {t("title")}
            </h3>
            <p
              id="cookie-consent-description"
              className="mt-1 text-sm text-gray-300"
            >
              {t("description")}
            </p>
            <Link
              href="/cookies"
              className="mt-2 inline-block text-sm text-gray-400 hover:text-white hover:underline"
            >
              {t("link")} →
            </Link>
          </div>
          <div className="flex gap-3 sm:flex-shrink-0">
            <button
              type="button"
              onClick={handleReject}
              className="rounded border border-gray-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            >
              {t("rejectAll")}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="rounded bg-white px-4 py-2 text-sm font-medium text-near-black transition-colors hover:bg-gray-100"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
