import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Eyebrow from "@/components/Eyebrow";
import { routing } from "@/i18n/routing";
import nlMessages from "../../../../../messages/nl.json";

type CaseStudy = { slug: string; title: string; description: string };
type CaseDetail = {
  context: string;
  problem: string;
  approach: string;
  solution: string;
  outcome: string;
};

const caseSlugs = (nlMessages.caseStudies.items as CaseStudy[]).map(
  (item) => item.slug
);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseSlugs.map((slug) => ({ locale, slug }))
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tCases = await getTranslations({ locale, namespace: "caseStudies" });
  const items = tCases.raw("items") as CaseStudy[];
  const pages = tCases.raw("pages") as Record<string, CaseDetail>;

  const item = items.find((i) => i.slug === slug);
  const detail = pages[slug];
  if (!item || !detail) {
    notFound();
  }

  const otherCases = items.filter((i) => i.slug !== slug);

  const sections: { label: string; text: string }[] = [
    { label: tCases("detail.contextLabel"), text: detail.context },
    { label: tCases("detail.problemLabel"), text: detail.problem },
    { label: tCases("detail.approachLabel"), text: detail.approach },
    { label: tCases("detail.solutionLabel"), text: detail.solution },
    { label: tCases("detail.outcomeLabel"), text: detail.outcome },
  ];

  return (
    <>
      <section className="border-b border-light-gray">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Link
            href="/#work"
            className="text-sm text-dark-gray transition-colors hover:text-near-black"
          >
            ← {tCases("detail.backLabel")}
          </Link>
          <div className="mt-8">
            <Eyebrow>{tCases("eyebrow")}</Eyebrow>
            <h1 className="mt-6 text-3xl font-bold text-near-black md:text-5xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-dark-gray">
              {item.description}
            </p>
          </div>

          {/* Screenshot placeholders */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-medium-gray/50 bg-light-gray/40"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-medium-gray">
                  {tCases("detail.screenshotPlaceholder")}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-8 inline-flex items-center rounded bg-near-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-gray"
          >
            {tCases("detail.linkLabel")} →
          </a>
        </div>
      </section>

      <section className="border-b border-light-gray">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="divide-y divide-light-gray border-t border-light-gray">
            {sections.map((s) => (
              <div
                key={s.label}
                className="grid gap-2 py-8 md:grid-cols-[1fr_2fr] md:gap-8"
              >
                <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
                  {s.label}
                </h2>
                <p className="text-dark-gray">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <Eyebrow>{tCases("detail.otherLabel")}</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {otherCases.map((other) => (
              <Link
                key={other.slug}
                href={`/cases/${other.slug}`}
                className="group rounded-lg border border-light-gray bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-near-black">
                  {other.title}
                </h3>
                <p className="mt-2 text-sm text-dark-gray">
                  {other.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                  {tCases("viewLabel")}
                  <span className="ml-1 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
