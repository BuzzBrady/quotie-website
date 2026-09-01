"use client";

import { useEffect, useState } from "react";
import { inter } from "@/lib/fonts";
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
    <div className="mb-6 text-center">
      <p className="mb-4 text-4xl sm:text-5xl leading-none" aria-hidden>
        <span className="optin-wave">👋</span>
      </p>
      <p
        className={`${inter.className} mb-5 text-black`}
        style={{
          fontSize: "clamp(1.35rem, 4.6vw, 1.75rem)",
          lineHeight: 1.3,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        You&apos;re in{firstName ? `, ${firstName}` : ""}!
      </p>
      <h1
        className={`${inter.className} uppercase`}
        style={{
          color: "#000",
          fontSize: "clamp(1.25rem, 4.2vw, 1.85rem)",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontWeight: 800,
        }}
      >
        Watch The Short Training Below - Click The Video To Start Watching
      </h1>
      <p
        className={`${inter.className} mx-auto mt-4 max-w-[440px] text-[15px] sm:text-[17px] text-slate-500`}
        style={{ lineHeight: 1.4, fontWeight: 400 }}
      >
        Once you&apos;ve watched the video, apply to see if we&apos;d be a great
        fit to work with each other.
      </p>
    </div>
  );
}
