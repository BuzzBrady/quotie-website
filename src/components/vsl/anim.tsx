import type { CSSProperties, ReactNode } from "react";

/**
 * Every scene in the explainer is a pure function of time — no timers, no CSS
 * transitions — so the video can be paused, scrubbed and exported frame by
 * frame. These helpers turn "seconds since the scene started" into values.
 */

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const easeInOut = (x: number) => {
  const c = clamp01(x);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};

/** 0 → 1 between a and b, eased out. */
export const ramp = (t: number, a: number, b: number) => easeOut((t - a) / (b - a));
/** 0 → 1 between a and b, eased in and out (for movement). */
export const glide = (t: number, a: number, b: number) => easeInOut((t - a) / (b - a));
/** 1 while a ≤ t < b, fading in and out over `f` seconds. */
export const hold = (t: number, a: number, b: number, f = 0.35) =>
  Math.min(ramp(t, a, a + f), 1 - ramp(t, b - f, b));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** How many of `n` items have appeared, one every `gap` seconds from `at`. */
export const stagger = (t: number, at: number, gap: number, i: number, len = 0.45) =>
  ramp(t, at + i * gap, at + i * gap + len);

/** Fade + rise into place at time `at`. */
export function Appear({
  t,
  at,
  out,
  y = 14,
  len = 0.5,
  className = "",
  style,
  children,
}: {
  t: number;
  at: number;
  /** Optional time to fade back out. */
  out?: number;
  y?: number;
  len?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const p = ramp(t, at, at + len);
  const o = out === undefined ? p : Math.min(p, 1 - ramp(t, out - 0.3, out));
  if (o <= 0) return <div className={className} style={{ ...style, opacity: 0 }} aria-hidden />;
  return (
    <div
      className={className}
      style={{ ...style, opacity: o, transform: `translateY(${(1 - p) * y}px)` }}
    >
      {children}
    </div>
  );
}

/** A tap ripple that expands and fades at time `at`. Position with className. */
export function Tap({ t, at, className = "" }: { t: number; at: number; className?: string }) {
  const p = clamp01((t - at) / 0.7);
  if (t < at || p >= 1) return null;
  return (
    <span
      className={`pointer-events-none absolute rounded-full border-2 border-brand-cyan ${className}`}
      style={{
        width: 44,
        height: 44,
        marginLeft: -22,
        marginTop: -22,
        opacity: 1 - p,
        transform: `scale(${0.4 + p * 1.1})`,
      }}
    />
  );
}

/** Counts a dollar figure up from zero between `at` and `at + len`. */
export function Count({
  t,
  at,
  to,
  len = 0.9,
}: {
  t: number;
  at: number;
  to: number;
  len?: number;
}) {
  const v = Math.round(to * ramp(t, at, at + len));
  return <>${v.toLocaleString("en-AU")}</>;
}

export const fmt = (n: number) => `$${n.toLocaleString("en-AU")}`;

/** Small mono label used throughout the video. */
export function Mono({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`font-mono uppercase tracking-[0.16em] ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
