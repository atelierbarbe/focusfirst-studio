/**
 * Launch tasks to finish after the production domain is linked.
 * Tracked here so we don’t lose them while shipping product work.
 */
export type DeferredTask = {
  id: string;
  title: string;
  detail: string;
  where: string;
};

export const deferredLaunchTasks: DeferredTask[] = [
  {
    id: "site-url",
    title: "Productiedomein in NEXT_PUBLIC_SITE_URL",
    detail:
      "Code default = https://www.focusfirst.be — ook zetten in Vercel env zodra DNS gelinkt is.",
    where: "Vercel env",
  },
  {
    id: "resend-domain",
    title: "Resend: focusfirst.be DNS + verify",
    detail:
      "Verified. Account jonathan@focusfirst.be · from info@focusfirst.be · key in .env.local (ook in Vercel zetten).",
    where: "Resend + Vercel env",
  },
  {
    id: "ga-id",
    title: "Echte GA4 Measurement ID",
    detail:
      "Gezet: G-10YYK7SYH2 (Consent Mode v2). Nog: DebugView controleren + Search Console koppelen.",
    where: "Vercel env + Google Analytics",
  },
  {
    id: "social-urls",
    title: "LinkedIn / GitHub URL’s",
    detail:
      "NEXT_PUBLIC_LINKEDIN_URL en NEXT_PUBLIC_GITHUB_URL zetten zodat footer/about links tonen.",
    where: "Vercel env",
  },
  {
    id: "legal-entity",
    title: "KvK / BTW / adres in privacy",
    detail:
      "Ingevuld: Jonathan Barbé · BE 0881.296.468 · J.Hammeneckerstraat 40, 1880 Kapelle-op-den-Bos.",
    where: "messages + src/lib/site.ts",
  },
  {
    id: "og-image",
    title: "OG share image",
    detail:
      "Vast og:image (1200×630) toevoegen voor social previews op het echte domein.",
    where: "public/ + metadata openGraph.images",
  },
  {
    id: "search-console",
    title: "Google Search Console",
    detail:
      "Property verifiëren, sitemap indienen (https://domein/sitemap.xml).",
    where: "Search Console na DNS",
  },
];
