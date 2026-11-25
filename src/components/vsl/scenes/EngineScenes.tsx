import { ArrowRight, Check, Equals } from "@phosphor-icons/react/dist/ssr";
import { VERTICALS, type Selections } from "@/components/sections/live-demo/demoData";
import { T } from "../script";
import { Appear, Count, Mono, fmt, hold, ramp, stagger } from "../anim";

/**
 * 4a–4f and 5 — the engine. Same solar demo data as the hero and the
 * interactive demo, so the numbers in the video can't disagree with the site.
 * Nothing that looks like a quote appears until 4e: the engine's working is
 * drawn on the dark "engine" surface, the finished document on paper.
 */

const solar = VERTICALS.find((v) => v.id === "solar")!;
const ANSWERS: Selections = { size: "10", storeys: "double", inverter: "a", battery: "10" };
const quote = solar.compute(ANSWERS);
const single = solar.compute({ ...ANSWERS, storeys: "single" });
const TOTAL = quote.lines.reduce((n, l) => n + l.amount, 0);
const singleLabour = single.lines.find((l) => l.id === "labour")!;
const scopeText = (id: string, from = quote) => from.scope.find((s) => s.id === id)?.text ?? "";

const E = {
  a: T["4a"].start,
  b: T["4b"].start,
  c: T["4c"].start,
  d: T["4d"].start,
  e: T["4e"].start,
  f: T["4f"].start,
};

const JOBS = [
  { n: "01", title: "Calculations", start: E.b, end: E.c },
  { n: "02", title: "Text building", start: E.c, end: E.d },
  { n: "03", title: "Page rendering", start: E.d, end: E.e },
];

function Rail({ t }: { t: number }) {
  const l = t - E.a;
  return (
    <div className="absolute left-[90px] top-[130px] w-[320px]">
      <Appear t={l} at={0.5}>
        <Mono className="text-[11px] text-white/45">Answers received</Mono>
      </Appear>
      <div className="mt-3 border-t border-deep-rule">
        {[
          ["System size", "10kW"],
          ["Storeys", "Double"],
          ["Battery", "10kWh"],
        ].map(([k, v], i) => (
          <Appear key={k} t={l} at={0.9 + i * 0.35} y={8}>
            <div className="flex items-baseline gap-2 border-b border-deep-rule py-2.5 text-[16px]" style={{ "--leader-color": "rgba(255,255,255,0.2)" } as React.CSSProperties}>
              <span className="text-white/60">{k}</span>
              <span className="leader" />
              <span className="font-mono font-medium text-white">{v}</span>
            </div>
          </Appear>
        ))}
        <Appear t={l} at={2} y={8}>
          <div className="py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
            + customer, inverter, roof type
          </div>
        </Appear>
      </div>

      <Appear t={l} at={3.4} className="mt-7">
        <Mono className="text-[11px] text-white/45">Your engine does three jobs</Mono>
        <div className="mt-3 space-y-1">
          {JOBS.map((j) => {
            const done = t >= j.end;
            const active = t >= j.start && !done;
            return (
              <div
                key={j.n}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{ background: active ? "rgba(57,185,229,0.12)" : "transparent" }}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  {done ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan text-deep">
                      <Check weight="bold" className="h-3.5 w-3.5" />
                    </span>
                  ) : active ? (
                    <span
                      className="h-5 w-5 rounded-full border-2 border-white/20 border-t-brand-cyan"
                      style={{ transform: `rotate(${t * 480}deg)` }}
                    />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                  )}
                </span>
                <span className="font-mono text-[12px] text-brand-cyan">{j.n}</span>
                <span
                  className="font-jakarta text-[20px] font-bold tracking-[-0.02em]"
                  style={{ color: done || active ? "#fff" : "rgba(255,255,255,0.4)" }}
                >
                  {j.title}
                </span>
              </div>
            );
          })}
        </div>
      </Appear>
    </div>
  );
}

function Rule({ when, then }: { when: string; then: string[] }) {
  return (
    <div className="rounded-lg border border-deep-rule bg-deep-2 px-5 py-4 font-mono text-[15px] leading-relaxed">
      <div>
        <span className="mr-3 text-brand-cyan">WHEN</span>
        <span className="text-white">{when}</span>
      </div>
      {then.map((line, i) => (
        <div key={line}>
          <span className="mr-3 text-brand-cyan" style={{ opacity: i === 0 ? 1 : 0 }}>
            THEN
          </span>
          <span className="text-white/80">{line}</span>
        </div>
      ))}
    </div>
  );
}

function PanelTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-mono text-[18px] text-brand-cyan">{n}</span>
      <span className="font-jakarta text-[40px] font-extrabold tracking-[-0.03em] text-white">
        {title}
      </span>
    </div>
  );
}

const PANEL = "absolute left-[480px] top-[104px] w-[710px]";

function Sent({ t }: { t: number }) {
  const l = t - E.a;
  return (
    <div className={PANEL} style={{ opacity: hold(t, E.a, E.b), top: 170 }}>
      <Appear t={l} at={0.3}>
        <div className="font-jakarta text-[76px] font-extrabold leading-[1] tracking-[-0.045em] text-white">
          Nothing is
          <br />
          previewed.
        </div>
      </Appear>
      <Appear t={l} at={1.8} className="mt-7 max-w-[660px]">
        <div className="text-[28px] leading-snug text-white/70">
          Your answers are sent to an engine{" "}
          <span className="mark-live text-white">built on your rules.</span>
        </div>
      </Appear>
      <Appear t={l} at={3.6} className="mt-10">
        <Mono className="text-[12px] text-white/45">
          Not a live preview · Not AI · Same answers, same quote
        </Mono>
      </Appear>
    </div>
  );
}

function Calculations({ t }: { t: number }) {
  const l = t - E.b;
  return (
    <div className={PANEL} style={{ opacity: hold(t, E.b, E.c) }}>
      <PanelTitle n="01" title="Calculations" />
      <Appear t={l} at={0.5}>
        <Rule
          when="Storeys = Double"
          then={["Labour moves to the two-storey rate", "Elevated access & safety is added"]}
        />
      </Appear>
      <div className="mt-5 border-t border-deep-rule" style={{ "--leader-color": "rgba(255,255,255,0.22)" } as React.CSSProperties}>
        {quote.lines.map((line, i) => {
          const at = 1.6 + i * 0.75;
          const changed = line.id === "labour";
          const added = line.id === "access";
          const swap = ramp(l, at + 0.5, at + 0.9);
          return (
            <div
              key={line.id}
              className="flex items-baseline gap-3 border-b border-deep-rule py-[9px]"
              style={{ opacity: stagger(l, 1.6, 0.75, i) }}
            >
              <span className="text-[18px] font-semibold text-white">
                <span className={changed || added ? "mark-live" : ""}>{line.label}</span>
              </span>
              <span className="text-[13px] text-white/45">{line.detail}</span>
              {added && <Mono className="text-[10px] text-brand-cyan">Added</Mono>}
              <span className="leader" />
              {changed && (
                <span
                  className="font-mono text-[15px] text-white/40 line-through tnum"
                  style={{ opacity: 0.4 + 0.6 * swap }}
                >
                  {fmt(singleLabour.amount)}
                </span>
              )}
              <span className="font-mono text-[18px] font-medium text-white tnum">
                {changed ? fmt(swap > 0.5 ? line.amount : singleLabour.amount) : fmt(line.amount)}
              </span>
            </div>
          );
        })}
        <div className="flex items-baseline gap-3 pt-3">
          <Mono className="text-[11px] text-white/50">Total inc. GST</Mono>
          <span className="leader" />
          <span className="font-jakarta text-[30px] font-extrabold tracking-tight text-white tnum">
            <Count t={l} at={1.6 + quote.lines.length * 0.75} to={TOTAL} />
          </span>
        </div>
      </div>
    </div>
  );
}

function typed(text: string, l: number, at: number, cps = 70) {
  return text.slice(0, Math.max(0, Math.floor((l - at) * cps)));
}

function TextBuilding({ t }: { t: number }) {
  const l = t - E.c;
  const blocks = [
    { id: "system", text: scopeText("system"), at: 1.5 },
    { id: "install", text: scopeText("install"), at: 2.5 },
    { id: "battery", text: scopeText("battery"), at: 3.7 },
    { id: "grid", text: scopeText("grid"), at: 5.2 },
  ];
  const leftOut = scopeText("install", single);
  return (
    <div className={PANEL} style={{ opacity: hold(t, E.c, E.d) }}>
      <PanelTitle n="02" title="Text building" />
      <Appear t={l} at={0.5}>
        <Rule when="Battery is not None" then={["Write the battery and backup circuit paragraph"]} />
      </Appear>
      <Appear t={l} at={1.2} className="mt-5">
        <Mono className="text-[11px] text-white/45">Scope of works</Mono>
        <div className="mt-2 space-y-2.5">
          {blocks.map((b) => {
            const text = typed(b.text, l, b.at);
            const mark = b.id === "battery";
            return (
              <p key={b.id} className="min-h-[27px] text-[18px] leading-[1.45] text-white/85">
                <span className={mark ? "mark-live text-white" : ""}>{text}</span>
                {mark && l > b.at + 1.4 && (
                  <Mono className="ml-3 text-[10px] text-brand-cyan">Written in</Mono>
                )}
              </p>
            );
          })}
          <Appear t={l} at={5.9} y={0}>
            <p className="text-[18px] leading-[1.45] text-white/30 line-through">{leftOut}</p>
            <Mono className="text-[10px] text-white/40">Left out · single storey only</Mono>
          </Appear>
        </div>
      </Appear>
    </div>
  );
}

