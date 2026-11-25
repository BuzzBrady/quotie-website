import {
  ArrowLeft,
  CaretDown,
  Check,
  DotsThree,
  FileText,
  Function as FunctionIcon,
  List,
  ListChecks,
  PaperPlaneRight,
  TextAa,
} from "@phosphor-icons/react/dist/ssr";
import { B, MUTED, MUTED_FG, PRIMARY, Pill, Section } from "@/components/sections/hero/PhoneForm";
import { T } from "../script";
import { Appear, Mono, Tap, glide, lerp, ramp } from "../anim";

/* 2 — you tell us how you price; we build the four things */

const RULES = [
  "Double storey? Two-storey labour rate, plus access gear.",
  "If there's a battery, add the backup circuit and explain it in the scope.",
  "Never quote under our minimum job value.",
  "More than 40 km out, we charge travel.",
];

const BUILDS = [
  { icon: ListChecks, name: "Your quote form", note: "The questions your team answers" },
  { icon: FunctionIcon, name: "Your pricing logic", note: "Rates, margins, minimums and conditions" },
  { icon: TextAa, name: "Your wording", note: "Scope of works, inclusions, terms" },
  { icon: FileText, name: "Your document templates", note: "Branded pages that fit each job" },
];

function WeBuild({ t }: { t: number }) {
  const l = t - T["2"].start;
  return (
    <>
      <Appear t={l} at={0.2} className="absolute left-[90px] top-[84px]">
        <Mono className="text-[13px] text-ink-faint">Setup · done for you</Mono>
      </Appear>

      <Appear t={l} at={0.4} className="absolute left-[90px] top-[150px] w-[520px]">
        <div className="sheet rounded-lg px-8 py-7">
          <Mono className="text-[11px] text-brand-blue">Pricing session · you + us</Mono>
          <div className="mt-2 font-jakarta text-[28px] font-extrabold tracking-[-0.03em] text-ink">
            You tell us how you price a job
          </div>
          <div className="mt-5 border-t border-rule">
            {RULES.map((r, i) => (
              <Appear key={r} t={l} at={0.9 + i * 0.7} y={8}>
                <div className="flex gap-3 border-b border-rule py-3.5 text-[17px] leading-snug text-ink-soft">
                  <span className="font-jakarta text-[26px] font-extrabold leading-none text-rule-strong">
                    &ldquo;
                  </span>
                  {r}
                </div>
              </Appear>
            ))}
          </div>
        </div>
      </Appear>

      <div className="absolute left-[690px] top-[150px] w-[500px]">
        <Appear t={l} at={3.7}>
          <Mono className="text-[11px] text-brand-blue">What we build from it</Mono>
        </Appear>
        <div className="mt-4 border-t-2 border-ink">
          {BUILDS.map((b, i) => {
            const at = 4.1 + i * 0.9;
            const fill = ramp(l, at + 0.2, at + 1);
            const Icon = b.icon;
            return (
              <Appear key={b.name} t={l} at={at} y={8}>
                <div className="flex items-center gap-4 border-b border-rule py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sheet ring-1 ring-rule">
                    <Icon weight="bold" className="h-5 w-5 text-brand-blue" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-jakarta text-[21px] font-bold tracking-[-0.02em] text-ink">
                      {b.name}
                    </div>
                    <div className="text-[14px] text-ink-faint">{b.note}</div>
                    <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-rule">
                      <div
                        className="h-full origin-left bg-brand-blue"
                        style={{ transform: `scaleX(${fill})` }}
                      />
                    </div>
                  </div>
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white"
                    style={{ opacity: fill >= 1 ? 1 : 0.15 }}
                  >
                    <Check weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Appear>
            );
          })}
        </div>
        <Appear t={l} at={8.4} className="mt-5">
          <Mono className="text-[12px] text-ink-faint">Built and tested by the Quotie team</Mono>
        </Appear>
      </div>
    </>
  );
}

/* 3 — the mobile quote-creation screen, filled in on site */

// Native phone-screen geometry (px before the 1.18× scale applied in the scene).
const SCREEN_W = 300;
const SCREEN_H = 536;
const HEADER_H = 40;
const STRIP_H = 36;
const BAR_H = 53;
const VIEW_H = SCREEN_H - HEADER_H - STRIP_H - BAR_H;
const BAND = 6;
const HEIGHTS = { customer: 112, system: 196, site: 196, battery: 250 };
const TOP = {
  customer: 0,
  system: HEIGHTS.customer + BAND,
  site: HEIGHTS.customer + HEIGHTS.system + BAND * 2,
  battery: HEIGHTS.customer + HEIGHTS.system + HEIGHTS.site + BAND * 3,
};
const CONTENT_H = TOP.battery + HEIGHTS.battery + 14;
const MAX_SCROLL = CONTENT_H - VIEW_H;

