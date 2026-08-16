"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { readApplyContact } from "@/components/apply/applyQuestions";

const PIXEL_ID = "1088687213818179";

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

function digitsPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return `61${digits.slice(1)}`;
  return digits;
}

export function newPixelEventId() {
  return crypto.randomUUID();
}

export function setPixelUser(user: PixelUser) {
  const payload: Record<string, string> = {};
  if (user.email) payload.em = user.email.trim().toLowerCase();
  if (user.phone) payload.ph = digitsPhone(user.phone);
  if (user.firstName) payload.fn = user.firstName.trim().toLowerCase();
  if (Object.keys(payload).length === 0) return;
  window.fbq?.("init", PIXEL_ID, payload);
}

function track(
  event: string,
  contentName: string,
  eventId?: string
) {
  const params = { content_name: contentName, content_category: "quotie_funnel" };
  if (eventId) {
    window.fbq?.("track", event, params, { eventID: eventId });
  } else {
    window.fbq?.("track", event, params);
  }
}

/** Opt-in submit. */
export function trackLead(source: string, eventId?: string) {
  track("Lead", source, eventId);
}

/** Application form submit. */
export function trackSubmitApplication(source: string, eventId?: string) {
  track("SubmitApplication", source, eventId);
}

/** Calendar booking confirmed. */
export function trackSchedule(source: string, eventId?: string) {
  track("Schedule", source, eventId);
}

/** Can't-find-a-time request. */
export function trackContact(source: string, eventId?: string) {
  track("Contact", source, eventId);
}

const FUNNEL_PAGES: Record<string, { event: string; name: string }> = {
  "/opt-in": { event: "ViewContent", name: "opt_in" },
  "/apply": { event: "ViewContent", name: "apply_training" },
  "/apply/form": { event: "InitiateCheckout", name: "apply_form" },
  "/apply/book": { event: "ViewContent", name: "apply_book" },
  "/apply/book/times": { event: "ViewContent", name: "apply_callback" },
  "/apply/thanks": { event: "ViewContent", name: "apply_thanks" },
};

export default function MetaPixel() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
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
    if (page) track(page.event, page.name);
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
          fbq('init', '${PIXEL_ID}');
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
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
