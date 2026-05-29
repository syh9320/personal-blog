# Personal Blog

A static-first personal blog built with Astro, MDX, Tailwind CSS, Content Collections, Pagefind, RSS, and Sitemap support.

## Commands

```bash
npm install
npm run dev
npm run build
npm run verify:deploy
npm run test:pipeline
npm run preview
```

## Configuration

Copy `.env.example` to `.env` for local production-style metadata:

```bash
PUBLIC_SITE_URL=https://your-domain.example
```

`PUBLIC_SITE_URL` controls canonical URLs, RSS links, sitemap URLs, and share metadata.

Site identity, navigation, comments, and analytics are configured in:

```text
src/config/site.ts
```

## Writing

Blog posts live in:

```text
src/content/blog/
```

Projects live in:

```text
src/content/projects/
```

Draft posts use:

```yaml
draft: true
```

Drafts are validated by Content Collections but excluded from public lists.

## Deployment

The production build output is:

```text
dist
```

Recommended first target: Cloudflare Pages.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Set `PUBLIC_SITE_URL` in the deployment platform before production launch.

Before the first public deployment, run a production-style build with the same
URL you will configure in the platform, then verify the generated static files:

```powershell
$env:PUBLIC_SITE_URL="https://blog.yourname.dev"
npm run build
npm run verify:deploy
```

See `docs/deployment.md` for Cloudflare Pages, Vercel, comments, analytics, and mainland China deployment notes.

For a step-by-step launch checklist, see:

```text
docs/launch-checklist.md
```
