import { ImageResponse } from "next/og";

// Default share image for pages without their own (home, /tools, categories,
// the blog index). Tool pages and posts have their own opengraph-image.
export const alt = "AI BirdView: a human-reviewed directory of AI tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #c8e6a8 0%, #8dc474 100%)",
          fontFamily: "ui-sans-serif, system-ui, -apple-system",
          color: "#0b0b0d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 26, fontWeight: 600 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 12, background: "#0b0b0d", color: "#8dc474",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
            }}
          >
            ✦
          </div>
          <span>AI BirdView</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.03em", maxWidth: 1000 }}>
            Find the AI tool that actually works.
          </div>
          <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.3, color: "rgba(11,11,13,0.7)", maxWidth: 1000 }}>
            A human-reviewed directory with pricing, pros and cons, and alternatives for every tool.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(11,11,13,0.6)", fontWeight: 500 }}>aibirdview.com</div>
      </div>
    ),
    { ...size }
  );
}
