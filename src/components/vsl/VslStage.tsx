import { T } from "./script";
import { hold, ramp } from "./anim";
import Intro from "./scenes/Intro";
import Setup from "./scenes/Setup";
import { Engine, SameOut } from "./scenes/EngineScenes";
import { After, Close } from "./scenes/After";

/**
 * The explainer video's picture: a fixed 1280×720 stage drawn for time `t`
 * (seconds). Pure — the same `t` always gives the same frame, which is what
 * lets the player scrub and lets the video be exported frame by frame.
 * Paper for the story, deep navy for the engine and the app.
 */

export const STAGE_W = 1280;
export const STAGE_H = 720;

const SCENES = [
  { from: T["1a"].start, to: T["2"].start, deep: false, Scene: Intro },
  { from: T["2"].start, to: T["4a"].start, deep: false, Scene: Setup },
  { from: T["4a"].start, to: T["5"].start, deep: true, Scene: Engine },
  { from: T["5"].start, to: T["6a"].start, deep: false, Scene: SameOut },
  { from: T["6a"].start, to: T["7"].start, deep: true, Scene: After },
  { from: T["7"].start, to: T["7"].end + 1, deep: false, Scene: Close },
];

export default function VslStage({ t }: { t: number }) {
  const scene = SCENES.find((s) => t < s.to) ?? SCENES[SCENES.length - 1];
  const last = scene === SCENES[SCENES.length - 1];
  const deep = SCENES.filter((s) => s.deep).reduce(
    (o, s) => Math.max(o, Math.min(ramp(t, s.from - 0.25, s.from + 0.15), 1 - ramp(t, s.to - 0.15, s.to + 0.25))),
    0,
  );
  const content = last
    ? ramp(t, scene.from, scene.from + 0.35)
    : hold(t, scene.from, scene.to, 0.35);
  const { Scene } = scene;

  return (
    <div
      className="relative overflow-hidden bg-paper font-[family-name:var(--font-dm)]"
      style={{ width: STAGE_W, height: STAGE_H }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-deep" style={{ opacity: deep }} />
      <div className="absolute inset-0" style={{ opacity: Math.max(content, t < 0.35 ? 1 : 0) }}>
        <Scene t={t} />
      </div>
    </div>
  );
}
