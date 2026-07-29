"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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

  const selectedScope = scopeOptions.find((o) => o.value === scope);
  const matchedTier = selectedScope
    ? tiers.find((tier) => tier.name === selectedScope.tierName)
    : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orgLabel = orgOptions.find((o) => o.value === org)?.label ?? "";
    const scopeLabel = selectedScope?.label ?? "";
    const timelineLabel =
      timelineOptions.find((o) => o.value === timeline)?.label ?? "";

    const bodyLines = [
      `${t("orgLabel")} ${orgLabel}`,
      `${t("scopeLabel")} ${scopeLabel}`,
      `${t("timelineLabel")} ${timelineLabel}`,
      matchedTier ? `${t("estimateHeading")}: ${matchedTier.name} (${matchedTier.price})` : "",
      "",
      `${t("formNameLabel")}: ${name}`,
      `${t("formEmailLabel")}: ${email}`,
      "",
      message,
    ].filter(Boolean);

    const subject = encodeURIComponent(t("formSubject"));
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:jonathan@focusfirst.studio?subject=${subject}&body=${body}`;
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

      <div>
        <button
          type="submit"
          className="inline-flex items-center rounded bg-near-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-gray"
        >
          {t("formSubmitLabel")}
        </button>
        <p className="mt-3 text-xs text-medium-gray">{t("formNote")}</p>
      </div>
    </form>
  );
}
