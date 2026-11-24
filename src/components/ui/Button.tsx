import Link from "next/link";

type Variant = "ink" | "brand" | "outline" | "light" | "ghost-dark";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-white hover:bg-brand-blue shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_6px_16px_-6px_rgba(11,22,38,0.5)]",
  brand:
    "bg-brand-blue text-white hover:bg-[#1a5494] shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_6px_16px_-6px_rgba(31,97,170,0.6)]",
  outline:
    "border border-rule-strong bg-sheet text-ink hover:border-ink",
  light: "bg-white text-ink hover:bg-wash",
  "ghost-dark":
    "border border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

export function buttonClass(variant: Variant = "ink", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const cls = buttonClass(variant, size, className);
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

export default function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
