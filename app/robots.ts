import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/"],
      },
      {
        userAgent: ["Applebot", "Bingbot", "googlebot"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_URI}/sitemap.xml`,
  }
}
