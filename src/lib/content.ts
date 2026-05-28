import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;
export type Project = CollectionEntry<"projects">;

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getPostSlug(post: BlogPost) {
  return post.id.replace(/\.(md|mdx)$/i, "");
}

export function getPostHref(post: BlogPost) {
  return `/blog/${getPostSlug(post)}/`;
}

export async function getFeaturedPosts() {
  const posts = await getPublishedPosts();

  return posts.filter((post) => post.data.featured);
}

export async function getProjects() {
  const projects = await getCollection("projects");

  return projects.sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
}

export async function getFeaturedProjects() {
  const projects = await getProjects();

  return projects.filter((project) => project.data.featured);
}

export async function getAllTags() {
  const posts = await getPublishedPosts();
  const tagSet = new Set(posts.flatMap((post) => post.data.tags));

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export async function getPostsByTag(tag: string) {
  const posts = await getPublishedPosts();

  return posts.filter((post) => post.data.tags.includes(tag));
}
