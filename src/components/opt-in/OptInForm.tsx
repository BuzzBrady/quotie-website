"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";
import {
  newPixelEventId,
  setPixelUser,
  trackLead,
} from "@/components/seo/MetaPixel";
import {
  firstNameFrom,
  saveApplyContact,
} from "@/components/apply/applyQuestions";
import { applyLeadContext } from "@/components/apply/applyVslSplit";

const inter = Inter({
  weight: ["600", "800"],
  subsets: ["latin"],
  display: "swap",
});

const SOURCE = "meta_opt_in";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  {
    key: "full_name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your name",
  },
  {
    key: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Your email",
  },
  {
    key: "phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "Your mobile",
  },
] as const;

function leadContext() {
  return applyLeadContext();
}

export default function OptInForm({
  step,
  onStepChange,
  started,
  onStarted,
  onReset,
}: {
  step: number;
  onStepChange: (step: number) => void;
  started: boolean;
  onStarted: () => void;
  onReset?: () => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fieldStep = Math.min(step, STEPS.length - 1);
  const current = STEPS[fieldStep];
  const lastField = fieldStep === STEPS.length - 1;
  const firstName = firstNameFrom(form.full_name.trim()) || "there";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  function validateStep() {
    if (current.key === "full_name" && !form.full_name.trim()) {
      return "Please enter your name.";
    }
    if (current.key === "email") {
      if (!form.email.trim()) return "Please enter your email.";
      if (!EMAIL_REGEX.test(form.email)) return "Please enter a valid email address.";
    }
    if (current.key === "phone" && !form.phone.trim()) {
      return "Please enter your mobile number.";
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const invalid = validateStep();
    if (invalid) {
      setError(invalid);
      return;
    }

    if (!lastField) {
      onStepChange(step + 1);
      return;
    }

    setSubmitting(true);
    const eventId = newPixelEventId();
    onStepChange(3);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          source: SOURCE,
          pixel_event_id: eventId,
          ...leadContext(),
        }),
      });

      if (!res.ok) {
        onStepChange(2);
        setError("Something went wrong. Please try again.");
        return;
      }

      const fullName = form.full_name.trim();
      const email = form.email.trim().toLowerCase();
      const phone = form.phone.trim();
      saveApplyContact({
        fullName,
        firstName: firstNameFrom(fullName),
        email,
        phone,
      });

      const next = new URLSearchParams(window.location.search);
      next.set("firstName", firstNameFrom(fullName));
      next.set("email", email);
      next.set("mobile", phone);

      setPixelUser({
        email,
        phone,
        firstName: firstNameFrom(fullName),
      });
      trackLead(SOURCE, eventId);
      router.push(`/apply?${next.toString()}`);
    } catch {
      onStepChange(2);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ctaClass = `${inter.className} optin-cta w-full inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-5 sm:py-6 text-[15px] sm:text-base font-semibold uppercase tracking-[0.06em] leading-none text-white disabled:opacity-60 disabled:cursor-not-allowed`;

  if (!started) {
    return (
      <button type="button" onClick={onStarted} className={ctaClass}>
        <span className="inline-flex items-center gap-3">
          Get Started
          <ArrowRight weight="bold" className="h-4 w-4" />
        </span>
      </button>
    );
  }

  const question =
    current.key === "full_name"
      ? "Okay, we'll make this quick. What's your name?"
      : current.key === "email"
        ? `Awesome! What's your email, ${firstName}?`
        : `Last one, ${firstName} — what's the best number to reach you on?`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2
        className={`${inter.className} text-center text-black`}
        style={{
          fontSize: "clamp(1.5rem, 5.5vw, 2rem)",
          lineHeight: 1.25,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        {question}
      </h2>

      <input
        key={current.key}
        name={current.key}
        type={current.type}
        autoComplete={current.autoComplete}
        placeholder={current.placeholder}
        value={form[current.key]}
        onChange={handleChange}
        className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3.5 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue"
        required
        autoFocus
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button type="submit" disabled={submitting} className={ctaClass}>
        <span className="inline-flex items-center gap-3">
          {submitting ? (
            <>
              <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : lastField ? (
            <>
              Watch the training
              <ArrowRight weight="bold" className="h-4 w-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight weight="bold" className="h-4 w-4" />
            </>
          )}
        </span>
      </button>

      {!submitting && (
        <button
          type="button"
          onClick={() => {
            setError(null);
            if (fieldStep > 0) onStepChange(fieldStep - 1);
            else onReset?.();
          }}
          className="w-full text-center text-[13px] text-slate-500 hover:text-slate-700 transition-colors"
        >
          Back
        </button>
      )}
    </form>
  );
}
