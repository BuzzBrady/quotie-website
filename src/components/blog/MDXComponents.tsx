import type { MDXComponents as MDXComponentsType } from 'mdx/types';

type CalloutType = 'info' | 'warning' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const calloutStyles: Record<CalloutType, { border: string; bg: string; label: string; labelColor: string }> = {
  info: {
    border: 'border-brand-blue',
    bg: 'bg-wash/60',
    label: 'Info',
    labelColor: 'text-brand-blue',
  },
  warning: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    label: 'Warning',
    labelColor: 'text-amber-700',
  },
  tip: {
    border: 'border-emerald-600',
    bg: 'bg-emerald-50',
    label: 'Tip',
    labelColor: 'text-emerald-700',
  },
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = calloutStyles[type];
  return (
    <div className={`my-8 border-l-[3px] ${styles.border} ${styles.bg} px-5 py-4`}>
      <p className={`font-mono text-[11px] uppercase tracking-[0.14em] mb-2 ${styles.labelColor}`}>
        {styles.label}
      </p>
      <div className="text-ink text-[15px] leading-relaxed [&>p]:mb-0 [&>p]:text-ink [&>p]:text-[15px]">{children}</div>
    </div>
  );
}

function makeHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  return '';
}

export const mdxComponents: MDXComponentsType = {
  h2: ({ children, ...props }) => {
    const text = extractText(children);
    const id = makeHeadingId(text);
    return (
      <h2
        id={id}
        className="text-[26px] sm:text-[30px] font-extrabold text-ink font-jakarta mt-14 mb-4 tracking-[-0.03em] leading-[1.15] scroll-mt-32 text-balance"
        {...props}
      >
        <a href={`#${id}`} className="hover:text-brand-blue transition-colors no-underline">
          {children}
        </a>
      </h2>
    );
  },

  h3: ({ children, ...props }) => {
    const text = extractText(children);
    const id = makeHeadingId(text);
    return (
      <h3
        id={id}
        className="text-xl sm:text-[22px] font-bold text-ink font-jakarta mt-10 mb-3 tracking-[-0.02em] leading-snug scroll-mt-32"
        {...props}
      >
        {children}
      </h3>
    );
  },

  p: ({ children, ...props }) => (
    <p className="text-ink-soft leading-[1.75] mb-5 text-[17px] text-pretty" {...props}>
      {children}
    </p>
  ),

  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-brand-blue font-medium underline decoration-brand-cyan/60 decoration-2 underline-offset-[3px] hover:decoration-brand-blue transition-colors"
      {...props}
    >
      {children}
    </a>
  ),

  ul: ({ children, ...props }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-ink-soft marker:text-brand-blue" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-ink-soft marker:font-mono marker:text-sm marker:text-brand-blue" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="leading-[1.7] text-[17px] pl-1" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-[3px] border-brand-cyan pl-5 my-8 [&>p]:font-jakarta [&>p]:font-semibold [&>p]:text-ink [&>p]:text-xl [&>p]:leading-snug [&>p]:tracking-[-0.01em] [&>p:last-child]:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),

  pre: ({ children, ...props }) => (
    <pre
      className="bg-deep text-white/90 rounded-lg p-5 overflow-x-auto my-8 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:text-inherit [&_code]:p-0"
      {...props}
    >
      {children}
    </pre>
  ),

  code: ({ children, ...props }) => (
    <code
      className="bg-paper border border-rule text-ink rounded px-1.5 py-0.5 text-[0.86em] font-mono"
      {...props}
    >
      {children}
    </code>
  ),

  hr: () => <hr className="border-rule my-12" />,

  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-left text-[15px] border-t-2 border-ink" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      className="py-2.5 pr-4 border-b border-rule-strong font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-ink-faint whitespace-nowrap"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="py-3 pr-4 border-b border-rule text-ink-soft align-top" {...props}>
      {children}
    </td>
  ),
};
