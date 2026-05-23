import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-400 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img
                src="/logo.svg"
                alt="Quotie"
                className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold font-[family-name:var(--font-jakarta)] bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                Quotie
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              The quote-to-close platform for businesses that need to quote fast
              and win more work.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-block py-1.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Quotie Pty Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
