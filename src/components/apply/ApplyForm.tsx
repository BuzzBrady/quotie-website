"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleNotch } from "@phosphor-icons/react";
import {
  newPixelEventId,
  setPixelUser,
  trackLead,
  trackSubmitApplication,
} from "@/components/seo/MetaPixel";
import {
  APPLY_SESSION_KEY,
  FINANCIAL_OPTIONS,
  FRUSTRATION_OPTIONS,
  QUOTE_TIME_OPTIONS,
  QUOTE_VOLUME_OPTIONS,
  STEP_META,
  TIMELINE_OPTIONS,
  firstNameFrom,
  isApplyQualified,
  readApplyContact,
  saveApplyContact,
} from "@/components/apply/applyQuestions";

const SOURCE = "meta_apply";
const TOTAL = 7;

const inputBase =
  "w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-brand-cyan";

function leadContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_term: params.get("utm_term") || null,
    referrer: document.referrer || null,
    page_url: window.location.href,
  };
}

function ChoiceList({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: readonly string[];
  onChange: (next: string) => void;
}) {
  return (
    <div className="divide-y divide-slate-200" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={`flex w-full items-center gap-3 px-0 py-3.5 text-left text-[17px] font-medium transition-colors duration-150 ${
              selected
                ? "text-brand-blue"
                : "text-slate-800 hover:text-brand-blue"
            }`}
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                selected
                  ? "border-brand-blue bg-brand-blue"
                  : "border-slate-300 bg-transparent"
              }`}
            >
              {selected && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </span>
            {option}
          </button>
        );
      })}
    </div>
  );
}

function needsContact(form: { full_name: string; email: string; phone: string }) {
  return !form.full_name.trim() || !form.email.trim() || !form.phone.trim();
}

function prefillFromParams(params: URLSearchParams) {
  const first = params.get("firstName") || params.get("first_name") || "";
  const last = params.get("lastName") || params.get("last_name") || "";
  const full =
    params.get("full_name") ||
    params.get("name") ||
    [first, last].filter(Boolean).join(" ");
  return {
    full_name: full,
    email: params.get("email") || "",
    phone: params.get("mobile") || params.get("phone") || "",
  };
}

export default function ApplyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    trade_type: "",
    quotes_per_month: "",
    quote_prep_time: "",
    biggest_frustration: "",
    frustration_other: "",
    biggest_difference: "",
    timeline: "",
    financial_position: "",
    ...prefillFromParams(params),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    const stored = readApplyContact();
    if (!stored) return;
    setForm((prev) => ({
      ...prev,
      full_name: prev.full_name || stored.fullName,
      email: prev.email || stored.email,
      phone: prev.phone || stored.phone,
    }));
  }, []);

  const setField = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateStep = (current: number): string | null => {
    if (current === 1 && !form.trade_type.trim()) {
      return "Tell us what type of trade you run.";
    }
    if (current === 2 && !form.quotes_per_month) {
      return "Pick how many quotes you send each month.";
    }
    if (current === 3 && !form.quote_prep_time) {
      return "Pick how long a typical quote takes.";
    }
    if (current === 4 && !form.biggest_frustration) {
      return "Pick your biggest frustration.";
    }
    if (
      current === 4 &&
      form.biggest_frustration === "Other" &&
      !form.frustration_other.trim()
    ) {
      return "Tell us what the biggest frustration is.";
    }
    if (current === 6 && !form.timeline) {
      return "Pick how soon you're looking to improve this.";
    }
    if (current === 7 && !form.financial_position) {
      return "Pick the option that fits.";
    }
    if (current === 7 && needsContact(form)) {
      if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim()) {
        return "Name, email and phone are required.";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        return "Please enter a valid email address.";
      }
    }
    return null;
  };

  const goNext = () => {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((s) => Math.min(TOTAL, s + 1));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    const message = validateStep(7);
    if (message) {
      setError(message);
      return;
    }

    const stored = readApplyContact();
    const fullName = form.full_name.trim() || stored?.fullName || "";
    const email = (form.email.trim() || stored?.email || "").toLowerCase();
    const phone = form.phone.trim() || stored?.phone || "";

    if (!fullName || !email || !phone) {
      setError("Name, email and phone are required.");
      return;
    }

    const hadContact = Boolean(
      stored?.email || params.get("email") || params.get("mobile")
    );
    saveApplyContact({
      fullName,
      firstName: firstNameFrom(fullName),
      email,
      phone,
    });

    setSubmitting(true);
    setError(null);
    const eventId = newPixelEventId();

    const frustration =
      form.biggest_frustration === "Other"
        ? `Other: ${form.frustration_other.trim()}`
        : form.biggest_frustration;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          trade_type: form.trade_type.trim(),
          quotes_per_month: form.quotes_per_month,
          quote_prep_time: form.quote_prep_time,
          biggest_frustration: frustration,
          biggest_difference: form.biggest_difference.trim(),
          timeline: form.timeline,
          financial_position: form.financial_position,
          source: SOURCE,
          pixel_event_id: eventId,
          ...leadContext(),
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setPixelUser({
        email,
        phone,
        firstName: firstNameFrom(fullName),
      });
      trackSubmitApplication(SOURCE, eventId);
      if (!hadContact) trackLead(SOURCE, eventId);

      const qualified = isApplyQualified(form.financial_position);
      const next = new URLSearchParams(window.location.search);
      if (!next.get("firstName")) next.set("firstName", firstNameFrom(fullName));
      if (!next.get("email")) next.set("email", email);
      if (!next.get("mobile")) next.set("mobile", phone);
      const qs = next.toString();

      if (qualified) {
        sessionStorage.setItem(
          APPLY_SESSION_KEY,
          JSON.stringify({
            firstName: firstNameFrom(fullName),
            fullName,
            email,
          })
        );
        router.push(qs ? `/apply/book?${qs}` : "/apply/book");
      } else {
        router.push("/apply/received");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const meta = STEP_META[step - 1];
  const continueLabel =
    step < TOTAL ? `Continue To Question ${step + 1}` : "Submit Application";

  const questionClass =
    "mb-4 font-[family-name:var(--font-jakarta)] text-[26px] sm:text-[30px] font-extrabold tracking-tight text-slate-900 leading-[1.15]";

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8">
        <p className="text-[15px] font-semibold text-slate-800">
          Question {step} of {TOTAL}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {meta.percent}% Complete
          {meta.remaining ? (
            <span className="text-slate-400"> {meta.remaining}</span>
          ) : null}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-300"
            style={{ width: `${meta.percent}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div>
          <h1 className={questionClass}>
            What type of trade business do you run?
          </h1>
          <input
            name="trade_type"
            type="text"
            autoComplete="organization-title"
            placeholder="E.g. solar, construction, landscaping etc."
            value={form.trade_type}
            onChange={(e) => setField("trade_type", e.target.value)}
            className={inputBase}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className={questionClass}>
            Roughly how many quotes does your business send each month?
          </h1>
          <p className="mb-4 text-sm text-slate-500">
            An estimate is completely fine
          </p>
          <ChoiceList
            name="quotes_per_month"
            value={form.quotes_per_month}
            options={QUOTE_VOLUME_OPTIONS}
            onChange={(v) => setField("quotes_per_month", v)}
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className={questionClass}>
            How long does it currently take to prepare and send a typical quote?
          </h1>
          <ChoiceList
            name="quote_prep_time"
            value={form.quote_prep_time}
            options={QUOTE_TIME_OPTIONS}
            onChange={(v) => setField("quote_prep_time", v)}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className={questionClass}>
            What&apos;s the BIGGEST frustration with the way your business
            currently quotes jobs?
          </h1>
          <ChoiceList
            name="biggest_frustration"
            value={form.biggest_frustration}
            options={FRUSTRATION_OPTIONS}
            onChange={(v) => setField("biggest_frustration", v)}
          />
          {form.biggest_frustration === "Other" && (
            <input
              name="frustration_other"
              type="text"
              placeholder="Tell us the biggest frustration"
              value={form.frustration_other}
              onChange={(e) => setField("frustration_other", e.target.value)}
              className={`${inputBase} mt-3`}
            />
          )}
        </div>
      )}

      {step === 5 && (
        <div>
          <h1 className={questionClass}>
            If Quotie could fix one thing about your quoting process, what would
            make the biggest difference to your business?
          </h1>
          <p className="mb-4 text-sm text-slate-500">Optional — skip if you want.</p>
          <textarea
            name="biggest_difference"
            rows={5}
            placeholder="E.g. I'd like my team to be able to quote jobs without everything coming back through me."
            value={form.biggest_difference}
            onChange={(e) => setField("biggest_difference", e.target.value)}
            className={`${inputBase} resize-none`}
          />
        </div>
      )}

      {step === 6 && (
        <div>
          <h1 className={questionClass}>
            How soon are you looking to improve your quoting process?
          </h1>
          <p className="mb-4 text-sm leading-relaxed text-slate-500">
            Quotie is custom-built around each business, so we prioritise
            businesses that are actively looking to improve their current
            process.
          </p>
          <ChoiceList
            name="timeline"
            value={form.timeline}
            options={TIMELINE_OPTIONS}
            onChange={(v) => setField("timeline", v)}
          />
        </div>
      )}

      {step === 7 && (
        <div>
          <h1 className={questionClass}>
            If we build your quoting system for you, are you in a position to
            invest in getting it done?
          </h1>
          <ChoiceList
            name="financial_position"
            value={form.financial_position}
            options={FINANCIAL_OPTIONS}
            onChange={(v) => setField("financial_position", v)}
          />
          {needsContact(form) && (
            <div className="mt-6 space-y-3">
              <p className="text-sm font-semibold text-slate-600">
                We don&apos;t have your details yet
              </p>
              <input
                name="full_name"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                value={form.full_name}
                onChange={(e) => setField("full_name", e.target.value)}
                className={inputBase}
              />
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className={inputBase}
              />
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className={inputBase}
              />
            </div>
          )}
        </div>
      )}

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <div className="mt-8 space-y-3">
        <button
          type="button"
          disabled={submitting}
          onClick={step === TOTAL ? handleSubmit : goNext}
          className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-4 text-[13px] sm:text-sm font-extrabold tracking-[0.06em] text-white uppercase shadow-lg shadow-brand-blue/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-cyan/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {continueLabel}
              <ArrowRight
                weight="bold"
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              />
            </>
          )}
        </button>

        {step > 1 && (
          <button
            type="button"
            disabled={submitting}
            onClick={goBack}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
            Back
          </button>
        )}
      </div>
    </div>
  );
}
