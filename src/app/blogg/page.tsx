import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogg – Komponentguiden",
  description: "Guider och insikter för industriellt inköp i Sverige.",
};

export default function BloggPage() {
  const posts = getAllPosts();
  return (
    <div className="container">
      <div className="page-header">
        <span className="metadata">Resurser</span>
        <h1>Insikter för industriellt inköp</h1>
        <p>
          Guider och analyser för inköpare, konstruktörer och
          supply&nbsp;chain-ansvariga.
        </p>
      </div>
      <div className="blog-list">
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/blogg/${post.slug}`} className="blog-index-card">
            <div className={`blog-index-thumb blog-grad-${i % 5}`} />
            <div className="blog-index-body">
              <h2 className="blog-card-title" style={{ fontSize: "20px", marginBottom: "10px" }}>
                {post.title}
              </h2>
              <p className="blog-card-desc blog-card-desc--3">{post.description}</p>
              <div className="blog-index-footer">
                <div className="blog-tags">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="blog-tag-chip">{tag}</span>
                  ))}
                </div>
                <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
