"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Play, X } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import HeroStage from "@/components/sections/hero/HeroStage";

const EXPLAINER_SRC =
  "https://pub-6a618f39fa984c4aa12e520b363259e1.r2.dev/QuotieExplainer23.mp4";

function ExplainerDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(960px,calc(100vw-2rem))] bg-transparent p-0 backdrop:bg-deep/80 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
          >
            Close <X weight="bold" className="w-4 h-4" />
          </button>
          <div
            className="rounded-xl overflow-hidden bg-black shadow-2xl"
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              src={EXPLAINER_SRC}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* One soft wash behind the stage — the only atmosphere on the page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 38%, rgba(57,185,229,0.16) 0%, transparent 70%)",
        }}
      />

      <Container className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-12 lg:gap-12 items-center">
          {/* Copy */}
          <div>
            <Eyebrow trail="Prepared for: your business" className="mb-6 max-w-md">
              Quote no. 0001
            </Eyebrow>

            <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.02] text-[clamp(2.4rem,4.4vw,3.7rem)] text-balance">
              Powerful custom quoting,{" "}
              <span className="mark-live mark-live-anim">
                built for your business.
              </span>
            </h1>

            <p className="mt-6 text-ink-soft max-w-[30rem] text-[17px] leading-relaxed text-pretty">
              Every answer you or your team enters changes the quote — line items
              appear, prices recalculate, wording rewrites itself. We build all
              of that for your business. You just fill in a form.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/demo" variant="ink" size="lg">
                Schedule A Demo
                <ArrowRight
                  weight="bold"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <button
                onClick={() => setVideoOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-lg px-4 py-3.5 text-[15px] font-semibold text-ink hover:text-brand-blue transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-rule-strong bg-sheet transition-colors group-hover:border-brand-blue">
                  <Play weight="fill" className="w-3 h-3 translate-x-px" />
                </span>
                Watch the explainer
              </button>
            </div>

            <a
              href="#live-demo"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint hover:text-ink transition-colors"
            >
              <ArrowDown weight="bold" className="w-3.5 h-3.5" />
              Or try it yourself below
            </a>
          </div>

          {/* The product, playing */}
          <HeroStage />
        </div>
      </Container>

      <ExplainerDialog open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
