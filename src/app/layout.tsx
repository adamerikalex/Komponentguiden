import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  title: "Komponentguiden – Inköp av industriell tillverkningsförmåga, helt utan friktion",
  description:
    "Vi matchar ert behov mot vårt nätverk av industriell legotillverkning över hela Sverige. Få 5 validerade matchningar inom 48 timmar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>
        {/* Organization JSON-LD — establishes the company as an entity for
            Google/AI-search. Add org.nr (identifier) + logo once public. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Komponentguiden",
              url: SITE_URL,
              description:
                "B2B-matchning för industriell legotillverkning i Sverige. Köpare beskriver sitt behov och matchas mot validerade svenska legotillverkare inom 48 timmar.",
              areaServed: { "@type": "Country", name: "Sverige" },
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@komponentguiden.se",
                contactType: "customer support",
                availableLanguage: ["Swedish", "English"],
              },
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
