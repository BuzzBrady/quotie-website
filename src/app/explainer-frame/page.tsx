"use client";

import { useEffect, useState } from "react";
import VslStage, { STAGE_H, STAGE_W } from "@/components/vsl/VslStage";
import { DURATION } from "@/components/vsl/script";

declare global {
  interface Window {
    /** Set by this page; the player (or an export script) calls it with the time in seconds. */
    __vslSetTime?: (t: number) => void;
  }
}

/**
 * Draws the explainer for whatever time it is told. The homepage player embeds
 * this page in a 1280×720 iframe and drives it, so the app mockups always lay
 * out at desktop width however small the player is on screen.
 *
 * On its own: `?t=42` shows a single frame, `?play=1` plays through.
 */
export default function ExplainerFramePage() {
  const [t, setT] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    window.__vslSetTime = (next: number) => setT(Math.max(0, Math.min(DURATION, next)));
    if (window.parent !== window) {
      window.parent.postMessage({ type: "vsl-ready" }, window.location.origin);
    }

    const params = new URLSearchParams(window.location.search);
    const at = Number(params.get("t"));
    if (at > 0) window.__vslSetTime(at);

    let raf = 0;
    if (params.get("play")) {
      const t0 = performance.now() - (at > 0 ? at * 1000 : 0);
      const tick = (now: number) => {
        window.__vslSetTime?.((now - t0) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    const fit = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      delete window.__vslSetTime;
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div
        className="origin-top-left"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        <VslStage t={t} />
      </div>
    </div>
  );
}
