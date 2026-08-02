import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Eyebrow from "@/components/Eyebrow";
import { buildMetadata } from "@/lib/metadata";
import { formatPostDate, getAllResolvedPosts } from "@/content/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: t("blogTitle"),
    description: t("blogDescription"),
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllResolvedPosts(locale);

  return (
    <section className="border-t border-light-gray">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-6 text-4xl font-bold text-near-black md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-dark-gray">{t("subtitle")}</p>

        <ul className="mt-14 divide-y divide-light-gray border-t border-light-gray">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-8 transition-colors hover:bg-light-gray/30"
              >
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-xs uppercase tracking-wider text-medium-gray"
                >
                  {formatPostDate(post.publishedAt, locale)}
                </time>
                <h2 className="mt-3 text-2xl font-semibold text-near-black group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-2xl text-dark-gray">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                  {t("readLabel")}
                  <span className="ml-1 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
