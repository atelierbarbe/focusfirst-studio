import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Eyebrow from "@/components/Eyebrow";
import IntakeForm from "@/components/IntakeForm";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="border-t border-light-gray">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-6 text-4xl font-bold text-near-black md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-dark-gray">{t("subtitle")}</p>

        <div className="mt-10 rounded-lg border border-light-gray bg-light-gray/40 p-6">
          <p className="text-sm text-dark-gray">{t("serviceIntro")}</p>
        </div>

        <div className="mt-12">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
