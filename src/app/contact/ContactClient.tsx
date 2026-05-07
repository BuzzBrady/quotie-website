"use client";

import { useState } from "react";
import { Mail, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import { supabase } from "@/lib/supabase";
import { TRADE_TYPES } from "@/lib/constants";

const faqs = [
  {
    q: "How do I get support for my account?",
    a: "Current customers can reach our support team via the in-app chat or by emailing hello@quotie.au. We aim to respond within a few hours during business hours (AWST).",
  },
  {
    q: "Do you offer onboarding help?",
    a: "Yes. Professional and Enterprise plans include a dedicated onboarding call to get your templates set up and your team trained.",
  },
  {
    q: "Can I request a custom integration?",
    a: "Absolutely. Enterprise customers get custom integration development. Get in touch and tell us what you need.",
  },
  {
    q: "What are your business hours?",
    a: "We're based in Perth, WA (AWST, UTC+8). Our team is available Monday to Friday, 8am–6pm AWST.",
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
      const { error: insertError } = await supabase.from("leads").insert({
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        company_name: form.company_name.trim() || null,
        trade_type: form.trade_type || null,
        source: "contact_page",
        page_url: "/contact",
      });

      if (insertError) {
        setError("Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/10";

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <Container className="text-center">
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900 mb-4"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Get in Touch
          </h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            We&apos;re a small team based in Perth. We read every message and
            reply promptly.
          </p>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 font-[family-name:var(--font-jakarta)]">
                Send us a message
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill in the form and we&apos;ll get back to you within one
                business day.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Message received!
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Thanks {form.full_name.split(" ")[0]}. We&apos;ll be in
                    touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="full_name"
                      type="text"
                      placeholder="Your name *"
                      value={form.full_name}
                      onChange={handleChange}
                      className={inputBase}
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Work email *"
                      value={form.email}
                      onChange={handleChange}
                      className={inputBase}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    <input
                      name="company_name"
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
                      value={form.trade_type}
                      onChange={handleChange}
                      className={inputBase + " appearance-none"}
                      style={{
                        color: form.trade_type ? "#0f172a" : "#94a3b8",
                      }}
                    >
                      <option value="">What trade are you in?</option>
                      {TRADE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
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
                    placeholder="How can we help?"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={inputBase + " resize-none"}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-jakarta)]">
                  Contact details
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">
                        Email
                      </p>
                      <a
                        href="mailto:hello@quotie.au"
                        className="text-sm text-brand-blue hover:underline"
                      >
                        hello@quotie.au
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">
                        Location
                      </p>
                      <p className="text-sm text-slate-500">
                        Perth, WA, Australia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5 font-[family-name:var(--font-jakarta)]">
                  Frequently asked
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="border-b border-slate-100 pb-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">
                        {faq.q}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
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
