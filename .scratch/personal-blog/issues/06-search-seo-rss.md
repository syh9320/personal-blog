Status: ready-for-agent

# Search, SEO, RSS, and sitemap

## Parent

`.scratch/personal-blog/PRD.md`

## What to build

Add static search and foundational publication metadata. Search should use a static index rather than a backend service. SEO, RSS, sitemap, robots, canonical URLs, and share metadata should be present so the blog is discoverable and pleasant to share.

## Acceptance criteria

- [x] Static search is available through Pagefind or an equivalent static-index approach.
- [x] Search can find published post titles, descriptions, and body content after production build.
- [x] Search UI works on desktop and mobile.
- [x] Pages include appropriate title and description metadata.
- [x] Canonical URLs are generated consistently.
- [x] Open Graph metadata is present for share previews.
- [x] Twitter Card metadata is present.
- [x] RSS feed is generated.
- [x] Sitemap is generated.
- [x] `robots.txt` is generated or provided.

## Blocked by

- `.scratch/personal-blog/issues/04-blog-reading-experience.md`
- `.scratch/personal-blog/issues/05-home-and-projects.md`
