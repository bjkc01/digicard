import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site-config";

const publicRoutes = ["/", "/login"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    lastModified,
    url: getAbsoluteUrl(route),
  }));
}
