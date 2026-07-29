import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-light-gray">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-dark-gray md:flex-row">
        <p>&copy; {new Date().getFullYear()} {t("copyright")}</p>
        <div className="flex items-center gap-6">
          <a href="mailto:jonathan@focusfirst.studio" className="hover:text-near-black">
            jonathan@focusfirst.studio
          </a>
          <a
            href="#"
            className="hover:text-near-black"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-near-black"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
