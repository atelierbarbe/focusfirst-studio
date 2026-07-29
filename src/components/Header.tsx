import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/#process", label: t("process") },
    { href: "/#work", label: t("work") },
    { href: "/#audiences", label: t("audiences") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/#about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-sm font-bold uppercase tracking-[0.5px] text-near-black">
            Focus First
          </span>
          <span className="text-[11px] text-medium-gray">Digital Lab</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-dark-gray transition-colors hover:text-near-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="rounded bg-near-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dark-gray"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </header>
  );
}
