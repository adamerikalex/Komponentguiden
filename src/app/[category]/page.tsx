import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Zap, Scale, Lock, Network, ShieldCheck, Award, Clock, Search,
  FileCheck, MapPin, Layers, Cpu, Leaf,
} from "lucide-react";
import { categoryPages, getCategoryBySlug } from "content/categories";
import { FAQS } from "content/categories/faq";
import IntentForm from "@/components/IntentForm";

const ICONS = {
  Zap, Scale, Lock, Network, ShieldCheck, Award, Clock, Search,
  FileCheck, MapPin, Layers, Cpu, Leaf,
};

export function generateStaticParams() {
  return categoryPages.map((p) => ({ category: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const page = getCategoryBySlug(category);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const page = getCategoryBySlug(category);
  if (!page) notFound();
  const faq = FAQS[category];

  return (
    <>
      {/* Hero */}
      <section className="cat-hero">
        <div className="container">
          <div className="cat-hero-inner">
            <span className="metadata">{page.eyebrow}</span>
            <h1 className="cat-h1">{page.h1}</h1>
            <p className="cat-intro">{page.intro}</p>
            <a href="#intent-form" className="btn-primary">
              Starta kostnadsfri matchning →
            </a>
            <p className="cat-cta-sub">{page.ctaSubtext}</p>
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="cat-pain">
        <div className="container">
          <div className="cat-pain-inner">
            <h2>{page.painHeading}</h2>
            <p>{page.painBody}</p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="cat-valueprops">
        <div className="container">
          <h2 className="cat-section-heading">Så fungerar matchningen</h2>
          <div className="valueprops-grid">
            {page.valueProps.map((vp) => {
              const Icon = ICONS[vp.icon];
              return (
                <div key={vp.heading} className="valueprop-card">
                  <Icon size={24} className="valueprop-icon" />
                  <h3 className="valueprop-heading">{vp.heading}</h3>
                  <p className="valueprop-body">{vp.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="cat-steps">
        <div className="container">
          <h2 className="cat-section-heading">Tre steg till rätt leverantör</h2>
          <div className="steps-row">
            {page.steps.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-number">{i + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + FAQPage JSON-LD */}
      {faq && (
        <section className="cat-pain">
          <div className="container">
            <div className="cat-pain-inner">
              <h2>Vanliga frågor</h2>
              {faq.map((f) => (
                <div key={f.q} style={{ marginTop: "24px" }}>
                  <h3 style={{ fontSize: "17px", marginBottom: "8px" }}>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </section>
      )}

      {/* Form */}
      <IntentForm
        defaultMethod={page.preselectedMethod}
        defaultMaterial={page.preselectedMaterial}
        heading={page.ctaHeading}
      />
    </>
  );
}
