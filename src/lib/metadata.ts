import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, languageAlternates, localizedUrl } from "./site";

type BuildMetadataOptions = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  /** Absolute path under public, e.g. /blog/cover.jpg */
  image?: string;
  /** When true, use title as absolute (no template suffix). */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const url = localizedUrl(locale, path);
  const ogLocale = locale === "nl" ? "nl_BE" : "en_US";
  const images = image ? [{ url: image }] : undefined;

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
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
