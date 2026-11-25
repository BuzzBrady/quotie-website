import { T } from "../script";
import { Appear, Mono, glide, hold, lerp, ramp, stagger } from "../anim";
import { PAGE_H, PAGE_W, PROPOSAL_PAGES, PlainQuote } from "../ProposalPages";

/* 1a · 1b — the quote most businesses send now */

const SHEET_ROWS = [
  ["10kW system", "1", "9,990", "9,990"],
  ["Install labour", "1", "1,800", "1,800"],
  ["Battery 10kWh", "1", "8,200", "8,200"],
  ["Backup circuit", "1", "650", "650"],
  ["Travel", "", "", "?"],
  ["Margin", "", "", "=SUM(D2:D6)*"],
];

function Spreadsheet({ l }: { l: number }) {
  return (
    <div className="w-[560px] overflow-hidden rounded-md bg-white text-[13px] text-[#222] shadow-[0_24px_50px_-24px_rgba(11,22,38,0.4)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 bg-[#1d6f42] px-3 py-2 text-[12px] font-semibold text-white">
        <span className="h-2.5 w-2.5 rounded-sm bg-white/80" />
        quotes_FINAL_v7.xlsx
        <span className="ml-auto font-normal text-white/70">Copy of last month&apos;s job</span>
      </div>
      <div className="grid grid-cols-[34px_1.6fr_0.5fr_0.8fr_1fr] bg-[#f3f3f3] text-center text-[11px] text-[#777]">
        {["", "A", "B", "C", "D"].map((c) => (
          <div key={c} className="border-b border-r border-[#d9d9d9] py-1">
            {c}
          </div>
        ))}
      </div>
      {SHEET_ROWS.map((row, i) => {
        const shown = stagger(l, 0.9, 1.05, i, 0.3);
        const active = shown > 0 && stagger(l, 0.9, 1.05, i + 1, 0.3) === 0;
        return (
          <div
            key={i}
            className="grid grid-cols-[34px_1.6fr_0.5fr_0.8fr_1fr]"
            style={{ outline: active ? "2px dashed #1d6f42" : "none", outlineOffset: -2 }}
          >
            <div className="border-b border-r border-[#d9d9d9] bg-[#f3f3f3] py-[7px] text-center text-[11px] text-[#777]">
              {i + 2}
            </div>
            {row.map((cell, c) => (
              <div
                key={c}
                className={`border-b border-r border-[#e4e4e4] px-2 py-[7px] ${c > 0 ? "text-right tnum" : ""}`}
                style={{ opacity: shown }}
              >
                {cell}
              </div>
            ))}
          </div>
        );
      })}
      <div className="h-8 bg-white" />
    </div>
  );
}

const LOOKALIKES = [
  { business: "Your Business", price: "$20,640" },
  { business: "Another Business", price: "$19,900" },
  { business: "Business No. 3", price: "$21,200" },
  { business: "Business No. 4", price: "$20,150" },
];

function Problem({ t }: { t: number }) {
  const l = t - T["1a"].start;
  const b = t - T["1b"].start; // negative until 1b
  const toRow = glide(b, 0, 0.9);
  const sheetOut = 1 - ramp(b, 0, 0.5);
  const pageIn = ramp(l, 8.2, 9);

  // The plain page shrinks from its solo spot into the first slot of a row of four.
  const soloW = 330;
  const rowW = 232;
  const w = lerp(soloW, rowW, toRow);
  const x = lerp(860, 100, toRow);
  const y = lerp(140, 170, toRow);

  return (
    <>
      <Appear t={l} at={0.2} className="absolute left-[90px] top-[70px]">
        <Mono className="text-[13px] text-ink-faint">The quote you send now</Mono>
      </Appear>
      <div className="absolute right-[90px] top-[66px]" style={{ opacity: Math.min(ramp(l, 0.4, 0.9), sheetOut) }}>
        <span className="font-mono text-[20px] text-ink-soft tnum">9:47 pm</span>
      </div>

      <div
        className="absolute left-[90px] top-[140px] origin-top-left"
        style={{ opacity: Math.min(ramp(l, 0.3, 0.9), sheetOut), transform: "scale(1.2)" }}
      >
        <Spreadsheet l={l} />
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          Last month&apos;s job, copied and changed by hand
        </div>
      </div>

      <div className="absolute left-[90px] top-[590px]" style={{ opacity: Math.min(ramp(l, 4.5, 5.1), sheetOut) }}>
        <div className="font-jakarta text-[34px] font-extrabold tracking-[-0.03em] text-ink">
          A night&apos;s work. <span style={{ opacity: ramp(l, 9, 9.6) }}>For one plain page.</span>
        </div>
      </div>

      <div
        className="absolute"
        style={{
          left: x,
          top: y,
          opacity: pageIn,
          transform: `translateY(${(1 - pageIn) * 24}px)`,
        }}
      >
        <PlainQuote width={w} />
      </div>

      {LOOKALIKES.slice(1).map((q, i) => {
        const p = ramp(b, 0.7 + i * 0.35, 1.3 + i * 0.35);
        return (
          <div
            key={q.business}
            className="absolute"
            style={{
              left: 100 + (i + 1) * (rowW + 50),
              top: 170,
              opacity: b < 0 ? 0 : p,
              transform: `translateY(${(1 - p) * 20}px)`,
            }}
          >
            <PlainQuote business={q.business} price={q.price} width={rowW} />
          </div>
        );
      })}

      <Appear t={b} at={2.1} className="absolute left-0 right-0 top-[560px] text-center">
        <div className="font-jakarta text-[34px] font-extrabold tracking-[-0.03em] text-ink">
          One plain page. <span className="mark-live">Same as everyone else&apos;s.</span>
        </div>
      </Appear>
    </>
  );
}

