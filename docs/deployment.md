# Deployment

This project is a static-first Astro blog. The production build writes static files to `dist/`, then Pagefind writes the static search index to `dist/pagefind/`.

## Build command

```bash
npm run build
```

## Output directory

```text
dist
```

## Required environment variable

Set this in the deployment platform:

```text
PUBLIC_SITE_URL=https://your-domain.example
```

This controls canonical URLs, RSS links, sitemap URLs, robots.txt links, and share metadata. If it is not set, the project falls back to `https://example.com`.

## Cloudflare Pages

Use these settings:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 or later
- Environment variable: `PUBLIC_SITE_URL`

Cloudflare Pages is the recommended first deployment target because it can host the static site, RSS, sitemap, robots.txt, and Pagefind search index without a backend.

## Vercel

Use these settings:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `PUBLIC_SITE_URL`

The site is static-first and does not require serverless functions for the first release.

## Comments

Comments are disabled by default in `src/config/site.ts`.

Supported provider configuration slots:

- Giscus
- Twikoo
- Waline

Enable only one provider at a time, then fill in that provider's required configuration.

## Analytics

Analytics are disabled by default in `src/config/site.ts`.

Supported provider configuration slots:

- Cloudflare Web Analytics
- Umami
- Plausible
- Google Analytics

## Mainland China Access

The first release can deploy to Cloudflare Pages or Vercel for speed of setup. If mainland China access becomes a priority, expect a separate deployment track:

- ICP filing for mainland-hosted websites
- Domestic object storage or server hosting
- Domestic CDN configuration
- Possible migration of comments, analytics, and media storage to China-friendly providers

The Astro output remains portable because it is static HTML, CSS, JavaScript, RSS, sitemap, robots.txt, and Pagefind index files.
