"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = {
  nl: "NL",
  en: "EN",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded border border-light-gray p-1 text-xs font-mono">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={locale === loc}
          className={`rounded-sm px-2.5 py-1 transition-colors ${
            locale === loc
              ? "bg-near-black text-white"
              : "text-dark-gray hover:text-near-black"
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
