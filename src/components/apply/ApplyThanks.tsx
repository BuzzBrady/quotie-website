"use client";

import { useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";
import ApplyFaq from "@/components/apply/ApplyFaq";
import ApplyFooter from "@/components/apply/ApplyFooter";
import ApplyVideoSlot from "@/components/apply/ApplyVideoSlot";
import ApplyWordmark from "@/components/apply/ApplyWordmark";
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

      <div className="relative z-10 mx-auto flex w-full max-w-[680px] flex-1 flex-col px-5 pb-12 pt-8 sm:pt-12">
        <div className="mb-8">
          <ApplyWordmark />
        </div>

        <p className="mb-3 text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
          {meeting.requested
            ? "We'll lock in a time"
            : "Your session is booked"}
        </p>
        <h1
          className="mb-5 text-center font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900"
          style={{
            fontSize: "clamp(26px, 6vw, 38px)",
            lineHeight: 1.14,
            letterSpacing: "-0.03em",
          }}
        >
          {meeting.requested ? (
            <>
              We&apos;ve got your preferred times. Someone from the Quotie
              team will{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                confirm a time
              </span>{" "}
              shortly.
            </>
          ) : parts ? (
            <>
              You&apos;re booked for{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                {parts.time}
              </span>{" "}
              on {parts.day}
            </>
          ) : (
            <>
              You&apos;re booked. See you on the{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                strategy session
              </span>
            </>
          )}
        </h1>

        <section className="mb-10">
          <p className="mb-4 text-center text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Before the call
          </p>
          <ol className="space-y-3 text-[15px] leading-relaxed text-slate-800">
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
            <h2 className="mb-4 font-[family-name:var(--font-jakarta)] text-[22px] font-extrabold tracking-tight text-slate-900">
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
            <h2 className="mb-4 font-[family-name:var(--font-jakarta)] text-[22px] font-extrabold tracking-tight text-slate-900">
              Optional: how the system works
            </h2>
            <ApplyVideoSlot
              url={APPLY_EXPLAINER_VIDEO}
              title="System explainer"
            />
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-6 text-center font-[family-name:var(--font-jakarta)] text-[22px] font-extrabold tracking-tight text-slate-900">
            What clients say
          </h2>
          <div className="space-y-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
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
                <blockquote className="text-[15px] leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <ApplyFaq items={APPLY_THANKS_FAQS} heading="Before you hop on" />
        </section>

        <ApplyFooter />
      </div>
    </div>
  );
}
