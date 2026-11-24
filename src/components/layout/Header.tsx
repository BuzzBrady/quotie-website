"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import { NAV_LINKS, APP_URL } from "@/lib/constants";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";
import { buttonClass } from "@/components/ui/Button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 border-b ${
        solid
          ? "bg-paper/85 backdrop-blur-xl border-rule shadow-[0_8px_24px_-16px_rgba(11,22,38,0.25)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex h-16 lg:h-[72px] items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/logo.svg"
              alt=""
              className="w-8 h-8 transition-transform duration-300 group-hover:-rotate-6"
              width={32}
              height={32}
            />
            <span className="text-[19px] font-extrabold tracking-[-0.03em] font-jakarta text-ink">
              Quotie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] bg-brand-cyan origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`${APP_URL}/login`}
              className="px-3.5 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors duration-200"
            >
              Sign In
            </a>
            <button
              onClick={() => openLeadModal("nav_get_started")}
              className={buttonClass("ink", "md")}
            >
              Get Started
              <ArrowRight
                weight="bold"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden -mr-2 p-2 rounded-lg text-ink hover:bg-ink/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X weight="bold" size={22} /> : <List weight="bold" size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-paper border-b border-rule shadow-[0_24px_48px_-24px_rgba(11,22,38,0.3)] transition-[opacity,transform] duration-200 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-5 sm:px-8 pt-2 pb-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-baseline gap-3 py-3.5 border-b border-rule font-jakarta text-lg font-bold tracking-[-0.02em] ${
                  isActive ? "text-brand-blue" : "text-ink"
                }`}
              >
                {link.name}
                <span className="leader" aria-hidden />
                <ArrowRight weight="bold" className="w-4 h-4 self-center text-ink-faint" />
              </Link>
            );
          })}
          <div className="pt-5 grid grid-cols-2 gap-3">
            <a href={`${APP_URL}/login`} className={buttonClass("outline", "lg")}>
              Sign In
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLeadModal("mobile_nav_get_started");
              }}
              className={buttonClass("ink", "lg")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
