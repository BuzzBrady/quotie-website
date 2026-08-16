import Link from "next/link";
import OptInForm from "@/components/opt-in/OptInForm";
import OptInQuotes from "@/components/opt-in/OptInQuotes";

export default function OptInLanding() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(31,97,170,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full opacity-35 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(57,185,229,0.16) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 bg-gradient-to-r from-brand-blue to-brand-cyan">
        <p className="px-4 py-2.5 text-center text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-white">
          Former Full-Time Estimator Reveals
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-1 flex-col px-5 pb-10 pt-8 sm:pt-12">
        <div className="mb-8 flex items-center justify-center">
          <span className="font-[family-name:var(--font-jakarta)] text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Quotie
          </span>
        </div>

        <h1
          className="mb-5 text-center font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900"
          style={{
            fontSize: "clamp(28px, 7vw, 42px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          How Much{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Time, Margin &amp; Revenue
          </span>{" "}
          Is Your Current Quoting Process Costing You?
        </h1>

        <p className="mb-8 text-center text-[15px] sm:text-base leading-relaxed text-slate-800">
          See how Quotie turns the way you already price jobs into a system that
          can build, send and manage professional quotes in seconds.
        </p>

        <div className="relative mb-8">
          <div
            className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(31,97,170,0.12), rgba(57,185,229,0.08), transparent 70%)",
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl shadow-slate-200/80">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
            <OptInForm />
          </div>
        </div>

        <OptInQuotes />

        <footer className="mt-auto border-t border-slate-200 pt-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-3 text-xs">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Quotie Pty Ltd
          </p>
        </footer>
      </div>
    </div>
  );
}
