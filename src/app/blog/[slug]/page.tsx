import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { createMetadata } from '@/lib/metadata';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
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

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    ...(post.image ? { image: post.image } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* Article header */}
      <section className="bg-paper pt-28 sm:pt-32 lg:pt-40 pb-10 lg:pb-14">
        <Container>
          <div className="max-w-[46rem] mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint hover:text-ink transition-colors mb-8"
            >
              <span aria-hidden>&larr;</span>
              Back to Blog
            </Link>

            <Eyebrow
              trail={<time dateTime={post.date}>{formatDate(post.date)}</time>}
              className="mb-6"
            >
              {categoryLabel}
            </Eyebrow>

            <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold text-ink font-jakarta tracking-[-0.035em] leading-[1.06] mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-ink-soft text-lg sm:text-xl leading-relaxed mb-8 text-pretty">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 border-t border-rule text-sm text-ink-faint">
              <span className="font-semibold text-ink">{post.author}</span>
              <span className="hidden sm:inline" aria-hidden>&middot;</span>
              <span className="hidden sm:inline">{post.authorRole}</span>
              <span aria-hidden>&middot;</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="bg-sheet border-y border-rule py-12 lg:py-20">
        <Container>
          <div className="max-w-[46rem] mx-auto">
            <article className="prose-quotie">
              <MDXRemote
                source={post.content}
                components={{ ...mdxComponents, Callout }}
              />
            </article>

            {/* Inline CTA */}
            <div className="mt-16 border-t-2 border-ink pt-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-jakarta tracking-[-0.03em] text-ink mb-3">
                Ready to <span className="mark-live">quote faster?</span>
              </h2>
              <p className="text-ink-soft mb-6 leading-relaxed max-w-xl">
                See how Quotie helps trades businesses build and send professional proposals in under 30 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ButtonLink href="/demo" variant="ink" size="lg">
                  Book a Demo
                </ButtonLink>
                <ButtonLink href="/features" variant="outline" size="lg">
                  See Features
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-paper py-16 lg:py-20">
          <Container>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
              Related Articles
            </h2>
            <div className="border-t-2 border-ink">
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
