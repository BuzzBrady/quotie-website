"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ApplyFooter from "@/components/apply/ApplyFooter";
import ApplyWordmark from "@/components/apply/ApplyWordmark";
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
    trackSchedule("meta_apply", eventId);
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
          page_url: window.location.href,
        }),
      });
    }
    window.location.assign("/apply/thanks");
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
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(31,97,170,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[880px] flex-1 flex-col px-5 pb-10 pt-8 sm:pt-12">
        <div className="mb-8">
          <ApplyWordmark />
        </div>

        <p className="mb-3 text-center text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Last step{firstName ? ` — ${firstName}` : ""}
        </p>
        <h1
          className="mb-4 text-center font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900"
          style={{
            fontSize: "clamp(26px, 6.2vw, 40px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          Reserve a time for your Quotie{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Strategy Session
          </span>
        </h1>
        <p className="mb-3 text-center text-sm text-slate-700">
          The calendar is loading — please wait a moment if you don&apos;t see
          it right away.
        </p>
        <p className="mb-8 text-center text-sm">
          <a
            href="/apply/book/times"
            className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-brand-blue"
          >
            Can&apos;t find a time? Request one
          </a>
        </p>

        <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
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
          className="mb-10 w-full inline-flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-6 py-4 text-[13px] sm:text-sm font-extrabold tracking-[0.04em] text-slate-800 uppercase transition-colors hover:border-brand-cyan hover:text-brand-blue"
        >
          Can&apos;t find a time? Submit this
        </a>

        <ApplyFooter />
      </div>
    </div>
  );
}
