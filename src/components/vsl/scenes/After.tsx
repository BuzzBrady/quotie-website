import { ArrowRight, DownloadSimple, Trophy } from "@phosphor-icons/react/dist/ssr";
import {
  AutomationsMock,
  FollowUpsMock,
  JobsMock,
  SendMock,
  SignMock,
  ViewedToast,
} from "@/components/sections/platform/AppMocks";
import CatalogMock from "@/components/sections/catalog/CatalogMock";
import { T, type SegmentId } from "../script";
import { Appear, Mono, Tap, glide, hold, lerp, ramp } from "../anim";
import {
  CalendarMock,
  CreateJobDialog,
  PipelineMock,
  ScheduleMock,
  SiteVisitsMock,
} from "../VslMocks";

/* 6a–6h — everything after the quote, following one deal through the app */

const STEPS: { id: SegmentId; title: string; sub: string }[] = [
  { id: "6a", title: "Send from your own inbox", sub: "Gmail or Outlook, from your address" },
  { id: "6b", title: "Opened. Accepted. Signed.", sub: "A hosted quote page — you know the moment they open it" },
  { id: "6c", title: "The pipeline moves itself", sub: "New lead, site visit, quote sent, signed" },
  { id: "6d", title: "Won quotes become jobs", sub: "Playbook attached, signed copy on file" },
  { id: "6e", title: "Then onto the schedule", sub: "Who's on which job, down to the part of the day" },
  { id: "6f", title: "And the rest of the CRM", sub: "Follow-ups, callback leads, site visits, calendar, automations" },
  { id: "6g", title: "Change your own prices", sub: "Logic and wording changes come through our team" },
];

// Mock windows are drawn at their natural size and scaled up to read on video.
const MOCK_W = 720;
const MOCK_H = 470;
const MOCK_SCALE = 1.15;

function MockFrame({
  t,
  from,
  to,
  width = MOCK_W,
  children,
}: {
  t: number;
  from: number;
  to: number;
  /** Natural width to draw the mock at; wider means more room, smaller text. */
  width?: number;
  children: React.ReactNode;
}) {
  const o = hold(t, from, to, 0.3);
  if (o <= 0) return null;
  const scale = (MOCK_W * MOCK_SCALE) / width;
  return (
    <div
      className="absolute left-[420px] top-[92px] origin-top-left"
      style={{
        width,
        height: (MOCK_H * MOCK_SCALE) / scale,
        transform: `scale(${scale})`,
        opacity: o,
      }}
    >
      {children}
    </div>
  );
}

