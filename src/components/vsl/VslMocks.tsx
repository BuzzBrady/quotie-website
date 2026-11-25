import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Check,
  Lightning,
  MapPin,
  Plus,
  Printer,
  Sparkle,
  UsersThree,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { AppWindow, PageTitle } from "@/components/sections/platform/AppMocks";

/**
 * Extra coded mockups for the explainer video, in the same style as
 * sections/platform/AppMocks.tsx. Labels, stage names and colours are lifted
 * from quote-pro-working (pipeline: STANDARD_PIPELINE in
 * components/pipeline/utils/stageConfig.ts; scheduling: components/job-scheduling;
 * create-job dialog: job-fulfilment/creation/CreateJobModal.tsx).
 * Sample data only. Update them when those screens change.
 */

const B = "#e6e6e6";
const PRIMARY = "#2563eb";

/* ------------------------------ Pipeline ------------------------------ */

export const PIPELINE_STAGES = [
  { name: "New Lead", color: "#3b82f6", cards: ["T. Nguyen", "L. Fischer"] },
  { name: "Site Visit", color: "#0ea5e9", cards: ["D. Kowalski"] },
  { name: "Quote Sent", color: "#f59e0b", cards: ["P. Raman", "O. Haddad"] },
  { name: "Follow-Up", color: "#f97316", cards: ["G. Lee"] },
  { name: "Signed", color: "#8b5cf6", cards: [] },
  { name: "Won", color: "#22c55e", cards: ["B. Carter"] },
  { name: "Lost", color: "#ef4444", cards: [] },
] as const;

/**
 * `pos` is the featured card's column, fractional while it moves
 * (0 New Lead · 1 Site Visit · 2 Quote Sent · 4 Signed). `event` is what just
 * happened in Quotie to move it.
 */
