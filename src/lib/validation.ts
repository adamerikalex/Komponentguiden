// Client-side validation for the IntentForm identity core (demand-funnel v0).
// See docs/demand-funnel-spec.md. Register lookup (org existence + SNI autofill)
// is a later, server-side step; here we do free, offline checks only.

/**
 * Normalise a Swedish organisationsnummer to 10 digits.
 * Accepts hyphens/spaces and an optional 2-digit century prefix (16…).
 * Returns null if it isn't 10 digits after normalising.
 */
export function normalizeOrgNr(raw: string): string | null {
  const digits = (raw || "").replace(/\D/g, "");
  const ten =
    digits.length === 12 && digits.startsWith("16") ? digits.slice(2) : digits;
  return ten.length === 10 ? ten : null;
}

/** Luhn (mod-10) check over the 10-digit org.nr, last digit = check digit. */
export function isValidOrgNr(raw: string): boolean {
  const ten = normalizeOrgNr(raw);
  if (!ten) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let d = ten.charCodeAt(i) - 48;
    if (d < 0 || d > 9) return false;
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/** Consumer / free-mail domains — a work email is the strongest "real B2B" signal. */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "hotmail.com", "hotmail.se", "hotmail.co.uk",
  "outlook.com", "outlook.se", "live.com", "live.se", "yahoo.com", "yahoo.se",
  "icloud.com", "me.com", "mac.com", "msn.com", "aol.com", "protonmail.com",
  "proton.me", "gmx.com", "gmx.se", "yandex.com", "telia.com", "comhem.se",
  "bredband.net", "spray.se", "tele2.se",
]);

export function emailDomain(email: string): string | null {
  const m = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/.exec((email || "").trim().toLowerCase());
  return m ? m[1] : null;
}

export function isValidEmail(email: string): boolean {
  return emailDomain(email) !== null;
}

/** True for a plausible company-domain email; false for free-mail / invalid. */
export function isCompanyEmail(email: string): boolean {
  const d = emailDomain(email);
  return !!d && !FREE_EMAIL_DOMAINS.has(d);
}
