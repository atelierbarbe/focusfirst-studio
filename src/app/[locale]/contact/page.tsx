import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactView from "@/components/ContactView";
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

  return (
    <section className="border-t border-light-gray">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <ContactView />
      </div>
    </section>
  );
}
