"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-light-gray">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-dark-gray">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-6 text-sm">
              <a
                href="mailto:jonathan@focusfirst.studio"
                className="text-dark-gray transition-colors hover:text-near-black"
              >
                jonathan@focusfirst.studio
              </a>
              <a
                href="#"
                className="text-dark-gray transition-colors hover:text-near-black"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-dark-gray transition-colors hover:text-near-black"
              >
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-4 border-t border-light-gray pt-6 text-xs text-medium-gray sm:border-t-0 sm:pt-0">
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors hover:text-dark-gray"
              >
                {t("privacy")}
              </Link>
              <span className="text-light-gray">·</span>
              <Link
                href={`/${locale}/terms`}
                className="transition-colors hover:text-dark-gray"
              >
                {t("terms")}
              </Link>
              <span className="text-light-gray">·</span>
              <Link
                href={`/${locale}/cookies`}
                className="transition-colors hover:text-dark-gray"
              >
                {t("cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
