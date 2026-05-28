import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { siteConfig } from "@/config/site";
import { getPostHref, getPublishedPosts } from "@/lib/content";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getPostHref(post),
      categories: post.data.tags,
    })),
  });
}
