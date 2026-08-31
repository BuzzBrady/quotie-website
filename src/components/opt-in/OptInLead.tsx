"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { Star } from "@phosphor-icons/react";
import OptInForm from "@/components/opt-in/OptInForm";
import OptInProgress from "@/components/opt-in/OptInProgress";

const inter = Inter({
  weight: ["400", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function OptInLead() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  const form = (
    <OptInForm
      step={step}
      onStepChange={setStep}
      started={started}
      onStarted={() => setStarted(true)}
      onReset={() => {
        setStarted(false);
        setStep(0);
      }}
    />
  );

  if (started) {
    return (
      <>
        <OptInProgress step={step} className="mb-8 max-w-[180px]" />
        {form}
      </>
    );
  }

  return (
    <>
      <OptInProgress step={-1} className="mb-3 max-w-[180px]" />
      <p className="mb-4 text-center text-4xl sm:text-5xl leading-none" aria-hidden>
        <span className="optin-wave">👋</span>
      </p>

      <p
        className={`${inter.className} mb-3 text-center uppercase text-slate-500`}
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.4,
          fontWeight: 400,
          letterSpacing: "0.08em",
        }}
      >
        Servicing Clients In:{" "}
        <span className="inline-block text-[1.45em] leading-none align-middle">
          🇦🇺
        </span>
      </p>
      <h1
        className={`${inter.className} mb-5 text-center uppercase`}
        style={{
          color: "#000",
          fontSize: "clamp(1.25rem, 4.2vw, 1.85rem)",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontWeight: 800,
        }}
      >
        Discover How Trade
        <br />
        Business Owners Are Quoting
        <br />
        In 90 Seconds Or Less
      </h1>

      <p
        className={`${inter.className} mb-8 mx-auto max-w-[440px] text-center text-[15px] sm:text-[17px] text-slate-500`}
        style={{ lineHeight: 1.4, fontWeight: 400 }}
      >
        Click &ldquo;GET STARTED&rdquo; to watch the training — you&apos;ll
        discover how Quotie clients are winning more work by sending full
        branded, multi-option proposals in 90 seconds or less.
      </p>

      <div className="relative mb-8">
        {form}
        <p
          className={`${inter.className} mt-3 flex items-center justify-center gap-2 text-[15px] text-slate-500`}
          style={{ fontWeight: 400, lineHeight: 1.4 }}
        >
          <span className="inline-flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} weight="fill" className="h-4 w-4 text-amber-400" />
            ))}
          </span>
          5 stars from 12 reviews
        </p>
      </div>
    </>
  );
}
