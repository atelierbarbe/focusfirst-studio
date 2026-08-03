"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { trackPageView, updateConsent } from "@/components/Analytics";

type ConsentState = "pending" | "accepted" | "rejected";

const CONSENT_KEY = "cookie-consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export default function CookieConsent() {
  const t = useTranslations("cookies.banner");
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      void updateConsent(stored === "accepted");
    }

    const openSettings = () => setConsent("pending");
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const blocking = mounted && consent === "pending";

  useEffect(() => {
    if (!blocking) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const acceptButton = dialogRef.current?.querySelector<HTMLElement>(
      "[data-cookie-accept]",
    );
    acceptButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [blocking]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    void updateConsent(true).then(() => {
      void trackPageView(window.location.pathname + window.location.search);
    });
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
    void updateConsent(false);
  };

  if (!blocking) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Blocks interaction with the page until a choice is made */}
      <div
        className="absolute inset-0 bg-near-black/40"
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-near-black p-4 text-white sm:p-6"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h3 id={titleId} className="font-semibold">
                {t("title")}
              </h3>
              <p id={descriptionId} className="mt-1 text-sm text-gray-300">
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
                data-cookie-accept
                onClick={handleAccept}
                className="rounded bg-white px-4 py-2 text-sm font-medium text-near-black transition-colors hover:bg-gray-100"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
