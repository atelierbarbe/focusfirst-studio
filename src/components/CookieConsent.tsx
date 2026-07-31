"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ConsentState = "pending" | "accepted" | "rejected";

export default function CookieConsent() {
  const t = useTranslations("cookies.banner");
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cookie-consent");
    if (stored) {
      setConsent(stored as ConsentState);
      // Notify GA of consent status
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: stored === "accepted" ? "granted" : "denied",
        });
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    // Notify GA
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
    // Notify GA
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  if (!mounted || consent !== "pending") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-near-black p-4 text-white sm:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">{t("title")}</h3>
            <p className="mt-1 text-sm text-gray-300">{t("description")}</p>
            <Link
              href="/cookies"
              className="mt-2 inline-text-sm text-gray-400 hover:text-white hover:underline"
            >
              {t("link")} →
            </Link>
          </div>
          <div className="flex gap-3 sm:flex-shrink-0">
            <button
              onClick={handleReject}
              className="rounded border border-gray-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900"
            >
              {t("rejectAll")}
            </button>
            <button
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
