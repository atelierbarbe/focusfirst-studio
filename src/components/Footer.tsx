"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const linkClass =
  "text-accent-dark transition-colors hover:text-near-black";
const separatorClass = "text-accent-dark/40";

export default function Footer() {
  const t = useTranslations("footer");

  const openCookieSettings = () => {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
  };

  const hasSocial = Boolean(LINKEDIN_URL || GITHUB_URL);

  return (
    <footer className="border-t border-accent-dark/20 bg-accent/50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-accent-dark">{`© ${new Date().getFullYear()} ${t("copyright")}`}</p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {hasSocial && (
              <div className="flex flex-wrap items-center gap-6 text-sm">
                {LINKEDIN_URL && (
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                )}
                {GITHUB_URL && (
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}

            <div
              className={`flex flex-wrap items-center gap-4 text-xs ${hasSocial ? "border-t border-accent-dark/20 pt-6 sm:border-t-0 sm:pt-0" : ""}`}
            >
              <Link href="/blog" className={linkClass}>
                {t("blog")}
              </Link>
              <span className={separatorClass}>·</span>
              <Link href="/privacy" className={linkClass}>
                {t("privacy")}
              </Link>
              <span className={separatorClass}>·</span>
              <Link href="/terms" className={linkClass}>
                {t("terms")}
              </Link>
              <span className={separatorClass}>·</span>
              <Link href="/cookies" className={linkClass}>
                {t("cookies")}
              </Link>
              <span className={separatorClass}>·</span>
              <button
                type="button"
                onClick={openCookieSettings}
                className={linkClass}
              >
                {t("cookieSettings")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