// When things happen, in seconds from the start of the scene.
const AT = {
  toSystem: 0.9,
  size: 2.2,
  toSite: 3.5,
  storeys: 5.0,
  roof: 5.9,
  toBattery: 6.8,
  battery: 8.1,
  create: 10.2,
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 text-[11.5px]" style={{ color: MUTED_FG }}>
      {children}
    </div>
  );
}

function Band() {
  return <div style={{ height: BAND, background: MUTED }} />;
}

export function VslPhone({ l, static: isStatic = false }: { l: number; static?: boolean }) {
  const scroll =
    lerp(0, TOP.system, glide(l, AT.toSystem, AT.toSystem + 0.7)) +
    lerp(0, TOP.site - TOP.system, glide(l, AT.toSite, AT.toSite + 0.8)) +
    lerp(0, MAX_SCROLL - TOP.site, glide(l, AT.toBattery, AT.toBattery + 0.6));

  const sized = l >= AT.size + 0.25;
  const storeyed = l >= AT.storeys + 0.2;
  const roofed = l >= AT.roof + 0.2;
  const batteried = l >= AT.battery + 0.2;
  const running = l >= AT.create + 0.2;

  // Scroll-spy, as the app does it: the last section whose top has reached the
  // strip; the final section once the page is scrolled to the bottom.
  const active =
    scroll >= MAX_SCROLL - 1 ? 3 : scroll >= TOP.site - 4 ? 2 : scroll >= TOP.system - 4 ? 1 : 0;
  const TABS = [
    { label: "Customer", done: true },
    { label: "System", done: sized },
    { label: "Site", done: storeyed && roofed },
    { label: "Battery", done: batteried },
  ];

  return (
    <div className="rounded-[30px] bg-deep p-[8px] shadow-[0_40px_70px_-30px_rgba(8,17,32,0.75)]">
      <div
        className="relative overflow-hidden rounded-[23px] bg-white text-[#1a1a1a]"
        style={{ width: SCREEN_W, height: SCREEN_H }}
      >
        {/* Header row */}
        <div className="flex items-center gap-1.5 px-2.5" style={{ height: HEADER_H }}>
          <ArrowLeft weight="bold" className="h-4 w-4 shrink-0" />
          <span className="truncate text-[15px] font-bold tracking-tight">Create Quote</span>
          <span className="ml-auto font-mono text-[11px]" style={{ color: MUTED_FG }}>
            #1044
          </span>
        </div>

        {/* Section tab strip — follows the scroll */}
        <div className="flex items-stretch border-y" style={{ height: STRIP_H, borderColor: B }}>
          <span
            className="flex w-9 shrink-0 items-center justify-center border-r"
            style={{ borderColor: B, color: MUTED_FG }}
          >
            <List weight="bold" className="h-4 w-4" />
          </span>
          <div className="flex min-w-0 flex-1 overflow-hidden">
            {TABS.map((tab, i) => {
              const on = i === active;
              return (
                <span
                  key={tab.label}
                  className="relative inline-flex shrink-0 items-center gap-1 px-2 text-[12px] font-medium"
                  style={{ color: on ? "#1a1a1a" : MUTED_FG }}
                >
                  {tab.label}
                  {tab.done && (
                    <Check weight="bold" className="h-2.5 w-2.5" style={{ color: PRIMARY }} />
                  )}
                  {on && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: PRIMARY }} />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Flat sections, one continuous scroll */}
        <div className="overflow-hidden" style={{ height: VIEW_H }}>
          <div style={{ transform: `translateY(${-scroll}px)` }}>
            <div style={{ height: HEIGHTS.customer }}>
              <Section title="Customer" done count="1/1">
                <div className="rounded-lg border px-3 py-2" style={{ borderColor: B }}>
                  <div className="text-[12.5px] font-semibold">Sample Client</div>
                  <div className="text-[11px]" style={{ color: MUTED_FG }}>
                    14 Sample Street, Terrigal NSW
                  </div>
                </div>
              </Section>
            </div>
            <Band />

            <div style={{ height: HEIGHTS.system }}>
              <Section title="System" done={sized} count={sized ? "2/2" : "1/2"}>
                <Label>System size</Label>
                <div
                  className="relative flex h-11 items-center justify-between rounded-lg border px-3 text-[12.5px] font-medium"
                  style={{ borderColor: B, color: sized ? "#1a1a1a" : "#a3a3a3" }}
                >
                  {sized ? "10kW system" : "Select…"}
                  <CaretDown weight="bold" className="h-3 w-3" style={{ color: MUTED_FG }} />
                  {!isStatic && <Tap t={l} at={AT.size} className="left-1/2 top-1/2" />}
                </div>
                <div className="mt-3">
                  <Label>Inverter brand</Label>
                  <div className="flex gap-1.5 [&>span]:min-h-11">
                    <Pill active tapped={false}>Brand A</Pill>
                    <Pill active={false} tapped={false}>Brand B</Pill>
                  </div>
                </div>
              </Section>
            </div>
            <Band />

            <div style={{ height: HEIGHTS.site }}>
              <Section
                title="Site"
                done={storeyed && roofed}
                count={`${Number(storeyed) + Number(roofed)}/2`}
              >
                <Label>Storeys</Label>
                <div className="flex gap-1.5 [&>span]:min-h-11">
                  <Pill active={false} tapped={false}>Single</Pill>
                  <span className="relative inline-flex">
                    <Pill active={storeyed} tapped={false}>Double</Pill>
                    {!isStatic && <Tap t={l} at={AT.storeys} className="left-1/2 top-1/2" />}
                  </span>
                </div>
                <div className="mt-3">
                  <Label>Roof type</Label>
                  <div className="flex gap-1.5 [&>span]:min-h-11">
                    <Pill active={false} tapped={false}>Tile</Pill>
                    <span className="relative inline-flex">
                      <Pill active={roofed} tapped={false}>Metal</Pill>
                      {!isStatic && <Tap t={l} at={AT.roof} className="left-1/2 top-1/2" />}
                    </span>
                  </div>
                </div>
              </Section>
            </div>
            <Band />

            <div style={{ height: HEIGHTS.battery }}>
              <Section title="Battery" done={batteried} count={batteried ? "1/1" : "0/1"}>
                <Label>Battery</Label>
                <div className="flex gap-1.5 [&>span]:min-h-11">
                  <Pill active={false} tapped={false}>None</Pill>
                  <span className="relative inline-flex">
                    <Pill active={batteried} tapped={false}>10kWh</Pill>
                    {!isStatic && <Tap t={l} at={AT.battery} className="left-1/2 top-1/2" />}
                  </span>
                  <Pill active={false} tapped={false}>16kWh</Pill>
                </div>
                <div className="mt-3">
                  <Label>Notes for the office (optional)</Label>
                  <div className="h-[72px] rounded-lg border" style={{ borderColor: B }} />
                </div>
              </Section>
            </div>
          </div>
        </div>

        {/* Sticky bottom action bar */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 border-t bg-white px-2.5"
          style={{ height: BAR_H, borderColor: B }}
        >
          <span
            className="relative flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-semibold text-white"
            style={{
              background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
              opacity: running ? 0.85 : 1,
            }}
          >
            {running ? (
              <span
                className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white"
                style={{ transform: `rotate(${l * 540}deg)` }}
              />
            ) : (
              <PaperPlaneRight weight="fill" className="h-3.5 w-3.5" />
            )}
            Create Quote
            {!isStatic && <Tap t={l} at={AT.create} className="left-1/2 top-1/2" />}
          </span>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
            style={{ borderColor: B }}
          >
            <DotsThree weight="bold" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

function FillTheForm({ t }: { t: number }) {
  const l = t - T["3"].start;
  const sent = ramp(l, AT.create + 0.3, AT.create + 0.9);
  return (
    <>
      <div
        className="absolute left-[170px] top-[52px] origin-top-left"
        style={{ transform: "scale(1.13)", opacity: ramp(l, 0.1, 0.7) }}
      >
        <VslPhone l={l} />
      </div>

      <div className="absolute left-[660px] top-[96px] w-[540px]">
        <Appear t={l} at={0.5}>
          <Mono className="text-[13px] text-brand-blue">Example · a solar installer</Mono>
          <div className="mt-4 font-jakarta text-[46px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">
            Then you or your team <span className="mark-live">fill in a form.</span>
          </div>
          <div className="mt-4 text-[20px] leading-relaxed text-ink-soft">
            On site, on a phone. Tap the answers, hit Create Quote.
          </div>
        </Appear>

        <Appear t={l} at={1.4} className="mt-9">
          <div className="sheet w-[420px] rounded-lg px-6 py-5">
            <div className="flex items-center justify-between">
              <Mono className="text-[11px]" style={{ color: sent > 0 ? "#1f61aa" : undefined }}>
                <span className={sent > 0 ? "" : "text-ink-faint"}>
                  {sent > 0 ? "Sent to your engine" : "Waiting on the form"}
                </span>
              </Mono>
              <span className="font-mono text-[11px] text-ink-faint">Quote #1044</span>
            </div>
            <div className="mt-5 space-y-4">
              {[72, 54, 64, 46].map((w) => (
                <div key={w} className="flex items-center justify-between">
                  <span className="h-2 rounded-full bg-rule" style={{ width: `${w}%` }} />
                  <span className="h-2 w-12 rounded-full bg-rule" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-baseline gap-2 border-t-2 border-ink pt-2.5">
              <Mono className="text-[10px] text-ink-soft">Total inc. GST</Mono>
              <span className="leader" />
              <span className="font-jakarta text-2xl font-extrabold text-rule-strong">$—</span>
            </div>
          </div>
          <div className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
            No live preview. Nothing appears until the engine has run.
          </div>
        </Appear>
      </div>
    </>
  );
}

export default function Setup({ t }: { t: number }) {
  if (t >= T["3"].start) return <FillTheForm t={t} />;
  return (
    <div style={{ opacity: 1 - ramp(t, T["3"].start - 0.35, T["3"].start) }}>
      <WeBuild t={t} />
    </div>
  );
}
