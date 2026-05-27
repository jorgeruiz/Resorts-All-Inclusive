import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/gracias/"],
    },
    sitemap: "https://resorts-allinclusive.com/sitemap.xml",
  };
}
