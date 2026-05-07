import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { createMetadata } from '@/lib/metadata';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import { mdxComponents, Callout } from '@/components/blog/MDXComponents';
import { CATEGORY_LABELS } from '@/lib/blogConstants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return createMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${slug}`,
      image: post.image,
      type: 'article',
      publishedTime: post.date,
    });
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <>
      {/* Article header — dark background */}
      <section
        className="relative pt-32 pb-12 overflow-hidden"
        style={{ background: '#08080c' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #1f61aa, transparent)' }}
          />
        </div>

        <Container className="relative z-10 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/20 text-brand-cyan border border-brand-blue/30">
              {categoryLabel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-jakarta)] tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-8">{post.description}</p>

          <div className="flex items-center gap-4 text-white/30 text-sm">
            <span className="font-medium text-white/50">{post.author}</span>
            <span>&middot;</span>
            <span>{post.authorRole}</span>
            <span>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </Container>
      </section>

      {/* Divider image area */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      {/* Article body — light background for readability */}
      <section className="bg-white py-12 lg:py-16">
        <Container className="max-w-3xl">
          <article className="prose-quotie">
            <MDXRemote
              source={post.content}
              components={{ ...mdxComponents, Callout }}
            />
          </article>

          {/* Inline CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan p-8 text-white text-center">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] mb-3">
              Ready to quote faster?
            </h2>
            <p className="text-white/80 mb-6 text-base">
              See how Quotie helps trades businesses build and send professional proposals in under 30 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/demo"
                className="inline-block px-6 py-3 rounded-xl bg-white text-brand-blue font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Book a Demo
              </Link>
              <Link
                href="/features"
                className="inline-block px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                See Features
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ background: '#08080c' }} className="py-16">
          <Container>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-jakarta)] mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
