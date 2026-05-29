Status: done

# Blog Deployment PRD

## Problem Statement

OshinoAoko has built a functional personal blog locally (Astro + MDX + Tailwind CSS, Mizuki-inspired). Site identity, personal branding, and first article are configured. However, the code only exists on a local `main` branch with no remote repository. The blog cannot be accessed by anyone else.

The user needs to get the blog publicly deployed so that visitors can browse articles, projects, search content, and subscribe via RSS.

## Solution

Push the local repository to GitHub, connect it to Cloudflare Pages for automatic static deployment. Use a Cloudflare Pages preview domain (`*.pages.dev`) for the first release. Set `PUBLIC_SITE_URL` to the actual deployment URL so that canonical URLs, RSS links, sitemaps, and Open Graph metadata resolve correctly. Verify the deployed site passes all public route and SEO checks.

The deployment pipeline should have automated validation: `npm run build` already includes `astro check` (type-checking) and Pagefind index generation. A `scripts/verify-deploy.mjs` script validates the `dist/` output. A new CI step in Cloudflare Pages (or a pre-push hook) should gate deployment on these checks.

## User Stories

1. As the blog owner, I want to push my code to GitHub, so that it is backed up and version-controlled remotely.
2. As the blog owner, I want Cloudflare Pages to automatically build and deploy on every push to `main`, so that publishing a new article is as simple as pushing a commit.
3. As the blog owner, I want `PUBLIC_SITE_URL` to reflect the actual deployment URL, so that canonical URLs, RSS links, sitemap entries, and social metadata all point to the right place.
4. As the blog owner, I want the build to fail fast if TypeScript errors or content schema violations exist, so that broken content never reaches production.
5. As the blog owner, I want to verify that `dist/` output contains all required files (index.html, blog, projects, search, RSS, sitemap, robots.txt, Pagefind index, _headers), so that I can trust the deployment before it goes live.
6. As the blog owner, I want to verify that generated URLs in canonical links, RSS, sitemap, and robots.txt use the correct `PUBLIC_SITE_URL`, so that I catch misconfiguration before visitors see broken links.
7. As the blog owner, I want the deployment verification script to fail loudly when `PUBLIC_SITE_URL` is still a placeholder (e.g., `example.com`), so that I don't accidentally deploy with wrong metadata.
8. As a visitor, I want the homepage to load and show the blog owner's identity, so that I immediately know who runs this blog.
9. As a visitor, I want to browse the blog index at `/blog/`, so that I can see all published articles.
10. As a visitor, I want to read an article detail page with proper typography and code blocks, so that reading is comfortable.
11. As a visitor, I want to browse projects at `/projects/`, so that I can see the owner's portfolio.
12. As a visitor, I want to search content at `/search/`, so that I can find articles by keyword.
13. As a visitor, I want to browse articles by tag, so that I can discover related content.
14. As a visitor, I want to browse articles chronologically via `/archive/`, so that I can explore older posts.
15. As a visitor, I want an RSS feed at `/rss.xml`, so that I can subscribe to new articles.
16. As a visitor, I want a sitemap at `/sitemap-index.xml`, so that search engines can index the site correctly.
17. As a visitor, I want `robots.txt` to point at the sitemap, so that crawlers know where to look.
18. As a visitor, I want the site to work in light mode, dark mode, and system-preference mode, so that it is comfortable in any environment.
19. As a visitor on mobile, I want the layout to be readable without horizontal scrolling, so that the site feels native on phones.
20. As the blog owner, I want the theme toggle to persist across page navigations and sessions, so that visitors don't have to set preferences repeatedly.
21. As the blog owner, I want code blocks to have a copy button, so that technical readers can easily copy snippets.
22. As the blog owner, I want code blocks to have syntax highlighting in both light and dark themes, so that code is readable regardless of theme.
23. As the blog owner, I want the homepage to show the hero section, featured posts, recent posts, and featured projects, so that first-time visitors get a complete overview.
24. As the blog owner, I want draft articles (`draft: true`) excluded from public lists and RSS, so that private writing stays private.
25. As the blog owner, I want Open Graph and Twitter Card metadata on every page, so that shared links look good in social previews.

## Implementation Decisions

### Site Configuration Changes

Site identity values updated to reflect the owner: site name changed to "OA", author name "OshinoAoko", bio updated, GitHub link pointed to `https://github.com/syh9320`. These are data-only changes within the existing `siteConfig` interface.

### First Blog Article

The `hello-astro.mdx` article was rewritten in a personal narrative tone, describing the blog-building journey from tool selection (why Astro over Hugo) to deployment architecture. This replaces the original placeholder/test content.

