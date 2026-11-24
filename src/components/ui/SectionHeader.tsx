import Eyebrow from "@/components/ui/Eyebrow";

interface SectionHeaderProps {
  badge?: string;
  /** Kept for API compatibility — no longer rendered. */
  badgeIcon?: React.ReactNode;
  title: string;
  /** Substring of `title` to run the cyan highlighter under. */
  gradient?: string;
  subtitle?: string;
  /** true = sits on a deep navy section. Default is paper. */
  dark?: boolean;
  align?: "left" | "center";
  /** Right-hand side of the eyebrow's dotted leader. */
  trail?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  gradient,
  subtitle,
  dark = false,
  align = "left",
  trail,
  as: Tag = "h2",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";
  const parts = gradient && title.includes(gradient) ? title.split(gradient) : null;

  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {badge && (
        <Eyebrow
          dark={dark}
          trail={centered ? undefined : trail}
          className={`mb-5 ${centered ? "justify-center" : ""}`}
        >
          {badge}
        </Eyebrow>
      )}

      <Tag
        className={`font-jakarta font-extrabold tracking-[-0.03em] leading-[1.08] text-[clamp(1.9rem,4.2vw,3.25rem)] text-balance ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="mark-live">{gradient}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </Tag>

      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed max-w-xl text-pretty ${
            centered ? "mx-auto" : ""
          } ${dark ? "text-white/60" : "text-ink-soft"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
