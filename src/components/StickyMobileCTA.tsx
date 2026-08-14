"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Mobile-only CTA pinned to the bottom of the viewport. Appears once the user
// has scrolled past the hero, so the primary "Starta matchning" action is always
// reachable on a phone (the hero CTA scrolls away, and ScrollyTelling renders
// nothing on mobile). Links to the local form when the page has one, otherwise
// to the homepage form.
export default function StickyMobileCTA() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [href, setHref] = useState("/#intent-form");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-check the form target after each navigation (layout persists across routes).
  useEffect(() => {
    const t = setTimeout(() => {
      setHref(document.getElementById("intent-form") ? "#intent-form" : "/#intent-form");
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!isMobile || !scrolled) return null;

  const style: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
    background: "rgba(255,255,255,0.94)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderTop: "1px solid var(--border, #e2e8f0)",
    boxShadow: "0 -2px 14px rgba(0,0,0,0.07)",
  };
  const btnStyle: React.CSSProperties = {
    display: "block",
    textAlign: "center",
    width: "100%",
    padding: "14px",
    fontSize: "16px",
  };

  return (
    <div style={style}>
      {href.startsWith("/") ? (
        <Link href={href} className="btn-primary" style={btnStyle}>
          Starta matchning →
        </Link>
      ) : (
        <a href={href} className="btn-primary" style={btnStyle}>
          Starta matchning →
        </a>
      )}
    </div>
  );
}
