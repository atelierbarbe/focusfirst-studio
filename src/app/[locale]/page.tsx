import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Eyebrow from "@/components/Eyebrow";

type ProcessStep = {
  step: string;
  timeline: string;
  title: string;
  description: string;
};
type CaseStudy = { slug: string; title: string; description: string };
type Audience = { name: string; description: string; proposals: string[] };
type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tProcess = await getTranslations({ locale, namespace: "process" });
  const tCases = await getTranslations({ locale, namespace: "caseStudies" });
  const tAudiences = await getTranslations({ locale, namespace: "audiences" });
  const tPricing = await getTranslations({ locale, namespace: "pricing" });
  const tAbout = await getTranslations({ locale, namespace: "about" });

  const process = tProcess.raw("steps") as ProcessStep[];
  const caseStudies = tCases.raw("items") as CaseStudy[];
  const audiences = tAudiences.raw("items") as Audience[];
  const audienceExamples = tAudiences.raw("examples") as string[];
  const pricing = tPricing.raw("tiers") as PricingTier[];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-65px)] items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <Eyebrow>{tHero("eyebrow")}</Eyebrow>
            <h1 className="mt-6 text-5xl font-bold uppercase tracking-[0.5px] text-near-black md:text-7xl">
              {tHero("title")}
            </h1>
            <p className="mt-8 max-w-xl text-2xl font-semibold leading-snug text-near-black md:text-3xl">
              {tHero("tagline")}
            </p>
            <p className="mt-4 max-w-xl text-lg text-dark-gray">
              {tHero("subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded bg-near-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-gray"
              >
                {tHero("cta")}
              </Link>
              <a
                href="#process"
                className="inline-flex items-center rounded border border-dark-gray/30 px-6 py-3 text-sm font-medium text-near-black transition-colors hover:border-near-black"
              >
                {tProcess("eyebrow")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-t border-light-gray">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>{tProcess("eyebrow")}</Eyebrow>
          <div className="mt-10 divide-y divide-light-gray border-t border-light-gray">
            {process.map((item) => (
              <div
                key={item.step}
                className="relative grid gap-2 overflow-hidden py-8 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-8"
              >
                <span
                  className="pointer-events-none absolute -right-2 -top-6 hidden select-none font-mono text-[7rem] font-bold leading-none text-light-gray md:block"
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <div className="relative font-mono text-sm text-medium-gray">
                  {item.step} · {item.timeline}
                </div>
                <h3 className="relative text-xl font-semibold text-near-black">
                  {item.title}
                </h3>
                <p className="relative text-dark-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="border-t border-light-gray bg-light-gray/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>{tCases("eyebrow")}</Eyebrow>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {caseStudies.map((item) => (
              <Link
                key={item.slug}
                href={`/cases/${item.slug}`}
                className="group rounded-lg border border-light-gray bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-near-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-dark-gray">{item.description}</p>
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

      {/* Audiences */}
      <section id="audiences" className="border-t border-light-gray">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>{tAudiences("eyebrow")}</Eyebrow>
          <p className="mt-6 max-w-2xl text-lg text-dark-gray">
            {tAudiences("intro")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-medium-gray">
              {tAudiences("examplesLabel")}:
            </span>
            {audienceExamples.map((example) => (
              <span
                key={example}
                className="rounded-sm border border-light-gray bg-white px-2.5 py-1 text-sm text-dark-gray"
              >
                {example}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {audiences.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-light-gray bg-white p-8"
              >
                <h3 className="text-xl font-semibold text-near-black">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-dark-gray">{item.description}</p>
                <ul className="mt-6 space-y-3 border-t border-light-gray pt-6">
                  {item.proposals.map((proposal) => (
                    <li
                      key={proposal}
                      className="flex items-start gap-2 text-sm text-dark-gray"
                    >
                      <span className="mt-1 text-accent">→</span>
                      {proposal}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-light-gray bg-light-gray/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>{tPricing("eyebrow")}</Eyebrow>
          <p className="mt-6 max-w-2xl text-lg text-dark-gray">
            {tPricing("intro")}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.map((tier) => {
              const featured = tier.name === "Digital+";
              return (
                <div
                  key={tier.name}
                  className={`rounded-lg border p-8 transition-all ${
                    featured
                      ? "border-near-black bg-near-black text-white shadow-lg md:-translate-y-2"
                      : "border-light-gray bg-white text-near-black shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                  }`}
                >
                  <p
                    className={`font-mono text-[11px] uppercase tracking-wider ${
                      featured ? "text-white/50" : "text-medium-gray"
                    }`}
                  >
                    {tPricing("typeLabel")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{tier.name}</h3>
                  <p className="mt-2 text-3xl font-semibold">
                    {tier.price}
                    <span className="align-top text-base">*</span>
                  </p>
                  <p
                    className={`mt-3 text-sm ${
                      featured ? "text-white/70" : "text-dark-gray"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex w-full items-center justify-center rounded px-5 py-3 text-sm font-medium transition-colors ${
                      featured
                        ? "bg-white text-near-black hover:bg-light-gray"
                        : "bg-near-black text-white hover:bg-dark-gray"
                    }`}
                  >
                    {tPricing("ctaLabel")}
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-medium-gray">{tPricing("priceNote")}</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-light-gray">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>{tAbout("eyebrow")}</Eyebrow>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-2">
              <p className="text-lg text-dark-gray">{tAbout("bio")}</p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded bg-near-black px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-dark-gray"
              >
                {tAbout("contactCta")}
              </Link>
              <a
                href={`mailto:${tAbout("email")}`}
                className="text-near-black underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                {tAbout("email")}
              </a>
              <a href="#" className="text-dark-gray hover:text-near-black">
                {tAbout("linkedinLabel")}
              </a>
              <a href="#" className="text-dark-gray hover:text-near-black">
                {tAbout("githubLabel")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
