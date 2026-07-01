"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="main-nav">
      <div className="container nav-container">
        <Link href="/" className="logo" onClick={close}>
          <Layers size={22} className="logo-icon" />
          Komponentguiden
        </Link>
        <button
          className="nav-hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-links${open ? " nav-links--open" : ""}`}>
          <Link href="/" className={pathname === "/" ? "active" : ""} onClick={close}>Start</Link>
          <Link href="/concierge" className={pathname === "/concierge" ? "active" : ""} onClick={close}>Concierge</Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""} onClick={close}>Om oss</Link>
          <Link href="/blogg" className={pathname.startsWith("/blogg") ? "active" : ""} onClick={close}>Blogg</Link>
          <Link href="/akut" className={`akut-pill${pathname === "/akut" ? " akut-pill--active" : ""}`} onClick={close}>Akut behov</Link>
        </div>
      </div>
    </nav>
  );
}
