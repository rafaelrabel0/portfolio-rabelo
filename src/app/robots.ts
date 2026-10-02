import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // API não é página: fora do índice.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://rabelo.company/sitemap.xml",
  };
}
