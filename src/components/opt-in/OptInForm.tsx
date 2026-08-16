"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";
import { trackLead } from "@/components/seo/MetaPixel";

const SOURCE = "meta_opt_in";

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

export default function OptInForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Name, email and phone are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          source: SOURCE,
          ...leadContext(),
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      trackLead(SOURCE);
      router.push("/opt-in/thanks");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-brand-cyan focus:bg-white focus:ring-1 focus:ring-brand-cyan/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="full_name"
        type="text"
        autoComplete="name"
        placeholder="Full name"
        value={form.full_name}
        onChange={handleChange}
        className={inputBase}
        required
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={inputBase}
        required
      />
      <input
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        className={inputBase}
        required
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-4 text-[13px] sm:text-sm font-extrabold tracking-[0.06em] text-white uppercase shadow-lg shadow-brand-blue/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-cyan/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Show me how Quotie works
            <ArrowRight
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            />
          </>
        )}
      </button>
    </form>
  );
}
