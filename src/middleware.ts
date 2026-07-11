import { NextRequest, NextResponse } from "next/server";

// Basic-Auth gate for /admin. Single-owner internal dashboard — fail closed:
// if ADMIN_USER / ADMIN_PASSWORD aren't set, everything is denied.
// Upgrade to Supabase Auth + per-user RLS when there's more than one admin.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  const header = req.headers.get("authorization");

  if (user && pass && header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      const u = decoded.slice(0, sep);
      const p = decoded.slice(sep + 1);
      if (u === user && p === pass) return NextResponse.next();
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Autentisering krävs.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Komponentguiden Admin"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
