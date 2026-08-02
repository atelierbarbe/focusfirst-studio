import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, languageAlternates, localizedUrl } from "./site";

type BuildMetadataOptions = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  /** When true, use title as absolute (no template suffix). */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const url = localizedUrl(locale, path);
  const ogLocale = locale === "nl" ? "nl_BE" : "en_US";

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