function Toast({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex w-[230px] items-start gap-2.5 rounded-lg bg-white px-3 py-2.5 text-[#1a1a1a] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2563eb]">
        {icon}
      </span>
      <div>
        <div className="text-[11px] font-semibold">{title}</div>
        <div className="text-[10px] leading-snug text-[#737373]">{body}</div>
      </div>
    </div>
  );
}

function PipelineStep({ t }: { t: number }) {
  const l = t - T["6c"].start;
  const pos =
    lerp(0, 1, glide(l, 2.2, 3)) + lerp(0, 1, glide(l, 4.3, 5.1)) + lerp(0, 2, glide(l, 6.5, 7.4));
  const event =
    l < 0.8
      ? null
      : l < 2.2
        ? "New lead came in"
        : l < 3
          ? null
          : l < 4.3
            ? "Site visit booked"
            : l < 5.1
              ? null
              : l < 6.5
                ? "Quote sent"
                : l < 7.4
                  ? null
                  : "Client signed";
  return <PipelineMock pos={pos} event={event} />;
}

const CUTS = [FollowUpsMock, SiteVisitsMock, CalendarMock, AutomationsMock];
const CUT_LABELS = ["Follow-ups & callback leads", "Site visits", "Calendar", "Automations"];

export function After({ t }: { t: number }) {
  const step = STEPS.find((s) => t < T[s.id].end);
  const b = t - T["6b"].start;
  const d = t - T["6d"].start;
  const f = t - T["6f"].start;
  const g = t - T["6g"].start;
  const h = t - T["6h"].start;
  const cutLen = T["6f"].dur / CUTS.length;
  const cut = Math.min(CUTS.length - 1, Math.max(0, Math.floor(f / cutLen)));
  const catalogStep = g < 1 ? 0 : g < 2.2 ? 1 : g < 4 ? 2 : g < 5.6 ? 3 : 4;

  if (t >= T["6h"].start) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <Appear t={h} at={0.3}>
          <div className="font-jakarta text-[84px] font-extrabold tracking-[-0.04em] text-white">
            Quotie <span className="mark-live">is the CRM.</span>
          </div>
        </Appear>
        <Appear t={h} at={2.2} className="mt-6">
          <div className="text-[28px] text-white/70">
            The one thing it doesn&apos;t do is calling and texting.
          </div>
        </Appear>
      </div>
    );
  }

  return (
    <>
      {/* Left column: where we are in the deal */}
      <div className="absolute left-[64px] top-[92px] w-[320px]">
        <Mono className="text-[13px] text-brand-cyan">After the quote</Mono>
        {step && (
          <div key={step.id} style={{ opacity: hold(t, T[step.id].start, T[step.id].end, 0.3) }}>
            <div className="mt-5 font-jakarta text-[38px] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
              {step.title}
            </div>
            <div className="mt-4 text-[19px] leading-snug text-white/65">{step.sub}</div>
            {step.id === "6f" && (
              <div className="mt-6 space-y-2">
                {CUT_LABELS.map((c, i) => (
                  <div
                    key={c}
                    className="flex items-center gap-2.5 text-[17px] font-semibold"
                    style={{ color: i === cut ? "#fff" : "rgba(255,255,255,0.35)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: i === cut ? "#39b9e5" : "rgba(255,255,255,0.25)" }}
                    />
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="mt-9 flex gap-1.5">
          {STEPS.map((s) => (
            <span
              key={s.id}
              className="h-[3px] w-8 rounded-full"
              style={{
                background:
                  t >= T[s.id].start ? "#39b9e5" : "rgba(255,255,255,0.15)",
                opacity: step?.id === s.id ? 1 : 0.55,
              }}
            />
          ))}
        </div>
      </div>

      <MockFrame t={t} from={T["6a"].start} to={T["6a"].end}>
        <SendMock />
        <Tap t={t - T["6a"].start} at={3.6} className="left-[640px] top-[404px]" />
      </MockFrame>

      <MockFrame t={t} from={T["6b"].start} to={T["6b"].end}>
        <SignMock signed={b >= 5.4} />
        <Appear t={b} at={1.4} y={-10} className="absolute right-4 top-12">
          <ViewedToast />
        </Appear>
        <Appear t={b} at={3} y={-10} className="absolute right-4 top-[116px]">
          <Toast
            icon={<DownloadSimple weight="fill" className="h-3.5 w-3.5" />}
            title="PDF downloaded"
            body="Sarah Mitchell downloaded Q-1043"
          />
        </Appear>
        <Tap t={b} at={5.1} className="left-[520px] top-[318px]" />
      </MockFrame>

      <MockFrame t={t} from={T["6c"].start} to={T["6c"].end} width={810}>
        <PipelineStep t={t} />
      </MockFrame>

      <MockFrame t={t} from={T["6d"].start} to={T["6d"].end}>
        <div className="h-full" style={{ opacity: lerp(0.35, 1, ramp(d, 3.9, 4.4)) }}>
          <JobsMock />
        </div>
        <Appear t={d} at={0.3} out={4.1} className="absolute left-[190px] top-[44px]">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-600 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Trophy weight="fill" className="h-3 w-3" /> Marked as Won
            <ArrowRight weight="bold" className="h-3 w-3" />
          </div>
          <div className="relative">
            <CreateJobDialog pressed={d >= 3.4} />
            <Tap t={d} at={3.3} className="left-[270px] top-[352px]" />
          </div>
        </Appear>
      </MockFrame>

      <MockFrame t={t} from={T["6e"].start} to={T["6e"].end}>
        <ScheduleMock newJob={ramp(t - T["6e"].start, 1.3, 2)} />
      </MockFrame>

      {CUTS.map((Mock, i) => (
        <MockFrame
          key={i}
          t={t}
          from={T["6f"].start + i * cutLen}
          to={T["6f"].start + (i + 1) * cutLen}
        >
          <Mock />
        </MockFrame>
      ))}

      <MockFrame t={t} from={T["6g"].start} to={T["6g"].end}>
        <CatalogMock step={catalogStep} />
      </MockFrame>
    </>
  );
}

/* 7 — close */

export function Close({ t }: { t: number }) {
  const l = t - T["7"].start;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <Appear t={l} at={0.2}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={44} height={44} />
          <span className="font-jakarta text-[34px] font-extrabold tracking-[-0.03em] text-ink">Quotie</span>
        </div>
      </Appear>
      <Appear t={l} at={0.7} className="mt-7">
        <div className="font-jakarta text-[92px] font-extrabold leading-none tracking-[-0.045em] text-ink">
          We build it. <span className="mark-live">You quote.</span>
        </div>
      </Appear>
      <Appear t={l} at={2.2} className="mt-10">
        <span className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-7 py-4 text-[22px] font-semibold text-white">
          Schedule a demo <ArrowRight weight="bold" className="h-5 w-5" />
        </span>
        <div className="mt-4 font-mono text-[14px] uppercase tracking-[0.16em] text-ink-faint">quotie.au/demo</div>
      </Appear>
    </div>
  );
}
