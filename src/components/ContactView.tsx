"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Eyebrow from "@/components/Eyebrow";
import IntakeForm from "@/components/IntakeForm";
import { useRouter } from "@/i18n/navigation";

export default function ContactView() {
  const t = useTranslations("contact");
  const tIntake = useTranslations("contact.intake");
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => {
      router.push("/");
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [submitted, router]);

  if (submitted) {
    return (
      <div
        className="flex min-h-[50vh] flex-col justify-center py-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          {tIntake("successEyebrow")}
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-[0.5px] text-near-black md:text-5xl">
          {tIntake("successTitle")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-dark-gray md:text-xl">
          {tIntake("successBody")}
        </p>
        <p className="mt-10 font-mono text-xs uppercase tracking-wider text-medium-gray">
          {tIntake("successRedirect")}
        </p>
      </div>
    );
  }

  return (
    <>
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h1 className="mt-6 text-4xl font-bold text-near-black md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-dark-gray">{t("subtitle")}</p>

      <div className="mt-12">
        <IntakeForm onSuccess={() => setSubmitted(true)} />
      </div>
    </>
  );
}
