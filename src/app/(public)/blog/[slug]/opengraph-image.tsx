import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/queries";

export const runtime = "nodejs";
export const alt = "AI BirdView blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return new ImageResponse(<div />);

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
          background:
            "linear-gradient(135deg, #fbfbfd 0%, #f5f5f7 60%, #e3f3d3 100%)",
          fontFamily: "ui-sans-serif, system-ui, -apple-system",
          color: "#0b0b0d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 22, fontWeight: 600 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, background: "#8dc474", color: "#0b0b0d",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
          }}>✦</div>
          <span>AI BirdView</span>
          <span style={{ color: "rgba(11,11,13,0.4)" }}>·</span>
          <span style={{ color: "rgba(11,11,13,0.55)" }}>Blog</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            fontSize: 64, lineHeight: 1.07, fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 1060,
          }}>
            {post.title}
          </div>
          <div style={{
            marginTop: 22, fontSize: 26, lineHeight: 1.35, color: "rgba(11,11,13,0.65)", maxWidth: 1060,
          }}>
            {post.excerpt}
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "14px",
          fontSize: 20, color: "rgba(11,11,13,0.55)", fontWeight: 500,
        }}>
          <span>{post.readingMinutes} min read</span>
          <span>·</span>
          <span>aibirdview.com/blog/{post.slug}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
