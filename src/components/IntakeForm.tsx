"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type SubmitStatus = "idle" | "loading" | "success" | "error";

type Option = { value: string; label: string };
type ScopeOption = Option & { tierName: string };
type Tier = {
  name: string;
  price: string;
  duration: string;
  description: string;
};

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-near-black">{legend}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center rounded border border-light-gray bg-white p-4 text-sm text-dark-gray transition-colors has-[:checked]:border-near-black has-[:checked]:bg-cream has-[:checked]:text-near-black"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function IntakeForm() {
  const t = useTranslations("contact.intake");
  const tPricing = useTranslations("pricing");
  const locale = useLocale();

  const orgOptions = t.raw("orgOptions") as Option[];
  const scopeOptions = t.raw("scopeOptions") as ScopeOption[];
  const timelineOptions = t.raw("timelineOptions") as Option[];
  const tiers = tPricing.raw("tiers") as Tier[];

  const [org, setOrg] = useState("");
  const [scope, setScope] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [consent, setConsent] = useState(false);

  const selectedScope = scopeOptions.find((o) => o.value === scope);
  const matchedTier = selectedScope
    ? tiers.find((tier) => tier.name === selectedScope.tierName)
    : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!org || !scope || !timeline || !name || !email || !message) {
      setSubmitError("Please fill in all fields");
      return;
    }

    if (!consent) {
      setSubmitError(t("consentRequired"));
      return;
    }

    setSubmitStatus("loading");
    setSubmitError("");

    const orgLabel = orgOptions.find((o) => o.value === org)?.label ?? "";
    const scopeLabel = selectedScope?.label ?? "";
    const timelineLabel =
      timelineOptions.find((o) => o.value === timeline)?.label ?? "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          org,
          scope,
          timeline,
          name,
          email,
          message,
          orgLabel,
          scopeLabel,
          timelineLabel,
          tierName: matchedTier?.name,
          tierPrice: matchedTier?.price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send inquiry");
      }

      setSubmitStatus("success");
      setOrg("");
      setScope("");
      setTimeline("");
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send inquiry"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <RadioGroup
        legend={t("orgLabel")}
        name="org"
        options={orgOptions}
        value={org}
        onChange={setOrg}
      />
      <RadioGroup
        legend={t("scopeLabel")}
        name="scope"
        options={scopeOptions}
        value={scope}
        onChange={setScope}
      />
      <RadioGroup
        legend={t("timelineLabel")}
        name="timeline"
        options={timelineOptions}
        value={timeline}
        onChange={setTimeline}
      />

      <div className="rounded-lg border border-light-gray bg-light-gray/40 p-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
          {t("estimateHeading")}
        </h3>
        {matchedTier ? (
          <div className="mt-3">
            <p className="text-2xl font-semibold text-near-black">
              {matchedTier.name} · {matchedTier.price}
            </p>
            <p className="mt-1 text-sm text-dark-gray">
              {matchedTier.duration} {t("estimateDuration")}
            </p>
            <p className="mt-3 text-sm text-medium-gray">{t("estimateNote")}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-dark-gray">{t("estimatePlaceholder")}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-near-black">
            {t("formNameLabel")}
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded border border-light-gray bg-white px-4 py-3 text-sm text-near-black outline-none transition-colors focus:border-near-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-near-black">
            {t("formEmailLabel")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded border border-light-gray bg-white px-4 py-3 text-sm text-near-black outline-none transition-colors focus:border-near-black"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-near-black">
          {t("formMessageLabel")}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t("formMessagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full rounded border border-light-gray bg-white px-4 py-3 text-sm text-near-black outline-none transition-colors focus:border-near-black"
        />
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-light-gray bg-light-gray/40 p-4">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 flex-shrink-0"
          required
        />
        <span className="text-sm text-dark-gray leading-relaxed">
          {t("consentLabel")}{" "}
          <a
            href={`/${locale}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-near-black hover:underline"
          >
            {t("consentLabelLink1")}
          </a>
          {" en "}{" "}
          <a
            href={`/${locale}/cookies`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-near-black hover:underline"
          >
            {t("consentLabelLink2")}
          </a>
          .
        </span>
      </label>

      <div>
        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="inline-flex items-center rounded bg-near-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-gray disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitStatus === "loading" ? "Sending..." : t("formSubmitLabel")}
        </button>

        {submitStatus === "success" && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-800">
              ✓ Thanks! We've received your inquiry and will be in touch within 24 hours.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">
              ✗ Error: {submitError}. Please try again.
            </p>
          </div>
        )}

        <p className="mt-3 text-xs text-medium-gray">
          Emails are sent securely via Resend.
        </p>
      </div>
    </form>
  );
}
