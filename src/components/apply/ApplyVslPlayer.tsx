"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, SpeakerSlash } from "@phosphor-icons/react";
import { trackVsl } from "@/components/seo/MetaPixel";
import {
  recordApplyVslWatch,
  type ApplyVslVariantId,
} from "@/components/apply/applyVslSplit";

const TEASE_SECONDS = 8;

/** Fast at the start so the video feels short, then eases off. */
function smartProgress(p: number): number {
  const x = Math.min(1, Math.max(0, p));
  return Math.pow(x, 0.42);
}

const WATCH_MARKS = [25, 50, 75, 95] as const;

export default function ApplyVslPlayer({
  src,
  variant,
}: {
  src: string;
  variant?: ApplyVslVariantId;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const engagedRef = useRef(false);
  const firedMarks = useRef(new Set<number>());
  const lastWatchWrite = useRef(0);
  const [engaged, setEngaged] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [bar, setBar] = useState(0);

  const teaseLoop = useCallback(() => {
    const video = videoRef.current;
    if (!video || engagedRef.current) return;
    if (video.currentTime >= TEASE_SECONDS) {
      video.currentTime = 0.05;
    }
  }, []);

  const tryAutoplay = useCallback(() => {
    const video = videoRef.current;
    if (!video || engagedRef.current) return;
    video.muted = true;
    video.playsInline = true;
    void video.play().catch(() => {
      /* Browser blocked it — overlay still invites the click. */
    });
  }, []);

  useEffect(() => {
    tryAutoplay();
  }, [tryAutoplay]);

  useEffect(() => {
    const flushWatch = () => {
      const video = videoRef.current;
      if (!engagedRef.current || !video?.duration || !Number.isFinite(video.duration)) {
        return;
      }
      recordApplyVslWatch({
        variant,
        percent: (video.currentTime / video.duration) * 100,
        seconds: video.currentTime,
        duration: video.duration,
        unmuted: true,
      });
    };
    window.addEventListener("pagehide", flushWatch);
    document.addEventListener("visibilitychange", flushWatch);
    return () => {
      flushWatch();
      window.removeEventListener("pagehide", flushWatch);
      document.removeEventListener("visibilitychange", flushWatch);
    };
  }, [variant]);

  const engage = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (engagedRef.current) {
      if (video.paused) {
        void video.play();
        setPaused(false);
        setEnded(false);
      } else {
        video.pause();
        setPaused(true);
      }
      return;
    }

    engagedRef.current = true;
    setEngaged(true);
    setPaused(false);
    setEnded(false);
    video.pause();
    video.currentTime = 0;
    video.muted = false;
    void video.play().catch(() => {
      setPaused(true);
    });
    recordApplyVslWatch({
      variant,
      percent: 0,
      seconds: 0,
      duration: Number.isFinite(video.duration) ? video.duration : 0,
      unmuted: true,
    });
    trackVsl("VslPlay", { vsl_variant: variant });
  }, [variant]);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!engagedRef.current) {
      teaseLoop();
      return;
    }
    if (video.duration && Number.isFinite(video.duration)) {
      const raw = video.currentTime / video.duration;
      setBar(smartProgress(raw));
      const pct = raw * 100;
      for (const mark of WATCH_MARKS) {
        if (pct >= mark && !firedMarks.current.has(mark)) {
          firedMarks.current.add(mark);
          trackVsl("VslProgress", { vsl_variant: variant, percent: mark });
        }
      }
      const now = Date.now();
      if (now - lastWatchWrite.current > 1500) {
        lastWatchWrite.current = now;
        recordApplyVslWatch({
          variant,
          percent: pct,
          seconds: video.currentTime,
          duration: video.duration,
          unmuted: true,
        });
      }
    }
  }, [teaseLoop, variant]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl shadow-slate-200/80 aspect-video">
      <style>{`
        @keyframes vsl-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.06); opacity: 1; }
        }
      `}</style>
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full bg-black object-cover"
        playsInline
        muted
        autoPlay
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onLoadedData={tryAutoplay}
        onCanPlay={tryAutoplay}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => {
          if (engagedRef.current) setPaused(false);
        }}
        onPause={() => {
          const video = videoRef.current;
          if (!engagedRef.current || !video || video.muted || video.ended) return;
          setPaused(true);
          if (video.duration && Number.isFinite(video.duration)) {
            recordApplyVslWatch({
              variant,
              percent: (video.currentTime / video.duration) * 100,
              seconds: video.currentTime,
              duration: video.duration,
              unmuted: true,
            });
          }
        }}
        onEnded={() => {
          setEnded(true);
          setPaused(true);
          setBar(1);
          if (!firedMarks.current.has(100)) {
            firedMarks.current.add(100);
            const video = videoRef.current;
            recordApplyVslWatch({
              variant,
              percent: 100,
              seconds: video?.duration || video?.currentTime || 0,
              duration: video?.duration || 0,
              unmuted: true,
              completed: true,
            });
            trackVsl("VslComplete", { vsl_variant: variant, percent: 100 });
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
      />

      {!engaged && (
        <button
          type="button"
          onClick={engage}
          className="absolute inset-0 z-10 flex items-center justify-center px-10 sm:px-10"
          aria-label="Your video has already started. Click to listen."
        >
          <span
            className="flex w-[70%] max-w-[220px] flex-col items-center rounded-2xl bg-gradient-to-r from-brand-blue/90 to-brand-cyan/90 px-3.5 py-3.5 text-center shadow-lg shadow-brand-blue/30 sm:w-full sm:max-w-[440px] sm:rounded-[28px] sm:px-12 sm:py-9"
            style={{
              animation: "vsl-pulse 2.2s ease-in-out infinite",
              transformOrigin: "center center",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="font-[family-name:var(--font-jakarta)] text-[13px] font-bold leading-snug tracking-tight text-white sm:text-[22px]">
              Your video has already started
            </p>
            <SpeakerSlash
              weight="fill"
              className="my-1.5 h-9 w-9 text-white sm:my-5 sm:h-[76px] sm:w-[76px]"
              aria-hidden
            />
            <p className="font-[family-name:var(--font-jakarta)] text-[13px] font-bold tracking-tight text-white sm:text-[22px]">
              Click to listen
            </p>
          </span>
        </button>
      )}

      {engaged && (paused || ended) && (
        <button
          type="button"
          onClick={engage}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35"
          aria-label={ended ? "Watch again" : "Resume video"}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan shadow-lg ring-4 ring-white/25">
            <Play weight="fill" className="ml-1 h-7 w-7 text-white" />
          </span>
          {ended && (
            <p className="mt-3 font-[family-name:var(--font-jakarta)] text-xs font-extrabold uppercase tracking-[0.16em] text-white">
              Watch again
            </p>
          )}
        </button>
      )}

      {engaged && !ended && (
        <button
          type="button"
          className="absolute inset-0 z-[5]"
          aria-label={paused ? "Play" : "Pause"}
          onClick={engage}
        />
      )}

      {engaged && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1.5 bg-black/40">
          <div
            className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan shadow-[0_0_12px_rgba(57,185,229,0.65)] transition-[width] duration-150 ease-linear"
            style={{ width: `${bar * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
