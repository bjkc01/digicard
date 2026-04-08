import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteConfig.url,
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
