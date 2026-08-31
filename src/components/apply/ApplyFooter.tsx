import Link from "next/link";

export default function ApplyFooter() {
  return (
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
  );
}
