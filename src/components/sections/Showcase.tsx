"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const INDUSTRIES = [
  {
    id: "solar",
    label: "Solar",
    pages: 12,
    pad: true,
  },
  {
    id: "solar2",
    label: "Solar & Electrical",
    pages: 17,
    pad: true,
  },
  {
    id: "roofing",
    label: "Roofing",
    pages: 18,
    pad: true,
  },
  {
    id: "roofing2",
    label: "Metal Roofing",
    pages: 3,
    pad: false,
  },
  {
    id: "cleaning",
    label: "Cleaning",
    pages: 9,
    pad: false,
  },
] as const;

function getImages(industry: (typeof INDUSTRIES)[number]) {
  return Array.from({ length: industry.pages }, (_, i) => {
    const n = i + 1;
    const page = industry.pad ? String(n).padStart(2, "0") : String(n);
    return `/showcase/${industry.id}/page-${page}.webp`;
  });
}

export default function Showcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const hoverDir = useRef<number>(0); // -1 left, 0 none, 1 right

  const industry = INDUSTRIES[activeIdx];
  const images = getImages(industry);

  // Reset strip scroll on tab change
  useEffect(() => {
    if (stripRef.current) stripRef.current.scrollLeft = 0;
    if (mobileRef.current) mobileRef.current.scrollLeft = 0;
  }, [activeIdx]);

  const tick = useCallback(() => {
    const el = stripRef.current;
    if (!el || hoverDir.current === 0) {
      raf.current = requestAnimationFrame(tick);
      return;
    }
    const speed = 3;
    el.scrollLeft += hoverDir.current * speed;
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [tick]);

  return (
    <section className="py-20 overflow-hidden" style={{ background: "#08080c" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {INDUSTRIES.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                i === activeIdx
                  ? "bg-white/[0.1] text-white border border-white/[0.15]"
                  : "text-white/40 hover:text-white/70 border border-transparent hover:border-white/[0.08]"
              }`}
            >
              {ind.label}
              <span className="ml-2 text-xs opacity-50">{ind.pages} pages</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop infinite scroll strip */}
      <div className="relative hidden md:block">
        {/* Fade left */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#08080c] to-transparent" />
        {/* Fade right */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#08080c] to-transparent" />

        {/* Left hover zone */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/4 z-20 cursor-w-resize"
          onMouseEnter={() => (hoverDir.current = -1)}
          onMouseLeave={() => (hoverDir.current = 0)}
        />
        {/* Right hover zone */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/4 z-20 cursor-e-resize"
          onMouseEnter={() => (hoverDir.current = 1)}
          onMouseLeave={() => (hoverDir.current = 0)}
        />

        <div
          ref={stripRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-16 py-4"
          style={{ scrollBehavior: "auto" }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden border border-white/[0.07] shadow-xl"
              style={{ width: 240, height: 340 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${industry.label} page ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ filter: "blur(6px)", transform: "scale(1.05)" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile swipe strip */}
      <div className="relative md:hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#08080c] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#08080c] to-transparent" />

        <div
          ref={mobileRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-6 py-4 snap-x snap-mandatory"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-center rounded-xl overflow-hidden border border-white/[0.07] shadow-xl"
              style={{ width: 180, height: 260 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${industry.label} page ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ filter: "blur(6px)", transform: "scale(1.05)" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
