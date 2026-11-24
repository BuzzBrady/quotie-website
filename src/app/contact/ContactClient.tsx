"use client";

import { useState } from "react";
import { EnvelopeSimple, MapPin, ArrowRight, CircleNotch, CheckCircle } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { TRADE_TYPES } from "@/lib/constants";
import { trackLead } from "@/components/seo/MetaPixel";

const faqs = [
  {
    q: "How do I get support for my account?",
    a: "Current customers can reach our support team via the in-app chat or by emailing hello@quotie.au. We aim to respond within a few hours during business hours (AEST).",
  },
  {
    q: "Do you offer onboarding help?",
    a: "Every plan includes full hands-on onboarding. We build your quote form, configure your pricing, and refine it with you over the first week until it's exactly right.",
  },
  {
    q: "Can I request a custom integration?",
    a: "Absolutely. Enterprise customers get custom integration development. Get in touch and tell us what you need.",
  },
  {
    q: "What are your business hours?",
    a: "We're based in Central Coast, NSW (AEST, UTC+10). Our team is available Monday to Friday, 8am–6pm AEST.",
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    trade_type: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      const params = new URLSearchParams(window.location.search);
      const { error: insertError } = await supabase.from("leads").insert({
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        company_name: form.company_name.trim() || null,
        trade_type: form.trade_type || null,
        message: form.message.trim() || null,
        source: "contact_page",
        page_url: "/contact",
        utm_source: params.get("utm_source") || null,
        utm_medium: params.get("utm_medium") || null,
        utm_campaign: params.get("utm_campaign") || null,
        utm_term: params.get("utm_term") || null,
        referrer: document.referrer || null,
      });

      if (insertError) {
        setError("Something went wrong. Please try again.");
        return;
      }
      trackLead("contact_page");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border border-rule-strong bg-sheet px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-cyan/30";

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-28 sm:pt-32 lg:pt-40 pb-12 lg:pb-16">
        <Container>
          <Eyebrow trail="Central Coast, NSW" className="mb-6 max-w-md">
            Contact
          </Eyebrow>
          <h1 className="font-jakarta font-extrabold tracking-[-0.04em] leading-[1.02] text-ink text-[clamp(2.4rem,5.4vw,4rem)] mb-5">
            Get in <span className="mark-live">Touch</span>
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed max-w-md text-pretty">
            We&apos;re a small team based on the Central Coast. We read every message and
            reply promptly.
          </p>
        </Container>
      </section>

      {/* Main content */}
      <section className="bg-sheet border-y border-rule py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-14 lg:gap-20">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-ink mb-2 font-jakarta">
                Send us a message
              </h2>
              <p className="text-ink-soft text-[15px] mb-8">
                Fill in the form and we&apos;ll get back to you within one
                business day.
              </p>

              {submitted ? (
                <div className="border-t-2 border-ink pt-8">
                  <CheckCircle weight="fill" className="w-8 h-8 text-brand-blue mb-4" />
                  <h3 className="text-xl font-bold font-jakarta text-ink mb-1.5">
                    Message received!
                  </h3>
                  <p className="text-ink-soft text-[15px] max-w-sm">
                    Thanks {form.full_name.split(" ")[0]}. We&apos;ll be in
                    touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="full_name"
                      type="text"
                      aria-label="Your name"
                      placeholder="Your name *"
                      value={form.full_name}
                      onChange={handleChange}
                      className={inputBase}
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      aria-label="Work email"
                      placeholder="Work email *"
                      value={form.email}
                      onChange={handleChange}
                      className={inputBase}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="phone"
                      type="tel"
                      aria-label="Phone number"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    <input
                      name="company_name"
                      type="text"
                      aria-label="Company name"
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
                      className={inputBase + " appearance-none"}
                      style={{
                        color: form.trade_type ? undefined : "var(--color-ink-faint)",
                      }}
                    >
                      <option value="">What trade are you in?</option>
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
                  <textarea
                    name="message"
                    aria-label="How can we help?"
                    placeholder="How can we help?"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={inputBase + " resize-none"}
                  />
                  {error && (
                    <p role="alert" className="text-red-700 text-sm">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={buttonClass("ink", "lg", "w-full sm:w-auto")}
                  >
                    {submitting ? (
                      <>
                        <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight
                          weight="bold"
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  Contact details
                </h2>
                <dl className="border-t-2 border-ink">
                  <div className="flex items-baseline gap-3 py-3.5 border-b border-rule">
                    <dt className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      <EnvelopeSimple weight="bold" className="w-4 h-4 text-brand-blue self-center" />
                      Email
                    </dt>
                    <span className="leader" aria-hidden />
                    <dd>
                      <a
                        href="mailto:hello@quotie.au"
                        className="text-[15px] font-medium text-brand-blue hover:underline"
                      >
                        hello@quotie.au
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-3 py-3.5 border-b border-rule">
                    <dt className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      <MapPin weight="bold" className="w-4 h-4 text-brand-blue self-center" />
                      Location
                    </dt>
                    <span className="leader" aria-hidden />
                    <dd className="text-[15px] text-ink-soft text-right">
                      Central Coast, NSW, Australia
                    </dd>
                  </div>
                </dl>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  Frequently asked
                </h3>
                <div className="border-t-2 border-ink">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="border-b border-rule py-5">
                      <h4 className="font-jakarta font-bold text-ink text-[16px] tracking-[-0.01em] mb-1.5">
                        {faq.q}
                      </h4>
                      <p className="text-[15px] text-ink-soft leading-relaxed text-pretty">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
