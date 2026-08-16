"use client";

import { useEffect, useState } from "react";
import { readApplyContact } from "@/components/apply/applyQuestions";

export default function ApplyHero() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl =
      params.get("firstName") || params.get("first_name") || params.get("name") || "";
    setFirstName(fromUrl.trim() || readApplyContact()?.firstName || "");
  }, []);

  return (
    <div className="mb-8 text-center">
      <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
        {firstName ? `${firstName}, you're in` : "Former full-time estimator reveals"}
      </p>
      <h1
        className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900"
        style={{
          fontSize: "clamp(28px, 6.5vw, 42px)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
      >
        Your quoting system,{" "}
        <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
          built for you
        </span>
      </h1>
      <p className="mt-3 text-[15px] font-medium text-slate-600">
        Watch the short training below
      </p>
    </div>
  );
}
