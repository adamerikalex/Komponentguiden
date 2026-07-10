import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} – Komponentguiden`,
    description: post.description,
  };
}

export default async function BloggPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const postUrl = `${SITE_URL}/blogg/${post.slug}`;

  return (
    <div className="post-layout">
      {/* BlogPosting JSON-LD — makes the article citable by Google/AI-search. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            keywords: post.tags.join(", "),
            inLanguage: "sv-SE",
            author: post.author
              ? { "@type": "Person", name: post.author }
              : { "@type": "Organization", name: "Komponentguiden", url: SITE_URL },
            publisher: { "@type": "Organization", name: "Komponentguiden", url: SITE_URL },
            mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
            url: postUrl,
          }),
        }}
      />
      <Link href="/blogg" className="back-link">
        ← Tillbaka till resurser
      </Link>
      <article>
        <span className="metadata">{post.tags.join(" · ")}</span>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">Av {post.author ?? "Komponentguiden"} · {formatDate(post.publishedAt)}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <div className="post-cta">
        <h2>Behöver ni hitta legotillverkare?</h2>
        <p>Starta en kostnadsfri matchning inom 48 timmar.</p>
        <Link href="/#intent-form" className="btn-primary">
          Starta matchning →
        </Link>
      </div>
    </div>
  );
}
