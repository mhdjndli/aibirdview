import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /api/media/ serves public images (logos, screenshots, blog thumbnails)
      { userAgent: "*", allow: ["/", "/api/media/"], disallow: ["/admin", "/api/"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
