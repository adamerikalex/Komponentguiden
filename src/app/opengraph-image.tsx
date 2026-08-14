import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Komponentguiden — industriell legotillverkning matchad på 48 timmar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// On-brand social share card (indigo/slate). Replaces the earlier generic teal
// gradient so link previews in LinkedIn/Slack match the site's identity.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#1e2633",
          backgroundImage:
            "radial-gradient(900px 500px at 78% -8%, rgba(99,91,255,0.34), rgba(30,38,51,0))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 88px",
        }}
      >
        {/* Wordmark row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "34px" }}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#635bff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "20px" }}
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <div style={{ color: "#ffffff", fontSize: "40px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            Komponentguiden
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "62px",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.08,
            maxWidth: "900px",
          }}
        >
          Industriell tillverkningsförmåga — helt utan friktion
        </div>

        {/* Accent + subline */}
        <div style={{ display: "flex", width: "72px", height: "5px", background: "#635bff", borderRadius: "3px", margin: "30px 0 22px" }} />
        <div style={{ color: "#94a3b8", fontSize: "27px", fontWeight: 500, maxWidth: "820px", lineHeight: 1.4 }}>
          5 validerade svenska legotillverkare inom 48 timmar. Kostnadsfritt för inköpare.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
