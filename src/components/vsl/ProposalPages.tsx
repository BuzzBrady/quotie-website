import { Check, Star } from "@phosphor-icons/react/dist/ssr";

/**
 * Pages of a sample proposal for the explainer's opening. A made-up business
 * ("Your Business") and sample client — no customer data. Review text is left
 * as bars on purpose: we don't write fake testimonials, even for a sample.
 */

export const PAGE_W = 420;
export const PAGE_H = 594;

const ACCENT = "#1f61aa";

function Page({ children, n }: { children: React.ReactNode; n: number }) {
  return (
    <div
      className="sheet relative overflow-hidden rounded-md text-ink"
      style={{ width: PAGE_W, height: PAGE_H }}
    >
      {children}
      <div className="absolute bottom-3 left-7 right-7 flex justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-ink-faint">
        <span>Your Business · Q-1043</span>
        <span>Page {n}</span>
      </div>
    </div>
  );
}

function Bars({ widths, className = "" }: { widths: number[]; className?: string }) {
  return (
    <div className={`space-y-[5px] ${className}`}>
      {widths.map((w, i) => (
        <div key={i} className="h-[5px] rounded-full bg-rule" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="px-7 pt-8">
      <div className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
        {kicker}
      </div>
      <div className="mt-1 font-jakarta text-[24px] font-extrabold tracking-[-0.03em]">{title}</div>
      <div className="mt-3 h-[2px] w-10" style={{ background: ACCENT }} />
    </div>
  );
}

function Cover() {
  return (
    <Page n={1}>
      <div className="h-[330px] px-7 pt-8 text-white" style={{ background: "#081120" }}>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-white text-[11px] font-bold text-ink">
            YB
          </span>
          <span className="text-[13px] font-semibold">Your Business</span>
        </div>
        <div className="mt-24 font-mono text-[9px] uppercase tracking-[0.2em] text-brand-cyan">
          Proposal
        </div>
        <div className="mt-2 font-jakarta text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]">
          Solar &amp; Battery
          <br />
          Installation
        </div>
      </div>
      <div className="px-7 pt-7 text-[11px]">
        {[
          ["Prepared for", "Sarah Mitchell"],
          ["Job address", "14 Sample Street, Terrigal NSW"],
          ["Quote", "Q-1043"],
          ["Date", "25 November 2026"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-2 border-b border-rule py-[7px]">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">{k}</span>
            <span className="leader" />
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Scope() {
  const paras = [
    ["The system", "Supply and install one 10kW solar system — panels, hybrid inverter and racking — on the north and west roof faces."],
    ["Installation", "Standard single-storey installation on tilt-mount racking, including all cabling, isolators and switchboard works."],
    ["Battery & backup", "Supply and install one 10kWh battery with a dedicated backup circuit, so essential loads stay on in an outage."],
    ["Handover", "Grid connection, metering and a full handover of the monitoring app are included."],
  ];
  return (
    <Page n={2}>
      <Heading kicker="Section 1" title="Scope of works" />
      <div className="space-y-4 px-7 pt-6">
        {paras.map(([h, p]) => (
          <div key={h}>
            <div className="text-[11.5px] font-bold">{h}</div>
            <p className="mt-1 text-[10.5px] leading-[1.55] text-ink-soft">{p}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Options() {
  const opts = [
    { name: "Option 1", title: "10kW Solar", price: "$11,790", inc: ["10kW panels + inverter", "Single-storey install", "Grid connection"], pick: false },
    { name: "Option 2", title: "10kW Solar + 10kWh Battery", price: "$20,640", inc: ["Everything in Option 1", "10kWh battery storage", "Backup circuit"], pick: true },
  ];
  return (
    <Page n={3}>
      <Heading kicker="Section 2" title="Your options" />
      <div className="grid grid-cols-2 gap-3 px-7 pt-6">
        {opts.map((o) => (
          <div
            key={o.name}
            className="rounded-md border p-3.5"
            style={{ borderColor: o.pick ? ACCENT : "#dde3ec", borderWidth: o.pick ? 2 : 1 }}
          >
            <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">{o.name}</div>
            <div className="mt-1 min-h-[30px] text-[11.5px] font-bold leading-tight">{o.title}</div>
            <div className="mt-2 font-jakarta text-[22px] font-extrabold tracking-tight tnum" style={{ color: ACCENT }}>
              {o.price}
            </div>
            <div className="mt-3 space-y-1.5 border-t border-rule pt-3">
              {o.inc.map((i) => (
                <div key={i} className="flex items-start gap-1.5 text-[9.5px] leading-snug text-ink-soft">
                  <Check weight="bold" className="mt-px h-2.5 w-2.5 shrink-0" style={{ color: ACCENT }} />
                  {i}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="px-7 pt-5 text-[10px] leading-relaxed text-ink-faint">
        Both options include a 10-year workmanship warranty. Prices include GST.
      </p>
    </Page>
  );
}

function Pricing() {
  const lines = [
    ["10kW solar system", "Panels + hybrid inverter, installed", "$9,990"],
    ["Installation labour", "Single-storey rate", "$1,800"],
    ["10kWh battery storage", "Supplied, installed & commissioned", "$8,200"],
    ["Backup circuit installation", "Essential loads stay on in an outage", "$650"],
  ];
  return (
    <Page n={4}>
      <Heading kicker="Section 3" title="Pricing · Option 2" />
      <div className="px-7 pt-5">
        {lines.map(([l, d, a]) => (
          <div key={l} className="flex items-baseline gap-2 border-b border-rule py-2.5">
            <div>
              <div className="text-[11.5px] font-semibold">{l}</div>
              <div className="text-[9.5px] text-ink-faint">{d}</div>
            </div>
            <span className="leader" />
            <span className="font-mono text-[11.5px] font-medium tnum">{a}</span>
          </div>
        ))}
        <div className="mt-4 flex items-baseline gap-2 border-t-2 border-ink pt-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">Total inc. GST</span>
          <span className="leader" />
          <span className="font-jakarta text-[26px] font-extrabold tracking-tight tnum">$20,640</span>
        </div>
      </div>
    </Page>
  );
}

function RoofTile({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 160 100" className="block h-full w-full" aria-hidden>
      <rect width="160" height="100" fill={tone} />
      <path d="M0 78 L80 30 L160 78 L160 100 L0 100 Z" fill="#0b1626" opacity="0.12" />
      <path d="M22 70 L80 36 L138 70 Z" fill="#fff" opacity="0.55" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${52 + i * 15} ${66 - Math.abs(1.5 - i) * 0} l12 0 l-4 -12 l-12 0 z`}
          fill="#1f61aa"
          opacity="0.85"
        />
      ))}
      <circle cx="132" cy="20" r="8" fill="#fff" opacity="0.7" />
    </svg>
  );
}

function Work() {
  const jobs = [
    ["10kW + battery", "Terrigal", "#cfe6f5"],
    ["13kW solar", "Erina", "#dfe7f1"],
    ["6.6kW solar", "Gosford", "#d5ecea"],
    ["15kW commercial", "Avoca Beach", "#e6e2f3"],
  ];
  return (
    <Page n={5}>
      <Heading kicker="Section 4" title="Work we've done" />
      <div className="grid grid-cols-2 gap-3 px-7 pt-6">
        {jobs.map(([what, where, tone]) => (
          <div key={what}>
            <div className="h-[104px] overflow-hidden rounded">
              <RoofTile tone={tone} />
            </div>
            <div className="mt-1.5 text-[10.5px] font-bold">{what}</div>
            <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink-faint">{where}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Reviews() {
  return (
    <Page n={6}>
      <Heading kicker="Section 5" title="What customers say" />
      <div className="space-y-3 px-7 pt-6">
        {[
          [96, 88, 62],
          [92, 97, 40],
          [90, 70],
        ].map((w, i) => (
          <div key={i} className="rounded-md border border-rule p-3.5">
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} weight="fill" className="h-3 w-3 text-amber-400" />
              ))}
            </div>
            <Bars widths={w} className="mt-3" />
            <div className="mt-3 flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-rule" />
              <span className="h-[5px] w-20 rounded-full bg-rule-strong" />
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Terms() {
  const clauses = ["Payment terms", "Warranty", "Variations", "Site access"];
  return (
    <Page n={7}>
      <Heading kicker="Section 6" title="Terms & conditions" />
      <div className="space-y-3 px-7 pt-5">
        {clauses.map((c, i) => (
          <div key={c}>
            <div className="text-[10.5px] font-bold">
              {i + 1}. {c}
            </div>
            <Bars widths={[98, 94, i % 2 ? 58 : 76]} className="mt-1.5" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-7 right-7 grid grid-cols-2 gap-6">
        {["Accepted by client", "Date"].map((l) => (
          <div key={l} className="border-t border-rule-strong pt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-faint">
            {l}
          </div>
        ))}
      </div>
    </Page>
  );
}

export const PROPOSAL_PAGES = [
  { name: "Cover", note: "Your brand, their name", Page: Cover },
  { name: "Scope of works", note: "Written for this job", Page: Scope },
  { name: "Options", note: "Side by side", Page: Options },
  { name: "Pricing", note: "Every line worked out", Page: Pricing },
  { name: "Work we've done", note: "Your past jobs", Page: Work },
  { name: "Testimonials", note: "Your reviews", Page: Reviews },
  { name: "Terms & conditions", note: "Your terms", Page: Terms },
] as const;

/** The bland one-pager from the opening — what most quotes look like. */
export function PlainQuote({
  business = "Your Business",
  price = "$20,640",
  width = 360,
}: {
  business?: string;
  price?: string;
  width?: number;
}) {
  return (
    <div
      className="relative bg-white text-[#333] shadow-[0_18px_40px_-18px_rgba(11,22,38,0.35)] ring-1 ring-black/10"
      style={{ width, height: width * 1.414, fontFamily: "Times New Roman, Times, serif" }}
    >
      <div style={{ padding: width * 0.1, fontSize: width * 0.036 }}>
        <div style={{ fontSize: width * 0.075, fontWeight: 700, letterSpacing: "0.04em" }}>QUOTE</div>
        <div style={{ marginTop: width * 0.03 }}>{business}</div>
        <div style={{ color: "#777" }}>25/11/2026</div>
        <div style={{ marginTop: width * 0.09 }}>To: Sarah Mitchell</div>
        <div
          style={{
            marginTop: width * 0.07,
            borderTop: "1px solid #999",
            borderBottom: "1px solid #999",
            padding: `${width * 0.035}px 0`,
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span>Supply and install solar system</span>
          <span>{price}</span>
        </div>
        <div style={{ marginTop: width * 0.05, textAlign: "right", fontWeight: 700 }}>
          Total inc GST: {price}
        </div>
        <div style={{ marginTop: width * 0.14, color: "#555" }}>
          Quote valid 30 days.
          <br />
          Regards
        </div>
      </div>
    </div>
  );
}
