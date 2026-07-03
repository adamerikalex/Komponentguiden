import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Komponentguiden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #008b8b 0%, #22d3ee 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Layers icon */}
        <svg
          width="96"
          height="96"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1e2633"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: "28px" }}
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            color: "#1e2633",
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-1px",
            display: "flex",
          }}
        >
          Komponentguiden
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
