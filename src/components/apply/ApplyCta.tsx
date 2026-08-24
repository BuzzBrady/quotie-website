"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
        className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-4 text-[13px] sm:text-sm font-extrabold tracking-[0.06em] text-white uppercase shadow-lg shadow-brand-blue/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-cyan/20"
      >
        Apply Now
        <ArrowRight
          weight="bold"
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
        />
      </Link>
      {!compact && (
        <p className="mt-3 text-[13px] text-slate-500">
          See if we should build it for you · 2 minutes
        </p>
      )}
    </div>
  );
}
