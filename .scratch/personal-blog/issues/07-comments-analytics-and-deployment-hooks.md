Status: ready-for-agent

# Comments, analytics, and deployment hooks

## Parent

`.scratch/personal-blog/PRD.md`

## What to build

Add disabled-by-default extension points for comments and analytics, plus deployment-oriented configuration and documentation for the first static hosting target. Comments and analytics should not force a provider choice in the first release, but the code should make later enablement straightforward.

## Acceptance criteria

- [x] Comments are represented by a replaceable component mounted from article pages.
- [x] Comments are disabled by default.
- [x] Comment provider configuration can represent Giscus, Twikoo, and Waline.
- [x] Analytics are disabled by default.
- [x] Analytics provider configuration can represent Cloudflare, Umami, Plausible, and Google Analytics.
- [x] The production build remains static-first and portable.
- [x] Deployment notes cover the first recommended hosting target, such as Cloudflare Pages or Vercel.
- [x] Deployment notes mention that mainland China optimization may later require ICP filing and domestic cloud/CDN migration.

## Blocked by

- `.scratch/personal-blog/issues/04-blog-reading-experience.md`
- `.scratch/personal-blog/issues/06-search-seo-rss.md`
