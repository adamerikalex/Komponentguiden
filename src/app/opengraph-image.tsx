import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Komponentguiden — Inköp av industriell tillverkningsförmåga, helt utan friktion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#1e2633",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
        }}
      >
        {/* Gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "6px",
            background: "linear-gradient(to right, #635bff, #008b8b)",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: "#008b8b",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: "40px",
            marginBottom: "48px",
            display: "flex",
          }}
        >
          INDUSTRIELL SOURCING
        </div>

        {/* Name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "80px",
            fontWeight: 800,
            lineHeight: "1",
            marginBottom: "32px",
            display: "flex",
          }}
        >
          Komponentguiden
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#94a3b8",
            fontSize: "28px",
            lineHeight: "1.4",
            maxWidth: "820px",
            display: "flex",
            flex: 1,
          }}
        >
          Inköp av industriell tillverkningsförmåga, helt utan friktion
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#475569", fontSize: "18px", display: "flex" }}>
            komponentguiden.se
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#635bff",
                marginRight: "10px",
                display: "flex",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#008b8b",
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
