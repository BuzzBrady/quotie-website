"use client";

import { useEffect, useState } from "react";
import ApplyVideoSlot from "@/components/apply/ApplyVideoSlot";
import ApplyVslPlayer from "@/components/apply/ApplyVslPlayer";
import {
  applyVslSrc,
  assignApplyVslVariant,
  hydrateApplyContactFromUrl,
  readApplyVslWatch,
  sendVslWatchToClose,
  type ApplyVslVariantId,
} from "@/components/apply/applyVslSplit";
import { isDirectVideoUrl } from "@/components/apply/vsl";
import { trackCustom } from "@/components/seo/MetaPixel";

export default function ApplyVsl() {
  const [variant, setVariant] = useState<ApplyVslVariantId | null>(null);

  useEffect(() => {
    hydrateApplyContactFromUrl();
    const params = new URLSearchParams(window.location.search);
    const assigned = assignApplyVslVariant(params.get("vsl"));
    setVariant(assigned);

    if (params.get("vsl") !== assigned) {
      params.set("vsl", assigned);
      const next = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", next);
    }

    trackCustom("ApplyVsl", `apply_vsl_${assigned}`, {
      vsl_variant: assigned,
    });

    const alreadyWatching = readApplyVslWatch()?.unmuted;
    if (alreadyWatching) return;

    const timer = window.setTimeout(() => {
      if (readApplyVslWatch()?.unmuted) return;
      sendVslWatchToClose({
        event: "view",
        variant: assigned,
        percent: 0,
        unmuted: false,
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!variant) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl shadow-slate-200/80" />
    );
  }

  const src = applyVslSrc(variant);

  if (isDirectVideoUrl(src)) {
    return <ApplyVslPlayer src={src} variant={variant} />;
  }

  return (
    <ApplyVideoSlot
      url={src}
      title="Training video"
      hint="The training will play here."
    />
  );
}
