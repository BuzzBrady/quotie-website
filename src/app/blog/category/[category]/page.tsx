import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getPostsByCategory } from '@/lib/mdx';
import { createMetadata } from '@/lib/metadata';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import { ALL_CATEGORIES, CATEGORY_LABELS } from '@/lib/blogConstants';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return {};

  return createMetadata({
    title: `${label} — Quotie Blog`,
    description: `Articles and guides on ${label.toLowerCase()} for trades businesses.`,
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: '#08080c' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #1f61aa, transparent)' }}
          />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-6"
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
              All Posts
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-cyan px-4 py-1.5 text-sm font-semibold mb-6">
              {label}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-[family-name:var(--font-jakarta)] mb-4">
              {label}
            </h1>
            <p className="text-white/40">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </Container>
      </section>

      {/* Category filter */}
      <div style={{ background: '#08080c' }} className="border-b border-white/[0.06] sticky top-[64px] z-20">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
            <Link
              href="/blog"
              className="flex-none px-4 py-1.5 rounded-full text-sm font-medium text-white/50 border border-white/[0.08] hover:text-white hover:border-white/20 transition-all"
            >
              All
            </Link>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  cat.slug === category
                    ? 'bg-white/10 text-white border-white/20'
                    : 'text-white/50 border-white/[0.08] hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Posts */}
      <section style={{ background: '#08080c' }} className="py-16 min-h-[50vh]">
        <Container>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-white/30 mb-4">No posts in this category yet.</p>
              <Link href="/blog" className="text-brand-cyan text-sm hover:underline">
                View all posts
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