function Thumb({ battery, label }: { battery?: boolean; label: string }) {
  return (
    <div
      className="flex h-[112px] w-[80px] flex-col rounded-[3px] bg-white p-2"
      style={{ outline: battery ? "3px solid #39b9e5" : "none", outlineOffset: 2 }}
    >
      <div className="h-1.5 w-8 rounded-full" style={{ background: battery ? "#39b9e5" : "#1f61aa" }} />
      <div className="mt-2 space-y-1">
        {[100, 86, 94, 60].map((w, i) => (
          <div key={i} className="h-[3px] rounded-full bg-[#dde3ec]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-auto font-mono text-[7px] uppercase tracking-[0.08em] text-[#66758b]">
        {label}
      </div>
    </div>
  );
}

const BASE_PAGES = ["Cover", "About", "Scope", "System", "Options", "Pricing", "Our work", "Reviews", "Terms"];
const BATTERY_PAGES = ["Battery", "Backup", "Warranty"];
const INSERT_AT = 4; // battery pages slot in after "System"

function PageRendering({ t }: { t: number }) {
  const l = t - E.d;
  const open = ramp(l, 3.2, 4);
  const count = l > 3.6 ? BASE_PAGES.length + BATTERY_PAGES.length : BASE_PAGES.length;
  const slot = 92;
  const perRow = 7;
  const place = (i: number) => ({ left: (i % perRow) * slot, top: Math.floor(i / perRow) * 132 });
  return (
    <div className={PANEL} style={{ opacity: hold(t, E.d, E.e) }}>
      <PanelTitle n="03" title="Page rendering" />
      <Appear t={l} at={0.5}>
        <Rule when="A battery is quoted" then={["Battery pages go in. No battery, no pages."]} />
      </Appear>
      <Appear t={l} at={1.2} className="mt-5">
        <div className="flex items-baseline justify-between">
          <Mono className="text-[11px] text-white/45">The document</Mono>
          <span className="font-mono text-[15px] text-white tnum">
            <span className={count > BASE_PAGES.length ? "mark-live" : ""}>{count} pages</span>
          </span>
        </div>
        <div className="relative mt-3 h-[260px]">
          {BASE_PAGES.map((p, i) => {
            const shifted = i >= INSERT_AT ? i + BATTERY_PAGES.length * open : i;
            const a = place(Math.floor(shifted));
            const b = place(Math.ceil(shifted));
            const f = shifted - Math.floor(shifted);
            return (
              <div
                key={p}
                className="absolute"
                style={{
                  left: a.left + (b.left - a.left) * f,
                  top: a.top + (b.top - a.top) * f,
                  opacity: stagger(l, 1.3, 0.1, i, 0.3),
                }}
              >
                <Thumb label={p} />
              </div>
            );
          })}
          {BATTERY_PAGES.map((p, i) => {
            const pos = place(INSERT_AT + i);
            const o = ramp(l, 3.7 + i * 0.25, 4.2 + i * 0.25);
            return (
              <div
                key={p}
                className="absolute"
                style={{ left: pos.left, top: pos.top, opacity: o, transform: `scale(${0.85 + 0.15 * o})` }}
              >
                <Thumb battery label={p} />
              </div>
            );
          })}
        </div>
      </Appear>
    </div>
  );
}

export function QuoteSheet({
  t,
  at,
  width = 470,
  compact = false,
  number = "1044",
}: {
  t: number;
  at: number;
  width?: number;
  compact?: boolean;
  number?: string;
}) {
  return (
    <div className="sheet overflow-hidden rounded-lg text-ink" style={{ width }}>
      <div className="h-1 bg-gradient-to-r from-brand-blue to-brand-cyan" />
      <div className="flex items-start justify-between gap-4 border-b border-rule px-5 pb-3 pt-4">
        <div>
          <div className={`font-jakarta font-bold leading-tight ${compact ? "text-[13px]" : "text-[17px]"}`}>
            {solar.docTitle}
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-wide text-ink-faint">
            QUOTE #{number} · SAMPLE CLIENT
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" width={compact ? 20 : 28} height={compact ? 20 : 28} />
      </div>
      <div className="px-5 pt-1">
        {quote.lines.map((line, i) => (
          <div
            key={line.id}
            className={`flex items-baseline gap-2 border-b border-rule ${compact ? "py-1.5" : "py-2"}`}
            style={{ opacity: stagger(t, at + 0.2, 0.08, i, 0.3) }}
          >
            <div className="min-w-0">
              <div className={`truncate font-semibold ${compact ? "text-[11px]" : "text-[13.5px]"}`}>
                {line.label}
              </div>
              {!compact && <div className="truncate text-[11px] text-ink-faint">{line.detail}</div>}
            </div>
            <span className="leader" />
            <div className={`font-mono font-medium tnum ${compact ? "text-[11px]" : "text-[13.5px]"}`}>
              {fmt(line.amount)}
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-4 pt-3">
        <div className="flex items-baseline gap-2 border-t-2 border-ink pt-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Total inc. GST
          </span>
          <span className="leader" />
          <span className={`font-jakarta font-extrabold tracking-tight tnum ${compact ? "text-[19px]" : "text-[28px]"}`}>
            <Count t={t} at={at + 0.3} to={TOTAL} />
          </span>
        </div>
      </div>
    </div>
  );
}

function Finished({ t }: { t: number }) {
  const l = t - E.e;
  const p = ramp(l, 0.1, 0.8);
  return (
    <div className={PANEL} style={{ opacity: hold(t, E.e, E.f) }}>
      <div className="flex items-start gap-9">
        <div style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
          <QuoteSheet t={l} at={0.3} />
        </div>
        <Appear t={l} at={1} className="pt-10">
          <Mono className="text-[12px] text-brand-cyan">Quote created</Mono>
          <div className="mt-3 font-jakarta text-[38px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
            Finished.
            <br />
            Ready to send.
          </div>
          <div className="mt-4 font-mono text-[13px] uppercase tracking-[0.14em] text-white/50">
            Under 30 seconds
          </div>
        </Appear>
      </div>
    </div>
  );
}

const MORE_RULES: [string, string][] = [
  ["Matrix", "Panel brand × system size sets the unit price"],
  ["Repeat", "One section for every room or wet area"],
  ["When", "Roof pitch over 30° → steep-roof labour"],
  ["When", "More than 40 km out → travel is charged"],
  ["Filter", "Inverter brand decides which batteries can be offered"],
  ["Minimum", "A job total never drops under your minimum"],
  ["Margin", "A different margin for each job type"],
  ["Rebate", "Rebates worked out and shown as their own line"],
  ["Options", "Up to four options on one quote"],
  ["Text", "Exclusions written only when they apply"],
  ["Pages", "Spec sheets attached for the products quoted"],
  ["Template", "More than one quote template per business"],
];

function MuchFurther({ t }: { t: number }) {
  const l = t - E.f;
  return (
    <div className="absolute left-[90px] right-[90px] top-[64px]" style={{ opacity: hold(t, E.f, T["4f"].end) }}>
      <Appear t={l} at={0.3}>
        <Mono className="text-[12px] text-brand-cyan">This was a simple example</Mono>
        <div className="mt-3 font-jakarta text-[46px] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
          That was three rules.{" "}
          <span style={{ opacity: ramp(l, 2.2, 2.8) }}>
            A real build goes <span className="mark-live">a lot further.</span>
          </span>
        </div>
      </Appear>
      <div className="mt-8 grid grid-cols-2 gap-x-12 border-t border-deep-rule">
        {MORE_RULES.map(([kind, text], i) => (
          <div
            key={text}
            className="flex items-baseline gap-4 border-b border-deep-rule py-[10px]"
            style={{ opacity: stagger(l, 3.6, 0.55, i, 0.4) }}
          >
            <span className="w-[86px] shrink-0 font-mono text-[12px] uppercase tracking-[0.12em] text-brand-cyan">
              {kind}
            </span>
            <span className="text-[18px] text-white/85">{text}</span>
          </div>
        ))}
      </div>
      <Appear t={l} at={12.2} className="mt-8">
        <div className="font-jakarta text-[28px] font-bold tracking-[-0.02em] text-white">
          However you actually price a job, that&apos;s what we build.
        </div>
      </Appear>
    </div>
  );
}

export function Engine({ t }: { t: number }) {
  const railOpacity = Math.min(1, 1 - ramp(t, E.f - 0.35, E.f));
  return (
    <>
      <div className="absolute left-[90px] top-[70px]" style={{ opacity: railOpacity }}>
        <Mono className="text-[13px] text-brand-cyan">Your engine · example</Mono>
      </div>
      {t < E.f && (
        <div style={{ opacity: railOpacity }}>
          <Rail t={t} />
        </div>
      )}
      {t < E.b && <Sent t={t} />}
      {t >= E.b && t < E.c && <Calculations t={t} />}
      {t >= E.c && t < E.d && <TextBuilding t={t} />}
      {t >= E.d && t < E.e && <PageRendering t={t} />}
      {t >= E.e && t < E.f && <Finished t={t} />}
      {t >= E.f && <MuchFurther t={t} />}
    </>
  );
}

/* 5 — same answers in, same quote out; not AI */

function Person({ name, role }: { name: string; role: string }) {
  return (
    <div className="w-[230px]">
      <div className="font-jakarta text-[22px] font-bold tracking-[-0.02em] text-ink">{name}</div>
      <Mono className="text-[11px] text-ink-faint">{role}</Mono>
      <div className="mt-3 rounded-lg bg-sheet px-4 py-3 ring-1 ring-rule">
        {["10kW", "Double storey", "10kWh battery"].map((a) => (
          <div key={a} className="flex items-center gap-2 py-[3px] text-[14px] text-ink-soft">
            <Check weight="bold" className="h-3 w-3 text-brand-blue" />
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SameOut({ t }: { t: number }) {
  const l = t - T["5"].start;
  const people = [
    { name: "Jordan", role: "Owner · on site", top: 96 },
    { name: "Mia", role: "Office · first week", top: 290 },
  ];
  return (
    <>
      <Appear t={l} at={0.2} className="absolute left-[90px] top-[52px]">
        <Mono className="text-[13px] text-brand-blue">Example · two people, one job</Mono>
      </Appear>
      {people.map((p, i) => (
        <div key={p.name} className="absolute left-[90px]" style={{ top: p.top }}>
          <Appear t={l} at={0.5 + i * 0.6} className="flex items-center gap-7">
            <Person name={p.name} role={p.role} />
            <ArrowRight weight="bold" className="h-6 w-6 text-rule-strong" />
            <div className="rounded-lg bg-deep px-5 py-4 text-white">
              <Mono className="text-[10px] text-brand-cyan">Your engine</Mono>
              <div className="mt-1 font-jakarta text-[17px] font-bold">Your rules</div>
            </div>
            <ArrowRight weight="bold" className="h-6 w-6 text-rule-strong" />
          </Appear>
        </div>
      ))}
      {people.map((p, i) => (
        <Appear
          key={p.name}
          t={l}
          at={2.2 + i * 0.3}
          className="absolute top-[96px]"
          style={{ left: 650 + i * 290 }}
        >
          <Mono className="text-[11px] text-ink-faint">{p.name}&apos;s quote</Mono>
          <div className="mt-2 origin-top-left" style={{ transform: "scale(0.76)" }}>
            <QuoteSheet t={l} at={2.2 + i * 0.3} width={330} compact />
          </div>
        </Appear>
      ))}
      <Appear t={l} at={3.6} className="absolute left-[650px] top-[392px]">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white">
            <Equals weight="bold" className="h-5 w-5" />
          </span>
          <div className="font-jakarta text-[30px] font-extrabold tracking-[-0.03em] text-ink">
            Same quote. <span className="mark-live">To the dollar.</span>
          </div>
        </div>
      </Appear>

      <div className="absolute left-[90px] right-[90px] top-[500px] border-t-2 border-ink pt-6">
        <div className="flex items-baseline gap-10">
          <Appear t={l} at={5}>
            <div className="whitespace-nowrap font-jakarta text-[46px] font-extrabold tracking-[-0.035em] text-ink">
              It isn&apos;t AI.
            </div>
          </Appear>
          <div>
            <Appear t={l} at={6.4}>
              <div className="text-[23px] leading-snug text-ink-soft">
                It can only do <span className="mark-live text-ink">what your rules say.</span>
              </div>
            </Appear>
            <Appear t={l} at={8.6}>
              <div className="mt-1 text-[23px] leading-snug text-ink-soft">
                Real work to set up. Safe to send without re-reading every line.
              </div>
            </Appear>
          </div>
        </div>
      </div>
    </>
  );
}
