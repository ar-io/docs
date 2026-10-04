import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

// Required for `output: "export"`: emit sitemap.xml at build time.
export const dynamic = "force-static";

const SITE = "https://docs.ar.io";

// Lists every page the content loader knows about, including the generated
// API reference pages, because the export publishes each of them as a page.
export default function sitemap(): MetadataRoute.Sitemap {
  // The production export uses trailingSlash: true, so URLs end in "/".
  const urls = source
    .getPages()
    .map((page) => `${SITE}${page.url.endsWith("/") ? page.url : `${page.url}/`}`);

  // The root page is added in generateStaticParams, not by the content loader.
  return [`${SITE}/`, ...urls].map((url) => ({ url }));
}
