"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, SpeakerSlash } from "@phosphor-icons/react";

const TEASE_SECONDS = 8;

/** Fast at the start so the video feels short, then eases off. */
function smartProgress(p: number): number {
  const x = Math.min(1, Math.max(0, p));
  return Math.pow(x, 0.42);
}

export default function ApplyVslPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const engagedRef = useRef(false);
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
  }, []);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!engagedRef.current) {
      teaseLoop();
      return;
    }
    if (video.duration && Number.isFinite(video.duration)) {
      setBar(smartProgress(video.currentTime / video.duration));
    }
  }, [teaseLoop]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl shadow-slate-200/80 aspect-video">
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
        }}
        onEnded={() => {
          setEnded(true);
          setPaused(true);
          setBar(1);
        }}
        onContextMenu={(e) => e.preventDefault()}
      />

      {!engaged && (
        <button
          type="button"
          onClick={engage}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 px-6 text-center"
          aria-label="Click to unmute and play the training"
        >
          <span className="relative mb-5 flex h-[72px] w-[72px] items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-white/25 animate-ping" />
            <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan shadow-lg shadow-black/40 ring-4 ring-white/30">
              <Play weight="fill" className="ml-1 h-8 w-8 text-white" />
            </span>
          </span>
          <p className="font-[family-name:var(--font-jakarta)] text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/80">
            Your video is playing
          </p>
          <p className="mt-2 flex items-center gap-2 font-[family-name:var(--font-jakarta)] text-[17px] font-extrabold tracking-tight text-white sm:text-[19px]">
            <SpeakerSlash weight="fill" className="h-5 w-5" />
            Click to unmute
          </p>
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
