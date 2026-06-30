"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="main-nav">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <Layers size={22} className="logo-icon" />
          Komponentguiden
        </Link>
        <div className="nav-links">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Start
          </Link>
          <Link
            href="/concierge"
            className={pathname === "/concierge" ? "active" : ""}
          >
            Concierge
          </Link>
          <Link
            href="/about"
            className={pathname === "/about" ? "active" : ""}
          >
            Om oss
          </Link>
          <Link
            href="/strategy"
            className={pathname === "/strategy" ? "active" : ""}
          >
            Vår strategi
          </Link>
          <Link
            href="/blogg"
            className={pathname.startsWith("/blogg") ? "active" : ""}
          >
            Blogg
          </Link>
          <Link
            href="/akut"
            className={`akut-pill${pathname === "/akut" ? " akut-pill--active" : ""}`}
          >
            Akut behov
          </Link>
        </div>
      </div>
    </nav>
  );
}
