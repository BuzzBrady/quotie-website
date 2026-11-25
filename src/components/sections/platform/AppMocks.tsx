/**
 * Static, coded mockups of real Quotie screens. Labels, nav order, status
 * names and colours are lifted from the app (quote-pro-working) so the site
 * shows the product as it is. Sample data only — no customer data.
 */

import {
  Bell,
  Briefcase,
  CalendarBlank,
  ChartLineUp,
  Check,
  Clock,
  EnvelopeSimple,
  Eye,
  Fire,
  Gear,
  ListBullets,
  MapPin,
  PaperPlaneTilt,
  Paperclip,
  PenNib,
  PhoneCall,
  Plus,
  SquaresFour,
  Trophy,
  Lightning,
  Diamond,
  Target,
} from "@phosphor-icons/react/dist/ssr";

const B = "#e6e6e6"; // app border
const PRIMARY = "#2563eb"; // app primary (default scheme, light)

const NAV: { section?: string; items: { id: string; label: string; icon: typeof Bell }[] }[] = [
  { items: [{ id: "dashboard", label: "Dashboard", icon: SquaresFour }] },
  {
    section: "Quotes",
    items: [
      { id: "new", label: "New Quote", icon: Plus },
      { id: "quotes", label: "My Quotes", icon: ListBullets },
      { id: "send", label: "Send Quote", icon: PaperPlaneTilt },
    ],
  },
  {
    section: "Manage",
    items: [
      { id: "pipeline", label: "Pipeline", icon: ChartLineUp },
      { id: "followups", label: "Follow-Ups & Tasks", icon: PhoneCall },
      { id: "visits", label: "Site Visits", icon: MapPin },
      { id: "jobs", label: "Jobs", icon: Briefcase },
      { id: "emails", label: "Emails", icon: EnvelopeSimple },
      { id: "calendar", label: "Calendar", icon: CalendarBlank },
    ],
  },
  { items: [{ id: "settings", label: "Settings", icon: Gear }] },
];