/* 1c — welcome, and what a Quotie proposal looks like page by page */

const WELCOME = 3.2;

function Welcome({ t }: { t: number }) {
  const l = t - T["1c"].start;
  const per = (T["1c"].dur - WELCOME - 0.4) / PROPOSAL_PAGES.length;
  const logo = hold(l, 0, WELCOME, 0.45);
  const body = ramp(l, WELCOME, WELCOME + 0.5);
  const current = Math.min(
    PROPOSAL_PAGES.length - 1,
    Math.max(0, Math.floor((l - WELCOME) / per)),
  );

  return (
    <>
      {logo > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: logo }}
        >
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={72} height={72} />
            <span className="font-jakarta text-[76px] font-extrabold tracking-[-0.04em] text-ink">
              Welcome to Quotie
            </span>
          </div>
          <Mono className="mt-6 text-[14px] text-ink-faint">Nearly two years in the making</Mono>
        </div>
      )}

      <div className="absolute left-[90px] top-[70px] w-[500px]" style={{ opacity: body }}>
        <Mono className="text-[13px] text-ink-faint">A sample Quotie proposal</Mono>
        <div className="mt-4 font-jakarta text-[44px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">
          A full proposal
          <br />
          <span className="mark-live">for every job.</span>
        </div>

        <div className="mt-8 border-t-2 border-ink">
          {PROPOSAL_PAGES.map((p, i) => {
            const on = i === current;
            const seen = i < current;
            return (
              <div
                key={p.name}
                className="flex items-baseline gap-3 border-b border-rule py-[9px]"
                style={{ opacity: on ? 1 : seen ? 0.75 : 0.4 }}
              >
                <span className="w-6 font-mono text-[12px] text-brand-blue tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-jakarta text-[19px] font-bold tracking-[-0.01em] text-ink ${on ? "mark-live" : ""}`}>
                  {p.name}
                </span>
                <span className="leader" />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  {p.note}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex gap-8">
          {["Custom business logic", "Dynamic proposal generation"].map((c) => (
            <Mono key={c} className="text-[12px] text-brand-blue">
              {c}
            </Mono>
          ))}
        </div>
      </div>

      {PROPOSAL_PAGES.map(({ name, Page }, i) => {
        const a = WELCOME + i * per;
        const last = i === PROPOSAL_PAGES.length - 1;
        const inP = ramp(l, a, a + 0.5);
        const outP = last ? 0 : ramp(l, a + per, a + per + 0.4);
        const o = Math.min(inP, 1 - outP);
        if (o <= 0) return null;
        return (
          <div
            key={name}
            className="absolute"
            style={{
              left: 730,
              top: (720 - PAGE_H) / 2,
              width: PAGE_W,
              opacity: o,
              transform: `translateX(${(1 - inP) * 60 - outP * 60}px)`,
            }}
          >
            <Page />
          </div>
        );
      })}
    </>
  );
}

export default function Intro({ t }: { t: number }) {
  if (t >= T["1c"].start) return <Welcome t={t} />;
  return (
    <div style={{ opacity: 1 - ramp(t, T["1c"].start - 0.35, T["1c"].start) }}>
      <Problem t={t} />
    </div>
  );
}
