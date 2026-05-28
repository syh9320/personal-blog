import type { APIContext } from "astro";
import { siteConfig } from "@/config/site";

export function GET(context: APIContext) {
  const site = context.site?.toString() ?? siteConfig.url;

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${new URL("/sitemap-index.xml", site)}`,
      `RSS: ${new URL("/rss.xml", site)}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
