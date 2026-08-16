"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleNotch } from "@phosphor-icons/react";
import { APPLY_MEETING_KEY, readApplyContact } from "@/components/apply/applyQuestions";
import {
  newPixelEventId,
  setPixelUser,
  trackContact,
} from "@/components/seo/MetaPixel";

const MAX_CHARS = 200;

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

export default function ApplyCallbackForm() {
  const router = useRouter();
  const [preferred, setPreferred] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (preferred.trim().length < 6) {
      setError("Please include a day, time and timezone.");
      return;
    }

    const contact = readApplyContact();
    if (!contact) {
      setError("We couldn't find your details. Start from the opt-in.");
      return;
    }

    setSubmitting(true);
    setError(null);
    const eventId = newPixelEventId();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: contact.fullName,
          email: contact.email,
          phone: contact.phone,
          preferred_call_time: preferred.trim(),
          source: "meta_apply_callback",
          pixel_event_id: eventId,
          ...leadContext(),
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setPixelUser({
        email: contact.email,
        phone: contact.phone,
        firstName: contact.firstName,
      });
      trackContact("meta_apply_callback", eventId);
      sessionStorage.setItem(
        APPLY_MEETING_KEY,
        JSON.stringify({ requested: true })
      );
      router.push("/apply/thanks");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1
        className="mb-3 font-[family-name:var(--font-jakarta)] text-[26px] sm:text-[32px] font-extrabold tracking-tight text-slate-900 leading-[1.15]"
      >
        What&apos;s a good day and time to connect?
      </h1>
      <p className="mb-6 text-[15px] leading-relaxed text-slate-600">
        Please include an exact day, time, and time zone.
      </p>

      <textarea
        rows={4}
        maxLength={MAX_CHARS}
        value={preferred}
        onChange={(e) => {
          setPreferred(e.target.value.slice(0, MAX_CHARS));
          setError(null);
        }}
        placeholder="E.g. this Friday at 4pm AEST"
        className="w-full rounded-none border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-brand-cyan resize-none"
      />
      <p className="mt-2 text-right text-sm text-slate-400">
        {preferred.length}/{MAX_CHARS} characters
      </p>

      {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

      <button
        type="button"
        disabled={submitting}
        onClick={handleSubmit}
        className="mt-8 w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-4 text-[13px] sm:text-sm font-extrabold tracking-[0.06em] text-white uppercase shadow-lg shadow-brand-blue/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-cyan/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Submit
            <ArrowRight
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            />
          </>
        )}
      </button>
      <button
        type="button"
        disabled={submitting}
        onClick={() => {
          const qs = window.location.search;
          router.push(qs ? `/apply/book${qs}` : "/apply/book");
        }}
        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
        Back
      </button>
    </div>
  );
}
