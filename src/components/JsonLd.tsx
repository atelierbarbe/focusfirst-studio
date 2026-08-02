import { CONTACT_EMAIL, LEGAL_ENTITY, SITE_NAME, SITE_URL } from "@/lib/site";

export default function JsonLd({ locale }: { locale: string }) {
  const description =
    locale === "nl"
      ? "Van idee naar werkend proof of concept in 6–8 weken. AI-versneld digitaal lab."
      : "From idea to working proof of concept in 6–8 weeks. AI-accelerated digital lab.";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: LEGAL_ENTITY.tradeName,
        legalName: LEGAL_ENTITY.name,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        vatID: LEGAL_ENTITY.vat.replace(/\s/g, ""),
        description,
        address: {
          "@type": "PostalAddress",
          streetAddress: LEGAL_ENTITY.street,
          postalCode: LEGAL_ENTITY.postalCode,
          addressLocality: LEGAL_ENTITY.city,
          addressCountry: LEGAL_ENTITY.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} Digital Lab`,
        description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: [locale === "nl" ? "nl-BE" : "en"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: LEGAL_ENTITY.tradeName,
        url: SITE_URL,
        description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "BE",
        serviceType: "Digital product design and development",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
