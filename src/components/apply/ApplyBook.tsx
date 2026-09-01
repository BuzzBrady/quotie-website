"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { inter } from "@/lib/fonts";
import ApplyChrome from "@/components/apply/ApplyChrome";
import {
  iframeHeightFromMessage,
  isBookingSuccessMessage,
  meetingFromUnknown,
} from "@/components/apply/bookingEvents";
import { APPLY_CAL_URL, calEmbedUrl } from "@/components/apply/cal";
import {
  APPLY_MEETING_KEY,
  APPLY_SESSION_KEY,
  readApplyContact,
  type ApplyMeeting,
} from "@/components/apply/applyQuestions";
import { newPixelEventId, trackSchedule } from "@/components/seo/MetaPixel";
import {
  applyLeadContext,
  readApplyVslWatch,
} from "@/components/apply/applyVslSplit";

type BookingSession = {
  firstName?: string;
  fullName?: string;
  email?: string;
};

export default function ApplyBook() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [session, setSession] = useState<BookingSession>({});
  const [calHeight, setCalHeight] = useState(920);
  const booked = useRef(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(APPLY_SESSION_KEY);
      if (raw) setSession(JSON.parse(raw) as BookingSession);
    } catch {
      setSession({});
    }
  }, []);

  const goToThanks = useCallback((meeting: ApplyMeeting = {}) => {
    if (booked.current) return;
    booked.current = true;
    sessionStorage.setItem(APPLY_MEETING_KEY, JSON.stringify(meeting));
    const eventId = newPixelEventId();
    const watch = readApplyVslWatch();
    trackSchedule("meta_apply", eventId, {
      vsl_variant: watch?.variant,
      percent: watch?.percent,
    });
    const contact = readApplyContact();
    if (contact) {
      void fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: contact.fullName,
          email: contact.email,
          phone: contact.phone,
          preferred_call_time: meeting.startIso || "Booked via Cal.com",
          source: "meta_apply_booked",
          pixel_event_id: eventId,
          ...applyLeadContext(),
        }),
      });
    }
    const qs = window.location.search;
    window.location.assign(qs ? `/apply/thanks${qs}` : "/apply/thanks");
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const nextHeight = iframeHeightFromMessage(event.data);
      if (nextHeight) {
        setCalHeight((current) => Math.max(current, nextHeight));
      }
      if (!isBookingSuccessMessage(event.data)) return;
      goToThanks(meetingFromUnknown(event.data) ?? {});
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [goToThanks]);

  const onIframeLoad = () => {
    const frame = iframeRef.current;
    const ack = () => {
      frame?.contentWindow?.postMessage(
        { originator: "CAL", type: "parentKnowsIframeReady" },
        "*"
      );
    };
    ack();
    window.setTimeout(ack, 300);
    window.setTimeout(ack, 1000);
    try {
      const href = frame?.contentWindow?.location.href ?? "";
      if (href.includes("/apply/thanks")) goToThanks();
    } catch {
      // Still on cal.com — cross-origin, ignore.
    }
  };

  const firstName = session.firstName?.trim();
  const calendarSrc = calEmbedUrl(APPLY_CAL_URL, {
    name: session.fullName,
    email: session.email,
  });

  return (
    <ApplyChrome wide>
      {firstName ? (
        <p
          className={`${inter.className} mb-3 text-center text-black`}
          style={{
            fontSize: "clamp(1.35rem, 4.6vw, 1.75rem)",
            lineHeight: 1.3,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          You&apos;re in, {firstName}!
        </p>
      ) : null}
      <h1
        className={`${inter.className} mb-4 text-center uppercase`}
        style={{
          color: "#000",
          fontSize: "clamp(1.25rem, 4.2vw, 1.85rem)",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontWeight: 800,
        }}
      >
        Pick A Time For Your Strategy Session
      </h1>
      <p
        className={`${inter.className} mb-3 text-center text-[15px] text-slate-500`}
        style={{ fontWeight: 400, lineHeight: 1.4 }}
      >
        The calendar is loading — give it a moment if you don&apos;t see it
        right away.
      </p>
      <p className={`${inter.className} mb-8 text-center text-sm`} style={{ fontWeight: 400 }}>
        <a
          href="/apply/book/times"
          className="text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-brand-blue"
        >
          Can&apos;t find a time? Request one
        </a>
      </p>

      <div className="mb-6 overflow-hidden rounded-[12px] border border-slate-200 bg-white">
        <iframe
          ref={iframeRef}
          src={calendarSrc}
          title="Book a Quotie Strategy Session"
          onLoad={onIframeLoad}
          scrolling="no"
          className="block w-full border-0"
          style={{ height: calHeight, overflow: "hidden" }}
          allow="camera; microphone; fullscreen; payment"
        />
      </div>

      <a
        href="/apply/book/times"
        className={`${inter.className} mb-4 w-full inline-flex items-center justify-center rounded-[12px] border-2 border-slate-200 bg-white px-6 py-5 text-[15px] font-semibold uppercase tracking-[0.06em] text-slate-800`}
      >
        Can&apos;t find a time? Submit this
      </a>
    </ApplyChrome>
  );
}
