"use client";

import { useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";
import { Inter } from "next/font/google";
import ApplyChrome from "@/components/apply/ApplyChrome";
import ApplyFaq from "@/components/apply/ApplyFaq";
import ApplyVideoSlot from "@/components/apply/ApplyVideoSlot";
import { APPLY_THANKS_FAQS } from "@/components/apply/applyThanksFaqs";
import {
  APPLY_CONFIRM_VIDEO,
  APPLY_EXPLAINER_VIDEO,
} from "@/components/apply/applyVideos";
import {
  APPLY_MEETING_KEY,
  formatMeetingParts,
  type ApplyMeeting,
} from "@/components/apply/applyQuestions";
import { toVslEmbedUrl } from "@/components/apply/vsl";

const inter = Inter({
  weight: ["400", "800"],
  subsets: ["latin"],
  display: "swap",
});

const TESTIMONIALS = [
  {
    quote:
      "I couldn't believe how quickly we closed $360k in a single month as soon as we had Quotie dialled in. The multi-option proposals are a game changer, clients love being able to choose what works for them.",
    name: "Jed Bolton",
    role: "Director, Bolton EC",
  },
  {
    quote:
      "Quotie has been a great resource for our company. For solar installs we need a way to store data and track each job's progress from approval to installation and Quotie handles this perfectly. For anyone looking for a similar solution this would be a great option to check out!",
    name: "Benjamin Hughes",
    role: "Director, Hughes Electrical Group",
  },
  {
    quote:
      "I know exactly where every single quote is at, every single day. Who needs a follow-up, who's ready to go. Complete visibility into the pipeline for the first time ever.",
    name: "Lachlan Williams",
    role: "Director, Coastal Cleans Co",
  },
] as const;

function readMeeting(): ApplyMeeting {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromQuery =
    params.get("startTime") ||
    params.get("start") ||
    params.get("date") ||
    params.get("time");
  if (fromQuery) {
    const parsed = new Date(fromQuery);
    if (!Number.isNaN(parsed.getTime())) return { startIso: fromQuery };
  }
  try {
    const raw = sessionStorage.getItem(APPLY_MEETING_KEY);
    if (raw) return JSON.parse(raw) as ApplyMeeting;
  } catch {
    return {};
  }
  return {};
}

export default function ApplyThanks() {
  const [meeting, setMeeting] = useState<ApplyMeeting>({});

  useEffect(() => {
    if (window.top && window.top !== window.self) {
      window.top.location.replace(window.location.href);
      return;
    }
    setMeeting(readMeeting());
  }, []);

  const parts = formatMeetingParts(meeting.startIso);
  const confirmUrl = toVslEmbedUrl(APPLY_CONFIRM_VIDEO);
  const explainerUrl = toVslEmbedUrl(APPLY_EXPLAINER_VIDEO);

  const headingStyle = {
    color: "#000",
    fontSize: "clamp(1.25rem, 4.2vw, 1.85rem)",
    lineHeight: 1.2,
    letterSpacing: 0,
    fontWeight: 800,
  } as const;

  return (
    <ApplyChrome>
      <p className="mb-4 text-center text-4xl sm:text-5xl leading-none" aria-hidden>
        👋
      </p>
      <h1
        className={`${inter.className} mb-5 text-center uppercase`}
        style={headingStyle}
      >
        {meeting.requested
          ? "We'll Confirm A Time Shortly"
          : parts
            ? `You're Booked For ${parts.time} On ${parts.day}`
            : "You're Booked For Your Strategy Session"}
      </h1>
      <p
        className={`${inter.className} mb-8 text-center text-[15px] text-slate-500`}
        style={{ fontWeight: 400, lineHeight: 1.4 }}
      >
        {meeting.requested
          ? "Someone from the Quotie team will lock in one of your preferred times."
          : "Add it to your calendar and watch the short video below before the call."}
      </p>

      <section className="mb-10">
        <p
          className={`${inter.className} mb-4 text-center uppercase text-slate-500`}
          style={{ fontSize: "0.95rem", letterSpacing: "0.08em", fontWeight: 400 }}
        >
          Before the call
        </p>
        <ol
          className={`${inter.className} space-y-3 text-[15px] leading-relaxed text-slate-800`}
          style={{ fontWeight: 400, lineHeight: 1.4 }}
        >
          <li>
            <span className="font-bold text-brand-blue">1. </span>
            {parts
              ? `Add ${parts.time} on ${parts.day} to your calendar.`
              : "Add the time you booked to your calendar."}
          </li>
          <li>
            <span className="font-bold text-brand-blue">2. </span>
            {confirmUrl
              ? "Watch the short confirmation video below."
              : "Keep the slot — we'll send a reminder before the call."}
          </li>
          <li>
            <span className="font-bold text-brand-blue">3. </span>
            Be on time and present — treat this like a job you wouldn&apos;t
            miss. If you can&apos;t give it your full attention, pick a
            different time now.
          </li>
        </ol>
      </section>

      {confirmUrl && (
        <section className="mb-10">
          <h2
            className={`${inter.className} mb-4 uppercase`}
            style={{ ...headingStyle, fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)" }}
          >
            Watch this before the call
          </h2>
          <ApplyVideoSlot
            url={APPLY_CONFIRM_VIDEO}
            title="Confirmation video"
          />
        </section>
      )}

      {explainerUrl && (
        <section className="mb-10">
          <h2
            className={`${inter.className} mb-4 uppercase`}
            style={{ ...headingStyle, fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)" }}
          >
            Optional: how the system works
          </h2>
          <ApplyVideoSlot
            url={APPLY_EXPLAINER_VIDEO}
            title="System explainer"
          />
        </section>
      )}

      <section className="mb-12">
        <h2
          className={`${inter.className} mb-6 text-center uppercase`}
          style={{ ...headingStyle, fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)" }}
        >
          What clients say
        </h2>
        <div className="space-y-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-[12px] border border-slate-200 bg-white p-5"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    weight="fill"
                    className="h-3.5 w-3.5 text-amber-400"
                  />
                ))}
              </div>
              <blockquote
                className={`${inter.className} text-[15px] text-slate-700`}
                style={{ fontWeight: 400, lineHeight: 1.4 }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className={`${inter.className} mt-3 text-sm font-semibold text-slate-900`}>
                {t.name}
              </p>
              <p className={`${inter.className} text-xs text-slate-500`} style={{ fontWeight: 400 }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <ApplyFaq items={APPLY_THANKS_FAQS} heading="Before you hop on" />
      </section>
    </ApplyChrome>
  );
}
