Status: ready-for-agent

# Personal Blog PRD

## Problem Statement

The user wants to build and maintain a long-term personal blog that is visually polished, pleasant to read, and accessible to other people through cloud deployment. The blog should support a Markdown/MDX writing workflow, have a Mizuki-inspired visual style, and remain easy to evolve over time without being locked into a heavyweight theme or CMS.

The first release should prioritize a stable publishing loop, strong reading experience, and clean architecture over advanced backend features. Comments, analytics, and domestic China deployment optimizations should be designed as future-friendly extension points rather than mandatory first-release infrastructure.

## Solution

Build a custom Astro-based personal blog using MDX, Content Collections, Tailwind CSS, and static-first deployment. The visual direction should be inspired by Mizuki: refined card layouts, Material Design 3 influence, soft colors, light/dark themes, responsive structure, and a personal-site feeling. The implementation should not fork or directly depend on the Mizuki theme.

The blog will use local Markdown/MDX files managed in Git. It will include a personal homepage, full blog index, article detail pages, tags, archive, projects page, RSS, sitemap, SEO metadata, static search, polished code blocks, and reserved extension points for comments and analytics.

Deployment should first target a simple static hosting provider such as Cloudflare Pages or Vercel. Because the primary readership may be in mainland China, the architecture should remain portable so the static output can later move to domestic object storage, CDN, or server hosting after ICP filing if needed.

## User Stories

1. As the blog owner, I want to write posts in Markdown/MDX, so that publishing stays simple and version-controlled.
2. As the blog owner, I want post metadata to be validated, so that broken or incomplete posts are caught before deployment.
3. As the blog owner, I want project entries to be structured content, so that I can maintain my portfolio without editing layout code.
4. As the blog owner, I want a polished personal homepage, so that visitors quickly understand who I am and what I write about.
5. As the blog owner, I want featured posts on the homepage, so that I can highlight important writing.
6. As the blog owner, I want recent posts on the homepage, so that visitors can quickly find new content.
7. As the blog owner, I want featured projects on the homepage, so that the site also works as a personal portfolio.
8. As a visitor, I want a full blog index, so that I can browse all articles.
9. As a visitor, I want article pages with strong typography, so that reading is comfortable on desktop and mobile.
10. As a visitor, I want article pages to show publication dates, updated dates, tags, and descriptions, so that I understand the context of each post.
11. As a visitor, I want tags, so that I can discover related posts by topic.
12. As a visitor, I want an archive page, so that I can browse posts chronologically.
13. As a visitor, I want static search, so that I can find content once the blog grows.
14. As a visitor, I want a light theme, dark theme, and system preference mode, so that the site is comfortable in different environments.
15. As a visitor, I want polished code blocks with syntax highlighting and copy actions, so that technical posts are easy to use.
16. As a mobile visitor, I want layouts to adapt cleanly, so that the site feels native on small screens.
17. As a desktop visitor, I want a lightweight sidebar, so that profile, tags, recent posts, or table of contents are available without distracting from reading.
18. As an RSS reader user, I want an RSS feed, so that I can subscribe to the blog.
19. As a search engine crawler, I want sitemap and robots metadata, so that the site can be indexed correctly.
20. As someone sharing a post, I want Open Graph metadata, so that links look good in social previews.
21. As the blog owner, I want comments to be reserved as a replaceable component, so that I can later choose Giscus, Twikoo, or Waline without rewriting article layouts.
22. As the blog owner, I want analytics to be reserved as a configurable integration, so that I can add Cloudflare Web Analytics, Umami, Plausible, or Google Analytics later.
23. As the blog owner, I want image assets to be simple in the first release, so that covers and small images can live in the repo while large media can move to object storage later.
24. As the blog owner, I want the site to be static-first and portable, so that deployment can move from international platforms to domestic cloud infrastructure later if needed.

## Implementation Decisions

- Build a custom Astro project rather than forking Mizuki.
- Use MDX and Astro Content Collections for posts.
- Use a separate structured collection for projects.
- Use Tailwind CSS with design tokens based on CSS variables.
- Use a Mizuki-inspired visual direction: refined cards, soft surfaces, Material Design 3 influence, subtle elevation, responsive layout, and careful dark mode.
- Keep the first release Chinese-only with `zh-CN` language metadata.
- Use tags only in the first release. Do not add categories.
- Use a lightweight sidebar on desktop and a simplified content flow on mobile.
- Make the homepage a personal landing page with hero, featured posts, recent posts, featured projects, and topic tags.
- Put the complete article list at `/blog`.
- Include `/tags`, `/tags/[tag]`, `/archive`, `/projects`, and article detail routes.
- Use Pagefind for static search. Do not add backend search.
- Use Shiki or Astro-compatible syntax highlighting for code blocks with light/dark theme support.
- Include code block affordances such as filenames, copy buttons, optional line numbers, highlighted lines, and horizontal scrolling.
- Implement comments as a disabled-by-default extension point with provider options for Giscus, Twikoo, and Waline.
- Implement analytics as a disabled-by-default extension point with provider options for Cloudflare, Umami, Plausible, and Google Analytics.
- Store small images locally in the repo for the first release. Reserve object storage for future large media.
- Include foundational SEO, RSS, sitemap, robots, canonical URLs, Open Graph metadata, and Twitter Card metadata.
- Target Cloudflare Pages or Vercel for first deployment while preserving portability for later domestic cloud deployment.

## Testing Decisions

- Tests should verify externally observable behavior, generated output, content validation, and build health rather than private implementation details.
- The minimum release gate is that the site installs, runs locally, and builds successfully.
- Content schema validation should fail clearly when required frontmatter fields are missing or invalid.
- Generated pages should exist for the homepage, blog index, article pages, tags, archive, projects, RSS, sitemap, and robots.
- Theme behavior should be verified at least manually across light, dark, and system modes.
- Responsive layout should be verified on desktop and mobile viewports.
- Search should be verified after production build because Pagefind indexes generated static output.
- Code block rendering should be checked in both light and dark themes.

## Out of Scope

- A visual CMS or custom writing backend.
- User accounts or authentication.
- A custom comment backend.
- Immediate Giscus, Twikoo, or Waline integration.
- Immediate analytics provider integration.
- Multi-language routing.
- Categories.
- Newsletter, membership, or paid subscription features.
- Domestic ICP filing and production deployment to mainland China infrastructure.
- Heavy animation systems or complex interactive article demos.
- Large media hosting, video hosting, or object storage integration.

## Further Notes

The first release should favor a beautiful, reliable publishing workflow over platform complexity. The system should make future upgrades easy: comments, analytics, search refinements, domestic deployment, object storage, and multilingual content should all be possible without invalidating the core Astro + MDX content model.
