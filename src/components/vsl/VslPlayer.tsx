"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowCounterClockwise,
  ArrowRight,
  ClosedCaptioning,
  CornersIn,
  CornersOut,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { CHAPTERS, DURATION, cueAt, formatTime, segmentAt } from "./script";
import { STAGE_H, STAGE_W } from "./VslStage";

/**
 * Player for the coded explainer video. The picture is /explainer-frame in a
 * 1280×720 iframe, scaled to fit; this component owns the clock, the controls
 * and the subtitles, and tells the frame what time it is.
 *
 * Voiceover: put the recording in /public and set VOICEOVER_SRC. When it is
 * set the audio becomes the clock, so picture and subtitles follow the voice.
 * Scene lengths live in ./script.ts.
 */
const VOICEOVER_SRC: string | null = null;

type FrameWindow = Window & { __vslSetTime?: (t: number) => void };

export default function VslPlayer({ autoPlay = true }: { autoPlay?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);

  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [scale, setScale] = useState(0.5);
  const [fullscreen, setFullscreen] = useState(false);
  // Only ever rendered in the browser (inside the opened dialog), so this is safe to read up front.
  const [canFullscreen] = useState(
    () => typeof document !== "undefined" && Boolean(document.fullscreenEnabled),
  );

  const ended = t >= DURATION;

  const paint = useCallback((time: number) => {
    const win = frameRef.current?.contentWindow as FrameWindow | null | undefined;
    try {
      win?.__vslSetTime?.(time);
    } catch {
      /* frame not ready yet */
    }
  }, []);

  const seek = useCallback(
    (time: number) => {
      const next = Math.max(0, Math.min(DURATION, time));
      timeRef.current = next;
      if (audioRef.current) audioRef.current.currentTime = next;
      setT(next);
      paint(next);
    },
    [paint],
  );

  const toggle = useCallback(() => {
    if (timeRef.current >= DURATION) seek(0);
    setPlaying((p) => !p);
  }, [seek]);

  // The frame says when it can take a time; start playing then.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== "vsl-ready") return;
      setReady(true);
      paint(timeRef.current);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (autoPlay && !reduce) setPlaying(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [autoPlay, paint]);

  // The clock. With a voiceover the audio element keeps time; without one, the
  // frame timer does.
  useEffect(() => {
    const audio = audioRef.current;
    if (!playing) {
      audio?.pause();
      return;
    }
    if (audio) {
      audio.currentTime = timeRef.current;
      void audio.play().catch(() => setPlaying(false));
    }
    let raf = 0;
    let last = performance.now();
    let lastState = 0;
    const tick = (now: number) => {
      const next = audio ? audio.currentTime : timeRef.current + (now - last) / 1000;
      last = now;
      timeRef.current = Math.min(DURATION, next);
      paint(timeRef.current);
      // Controls and subtitles don't need 60 updates a second.
      if (now - lastState > 100 || timeRef.current >= DURATION) {
        lastState = now;
        setT(timeRef.current);
      }
      if (timeRef.current >= DURATION) {
        setPlaying(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, paint]);

  // Fit the 1280×720 frame to the box.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => setScale(box.clientWidth / STAGE_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      seek(timeRef.current + 5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      seek(timeRef.current - 5);
    } else if (e.key === "c") {
      setCaptions((c) => !c);
    } else if (e.key === "f" && canFullscreen) {
      toggleFullscreen();
    }
  };

  const seekFromPointer = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const r = bar.getBoundingClientRect();
    seek(((clientX - r.left) / r.width) * DURATION);
  };

  const cue = cueAt(t);
  const chapter = segmentAt(Math.min(t, DURATION - 0.01)).chapter;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Quotie explainer video"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`flex flex-col overflow-hidden bg-black text-white outline-none ${
        fullscreen ? "h-screen w-screen items-center justify-center" : "rounded-xl shadow-2xl"
      }`}
    >
      <div className={fullscreen ? "w-[min(100vw,calc((100vh-7.5rem)*16/9))]" : "w-full"}>
        {/* Picture */}
        <div
          ref={boxRef}
          className="relative w-full cursor-pointer overflow-hidden bg-paper"
          style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
          onClick={toggle}
        >
          <iframe
            ref={frameRef}
            src="/explainer-frame"
            title="Quotie explainer"
            tabIndex={-1}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
            style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
          />

          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center bg-paper">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-rule-strong border-t-brand-blue" />
            </div>
          )}

          {ready && !playing && !ended && (
            <div className="absolute inset-0 flex items-center justify-center bg-deep/25">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink shadow-xl">
                <Play weight="fill" className="h-6 w-6 translate-x-0.5" />
              </span>
            </div>
          )}

          {ended && (
            <div
              className="absolute inset-x-0 bottom-0 top-[53%] flex cursor-default flex-wrap items-start justify-center gap-3 bg-paper pt-[3%]"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-brand-blue"
              >
                Schedule A Demo <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  seek(0);
                  setPlaying(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-rule-strong bg-sheet px-5 py-3 text-[15px] font-semibold text-ink hover:border-ink"
              >
                <ArrowCounterClockwise weight="bold" className="h-4 w-4" /> Watch again
              </button>
            </div>
          )}
        </div>

        {/* Subtitles — outside the picture so they stay readable on a phone */}
        {captions && (
          <div
            className="flex min-h-[3.4rem] items-center justify-center bg-black px-4 py-2 text-center text-[15px] leading-snug text-white sm:min-h-[3.8rem] sm:text-[17px]"
            aria-live="off"
          >
            {cue?.text ?? ""}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3 bg-[#0b0f17] px-3 py-2.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : ended ? "Watch again" : "Play"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md hover:bg-white/10"
          >
            {playing ? (
              <Pause weight="fill" className="h-4 w-4" />
            ) : ended ? (
              <ArrowCounterClockwise weight="bold" className="h-4 w-4" />
            ) : (
              <Play weight="fill" className="h-4 w-4" />
            )}
          </button>

          <span className="shrink-0 font-mono text-[12px] tabular-nums text-white/70">
            {formatTime(t)} / {formatTime(DURATION)}
          </span>

          <div
            ref={barRef}
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(DURATION)}
            aria-valuenow={Math.round(t)}
            aria-valuetext={`${formatTime(t)}, ${chapter}`}
            className="relative flex h-8 min-w-0 flex-1 cursor-pointer touch-none items-center"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              seekFromPointer(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) seekFromPointer(e.clientX);
            }}
          >
            <div className="flex h-1.5 w-full gap-[2px]">
              {CHAPTERS.map((c) => {
                const fill = Math.max(0, Math.min(1, (t - c.start) / (c.end - c.start)));
                return (
                  <div
                    key={c.start}
                    title={c.title}
                    className="h-full overflow-hidden rounded-full bg-white/20"
                    style={{ flexGrow: c.end - c.start, flexBasis: 0 }}
                  >
                    <div
                      className="h-full origin-left bg-brand-cyan"
                      style={{ transform: `scaleX(${fill})` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 md:block">
            {chapter}
          </span>

          <button
            type="button"
            onClick={() => setCaptions((c) => !c)}
            aria-pressed={captions}
            aria-label="Subtitles"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md hover:bg-white/10 ${
              captions ? "text-brand-cyan" : "text-white/60"
            }`}
          >
            <ClosedCaptioning weight={captions ? "fill" : "regular"} className="h-5 w-5" />
          </button>

          {canFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit full screen" : "Full screen"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white/80 hover:bg-white/10"
            >
              {fullscreen ? <CornersIn className="h-5 w-5" /> : <CornersOut className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {VOICEOVER_SRC && <audio ref={audioRef} src={VOICEOVER_SRC} preload="auto" />}
    </div>
  );
}
