import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    startDate: z.date(),
    status: z.enum(["active", "paused", "completed", "archived"]).default("active"),
    tags: z.array(z.string().min(1)).default([]),
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  projects,
};