### Deployment Platform

Cloudflare Pages selected as the deployment target. Reasons: free tier sufficient for static sites, automatic GitHub integration, Pagefind static search requires no backend, and the user already has a Cloudflare account.

### PUBLIC_SITE_URL Handling

Because the Cloudflare Pages preview domain is not known until after first deployment, a two-step process is required: (1) deploy once with a best-guess `PUBLIC_SITE_URL`, (2) retrieve the assigned `*.pages.dev` URL, (3) update the environment variable in Cloudflare Pages dashboard and redeploy.

### Deployment Verification

The existing `scripts/verify-deploy.mjs` script checks:
- `PUBLIC_SITE_URL` is a valid HTTPS URL and not a placeholder
- `dist/` directory exists
- All required static files exist (index.html, blog, projects, search, RSS, sitemap, robots.txt, _headers, Pagefind files)
- Canonical URLs, RSS links, sitemap entries, and robots.txt references all use the correct `PUBLIC_SITE_URL`

This script is run via `npm run verify:deploy` and exits with code 1 on any failure, making it suitable as a CI gate.

### Build Command

The `npm run build` command in `package.json` runs three sequential steps: (1) `astro check` for TypeScript and content schema validation, (2) `astro build` for static HTML generation, (3) `pagefind --site dist` for search index generation. If any step fails, the build fails. This is the command Cloudflare Pages will use.

### Comment and Analytics Systems

Both remain disabled by default (`comments.enabled: false`, `analytics.enabled: false`). Provider slots (Giscus, Twikoo, Waline for comments; Cloudflare, Umami, Plausible, Google Analytics for analytics) are reserved but not configured. No deployment-time work is needed.

### Draft Content Handling

Draft articles are validated by the content schema but filtered out of public lists by `getPublishedPosts()` (which checks `!data.draft`). The deployment pipeline does not need special handling for drafts beyond what already exists.

## Testing Decisions

### What Makes a Good Test

Tests should verify externally observable behavior of the deployment pipeline:
- Build succeeds (exit code 0) when all content is valid
- Build fails when content schema violations exist
- `dist/` directory contains all required static files
- Generated HTML, RSS, sitemap, and robots.txt contain the correct `PUBLIC_SITE_URL`
- Placeholder URLs cause verification failure

Tests should not inspect internal implementation details (individual component rendering, internal function returns, etc.).

### Deployment Verification Script

The existing `scripts/verify-deploy.mjs` serves as the primary deployment test. It is a Node script that:
- Validates environment variables
- Checks file existence in `dist/`
- Parses generated output to verify URL correctness

This script should be run as part of every deployment gate.

### Additional Pipeline Tests

A new test module should be added to verify the build pipeline itself:
- **Build success test**: Run `npm run build` with a valid `PUBLIC_SITE_URL` and assert exit code 0
- **Schema validation test**: Temporarily insert an invalid blog post (missing required frontmatter) and assert `astro check` exits non-zero
- **Verification script test**: Run `npm run verify:deploy` after a successful build and assert exit code 0; run it with a placeholder URL and assert exit code 1

These tests can be implemented as a new script (e.g., `scripts/test-pipeline.mjs`) or integrated into CI.

### Prior Art

The only test-like artifact in the codebase is `scripts/verify-deploy.mjs`, which follows a simple check/pass/fail pattern. New pipeline tests should follow the same conventions: simple assertions with clear failure messages, exit code 1 on failure.

## Out of Scope

- Custom domain binding (DNS configuration, SSL setup)
- Mizuki visual enhancements: article banner images, page animations, otaku-style decorative illustrations
- Enabling comments (Giscus/Twikoo/Waline configuration)
- Enabling analytics (Cloudflare/Umami/Plausible/Google Analytics configuration)
- Mainland China deployment track (ICP filing, domestic CDN, object storage)
- Multi-language content
- Avatar replacement (user will provide their own image later)
- Additional blog content beyond the first article
- CI/CD beyond Cloudflare Pages' built-in Git integration (no GitHub Actions workflows)

## Further Notes

The deployment uses Cloudflare Pages' built-in Git integration rather than a separate GitHub Actions workflow. This keeps the setup minimal. If more complex CI needs arise later (e.g., running `verify:deploy` as a pre-deploy gate in Cloudflare Pages), a `_headers` or build hook can be configured.

Once the custom domain is purchased and DNS is configured, the only change needed is updating `PUBLIC_SITE_URL` in Cloudflare Pages' environment variables and redeploying. No code changes are required.
