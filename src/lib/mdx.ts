import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      author: data.author ?? '',
      authorRole: data.authorRole ?? '',
      category: data.category ?? '',
      tags: data.tags ?? [],
      image: data.image,
      featured: data.featured ?? false,
      readingTime: calculateReadingTime(content),
    } as PostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? '',
    authorRole: data.authorRole ?? '',
    category: data.category ?? '',
    tags: data.tags ?? [],
    image: data.image,
    featured: data.featured ?? false,
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const cats = Array.from(new Set(posts.map((p) => p.category)));
  return cats.filter(Boolean);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
