import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/lib/queries";
import { serializeTool } from "@/lib/serializers";

export const runtime = "nodejs";
export const alt = "AI BirdView — tool review";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const raw = await getToolBySlug(params.slug);
  if (!raw) return new ImageResponse(<div />);
  const tool = serializeTool(raw);

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
          background: `linear-gradient(135deg, ${tool.swatch[0]} 0%, ${tool.swatch[1]} 100%)`,
          fontFamily: "ui-sans-serif, system-ui, -apple-system",
          color: "#0b0b0d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 22, fontWeight: 600 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, background: "#0b0b0d", color: "#8dc474",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
          }}>✦</div>
          <span style={{ color: "rgba(11,11,13,0.65)" }}>AI BirdView</span>
          <span style={{ color: "rgba(11,11,13,0.4)" }}>·</span>
          <span style={{ color: "rgba(11,11,13,0.65)" }}>{tool.category.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            fontSize: 76, lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.03em", maxWidth: 1060,
          }}>
            {tool.name}
          </div>
          <div style={{
            marginTop: 24, fontSize: 30, lineHeight: 1.25, color: "rgba(11,11,13,0.7)", maxWidth: 1060,
          }}>
            {tool.tagline}
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "14px",
          fontSize: 22, color: "rgba(11,11,13,0.7)", fontWeight: 600,
        }}>
          <span style={{
            padding: "8px 14px", background: "rgba(255,255,255,0.7)", borderRadius: 999, color: "#0b0b0d",
          }}>★ {tool.rating.toFixed(1)}</span>
          <span style={{
            padding: "8px 14px", background: "rgba(255,255,255,0.7)", borderRadius: 999, color: "#0b0b0d",
          }}>{tool.pricing}{tool.priceFrom ? ` · ${tool.priceFrom}` : ""}</span>
          <span style={{ marginLeft: "auto", color: "rgba(11,11,13,0.55)", fontWeight: 500 }}>
            aibirdview.com/tools/{tool.slug}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
