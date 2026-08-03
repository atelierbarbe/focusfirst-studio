import { blogPosts, type BlogPost, type Locale, type LocalizedPost } from "./posts";

export type { BlogPost, Locale, LocalizedPost, BlogSection } from "./posts";
export { blogPosts } from "./posts";

export type ResolvedPost = {
  slug: string;
  publishedAt: string;
  tags: string[];
  locale: Locale;
  title: string;
  description: string;
  socialSnippet: string;
  coverImage?: string;
  sections: LocalizedPost["sections"];
};

export function getBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function resolvePost(
  post: BlogPost,
  locale: string
): ResolvedPost {
  const loc: Locale = locale === "en" ? "en" : "nl";
  const localized = post[loc];
  return {
    slug: post.slug,
    publishedAt: post.publishedAt,
    tags: post.tags,
    locale: loc,
    title: localized.title,
    description: localized.description,
    socialSnippet: localized.socialSnippet,
    coverImage: post.coverImage,
    sections: localized.sections,
  };
}

export function getAllResolvedPosts(locale: string): ResolvedPost[] {
  return blogPosts
    .map((post) => resolvePost(post, locale))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function formatPostDate(date: string, locale: string): string {
  const value = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "nl-BE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}
