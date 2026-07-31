import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal.cookies" });

  return (
    <section className="border-t border-light-gray">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="text-sm text-dark-gray transition-colors hover:text-near-black"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-near-black md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-medium-gray">
          Last updated: {t("lastUpdated")}
        </p>

        <div className="mt-12 space-y-8">
          {(t.raw("sections") as Array<{ heading: string; content: string }>).map(
            (section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-near-black">
                  {section.heading}
                </h2>
                <p className="mt-3 text-dark-gray leading-relaxed">
                  {section.content}
                </p>
              </div>
            )
          )}
        </div>

        <div className="mt-12 rounded-lg border border-light-gray bg-light-gray/40 p-6">
          <p className="text-sm text-dark-gray">
            Questions about cookies? Contact us at{" "}
            <a
              href="mailto:jonathan@focusfirst.studio"
              className="font-medium text-near-black hover:underline"
            >
              jonathan@focusfirst.studio
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
