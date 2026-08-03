import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Eyebrow from "@/components/Eyebrow";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL, localizedUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";
import {
  formatPostDate,
  getAllResolvedPosts,
  getBlogSlugs,
  getPostBySlug,
  resolvePost,
} from "@/content/blog";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
    image: resolved.coverImage,
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
    ...(resolved.coverImage
      ? { image: [`${SITE_URL}${resolved.coverImage}`] }
      : {}),
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

          {resolved.coverImage && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-light-gray/40">
              <Image
                src={resolved.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

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

          <div className="mt-10">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-light-gray bg-white px-4 py-2.5 text-sm font-medium text-near-black transition-colors hover:border-near-black"
            >
              <LinkedInIcon className="size-4" />
              {t("shareLinkedIn")}
            </a>
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
