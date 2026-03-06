import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/_next/"],
      },
    ],
    sitemap: "https://keifaldiafa.com/sitemap.xml",
    host: "https://keifaldiafa.com",
  };
}
