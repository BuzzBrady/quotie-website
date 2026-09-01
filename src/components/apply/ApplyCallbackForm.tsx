"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inter } from "@/lib/fonts";
import { ArrowLeft, ArrowRight, CircleNotch } from "@phosphor-icons/react";
import { APPLY_MEETING_KEY, readApplyContact } from "@/components/apply/applyQuestions";
import {
  applyLeadContext,
  readApplyVslWatch,
} from "@/components/apply/applyVslSplit";
import {
  newPixelEventId,
  setPixelUser,
  trackContact,
} from "@/components/seo/MetaPixel";

const MAX_CHARS = 200;

function leadContext() {
  return applyLeadContext();
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
      const watch = readApplyVslWatch();
      trackContact("meta_apply_callback", eventId, {
        vsl_variant: watch?.variant,
        percent: watch?.percent,
      });
      sessionStorage.setItem(
        APPLY_MEETING_KEY,
        JSON.stringify({ requested: true })
      );
      const qs = window.location.search;
      router.push(qs ? `/apply/thanks${qs}` : "/apply/thanks");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${inter.className} flex flex-1 flex-col`}>
      <h1
        className="mb-3 text-black"
        style={{
          fontSize: "clamp(1.5rem, 5.5vw, 2rem)",
          lineHeight: 1.25,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        What&apos;s a good day and time to connect?
      </h1>
      <p
        className="mb-6 text-[15px] text-slate-500"
        style={{ fontWeight: 400, lineHeight: 1.4 }}
      >
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
        className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3.5 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue resize-none"
      />
      <p className="mt-2 text-right text-sm text-slate-400">
        {preferred.length}/{MAX_CHARS} characters
      </p>

      {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

      <button
        type="button"
        disabled={submitting}
        onClick={handleSubmit}
        className="optin-cta mt-8 w-full inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-5 sm:py-6 text-[15px] sm:text-base font-semibold uppercase tracking-[0.06em] leading-none text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Submit
            <ArrowRight weight="bold" className="h-4 w-4" />
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
