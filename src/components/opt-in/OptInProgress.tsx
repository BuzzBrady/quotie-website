const DOT = 18;
const LINE = 3;
const TRACK = "#d4d4d4";
const FILLED = ["#1f61aa", "#2580c0", "#2f9cd3", "#39b9e5"];

export default function OptInProgress({
  step,
  total = 4,
  className = "max-w-[180px]",
}: {
  step: number;
  total?: number;
  className?: string;
}) {
  const clamped = Math.max(-1, Math.min(step, total - 1));
  const fill = total > 1 ? Math.max(0, clamped) / (total - 1) : 0;

  return (
    <div className={`mx-auto w-full ${className}`} aria-hidden>
      <div className="relative h-5">
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: DOT / 2,
            right: DOT / 2,
            height: LINE,
            background: TRACK,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
          style={{
            left: DOT / 2,
            height: LINE,
            width: `calc((100% - ${DOT}px) * ${fill})`,
            background: "linear-gradient(90deg, #1f61aa, #39b9e5)",
          }}
        />
        <div className="relative flex h-5 items-center justify-between">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-colors duration-300"
              style={{
                width: DOT,
                height: DOT,
                background: i <= clamped ? FILLED[i] ?? FILLED[FILLED.length - 1] : TRACK,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
