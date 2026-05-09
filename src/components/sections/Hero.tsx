"use client";

import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#08080c" }}
    >
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-blob absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(31,97,170,0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            animationDelay: "7s",
            background:
              "radial-gradient(circle, rgba(57,185,229,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            animationDelay: "14s",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-8 xl:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: copy */}
          <div>
            <h1
              className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-brand-text mb-5"
              style={{
                fontSize: "clamp(36px, 5.5vw, 80px)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
              }}
            >
              From enquiry to proposal
              <br />
              <span className="bg-gradient-to-r from-[#3b82f6] to-brand-cyan bg-clip-text text-transparent">
                in under 30 seconds.
              </span>
            </h1>

            <p
              className="text-brand-muted max-w-[420px] mb-8"
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.7,
              }}
            >
              We build your pricing system. You generate branded quotes instantly
              — with multiple options, automatic calculations, and everything
              your client needs to say yes.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <a
                href="/demo"
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-[10px] text-[14px] sm:text-[15px] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,232,237,0.1)]"
                style={{
                  background: "#e8e8ed",
                  color: "#08080c",
                  letterSpacing: "-0.01em",
                }}
              >
                Schedule A Demo
              </a>
              <a
                href="/features"
                className="text-[14px] sm:text-[15px] transition-colors duration-300 hover:text-white/80"
                style={{ color: "rgba(232,232,237,0.45)" }}
              >
                See How It Works &rarr;
              </a>
            </div>
          </div>

          {/* Right: video */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-2xl opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(31,97,170,0.4) 0%, transparent 70%)",
              }}
            />
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50"
              style={{ aspectRatio: "16 / 9" }}
            >
              <video
                src="https://pub-6a618f39fa984c4aa12e520b363259e1.r2.dev/QuotieExplainer3.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                preload="auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs text-white/20 tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/20" />
      </div>
    </section>
  );
}
