import Link from "next/link";
import { ArrowRight, Scale, Zap, Lock } from "lucide-react";
import ScrollyTelling from "@/components/ScrollyTelling";
import MetricsSection from "@/components/MetricsSection";
import IntentForm from "@/components/IntentForm";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <h1>
              Inköp av industriell tillverkningsförmåga, helt utan friktion.
            </h1>
            <p>
              Vi matchar ert behov mot vårt nätverk av industriell
              legotillverkning över hela Sverige. Vi har kartlagt tusentals
              svenska legotillverkare inom metall, plast och komposit. Vår
              bedömning täcker finansiell stabilitet, maskinpark, certifieringar
              och kapacitet. Allt ni behöver göra är att definiera krav, ladda
              upp ritning och få 5 validerade matchningar inom 48 timmar.
            </p>
            <a href="#intent-form" className="btn-primary">
              Starta matchning <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-image-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/part.png"
              alt="Mekanisk komponent"
              className="hero-img blend-img"
            />
          </div>
        </div>
      </section>

      <ScrollyTelling />

      <MetricsSection />

      <section className="security-section">
        <div className="container">
          <div className="blog-preview-header">
            <span className="metadata">Plattformen</span>
            <h2>Vårt löfte till er</h2>
          </div>
          <div className="security-grid">
            <div className="sec-card">
              <Scale size={28} className="icon" />
              <h3>Oberoende aktör</h3>
              <p>
                Vi är agnostiska och matchar enbart baserat på era krav och
                leverantörens faktiska förmåga.
              </p>
            </div>
            <div className="sec-card">
              <Zap size={28} className="icon" />
              <h3>Eliminerad admin</h3>
              <p>
                Vår databas och proprietära algoritm ersätter tidskrävande
                research och garanterar ett anpassat urval redo för er att
                utforska.
              </p>
            </div>
            <div className="sec-card">
              <Lock size={28} className="icon" />
              <h3>Säkerhet i fokus</h3>
              <p>
                Ritningar hanteras med sekretess, lagras krypterat och raderas
                enligt uppsatta tidsramar. Leverantörer måste godkänna NDA för
                att ta del av ritningsunderlag.
              </p>
            </div>
          </div>
        </div>
      </section>

      <IntentForm />

      <section className="blog-preview-section">
        <div className="container">
          <div className="blog-preview-header">
            <span className="metadata">Resurser</span>
            <h2>Senaste insikter</h2>
            <p>Guider och analyser för industriellt inköp i Sverige.</p>
          </div>
          <div className="blog-preview-grid">
            {recentPosts.map((post, i) => (
              <Link key={post.slug} href={`/blogg/${post.slug}`} className="blog-preview-card">
                <div className={`blog-card-thumb blog-grad-${i % 5}`} />
                <div className="blog-card-body">
                  <span className="blog-card-tag">{post.tags[0]}</span>
                  <div className="blog-card-title">{post.title}</div>
                  <p className="blog-card-desc">{post.description}</p>
                  <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "40px" }}>
            <Link href="/blogg" className="btn-primary">
              Se alla resurser <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