export function PipelineMock({ pos, event }: { pos: number; event: string | null }) {
  const n = PIPELINE_STAGES.length;
  const gap = 6;
  return (
    <AppWindow active="pipeline">
      <div className="flex items-start justify-between">
        <PageTitle title="Pipeline" sub="Sales Pipeline · From new lead to won job." />
        <span className="rounded-md border px-2 py-1 text-[9.5px] font-semibold" style={{ borderColor: B }}>
          Edit pipelines
        </span>
      </div>
      <div className="relative">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap }}>
          {PIPELINE_STAGES.map((s) => (
            <div key={s.name} className="min-h-[300px] rounded-lg bg-[#f5f5f5] p-1.5">
              <div className="flex items-center gap-1 px-0.5 pb-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.color }} />
                <span className="truncate text-[9.5px] font-semibold">{s.name}</span>
              </div>
              {/* Top slot is kept clear: automatic moves put the card on top. */}
              <div className="h-[62px]" />
              <div className="space-y-1.5">
                {s.cards.map((c) => (
                  <div key={c} className="rounded-md border bg-white px-1.5 py-1.5" style={{ borderColor: B }}>
                    <div className="truncate text-[9.5px] font-semibold">{c}</div>
                    <div className="mt-1 h-1 w-3/4 rounded bg-[#ececec]" />
                    <div className="mt-1 text-[8px] text-[#a3a3a3]">3d in stage</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* The featured card, moved by events rather than by hand */}
        <div
          className="absolute top-[24px] p-1.5"
          style={{
            width: `calc((100% - ${gap * (n - 1)}px) / ${n})`,
            left: `calc(${pos} * (100% + ${gap}px) / ${n})`,
          }}
        >
          <div
            className="rounded-md border-2 bg-white px-1.5 py-1.5 shadow-[0_8px_18px_-8px_rgba(37,99,235,0.6)]"
            style={{ borderColor: PRIMARY }}
          >
            <div className="truncate text-[9.5px] font-bold">S. Mitchell</div>
            <div className="text-[9px] font-semibold tabular-nums text-[#525252]">$20,640</div>
            <div className="mt-0.5 text-[8px] text-[#a3a3a3]">Just now</div>
          </div>
          {event && (
            <div className="absolute left-1.5 top-[66px] z-10 w-max rounded-md bg-[#1a1a1a] px-2 py-1 text-[9px] font-semibold text-white shadow-lg">
              <span className="inline-flex items-center gap-1">
                <Lightning weight="fill" className="h-2.5 w-2.5 text-amber-300" />
                {event}
              </span>
              <span className="block text-[8px] font-medium text-white/60">Moved automatically</span>
            </div>
          )}
        </div>
      </div>
    </AppWindow>
  );
}

/* --------------------------- Create job dialog --------------------------- */

export function CreateJobDialog({ pressed = false }: { pressed?: boolean }) {
  return (
    <div className="w-[340px] rounded-xl bg-white p-5 text-[#1a1a1a] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] ring-1 ring-black/10">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
          <Sparkle weight="fill" className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[14px] font-bold">Add to Job Pipeline</div>
          <div className="text-[10.5px] text-[#737373]">
            Track this won quote through your fulfilment process
          </div>
        </div>
      </div>

      <div className="mt-4 text-[11px] font-semibold">Select Pipeline</div>
      <div className="mt-1.5 flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-[11px] font-semibold" style={{ borderColor: "#10b981" }}>
        <Check weight="bold" className="h-3 w-3 text-emerald-600" /> Solar install
        <span className="ml-auto text-[9.5px] font-medium text-[#737373]">Playbook attached</span>
      </div>

      <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-semibold">
        <CalendarBlank className="h-3.5 w-3.5 text-[#737373]" /> Schedule
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-2 text-[10.5px]">
        {[
          ["Start date", "Wed 2 Dec"],
          ["End date", "Thu 3 Dec"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[9.5px] text-[#737373]">{k}</div>
            <div className="mt-0.5 rounded-md border px-2 py-1.5 font-medium" style={{ borderColor: B }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-semibold">
        <UsersThree className="h-3.5 w-3.5 text-[#737373]" /> Crew
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] font-semibold">
        {[
          ["Liam", "#2563eb", true],
          ["Noah", "#f59e0b", true],
          ["Ava", "#10b981", false],
          ["Sam", "#8b5cf6", false],
        ].map(([name, color, on]) => (
          <span
            key={name as string}
            className="inline-flex items-center gap-1 rounded-full border px-2 py-1"
            style={{
              borderColor: on ? (color as string) : B,
              background: on ? `${color}14` : "#fff",
              color: on ? "#1a1a1a" : "#737373",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color as string }} />
            {name}
          </span>
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-2 text-[11px] font-semibold">
        <span className="rounded-md border px-3 py-1.5" style={{ borderColor: B }}>
          Cancel
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-white"
          style={{ background: pressed ? "#047857" : "#059669" }}
        >
          <CaretRight weight="bold" className="h-3 w-3" /> Add to Pipeline
        </span>
      </div>
    </div>
  );
}

/* ------------------------------ Scheduling ------------------------------ */

const DAYS = ["Mon 30", "Tue 1", "Wed 2", "Thu 3", "Fri 4"];
const CREW = [
  { name: "Liam", role: "Installer", color: "#2563eb" },
  { name: "Noah", role: "Installer", color: "#f59e0b" },
  { name: "Ava", role: "Electrician", color: "#10b981" },
  { name: "Sam", role: "Apprentice", color: "#8b5cf6" },
];

type Bar = {
  row: number; // 0 = Unassigned work, 1.. = crew
  from: number; // slot 0–14 (5 days × morning / midday / afternoon)
  to: number; // inclusive
  label: string;
  tone: "job" | "new" | "away" | "visit" | "unassigned";
  lane?: number;
};

const BARS: Bar[] = [
  { row: 0, from: 12, to: 14, label: "Kowalski · Wyong", tone: "unassigned" },
  { row: 1, from: 0, to: 5, label: "Raman · Erina", tone: "job" },
  { row: 2, from: 0, to: 1, label: "Nguyen · Gosford", tone: "job" },
  { row: 3, from: 3, to: 6, label: "Fischer · Avoca Beach", tone: "job" },
  { row: 3, from: 6, to: 7, label: "Nguyen · Gosford", tone: "job", lane: 1 },
  { row: 4, from: 0, to: 2, label: "Away", tone: "away" },
  { row: 4, from: 9, to: 11, label: "Site visits", tone: "visit" },
];
const NEW_BARS: Bar[] = [
  { row: 1, from: 6, to: 11, label: "Mitchell · Terrigal", tone: "new" },
  { row: 2, from: 6, to: 11, label: "Mitchell · Terrigal", tone: "new" },
];

const TONES: Record<Bar["tone"], string> = {
  job: "bg-blue-100 text-blue-900 border-blue-200",
  new: "bg-[#2563eb] text-white border-[#2563eb]",
  away: "bg-[#ececec] text-[#737373] border-[#dcdcdc]",
  visit: "bg-teal-100 text-teal-900 border-teal-200",
  unassigned: "bg-white text-[#525252] border-dashed border-[#bdbdbd]",
};

const NAME_W = 86;
const ROW_H = 50;

export function ScheduleMock({ newJob = 1 }: { /** 0–1 opacity of the newly won job */ newJob?: number }) {
  const rows = [{ name: "Unassigned work", role: "", color: "" }, ...CREW];
  const bar = (b: Bar, opacity = 1) => (
    <div
      key={`${b.row}-${b.from}-${b.label}`}
      className={`absolute flex items-center overflow-hidden rounded border px-1.5 text-[9px] font-semibold ${TONES[b.tone]}`}
      style={{
        top: b.row * ROW_H + 5 + (b.lane ?? 0) * 21,
        height: b.tone === "job" && b.row === 3 ? 19 : 40,
        left: `calc(${NAME_W}px + (100% - ${NAME_W}px) * ${b.from / 15} + 2px)`,
        width: `calc((100% - ${NAME_W}px) * ${(b.to - b.from + 1) / 15} - 4px)`,
        opacity,
      }}
    >
      <span className="truncate">{b.label}</span>
    </div>
  );
  return (
    <AppWindow active="jobs" scheduling>
      <div className="text-[15px] font-bold tracking-tight">Jobs</div>
      <div className="mt-1.5 flex gap-4 border-b text-[11px] font-semibold" style={{ borderColor: B }}>
        <span className="pb-1.5 text-[#737373]">Pipeline</span>
        <span className="border-b-2 pb-1.5" style={{ borderColor: PRIMARY }}>
          Scheduling
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[9.5px] font-semibold">
        <span className="inline-flex items-center rounded-md border" style={{ borderColor: B }}>
          <CaretLeft className="m-1 h-3 w-3" />
          <span className="border-x px-2 py-1" style={{ borderColor: B }}>
            Today
          </span>
          <CaretRight className="m-1 h-3 w-3" />
        </span>
        <span className="inline-flex overflow-hidden rounded-md border" style={{ borderColor: B }}>
          <span className="bg-[#1a1a1a] px-2 py-1 text-white">Week</span>
          <span className="px-2 py-1 text-[#737373]">2 Weeks</span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-md border px-2 py-1" style={{ borderColor: B }}>
          <Plus weight="bold" className="h-2.5 w-2.5" /> Add
        </span>
        <span className="rounded-md border px-2 py-1" style={{ borderColor: B }}>
          Not scheduled
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1" style={{ borderColor: B }}>
          <Printer className="h-2.5 w-2.5" /> Print
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1" style={{ borderColor: B }}>
          <UsersThree className="h-2.5 w-2.5" /> Team
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border" style={{ borderColor: B }}>
        {/* Day headers, each split into morning / midday / afternoon */}
        <div className="flex bg-[#f5f5f5] text-[9px] font-semibold text-[#525252]">
          <div style={{ width: NAME_W }} />
          {DAYS.map((d, i) => (
            <div key={d} className="flex-1 border-l px-1 py-1 text-center" style={{ borderColor: B }}>
              <span className={i === 2 ? "rounded bg-[#2563eb] px-1 text-white" : ""}>{d}</span>
              <div className="mt-0.5 flex justify-around text-[6.5px] font-medium uppercase tracking-wide text-[#a3a3a3]">
                <span>am</span>
                <span>mid</span>
                <span>pm</span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          {rows.map((r, i) => (
            <div key={r.name} className="flex border-t" style={{ borderColor: B, height: ROW_H }}>
              <div className="flex shrink-0 items-center gap-1.5 px-2" style={{ width: NAME_W }}>
                {r.color && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.color }} />}
                <div className="min-w-0">
                  <div className={`truncate text-[10px] font-semibold ${i === 0 ? "text-[#737373]" : ""}`}>
                    {r.name}
                  </div>
                  {r.role && <div className="truncate text-[8px] text-[#a3a3a3]">{r.role}</div>}
                </div>
              </div>
              {DAYS.map((d) => (
                <div key={d} className="flex flex-1 border-l" style={{ borderColor: B }}>
                  <span className="flex-1" />
                  <span className="flex-1 border-x border-dashed border-[#f0f0f0]" />
                  <span className="flex-1" />
                </div>
              ))}
            </div>
          ))}
          {BARS.map((b) => bar(b))}
          {NEW_BARS.map((b) => bar(b, newJob))}
          {/* Double-booked: Ava is on two jobs on Wednesday morning */}
          <span
            className="absolute inline-flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-px text-[8px] font-bold text-red-700 ring-1 ring-red-200"
            style={{
              top: 3 * ROW_H + 27,
              left: `calc(${NAME_W}px + (100% - ${NAME_W}px) * ${8 / 15} + 6px)`,
            }}
          >
            <Warning weight="fill" className="h-2.5 w-2.5" /> 2 jobs
          </span>
        </div>
      </div>
    </AppWindow>
  );
}

/* ------------------------------ Site visits ------------------------------ */

export function SiteVisitsMock() {
  const stops = [
    ["9:00 am", "Tom Nguyen", "Gosford", ""],
    ["10:45 am", "Lena Fischer", "Avoca Beach", "25 min drive"],
    ["1:00 pm", "Dan Kowalski", "Wyong", "30 min drive"],
    ["3:00 pm", "Grace Lee", "Terrigal", "25 min drive"],
  ];
  return (
    <AppWindow active="visits">
      <PageTitle title="Site Visits" sub="Plan your road days — order the stops, see the driving." />
      <div className="rounded-lg border" style={{ borderColor: B }}>
        <div className="flex items-center gap-2 border-b px-3 py-2.5" style={{ borderColor: B }}>
          <MapPin weight="fill" className="h-3.5 w-3.5" style={{ color: PRIMARY }} />
          <span className="text-[11.5px] font-semibold">Thursday 3 Dec</span>
          <span className="ml-auto text-[10px] text-[#737373]">4 visits · 1h 20m driving</span>
        </div>
        {stops.map(([time, name, suburb, drive], i) => (
          <div key={name} className="flex items-center gap-3 border-b px-3 py-2.5 last:border-b-0" style={{ borderColor: B }}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f0f0] text-[9px] font-bold">
              {i + 1}
            </span>
            <span className="w-14 text-[10.5px] font-semibold tabular-nums">{time}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold">{name}</div>
              <div className="text-[9.5px] text-[#737373]">{suburb}</div>
            </div>
            {drive && <span className="text-[9.5px] text-[#a3a3a3]">{drive}</span>}
            <span className="rounded-md border px-2 py-1 text-[9px] font-semibold" style={{ borderColor: B }}>
              Create Quote
            </span>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

/* ------------------------------- Calendar ------------------------------- */

export function CalendarMock() {
  const events: [number, number, number, string, string][] = [
    // day, start row, rows, label, classes
    [0, 0, 3, "Job · Raman", "bg-amber-100 text-amber-900"],
    [1, 1, 2, "Quote due · Haddad", "bg-blue-100 text-blue-900"],
    [2, 0, 4, "Job · Mitchell", "bg-amber-100 text-amber-900"],
    [3, 0, 2, "Site visit · Nguyen", "bg-teal-100 text-teal-900"],
    [3, 2, 2, "Site visit · Kowalski", "bg-teal-100 text-teal-900"],
    [4, 1, 2, "Follow-up · Lee", "bg-orange-100 text-orange-900"],
  ];
  return (
    <AppWindow active="calendar">
      <div className="flex items-start justify-between">
        <PageTitle title="Calendar" sub="Quotes, jobs and site visits in one view." />
        <div className="flex overflow-hidden rounded-md border text-[9.5px] font-semibold" style={{ borderColor: B }}>
          <span className="px-2 py-1 text-[#737373]">Day</span>
          <span className="bg-[#1a1a1a] px-2 py-1 text-white">Week</span>
          <span className="px-2 py-1 text-[#737373]">Month</span>
        </div>
      </div>
      <div className="grid grid-cols-5 overflow-hidden rounded-lg border" style={{ borderColor: B }}>
        {DAYS.map((d, di) => (
          <div key={d} className="border-l first:border-l-0" style={{ borderColor: B }}>
            <div className="bg-[#f5f5f5] py-1.5 text-center text-[9.5px] font-semibold text-[#525252]">{d}</div>
            <div className="relative h-[280px]">
              {[1, 2, 3].map((r) => (
                <div key={r} className="absolute inset-x-0 border-t border-dashed border-[#f0f0f0]" style={{ top: r * 70 }} />
              ))}
              {events
                .filter((e) => e[0] === di)
                .map(([, start, rows, label, cls]) => (
                  <div
                    key={label}
                    className={`absolute inset-x-1 rounded px-1.5 py-1 text-[9px] font-semibold ${cls}`}
                    style={{ top: start * 66 + 6, height: rows * 62 }}
                  >
                    {label}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}
