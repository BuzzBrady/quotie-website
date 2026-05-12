"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const TESTIMONIALS = [
  {
    name: "Jed Bolton",
    role: "Director",
    company: "Bolton EC",
    metric: "$360k+",
    metricLabel: "Closed in one month",
    quote:
      "I couldn't believe how quickly we closed $360k in a single month once we had Quotie dialled in. The multi-option proposals are a game changer — clients love being able to choose what works for them.",
    avatar: "JB",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Jake Ruwhiu",
    role: "Director",
    company: "Virtue Roofing",
    metric: "10x",
    metricLabel: "More professional",
    quote:
      "Our quotes used to be a Word doc attached to an email. Now clients open a beautifully branded PDF with multiple options and our logo front and centre. It's 10x more professional overnight.",
    avatar: "JR",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Cooper Kelly",
    role: "Director",
    company: "Coastal Cleans Co",
    metric: "100%",
    metricLabel: "Pipeline visibility",
    quote:
      "I know exactly where every single quote is at, every single day. Who needs a follow-up, who's ready to go. Complete visibility into the pipeline for the first time ever.",
    avatar: "CK",
    color: "from-cyan-500 to-blue-600",
  },
] as const;

const STATS = [
  { value: "30sec", label: "Quote to inbox" },
  { value: "4hrs", label: "Saved per day" },
  { value: "3x", label: "More proposals sent" },
  { value: "100%", label: "Pipeline visibility" },
];

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  const t = TESTIMONIALS[active];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="mb-14">
          <SectionHeader
            badge="Trusted by real businesses"
            badgeIcon={<Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
            title="Built with businesses. Backed by results."
            gradient="Backed by results."
            dark={false}
          />
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Desktop crossfade */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-5 rounded-2xl overflow-hidden shadow-xl border border-slate-100"
              >
                {/* Metric left */}
                <div
                  className={`md:col-span-2 flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br ${t.color}`}
                >
                  <div className="text-5xl font-extrabold text-white font-[family-name:var(--font-jakarta)] mb-2">
                    {t.metric}
                  </div>
                  <div className="text-white/70 text-sm font-medium">
                    {t.metricLabel}
                  </div>
                </div>

                {/* Quote right */}
                <div className="md:col-span-3 p-8 lg:p-10 bg-white flex flex-col justify-between">
                  <div>
                    <Stars />
                    <blockquote className="mt-4 text-slate-700 leading-relaxed text-[17px]">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-500">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile swipeable */}
          <div
            className="md:hidden"
            onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (dragStart === null) return;
              const diff = dragStart - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) {
                diff > 0 ? next() : prev();
                resetTimer();
              }
              setDragStart(null);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-slate-100"
              >
                <div
                  className={`bg-gradient-to-br ${t.color} p-6 text-center`}
                >
                  <div className="text-4xl font-extrabold text-white font-[family-name:var(--font-jakarta)]">
                    {t.metric}
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    {t.metricLabel}
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <Stars />
                  <blockquote className="mt-3 text-slate-700 leading-relaxed text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => { prev(); resetTimer(); }}
              className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); resetTimer(); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? "bg-slate-800 w-6" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => { next(); resetTimer(); }}
              className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                {s.value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
