export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.focusfirst.be";

export const SITE_NAME = "Focus First";

export const CONTACT_EMAIL = "info@focusfirst.be";

/** Display + tel: href (E.164 without spaces) */
export const CONTACT_PHONE = {
  display: "+32 475 43 73 43",
  href: "+32475437343",
} as const;

/** Legal entity (eenmanszaak) — used in privacy / structured data */
export const LEGAL_ENTITY = {
  name: "Jonathan Barbé",
  tradeName: "Focus First Digital Lab",
  vat: "BE 0881.296.468",
  street: "J.Hammeneckerstraat 40",
  postalCode: "1880",
  city: "Kapelle-op-den-Bos",
  country: "BE",
} as const;

export const CASE_SLUGS = [
  "treepin",
  "studio-huis",
  "greenlight-beheer",
  "multiplugin",
  "iot-water-meters",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

/** Path without locale prefix, e.g. "", "/contact", "/cases/treepin" */
export function localizedUrl(locale: string, path = ""): string {
  const normalized = path === "/" ? "" : path;
  if (locale === "nl") {
    return normalized ? `${SITE_URL}${normalized}` : SITE_URL;
  }
  return normalized
    ? `${SITE_URL}/${locale}${normalized}`
    : `${SITE_URL}/${locale}`;
}

export function languageAlternates(path = "") {
  const normalized = path === "/" ? "" : path;
  return {
    nl: localizedUrl("nl", normalized),
    en: localizedUrl("en", normalized),
    "x-default": localizedUrl("nl", normalized),
  };
}
