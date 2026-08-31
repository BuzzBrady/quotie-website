import Link from "next/link";
import OptInLead from "@/components/opt-in/OptInLead";

export default function OptInLanding() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F9] text-slate-900">
      <div
        className="relative z-20 bg-white"
        style={{ boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 8px rgba(15, 23, 42, 0.04)" }}
      >
        <div className="flex items-center justify-center px-4 py-3">
          <span className="font-[family-name:var(--font-jakarta)] text-xl sm:text-2xl font-bold uppercase tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Quotie
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-1 flex-col px-5 pb-10 pt-8 sm:pt-12">
        <OptInLead />

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
            © {new Date().getFullYear()} QUOTIE PTY LIMITED
          </p>
        </footer>
      </div>
    </div>
  );
}
