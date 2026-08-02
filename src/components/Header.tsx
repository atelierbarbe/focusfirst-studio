"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#process", label: t("process") },
    { href: "/#work", label: t("work") },
    { href: "/#audiences", label: t("audiences") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/blog", label: t("blog") },
    { href: "/#about", label: t("about") },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight" onClick={closeMenu}>
          <span className="text-sm font-bold uppercase tracking-[0.5px] text-near-black">
            Focus First
          </span>
          <span className="text-[11px] text-medium-gray">Digital Lab</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
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

        <div className="flex items-center gap-3 sm:gap-4">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="hidden rounded bg-near-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dark-gray sm:inline-flex"
            onClick={closeMenu}
          >
            {t("contact")}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-light-gray text-near-black md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? t("closeMenu") : t("openMenu")}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-light-gray bg-cream px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded px-2 py-3 text-base text-dark-gray transition-colors hover:bg-light-gray/60 hover:text-near-black"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                className="block rounded bg-near-black px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-dark-gray"
                onClick={closeMenu}
              >
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
