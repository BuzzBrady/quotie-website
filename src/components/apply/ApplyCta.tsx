"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { inter } from "@/lib/fonts";
import { ArrowRight } from "@phosphor-icons/react";
import { readApplyContact } from "@/components/apply/applyQuestions";
import { assignApplyVslVariant } from "@/components/apply/applyVslSplit";
import { trackCustom } from "@/components/seo/MetaPixel";

export default function ApplyCta({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const [href, setHref] = useState(
    params.toString() ? `/apply/form?${params.toString()}` : "/apply/form"
  );

  useEffect(() => {
    const next = new URLSearchParams(params.toString());
    const stored = readApplyContact();
    if (stored) {
      if (!next.get("firstName")) next.set("firstName", stored.firstName);
      if (!next.get("email")) next.set("email", stored.email);
      if (!next.get("mobile")) next.set("mobile", stored.phone);
    }
    next.set("vsl", assignApplyVslVariant(next.get("vsl")));
    const qs = next.toString();
    setHref(qs ? `/apply/form?${qs}` : "/apply/form");
  }, [params]);

  return (
    <div className="text-center">
      <Link
        href={href}
        onClick={() =>
          trackCustom("ApplyCtaClick", "apply_now", {
            vsl_variant: assignApplyVslVariant(),
          })
        }
        className={`${inter.className} optin-cta w-full inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-5 sm:py-6 text-[15px] sm:text-base font-semibold uppercase tracking-[0.06em] leading-none text-white`}
      >
        <span className="inline-flex items-center gap-3">
          Apply Now
          <ArrowRight weight="bold" className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
