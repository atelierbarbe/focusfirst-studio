import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Eyebrow from "@/components/Eyebrow";
import { buildMetadata } from "@/lib/metadata";
import { localizedUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";
import {
  formatPostDate,
  getAllResolvedPosts,
  getBlogSlugs,
  getPostBySlug,
  resolvePost,
} from "@/content/blog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBlogSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const resolved = resolvePost(post, locale);
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: resolved.title,
    description: resolved.description,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const resolved = resolvePost(post, locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const others = getAllResolvedPosts(locale).filter((p) => p.slug !== slug);

  const pageUrl = localizedUrl(locale, `/blog/${slug}`);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resolved.title,
    description: resolved.description,
    datePublished: resolved.publishedAt,
    dateModified: resolved.publishedAt,
    inLanguage: locale === "en" ? "en" : "nl-BE",
    author: {
      "@type": "Organization",
      name: "Focus First Digital Lab",
      url: localizedUrl("nl", ""),
    },
    publisher: {
      "@type": "Organization",
      name: "Focus First Digital Lab",
      url: localizedUrl("nl", ""),
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <article className="border-b border-light-gray">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href="/blog"
            className="text-sm text-dark-gray transition-colors hover:text-near-black"
          >
            ← {t("backLabel")}
          </Link>

          <div className="mt-8">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="mt-6 text-3xl font-bold text-near-black md:text-5xl">
              {resolved.title}
            </h1>
            <time
              dateTime={resolved.publishedAt}
              className="mt-4 block font-mono text-xs uppercase tracking-wider text-medium-gray"
            >
              {formatPostDate(resolved.publishedAt, locale)}
            </time>
            <p className="mt-6 text-lg text-dark-gray">{resolved.description}</p>
          </div>

          <div className="mt-12 space-y-10">
            {resolved.sections.map((section, index) => (
              <section key={index}>
                {section.heading && (
                  <h2 className="text-xl font-semibold text-near-black">
                    {section.heading}
                  </h2>
                )}
                <div className={section.heading ? "mt-4 space-y-4" : "space-y-4"}>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-dark-gray leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-lg border border-light-gray bg-light-gray/40 p-6">
            <p className="text-sm font-medium text-near-black">{t("ctaHeading")}</p>
            <p className="mt-2 text-sm text-dark-gray">{t("ctaBody")}</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center rounded bg-near-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-gray"
            >
              {t("ctaLabel")}
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section>
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <Eyebrow>{t("otherLabel")}</Eyebrow>
            <ul className="mt-8 space-y-6">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group block rounded-lg border border-light-gray bg-white p-6 transition-colors hover:border-accent"
                  >
                    <h2 className="text-lg font-semibold text-near-black group-hover:text-accent">
                      {other.title}
                    </h2>
                    <p className="mt-2 text-sm text-dark-gray">
                      {other.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
