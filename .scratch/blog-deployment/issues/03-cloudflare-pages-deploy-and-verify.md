Status: done

# 03-cloudflare-pages-deploy-and-verify

## Parent

`.scratch/blog-deployment/PRD.md`

## What to build

Deploy the blog to Cloudflare Pages and verify all public-facing functionality works. This slice requires Cloudflare account access (HITL).

**Deployment steps:**

1. Import the GitHub repository (`syh9320/personal-blog`) into Cloudflare Pages
2. Configure build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js version: 22
3. Set environment variable `PUBLIC_SITE_URL` to the expected preview domain (initially a best-guess value like `https://personal-blog.pages.dev`)
4. Trigger the first deployment
5. After deployment, retrieve the assigned `*.pages.dev` URL
6. Update `PUBLIC_SITE_URL` to the actual assigned URL and redeploy

**Verification (automated + manual):**

Run `npm run verify:deploy` with the real `PUBLIC_SITE_URL` and confirm all checks pass:
- PUBLIC_SITE_URL is a valid HTTPS URL and not a placeholder
- dist directory and all required files exist
- Canonical URLs, RSS, sitemap, and robots.txt all use the correct domain

Manual smoke checks on the deployed site:
- Homepage (`/`) loads with hero section, featured posts, recent posts, featured projects
- Blog index (`/blog/`) lists all published articles
- Article detail page (`/blog/hello-astro/`) renders with typography, code blocks, tags
- Projects page (`/projects/`) lists projects
- Search page (`/search/`) loads and can perform keyword search
- Tags page (`/tags/`) lists all tags with counts
- Tag detail page (`/tags/[tag]/`) filters posts by tag
- Archive page (`/archive/`) groups posts by year
- RSS feed (`/rss.xml`) returns valid XML with correct feed links
- Sitemap (`/sitemap-index.xml`) returns valid XML with correct URLs
- Robots.txt (`/robots.txt`) references the sitemap and RSS
- Theme toggle switches between light, dark, and system modes
- Dark mode styles apply correctly across pages

## Acceptance criteria

- [x] Blog is publicly accessible at the assigned `*.pages.dev` URL
- [x] `PUBLIC_SITE_URL` in Cloudflare Pages matches the actual deployment URL
- [x] `npm run verify:deploy` passes with the real URL (0 checks failed)
- [x] Homepage loads and displays site identity (author name, bio, navigation)
- [x] `/blog/` lists all published articles (draft articles excluded)
- [x] Article detail page renders with proper typography, code blocks, copy button, and tags
- [x] `/projects/` lists projects with status and links
- [x] `/search/` search returns results for article content
- [x] `/tags/` lists all tags with correct post counts
- [x] `/archive/` groups posts by year chronologically
- [x] `/rss.xml` serves valid RSS with correct site URL in link elements
- [x] `/sitemap-index.xml` serves valid XML sitemap
- [x] `/robots.txt` references correct sitemap URL
- [x] Theme toggle works (light/dark/system) and persists across page navigation
- [x] Code blocks show syntax highlighting in both light and dark themes
- [x] Code copy button copies code to clipboard
- [x] Mobile layout renders without horizontal scrolling
- [x] Open Graph and Twitter Card metadata appear in page source
- [x] Site is responsive and readable on mobile viewport

## Blocked by

None.

## Current evidence

- `02-github-repository-push` is complete.
- GitHub remote `main` has been pushed successfully.
- Cloudflare Pages production URL: `https://personal-blog-97i.pages.dev/`.
- Online route checks returned HTTP 200 for `/`, `/blog/`, `/blog/hello-astro/`, `/projects/`, `/search/`, `/tags/`, `/archive/`, `/rss.xml`, `/sitemap-index.xml`, and `/robots.txt`.
- Online generated content now includes `https://personal-blog-97i.pages.dev` in the checked routes, RSS, sitemap, and robots output.
- Pagefind assets returned HTTP 200 for `/pagefind/pagefind.js`, `/pagefind/pagefind-ui.css`, and `/pagefind/pagefind-entry.json`.
