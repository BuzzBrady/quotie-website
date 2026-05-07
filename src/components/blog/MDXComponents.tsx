import type { MDXComponents as MDXComponentsType } from 'mdx/types';

type CalloutType = 'info' | 'warning' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const calloutStyles: Record<CalloutType, { border: string; bg: string; label: string; labelColor: string }> = {
  info: {
    border: 'border-brand-blue/40',
    bg: 'bg-brand-blue/10',
    label: 'Info',
    labelColor: 'text-brand-cyan',
  },
  warning: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    label: 'Warning',
    labelColor: 'text-amber-400',
  },
  tip: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/10',
    label: 'Tip',
    labelColor: 'text-emerald-400',
  },
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = calloutStyles[type];
  return (
    <div className={`my-6 rounded-xl border ${styles.border} ${styles.bg} p-5`}>
      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${styles.labelColor}`}>
        {styles.label}
      </p>
      <div className="text-slate-700 text-sm leading-relaxed [&>p]:mb-0">{children}</div>
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
        className="text-2xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)] mt-10 mb-4 tracking-tight scroll-mt-24"
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
        className="text-xl font-bold text-slate-800 font-[family-name:var(--font-jakarta)] mt-8 mb-3 tracking-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },

  p: ({ children, ...props }) => (
    <p className="text-slate-600 leading-[1.8] mb-5 text-[1.05rem]" {...props}>
      {children}
    </p>
  ),

  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-slate-900" {...props}>
      {children}
    </strong>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-brand-blue underline underline-offset-2 hover:text-brand-cyan transition-colors"
      {...props}
    >
      {children}
    </a>
  ),

  ul: ({ children, ...props }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-slate-600" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-slate-600" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="leading-relaxed text-[1.02rem]" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-brand-blue/40 pl-5 py-1 my-6 bg-slate-50 rounded-r-lg italic text-slate-500"
      {...props}
    >
      {children}
    </blockquote>
  ),

  pre: ({ children, ...props }) => (
    <pre
      className="bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto my-6 text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),

  code: ({ children, ...props }) => (
    <code
      className="bg-slate-100 text-brand-blue rounded px-1.5 py-0.5 text-[0.88em] font-mono"
      {...props}
    >
      {children}
    </code>
  ),

  hr: () => <hr className="border-slate-200 my-10" />,
};
