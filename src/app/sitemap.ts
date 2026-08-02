import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/content/blog";
import { CASE_SLUGS, SITE_URL, localizedUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/contact",
  "/blog",
  "/privacy",
  "/cookies",
  "/terms",
] as const;

function entry(
  locale: string,
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(locale, path),
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        nl: localizedUrl("nl", path),
        en: localizedUrl("en", path),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const blogSlugs = getBlogSlugs();

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push(
        entry(locale, path, {
          changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
          priority:
            path === "" ? 1 : path === "/contact" || path === "/blog" ? 0.9 : 0.5,
          lastModified: now,
        })
      );
    }

    for (const slug of CASE_SLUGS) {
      entries.push(
        entry(locale, `/cases/${slug}`, {
          changeFrequency: "monthly",
          priority: 0.8,
          lastModified: now,
        })
      );
    }

    for (const slug of blogSlugs) {
      entries.push(
        entry(locale, `/blog/${slug}`, {
          changeFrequency: "monthly",
          priority: 0.75,
          lastModified: now,
        })
      );
    }
  }

  return entries.map((item) => ({
    ...item,
    url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
  }));
}