export function AppWindow({
  active,
  scheduling = false,
  children,
}: {
  active: string;
  /** Companies with the Scheduling module see "Jobs & Scheduling" in the nav. */
  scheduling?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[440px] rounded-xl overflow-hidden bg-white text-[#1a1a1a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
      <aside
        className="hidden md:flex w-[172px] shrink-0 flex-col border-r py-3 px-2.5"
        style={{ borderColor: B }}
      >
        <div className="flex items-center gap-2 px-2 pb-3 mb-2 border-b" style={{ borderColor: B }}>
          <img src="/logo.svg" alt="" className="w-5 h-5" width={20} height={20} />
          <span className="font-jakarta font-extrabold text-[14px] tracking-tight text-[#1b478c]">
            Quotie
          </span>
        </div>
        {NAV.map((group, gi) => (
          <div key={gi} className="mb-2">
            {group.section && (
              <div className="px-2 pt-1.5 pb-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[#737373]/70">
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const on = item.id === active;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`relative flex items-center gap-2 rounded-md px-2 py-[5px] text-[11px] ${
                    on ? "bg-[#f0f0f0] font-semibold text-[#1a1a1a]" : "font-medium text-[#737373]"
                  }`}
                >
                  {on && (
                    <span
                      className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
                      style={{ background: PRIMARY }}
                    />
                  )}
                  <Icon weight={on ? "fill" : "regular"} className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {scheduling && item.id === "jobs" ? "Jobs & Scheduling" : item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <div
          className="h-10 shrink-0 flex items-center justify-end gap-2 px-4 border-b"
          style={{ borderColor: B }}
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 px-2 py-0.5 text-[9.5px] font-semibold">
            <Fire weight="fill" className="w-3 h-3" /> 2 Hot
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[9.5px] font-semibold">
            4 Due today
          </span>
          <span className="relative ml-1">
            <Bell className="w-4 h-4 text-[#737373]" />
            <span className="absolute -top-1 -right-1.5 h-3 min-w-3 px-0.5 rounded-full bg-red-500 text-white text-[7.5px] font-bold flex items-center justify-center">
              3
            </span>
          </span>
        </div>
        <div className="flex-1 min-w-0 p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <div className="text-[15px] font-bold tracking-tight">{title}</div>
      {sub && <div className="text-[10.5px] text-[#737373] mt-0.5">{sub}</div>}
    </div>
  );
}

/* ------------------------------ Send ------------------------------ */

export function SendMock() {
  return (
    <AppWindow active="send">
      <PageTitle title="Send Quotes — Sarah Mitchell" sub="sarah@example.com.au · 0400 111 222" />
      <div className="flex items-center gap-2 mb-4 text-[10px] font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-[#2563eb] px-2.5 py-1">
          <Check weight="bold" className="w-3 h-3" /> Select Quotes
        </span>
        <span className="h-px w-5 bg-[#e6e6e6]" />
        <span className="rounded-full text-white px-2.5 py-1" style={{ background: PRIMARY }}>
          2 Review &amp; Send
        </span>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="rounded-lg border p-3" style={{ borderColor: B }}>
            <div className="text-[11px] font-semibold mb-2">2 Quotes Selected</div>
            {[
              ["1", "Q-1042", "10kW Solar", "$11,790", "Margin 31.8%"],
              ["2", "Q-1043", "10kW Solar + 10kWh Battery", "$20,640", "Margin 32.5%"],
            ].map(([n, num, desc, price, margin]) => (
              <div key={num} className="flex items-center gap-2 py-1.5 border-t" style={{ borderColor: B }}>
                <span
                  className="w-4 h-4 rounded text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ background: PRIMARY }}
                >
                  {n}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10.5px] font-semibold truncate">
                    {num} · {desc}
                  </div>
                  <span className="inline-block mt-0.5 rounded-full bg-emerald-50 text-emerald-700 px-1.5 text-[9px] font-semibold">
                    {margin}
                  </span>
                </div>
                <div className="text-[11px] font-bold tabular-nums">{price}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border p-3 text-[10.5px]" style={{ borderColor: B }}>
            <div className="text-[11px] font-semibold mb-2">Email Content</div>
            {[
              ["From", "you@yourbusiness.com.au"],
              ["To", "Sarah Mitchell"],
              ["Subject", "Your solar quote options"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 py-1 border-t" style={{ borderColor: B }}>
                <span className="w-12 text-[#737373]">{k}</span>
                <span className="font-medium truncate">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-[#f4f4f5] p-3">
          <div className="text-[10px] font-semibold text-[#737373] mb-2">Email Preview</div>
          <div className="bg-white rounded-md overflow-hidden shadow-sm">
            <div className="h-1" style={{ background: PRIMARY }} />
            <div className="p-3 text-[10.5px] leading-relaxed text-[#404040]">
              <p className="font-semibold text-[#1a1a1a]">Hi Sarah,</p>
              <p className="mt-1.5">
                Great to meet you on site. I&apos;ve put together two options for your
                place — view and sign online using the link below.
              </p>
              <span
                className="inline-block mt-2.5 rounded-md text-white px-2.5 py-1 text-[10px] font-semibold"
                style={{ background: PRIMARY }}
              >
                View your quotes
              </span>
              <div className="mt-3 pt-2 border-t" style={{ borderColor: "#e0e0e0" }}>
                {["Q-1042.pdf", "Q-1043.pdf"].map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 mr-1.5 rounded border px-1.5 py-0.5 text-[9.5px] text-[#737373]"
                    style={{ borderColor: B }}
                  >
                    <Paperclip className="w-2.5 h-2.5" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2 text-[10px] font-semibold">
            <span className="inline-flex items-center gap-1 rounded-md border bg-white px-2.5 py-1.5" style={{ borderColor: B }}>
              <Clock className="w-3 h-3" /> Schedule
            </span>
            <span className="inline-flex items-center gap-1 rounded-md text-white px-2.5 py-1.5" style={{ background: PRIMARY }}>
              <PaperPlaneTilt weight="fill" className="w-3 h-3" /> Send 2 Quotes
            </span>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

/* --------------------------- Accept & Sign --------------------------- */

export function SignMock({ signed = true }: { signed?: boolean }) {
  return (
    <div className="h-full min-h-[440px] rounded-xl overflow-hidden bg-[#f9fafb] text-[#1a1a1a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 flex flex-col">
      <div className="h-10 shrink-0 bg-white border-b flex items-center gap-2 px-4" style={{ borderColor: B }}>
        <span className="w-5 h-5 rounded bg-[#1a1a1a] text-white text-[9px] font-bold flex items-center justify-center">
          YB
        </span>
        <span className="text-[11.5px] font-semibold">Your Business</span>
        <span className="ml-auto font-mono text-[9px] text-[#737373] hidden sm:block">
          Hosted quote page · no download needed
        </span>
      </div>
      <div className="flex-1 p-4 sm:p-6">
        <div className="text-[15px] font-bold tracking-tight">Hi Sarah,</div>
        <div className="text-[11px] text-[#525252] mt-0.5">
          Here are your quotes from <b>Your Business</b>. You have 2 options to choose
          from — compare them below.
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div
            className={`rounded-xl border bg-white p-3.5 shadow-sm ${signed ? "opacity-60" : ""}`}
            style={{ borderColor: B }}
          >
            <div className="text-[11px] font-semibold">10kW Solar</div>
            <div className="text-[9.5px] text-[#737373]">Q-1042</div>
            <div className="text-xl font-extrabold mt-1.5 tabular-nums" style={{ color: PRIMARY }}>
              $11,790
            </div>
            <div className="mt-3 h-20 rounded-md bg-[#f5f5f5] border flex items-center justify-center text-[9.5px] text-[#737373]" style={{ borderColor: B }}>
              Page 1 preview
            </div>
            <div className="mt-3 text-[10px] font-medium text-[#737373]">
              {signed ? "Not selected" : "Option 1"}
            </div>
          </div>
          <div
            className="rounded-xl border-2 bg-white p-3.5 shadow-sm"
            style={{ borderColor: signed ? PRIMARY : B }}
          >
            <div className="text-[11px] font-semibold">10kW Solar + 10kWh Battery</div>
            <div className="text-[9.5px] text-[#737373]">Q-1043</div>
            <div className="text-xl font-extrabold mt-1.5 tabular-nums" style={{ color: PRIMARY }}>
              $20,640
            </div>
            <div className="mt-3 rounded-xl border-2 border-dashed bg-[#f9fafb] h-20 flex items-center justify-center" style={{ borderColor: "#d4d4d4" }}>
              {!signed && <span className="text-[10px] text-[#a3a3a3]">Sign here to accept</span>}
              <svg viewBox="0 0 190 46" className={signed ? "h-10" : "hidden"} fill="none" aria-hidden>
                <path
                  d="M6 34c8-14 16-26 22-26 5 0 1 14-3 24-2 6 6-10 14-12 5-1 2 8 6 8 5 0 8-10 14-10 4 0 2 9 7 9 6 0 9-16 16-22 4-3 3 10-1 20-2 5 8-9 15-9 5 0 3 8 9 8 9 0 22-6 40-12"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {signed ? (
              <div className="mt-3 flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-800 px-2 py-1.5 text-[10px]">
                <Check weight="bold" className="w-3 h-3 shrink-0" />
                <span>
                  Accepted — signed by <b>Sarah Mitchell</b>
                </span>
              </div>
            ) : (
              <div
                className="mt-3 rounded-md px-2 py-1.5 text-center text-[10px] font-semibold text-white"
                style={{ background: PRIMARY }}
              >
                Accept &amp; Sign
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-[9.5px] text-[#737373]">
          <span className="inline-flex items-center gap-1">
            <PenNib className="w-3 h-3" /> Signed certificate stamped into the PDF
          </span>
          <span>Powered by Quotie</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Follow-ups ----------------------------- */

const FU = [
  {
    group: "Hot Leads",
    dot: "#f97316",
    edge: "#ef4444",
    initials: "SM",
    name: "Sarah Mitchell",
    value: "$20,640",
    hot: true,
    badges: [
      ["Due today", "bg-amber-100 text-amber-700"],
      ["Viewed 3× · 2h ago", "bg-blue-50 text-blue-700"],
      ["2 quotes", "bg-[#f5f5f5] text-[#525252]"],
    ],
  },
  {
    group: "Overdue",
    dot: "#ef4444",
    edge: "#ef4444",
    initials: "DK",
    name: "Dan Kowalski",
    value: "$8,290",
    hot: false,
    badges: [
      ["2 days overdue", "bg-red-100 text-red-700"],
      ["Second Follow Up", "bg-amber-100 text-amber-700"],
      ["Not opened", "bg-[#f5f5f5] text-[#525252]"],
    ],
  },
  {
    group: "Due Today",
    dot: "#fbbf24",
    edge: "#fbbf24",
    initials: "PR",
    name: "Priya Raman",
    value: "$21,450",
    hot: false,
    badges: [
      ["Due today · 2:30 pm", "bg-amber-100 text-amber-700"],
      ["Signed by Priya", "bg-emerald-50 text-emerald-700"],
    ],
  },
] as const;

export function FollowUpsMock() {
  return (
    <AppWindow active="followups">
      <PageTitle title="Follow-Ups & Tasks" sub="Manage your pre-quote and post-quote pipeline" />
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="rounded-xl border p-2.5" style={{ borderColor: B }}>
          <div className="text-[8.5px] font-semibold tracking-wider text-[#737373]">URGENCY</div>
          {[
            ["Overdue", "#ef4444", "38%"],
            ["Due Today", "#fbbf24", "62%"],
            ["Upcoming", "#60a5fa", "85%"],
          ].map(([l, c, w]) => (
            <div key={l} className="mt-1.5">
              <div className="h-1.5 rounded-full bg-[#f0f0f0]">
                <div className="h-full rounded-full" style={{ width: w, background: c }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border p-2.5 col-span-2" style={{ borderColor: B }}>
          <div className="text-[8.5px] font-semibold tracking-wider text-[#737373]">PIPELINE VALUE</div>
          <div className="text-[22px] font-extrabold tracking-tight tabular-nums leading-tight mt-0.5">
            $184,250
          </div>
          <div className="text-[9.5px] text-[#737373]">14 active groups · avg $13,160</div>
        </div>
      </div>
      <div className="space-y-2.5">
        {FU.map((f) => (
          <div key={f.name}>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.dot }} />
              {f.group}
            </div>
            <div
              className="rounded-lg border bg-white pl-3 pr-2.5 py-2 flex items-center gap-2.5"
              style={{ borderColor: B, borderLeft: `3px solid ${f.edge}` }}
            >
              <span className="w-6 h-6 rounded-full bg-[#f0f0f0] text-[9px] font-bold flex items-center justify-center shrink-0">
                {f.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                  {f.name}
                  {f.hot && <Fire weight="fill" className="w-3 h-3 text-orange-500" />}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {f.badges.map(([t, c]) => (
                    <span key={t} className={`rounded-full px-1.5 py-px text-[8.5px] font-semibold ${c}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[11.5px] font-bold tabular-nums">{f.value}</div>
                <div className="hidden sm:flex gap-1 mt-1 text-[8.5px] font-semibold">
                  <span className="rounded border px-1.5 py-0.5" style={{ borderColor: B }}>
                    Reschedule
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded bg-green-600 text-white px-1.5 py-0.5">
                    <Trophy weight="fill" className="w-2.5 h-2.5" /> Won
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

/* ------------------------------ Dashboard ------------------------------ */

function Spark({ color, d }: { color: string; d: string }) {
  return (
    <svg viewBox="0 0 120 32" className="w-full h-8 mt-1.5" fill="none" preserveAspectRatio="none" aria-hidden>
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function DashboardMock() {
  return (
    <AppWindow active="dashboard">
      <div className="flex items-start justify-between gap-3">
        <PageTitle title="Welcome back, Jordan" sub="Here's how your pipeline is looking." />
        <div className="hidden sm:flex text-[9.5px] font-semibold rounded-md border overflow-hidden" style={{ borderColor: B }}>
          <span className="px-2 py-1 bg-[#1a1a1a] text-white">This Month</span>
          <span className="px-2 py-1 text-[#737373]">This Quarter</span>
          <span className="px-2 py-1 text-[#737373]">This Year</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
        <div className="rounded-2xl border p-3 col-span-2 lg:col-span-1" style={{ borderColor: B }}>
          <div className="text-[8.5px] font-semibold tracking-wider text-[#737373]">PIPELINE VALUE</div>
          <div className="text-[22px] font-extrabold tracking-tight tabular-nums leading-tight mt-0.5">$184,250</div>
          <Spark color="#3b82f6" d="M2 26 C14 22 20 24 30 18 S48 20 58 12 S78 16 90 8 S108 10 118 4" />
          <div className="text-[9px] text-[#737373]">14 active groups</div>
        </div>
        <div className="rounded-2xl border p-3" style={{ borderColor: B }}>
          <div className="text-[8.5px] font-semibold tracking-wider text-[#737373]">WON REVENUE</div>
          <div className="text-[22px] font-extrabold tracking-tight tabular-nums leading-tight mt-0.5">$96,480</div>
          <Spark color="#10b981" d="M2 28 C16 26 22 20 34 20 S52 14 62 16 S82 8 94 9 S110 4 118 3" />
          <div className="text-[9px] text-[#737373]">Avg deal $12,060</div>
        </div>
        <div className="rounded-2xl border p-3" style={{ borderColor: B }}>
          <div className="text-[8.5px] font-semibold tracking-wider text-[#737373]">CONVERSION RATE</div>
          <div className="flex items-center gap-3 mt-1.5">
            <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90" aria-hidden>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#f0f0f0" strokeWidth="5" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="5" strokeDasharray="88" strokeDashoffset="48" strokeLinecap="round" />
            </svg>
            <div>
              <div className="text-[20px] font-extrabold tabular-nums leading-none">46%</div>
              <div className="text-[9px] text-[#737373] mt-1">8 won · 6 lost</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border p-3 col-span-2 lg:col-span-3" style={{ borderColor: B }}>
          <div className="text-[8.5px] font-semibold tracking-wider text-[#737373] mb-1.5">WHAT&apos;S NEXT</div>
          {[
            ["Jobs", "bg-amber-100 text-amber-700", ["1 overdue", "2 today", "5 upcoming"]],
            ["Follow-Ups", "bg-orange-100 text-orange-700", ["3 overdue", "4 today", "7 upcoming"]],
            ["Tasks", "bg-blue-100 text-blue-700", ["0 overdue", "1 today", "3 upcoming"]],
          ].map(([label, tile, pills]) => (
            <div key={label as string} className="flex items-center gap-2 py-1.5 border-t text-[10.5px]" style={{ borderColor: B }}>
              <span className={`w-5 h-5 rounded-md flex items-center justify-center ${tile}`}>
                <Target weight="fill" className="w-3 h-3" />
              </span>
              <span className="font-semibold flex-1">{label as string}</span>
              {(pills as string[]).map((p, i) => (
                <span
                  key={p}
                  className={`rounded-full px-1.5 py-px text-[8.5px] font-semibold ${
                    ["bg-red-50 text-red-700", "bg-amber-50 text-amber-700", "bg-blue-50 text-blue-700"][i]
                  } ${i === 2 ? "hidden sm:inline" : ""}`}
                >
                  {p}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

/* -------------------------------- Jobs -------------------------------- */

const JOBS = [
  ["Sarah Mitchell", "Terrigal", "Book install crew", 35, "Ready to Start", "#3b82f6", "$20,640", "32.5%"],
  ["Priya Raman", "Erina", "Order materials", 60, "60% - Action Needed", "#f59e0b", "$21,450", "29.1%"],
  ["Tom Nguyen", "Gosford", "Final inspection", 85, "Due Today", "#f59e0b", "$9,880", "34.0%"],
  ["Lena Fischer", "Avoca Beach", "Send handover pack", 100, "Complete", "#10b981", "$16,200", "31.2%"],
] as const;

export function JobsMock() {
  return (
    <AppWindow active="jobs">
      <PageTitle title="Job Fulfilment" sub="Won quotes become jobs — tracked through to completion." />
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: B }}>
        <div className="grid grid-cols-[1.3fr_1.4fr_1.2fr_0.7fr] sm:grid-cols-[1.3fr_0.9fr_1.4fr_1.2fr_0.8fr_0.7fr] gap-2 px-3 py-2 bg-[#f5f5f5] text-[8.5px] font-semibold uppercase tracking-wider text-[#737373]">
          <span>Customer</span>
          <span className="hidden sm:block">Suburb</span>
          <span>Progress</span>
          <span>Next Task</span>
          <span className="hidden sm:block text-right">Value</span>
          <span className="text-right">Profit</span>
        </div>
        {JOBS.map(([name, suburb, task, pct, label, color, value, profit]) => (
          <div
            key={name}
            className="grid grid-cols-[1.3fr_1.4fr_1.2fr_0.7fr] sm:grid-cols-[1.3fr_0.9fr_1.4fr_1.2fr_0.8fr_0.7fr] gap-2 items-center px-3 py-2.5 border-t text-[10.5px]"
            style={{ borderColor: B }}
          >
            <span className="font-semibold truncate">{name}</span>
            <span className="hidden sm:block text-[#737373] truncate">{suburb}</span>
            <span>
              <span className="block h-1.5 rounded-full bg-[#f0f0f0]">
                <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
              </span>
              <span className="block text-[8.5px] text-[#737373] mt-0.5 truncate">{label}</span>
            </span>
            <span className="truncate">{task}</span>
            <span className="hidden sm:block text-right font-semibold tabular-nums">{value}</span>
            <span className="text-right font-semibold tabular-nums text-emerald-700">{profit}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border p-3 flex items-start gap-2.5" style={{ borderColor: B }}>
        <span className="w-6 h-6 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
          <ListBullets weight="bold" className="w-3.5 h-3.5" />
        </span>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold">Playbook · Solar install</div>
          <div className="mt-1 space-y-1 text-[10px] text-[#525252]">
            {["Confirm roof access and switchboard photos", "Order panels, inverter and racking", "Book crew and notify customer"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                    i < 2 ? "bg-[#2563eb] border-[#2563eb] text-white" : ""
                  }`}
                  style={i < 2 ? undefined : { borderColor: "#c4c4c4" }}
                >
                  {i < 2 && <Check weight="bold" className="w-2 h-2" />}
                </span>
                <span className={i < 2 ? "line-through text-[#a3a3a3]" : ""}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

/* ----------------------------- Automations ----------------------------- */

const FLOW = [
  { kind: "Trigger", edge: "#3b82f6", icon: Target, title: "Quote Signed", sub: "Any template" },
  { kind: "Action", edge: "#f59e0b", icon: Bell, title: "Send Notification", sub: "To the lead owner" },
  { kind: "Wait", edge: "#0ea5e9", icon: Clock, title: "Wait 1 day", sub: "" },
  { kind: "Filter", edge: "#8b5cf6", icon: Diamond, title: "Only continue if…", sub: "No job has been created" },
  { kind: "Action", edge: "#f59e0b", icon: Lightning, title: "Send Email", sub: "Template: Welcome aboard" },
] as const;

export function AutomationsMock() {
  return (
    <AppWindow active="settings">
      <PageTitle title="Edit Automation" sub="Signed quote → notify, then send the welcome email" />
      <div className="max-w-[300px] mx-auto">
        {FLOW.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i}>
              {i > 0 && <div className="mx-auto h-3.5 w-px bg-[#d4d4d4]" />}
              <div
                className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2.5 shadow-sm"
                style={{ borderColor: B, borderLeft: `4px solid ${s.edge}` }}
              >
                <Icon weight="fill" className="w-3.5 h-3.5 shrink-0" style={{ color: s.edge }} />
                <div className="min-w-0">
                  <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color: s.edge }}>
                    {s.kind}
                  </div>
                  <div className="text-[11px] font-semibold truncate">{s.title}</div>
                  {s.sub && <div className="text-[9.5px] text-[#737373] truncate">{s.sub}</div>}
                </div>
                {i > 0 && (
                  <span className="ml-auto font-mono text-[9px] text-[#a3a3a3]">{i}</span>
                )}
              </div>
            </div>
          );
        })}
        <div className="mx-auto h-3.5 w-px bg-[#d4d4d4]" />
        <div className="rounded-lg border border-dashed px-3 py-2 text-center text-[10px] font-semibold text-[#737373]" style={{ borderColor: "#c4c4c4" }}>
          + Add step
        </div>
      </div>
    </AppWindow>
  );
}

export function ViewedToast() {
  return (
    <div className="rounded-lg bg-white text-[#1a1a1a] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-black/5 px-3 py-2.5 flex items-start gap-2.5 w-[230px]">
      <span className="w-6 h-6 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
        <Eye weight="fill" className="w-3.5 h-3.5" />
      </span>
      <div>
        <div className="text-[11px] font-semibold">Quote viewed</div>
        <div className="text-[10px] text-[#737373] leading-snug">
          Sarah Mitchell opened Q-1043 · just now
        </div>
      </div>
    </div>
  );
}
