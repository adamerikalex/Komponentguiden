// Minimal Resend client via fetch — no SDK dependency (deploys stay lean, and it
// runs in both route handlers and server actions). Every send is BEST-EFFORT: a
// failure never throws into the caller, because email must never break intent
// capture or proposal creation. When RESEND_API_KEY / RESEND_FROM are unset the
// send is skipped cleanly, so the app works identically before Resend is wired.

export type SendResult = { ok: boolean; skipped?: boolean; error?: string; id?: string };

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return { ok: false, skipped: true };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${text}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// Escape user-supplied strings before interpolating into email HTML.
export function esc(s: string | null | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Shared branded wrapper so both emails look consistent. Inline styles only —
// email clients ignore <style>/external CSS. Brand colors mirror globals.css.
export function wrapEmail(innerHtml: string): string {
  return `<!doctype html>
<html lang="sv"><body style="margin:0;padding:0;background:#f4f6f9;">
  <div style="max-width:560px;margin:0 auto;padding:28px 20px;font-family:Helvetica,Arial,sans-serif;color:#1e2633;">
    <div style="font-size:15px;font-weight:700;letter-spacing:-0.01em;color:#1e2633;margin-bottom:18px;">
      Komponentguiden
    </div>
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px 22px;">
      ${innerHtml}
    </div>
    <p style="font-size:12px;color:#64748b;margin:16px 2px 0;line-height:1.5;">
      Komponentguiden — matchning mellan köpare och svenska legotillverkare.
    </p>
  </div>
</body></html>`;
}

// A styled call-to-action button (table-based for email-client compatibility).
export function emailButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0 4px;">
    <tr><td style="border-radius:8px;background:#635bff;">
      <a href="${href}" style="display:inline-block;padding:11px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">${label}</a>
    </td></tr>
  </table>`;
}
