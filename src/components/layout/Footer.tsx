import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="bg-deep text-white/60"
      style={{ "--leader-color": "rgba(255,255,255,0.2)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 pt-16 lg:pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <img
                src="/logo.svg"
                alt=""
                className="w-8 h-8 transition-transform duration-300 group-hover:-rotate-6"
                width={32}
                height={32}
              />
              <span className="text-[19px] font-extrabold tracking-[-0.03em] font-jakarta text-white">
                Quotie
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The quote-to-close platform for businesses that need to quote fast
              and win more work.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
              Built on the Central Coast, NSW
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan mb-4">
                {category}
              </h3>
              <ul>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors inline-block py-1.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — set like the foot of a quote */}
        <div className="mt-14 pt-6 border-t border-deep-rule flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
          <span>&copy; {new Date().getFullYear()} Quotie Pty Ltd</span>
          <span className="leader hidden sm:block" aria-hidden />
          <span className="ml-auto sm:ml-0">All prices incl. GST</span>
        </div>
      </div>
    </footer>
  );
}
