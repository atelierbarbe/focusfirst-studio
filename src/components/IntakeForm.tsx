"use client";

import { useState, type ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Coins, Rocket, Tag, type LucideIcon } from "lucide-react";

type SubmitStatus = "idle" | "loading" | "error";

type Option = { value: string; label: string };
type AmbitionOption = Option & { description: string };

const AMBITION_TINTS: Record<string, string> = {
  process: "bg-[#f0eee8]",
  sector: "bg-accent-light",
  world: "bg-[#e8f0ec]",
};

function FieldHeading({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <legend className="flex items-center gap-2 text-sm font-semibold text-near-black">
      {Icon ? (
        <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.75} />
      ) : null}
      {children}
    </legend>
  );
}

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  icon,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
}) {
  return (
    <fieldset>
      <FieldHeading icon={icon}>{legend}</FieldHeading>
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

function AmbitionGroup({
  legend,
  intro,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  intro: string;
  name: string;
  options: AmbitionOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <FieldHeading icon={Rocket}>{legend}</FieldHeading>
      <p className="mt-2 text-sm text-dark-gray">{intro}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          const tint = AMBITION_TINTS[opt.value] ?? "bg-cream";
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer flex-col rounded border p-3 text-sm transition-colors ${tint} ${
                selected
                  ? "border-near-black text-near-black"
                  : "border-light-gray text-dark-gray hover:border-medium-gray"
              }`}
              style={{ borderWidth: "0.5px" }}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
                required
              />
              <span className="font-semibold text-near-black">{opt.label}</span>
              <span className="mt-1 text-xs leading-relaxed text-dark-gray">
                {opt.description}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function IntakeForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const t = useTranslations("contact.intake");
  const locale = useLocale();

  const orgOptions = t.raw("orgOptions") as Option[];
  const budgetOptions = t.raw("budgetOptions") as Option[];
  const ambitionOptions = t.raw("ambitionOptions") as AmbitionOption[];
  const scopeOptions = t.raw("scopeOptions") as Option[];
  const timelineOptions = t.raw("timelineOptions") as Option[];

  const [org, setOrg] = useState("");
  const [sector, setSector] = useState("");
  const [budget, setBudget] = useState("");
  const [ambition, setAmbition] = useState("");
  const [scope, setScope] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !org ||
      !budget ||
      !ambition ||
      !scope ||
      !timeline ||
      !name ||
      !email ||
      !message
    ) {
      setSubmitError(t("fillAll"));
      return;
    }

    if (!consent) {
      setSubmitError(t("consentRequired"));
      return;
    }

    setSubmitStatus("loading");
    setSubmitError("");

    const orgLabel = orgOptions.find((o) => o.value === org)?.label ?? "";
    const budgetLabel =
      budgetOptions.find((o) => o.value === budget)?.label ?? "";
    const ambitionOption = ambitionOptions.find((o) => o.value === ambition);
    const ambitionLabel = ambitionOption
      ? `${ambitionOption.label} — ${ambitionOption.description}`
      : "";
    const scopeLabel = scopeOptions.find((o) => o.value === scope)?.label ?? "";
    const timelineLabel =
      timelineOptions.find((o) => o.value === timeline)?.label ?? "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          org,
          sector,
          budget,
          budgetLabel,
          ambition,
          ambitionLabel,
          scope,
          timeline,
          name,
          email,
          message,
          orgLabel,
          scopeLabel,
          timelineLabel,
          consent,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error || t("errorRetry"));
      }

      onSuccess?.();
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

      <div>
        <label
          htmlFor="sector"
          className="flex items-center gap-2 text-sm font-semibold text-near-black"
        >
          <Tag className="size-4 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.75} />
          {t("sectorLabel")}
        </label>
        <input
          id="sector"
          type="text"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          placeholder={t("sectorPlaceholder")}
          className="mt-3 w-full rounded border border-light-gray bg-white px-4 py-3 text-sm text-near-black outline-none transition-colors placeholder:text-medium-gray focus:border-near-black"
        />
      </div>

      <RadioGroup
        legend={t("budgetLabel")}
        name="budget"
        options={budgetOptions}
        value={budget}
        onChange={setBudget}
        icon={Coins}
      />

      <AmbitionGroup
        legend={t("ambitionLabel")}
        intro={t("ambitionIntro")}
        name="ambition"
        options={ambitionOptions}
        value={ambition}
        onChange={setAmbition}
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
            href={locale === "nl" ? "/privacy" : `/${locale}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-near-black hover:underline"
          >
            {t("consentLabelLink1")}
          </a>{" "}
          {t("consentAnd")}{" "}
          <a
            href={locale === "nl" ? "/cookies" : `/${locale}/cookies`}
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
          {submitStatus === "loading" ? t("sending") : t("formSubmitLabel")}
        </button>

        {submitStatus === "error" && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">
              {t("errorPrefix")} {submitError}. {t("errorRetry")}
            </p>
          </div>
        )}

        <p className="mt-3 text-xs text-medium-gray">{t("formNote")}</p>
      </div>
    </form>
  );
}
