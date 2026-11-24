"use client";

import { useState } from "react";
import { ArrowRight, CircleNotch, CheckCircle } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { TRADE_TYPES } from "@/lib/constants";
import { trackLead } from "@/components/seo/MetaPixel";

interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  trade_type: string;
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_term: params.get("utm_term") || null,
    referrer: document.referrer || null,
    page_url: window.location.pathname,
  };
}

interface LeadCaptureFormProps {
  source?: string;
  className?: string;
  compact?: boolean;
}

export default function LeadCaptureForm({
  source = "landing_page_cta",
  className = "",
  compact = false,
}: LeadCaptureFormProps) {
  const [form, setForm] = useState<LeadFormData>({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    trade_type: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.full_name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const utm = getUtmParams();
      const { error: insertError } = await supabase.from("leads").insert({
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        company_name: form.company_name.trim() || null,
        trade_type: form.trade_type || null,
        source,
        ...utm,
      });

      if (insertError) {
        console.error("Lead capture error:", insertError);
        setError("Something went wrong. Please try again.");
        return;
      }

      trackLead(source);
      setSubmitted(true);
    } catch (err) {
      console.error("Lead capture error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center gap-3 py-6 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-wash flex items-center justify-center">
          <CheckCircle weight="fill" className="w-7 h-7 text-brand-blue" />
        </div>
        <h3 className="text-xl font-bold font-jakarta text-ink">We&apos;ll be in touch!</h3>
        <p className="text-ink-soft text-sm text-center max-w-sm">
          Thanks {form.full_name.split(" ")[0]}. One of the Quotie team will
          reach out shortly to learn more about your business.
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-lg border border-rule-strong bg-sheet px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-cyan/30";

  const selectBase =
    "w-full rounded-lg border border-rule-strong bg-sheet px-4 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-cyan/30 appearance-none";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div
          className={
            compact ? "space-y-3" : "grid grid-cols-1 sm:grid-cols-2 gap-3"
          }
        >
          <input
            name="full_name"
            aria-label="Your name"
            type="text"
            placeholder="Your name *"
            value={form.full_name}
            onChange={handleChange}
            className={inputBase}
            required
          />
          <input
            name="email"
            aria-label="Work email"
            type="email"
            placeholder="Work email *"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            required
          />
        </div>

        <div
          className={
            compact ? "space-y-3" : "grid grid-cols-1 sm:grid-cols-2 gap-3"
          }
        >
          <input
            name="phone"
            aria-label="Phone number"
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className={inputBase}
          />
          <input
            name="company_name"
            aria-label="Company name"
            type="text"
            placeholder="Company name"
            value={form.company_name}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="relative">
          <select
            name="trade_type"
            aria-label="What trade are you in?"
            value={form.trade_type}
            onChange={handleChange}
            className={selectBase}
            style={{
              color: form.trade_type ? undefined : "var(--color-ink-faint)",
            }}
          >
            <option value="" disabled>
              What trade are you in?
            </option>
            {TRADE_TYPES.map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full group inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <CircleNotch weight="duotone" className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Get Started
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        <p className="text-xs text-ink-faint pt-1">
          No spam, ever. We&apos;ll reach out to learn about your business.
        </p>
      </form>
    </div>
  );
}
