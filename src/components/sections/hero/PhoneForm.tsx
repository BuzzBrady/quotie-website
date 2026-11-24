import {
  ArrowLeft,
  CaretDown,
  Check,
  DotsThree,
  List,
  PaperPlaneRight,
} from "@phosphor-icons/react";

/**
 * Coded mockup of the app's mobile quote-creation screen (quote-pro-working:
 * src/components/quote-creation, mobile layout shipped 25 Nov 2026):
 * compact header row, sticky section tab strip with a List button, flat
 * always-open sections split by muted bands, pill options, and a sticky
 * bottom bar holding Create Quote + a more-actions button. Light mode, app
 * colours. Sample fields only. Update this when the app screen changes.
 */

const B = "#e6e6e6"; // app border
const MUTED = "#f5f5f5"; // app muted
const MUTED_FG = "#737373";
const PRIMARY = "#2563eb";

function Pill({
  children,
  active,
  tapped,
}: {
  children: React.ReactNode;
  active: boolean;
  tapped: boolean;
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-lg border px-3 text-[12px] font-medium transition-colors duration-300 ${
        tapped ? "tap-ring" : ""
      }`}
      style={
        active
          ? { background: PRIMARY, borderColor: PRIMARY, color: "#fff" }
          : { background: "#fff", borderColor: B, color: "#1a1a1a" }
      }
    >
      {children}
    </span>
  );
}

function Section({
  title,
  done,
  children,
}: {
  title: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3.5 pt-2.5 pb-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[14px] font-semibold leading-snug">{title}</span>
        <span
          className="text-[10.5px] tabular-nums transition-colors duration-300"
          style={{ color: done ? PRIMARY : MUTED_FG }}
        >
          {done ? "1/1" : "0/1"}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function PhoneForm({
  step,
  running,
  generated,
}: {
  /** 0 empty · 1 system size · 2 storeys · 3 battery · 4+ submitted */
  step: number;
  running: boolean;
  generated: boolean;
}) {
  const sized = step >= 1;
  const storeyed = step >= 2;
  const batteried = step >= 3;
  const activeTab = step <= 1 ? 0 : step === 2 ? 1 : 2;
  const TABS = [
    { label: "System", done: sized },
    { label: "Site", done: storeyed },
    { label: "Battery", done: batteried },
  ];

  return (
    // Phone body — the one place the form wears the deep navy
    <div className="rounded-[26px] bg-deep p-[7px] shadow-[0_30px_60px_-30px_rgba(8,17,32,0.7)]">
      <div className="rounded-[20px] bg-white text-[#1a1a1a] overflow-hidden">
        {/* Header row */}
        <div className="flex items-center gap-1.5 px-2.5 pt-2.5 pb-2">
          <ArrowLeft weight="bold" className="w-4 h-4 shrink-0" />
          <span className="text-[15px] font-bold tracking-tight truncate">Create Quote</span>
          <span className="ml-auto font-mono text-[11px]" style={{ color: MUTED_FG }}>
            #1042
          </span>
        </div>

        {/* Section tab strip */}
        <div className="flex h-9 items-stretch border-y" style={{ borderColor: B }}>
          <span
            className="flex w-9 shrink-0 items-center justify-center border-r"
            style={{ borderColor: B, color: MUTED_FG }}
          >
            <List weight="bold" className="w-4 h-4" />
          </span>
          <div className="flex min-w-0 flex-1 overflow-hidden">
            {TABS.map((t, i) => {
              const on = i === activeTab;
              return (
                <span
                  key={t.label}
                  className="relative inline-flex shrink-0 items-center gap-1 px-2.5 text-[12px] font-medium transition-colors duration-300"
                  style={{ color: on ? "#1a1a1a" : MUTED_FG }}
                >
                  {t.label}
                  {t.done && (
                    <Check weight="bold" className="w-2.5 h-2.5" style={{ color: PRIMARY }} />
                  )}
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-center transition-transform duration-300"
                    style={{ background: PRIMARY, transform: `scaleX(${on ? 1 : 0})` }}
                  />
                </span>
              );
            })}
          </div>
        </div>

        {/* Flat sections, split by muted bands */}
        <Section title="System" done={sized}>
          <div className="text-[11.5px] mb-1" style={{ color: MUTED_FG }}>
            System size
          </div>
          <div
            key={`size-${step === 1}`}
            className={`flex h-8 items-center justify-between rounded-lg border px-3 text-[12px] font-medium ${
              step === 1 ? "tap-ring" : ""
            }`}
            style={{ borderColor: B, color: sized ? "#1a1a1a" : "#a3a3a3" }}
          >
            {sized ? "10kW system" : "Select…"}
            <CaretDown weight="bold" className="w-3 h-3" style={{ color: MUTED_FG }} />
          </div>
        </Section>
        <div className="h-1.5" style={{ background: MUTED }} />

        <Section title="Site" done={storeyed}>
          <div className="text-[11.5px] mb-1" style={{ color: MUTED_FG }}>
            Storeys
          </div>
          <div className="flex gap-1.5" key={`st-${step === 2}`}>
            <Pill active={false} tapped={false}>
              Single
            </Pill>
            <Pill active={storeyed} tapped={step === 2}>
              Double
            </Pill>
          </div>
        </Section>
        <div className="h-1.5" style={{ background: MUTED }} />

        <Section title="Battery" done={batteried}>
          <div className="text-[11.5px] mb-1" style={{ color: MUTED_FG }}>
            Battery
          </div>
          <div className="flex gap-1.5" key={`bt-${step === 3}`}>
            <Pill active={false} tapped={false}>
              None
            </Pill>
            <Pill active={batteried} tapped={step === 3}>
              10kWh
            </Pill>
            <Pill active={false} tapped={false}>
              16kWh
            </Pill>
          </div>
        </Section>

        {/* Sticky bottom action bar */}
        <div className="flex items-center gap-1.5 border-t px-2.5 py-2" style={{ borderColor: B }}>
          <span
            key={`go-${running}`}
            className={`flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-semibold transition-colors duration-300 ${
              running ? "tap-ring" : ""
            }`}
            style={
              generated
                ? { background: MUTED, color: "#1a1a1a" }
                : {
                    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                    color: "#fff",
                    opacity: running ? 0.85 : 1,
                  }
            }
          >
            {generated ? (
              <>
                <Check weight="bold" className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
                Quote created
              </>
            ) : running ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Create Quote
              </>
            ) : (
              <>
                <PaperPlaneRight weight="fill" className="w-3.5 h-3.5" />
                Create Quote
              </>
            )}
          </span>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
            style={{ borderColor: B }}
          >
            <DotsThree weight="bold" className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
