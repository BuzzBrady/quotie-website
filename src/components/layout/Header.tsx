"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, APP_URL } from "@/lib/constants";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const navBg =
    isScrolled || !isHome
      ? "bg-slate-900/60 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/[0.06]"
      : "bg-transparent border-b border-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/[0.07]"
                      : "text-white/35 hover:text-white/75"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`${APP_URL}/login`}
              className="px-4 py-2 text-sm font-medium transition-colors duration-300 text-white/40 hover:text-white"
            >
              Sign In
            </a>
            <button
              onClick={() => openLeadModal("nav_get_started")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/[0.06] shadow-xl transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "text-white bg-white/[0.08]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-brand-cyan scale-100"
                        : "bg-white/15 scale-75"
                    }`}
                  />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-2">
              <a
                href={`${APP_URL}/login`}
                className="block w-full text-center px-4 py-3 rounded-xl text-base font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Sign In
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLeadModal("mobile_nav_get_started");
                }}
                className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-base font-bold text-white shadow-lg"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
