"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { readApplyContact } from "@/components/apply/applyQuestions";
import { readApplyVslVariant } from "@/components/apply/applyVslSplit";
import {
  META_PIXEL_ID,
  captureFbclid,
  digitsPhone,
  metaClickIds,
  sendCapiBeacon,
} from "@/lib/metaBrowser";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type PixelUser = {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
};

type TrackExtra = {
  vsl_variant?: string;
  percent?: number;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
};

export function newPixelEventId() {
  return crypto.randomUUID();
}

export function setPixelUser(user: PixelUser) {
  const payload: Record<string, string> = {};
  if (user.email) payload.em = user.email.trim().toLowerCase();
  if (user.phone) payload.ph = digitsPhone(user.phone);
  if (user.firstName) payload.fn = user.firstName.trim().toLowerCase();
  if (Object.keys(payload).length === 0) return;
  window.fbq?.("init", META_PIXEL_ID, payload);
}

function contactFromStore(): TrackExtra {
  const stored = readApplyContact();
  return {
    email: stored?.email,
    phone: stored?.phone,
    firstName: stored?.firstName,
    vsl_variant: readApplyVslVariant() || undefined,
  };
}

function emit(
  event: string,
  contentName: string,
  extra?: TrackExtra,
  eventId?: string,
  standard = true
) {
  const id = eventId || newPixelEventId();
  const merged = { ...contactFromStore(), ...extra };
  const params: Record<string, string | number> = {
    content_name: contentName,
    content_category: "quotie_funnel",
  };
  if (merged.vsl_variant) params.vsl_variant = merged.vsl_variant;
  if (typeof merged.percent === "number") params.percent = merged.percent;

  if (standard) {
    window.fbq?.("track", event, params, { eventID: id });
  } else {
    window.fbq?.("trackCustom", event, params, { eventID: id });
  }

  const ids = metaClickIds();
  sendCapiBeacon({
    event_name: event,
    event_id: id,
    event_source_url: window.location.href,
    content_name: contentName,
    content_category: "quotie_funnel",
    vsl_variant: merged.vsl_variant,
    percent: merged.percent,
    em: merged.email,
    ph: merged.phone ? digitsPhone(merged.phone) : null,
    fn: merged.firstName,
    fbp: ids.fbp,
    fbc: ids.fbc,
  });

  return id;
}

export function trackLead(source: string, eventId?: string) {
  emit("Lead", source, undefined, eventId);
}

export function trackSubmitApplication(source: string, eventId?: string) {
  emit("SubmitApplication", source, undefined, eventId);
}

export function trackSchedule(source: string, eventId?: string) {
  emit("Schedule", source, undefined, eventId);
}

export function trackContact(source: string, eventId?: string) {
  emit("Contact", source, undefined, eventId);
}

export function trackCustom(
  event: string,
  contentName: string,
  extra?: TrackExtra,
  eventId?: string
) {
  emit(event, contentName, extra, eventId, false);
}

export function trackVsl(
  event: "VslPlay" | "VslProgress" | "VslComplete",
  extra?: TrackExtra
) {
  const name =
    event === "VslPlay"
      ? "vsl_play"
      : event === "VslComplete"
        ? "vsl_complete"
        : `vsl_${extra?.percent ?? 0}`;
  emit(event, name, extra, undefined, false);
}

const FUNNEL_PAGES: Record<string, { event: string; name: string }> = {
  "/opt-in": { event: "ViewContent", name: "opt_in" },
  "/opt-in/thanks": { event: "ViewContent", name: "opt_in_thanks" },
  "/apply": { event: "ViewContent", name: "apply_training" },
  "/apply/form": { event: "InitiateCheckout", name: "apply_form" },
  "/apply/book": { event: "ViewContent", name: "apply_book" },
  "/apply/book/times": { event: "ViewContent", name: "apply_callback" },
  "/apply/thanks": { event: "ViewContent", name: "apply_thanks" },
  "/apply/received": { event: "ViewContent", name: "apply_received" },
};

export default function MetaPixel() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    captureFbclid();

    const stored = readApplyContact();
    if (stored) {
      setPixelUser({
        email: stored.email,
        phone: stored.phone,
        firstName: stored.firstName,
      });
    }

    if (!isInitialLoad.current) {
      window.fbq?.("track", "PageView");
    } else {
      isInitialLoad.current = false;
    }

    const page = FUNNEL_PAGES[pathname];
    if (page) emit(page.event, page.name);
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
