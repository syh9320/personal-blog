Status: done

# Anime / Mizuki-Inspired Frontend Refresh PRD

## Problem Statement

The personal blog is now deployed and publicly accessible, but its current frontend feels closer to a clean generic Astro blog than the anime-inspired, Mizuki-like personal site the user wants. The user wants the blog to feel more like a Japanese/anime personal room: visually warmer, more immersive, and closer to the Mizuki reference style, while keeping the current codebase, deployment pipeline, and writing workflow intact.

The user specifically referenced the Mizuki Astro blog theme and a screenshot showing a large anime banner, floating translucent navigation, a left profile/sidebar area, and right-side article cards. The user wants to start with a conservative route: keep the current project, upgrade the visual language, and selectively adopt parts of Mizuki's design structure without migrating to the full Mizuki theme.

## Solution

Implement a first-stage Mizuki-inspired visual refresh for the current Astro blog.

The refresh should keep the existing content system, Cloudflare deployment, Pagefind search, RSS, sitemap, and routing behavior. It should focus on the homepage and blog index first:

- Add a large anime-style hero banner on the homepage.
- Use a user-provided image as the first hero asset.
- Introduce a floating translucent top navigation bar with a soft glass effect.
- Restructure the homepage into a Mizuki-like composition: banner first, then a two-column content area with a lightweight profile card on the left and an article stream on the right.
- Upgrade article cards so they can display an optional cover image, while gracefully falling back to text-only cards when no image is configured.
- Apply a softer anime palette with blue, cyan, pink, cream, and warm highlight accents, without making the reading experience noisy.
- Update the blog index to share the same article-card visual language as the homepage.

This is not a full theme migration. The goal is a custom, maintainable, Mizuki-inspired design layer over the existing blog.

## User Stories

1. As the blog owner, I want the homepage to open with a large anime-style banner, so that the site immediately feels more personal and visually expressive.
2. As the blog owner, I want to use my own chosen banner image, so that the site reflects my taste rather than a generic stock design.
3. As the blog owner, I want the banner image to be configurable, so that I can replace it later without rewriting layout code.
4. As the blog owner, I want the homepage to resemble Mizuki's broad structure, so that the blog feels closer to the reference style I selected.
5. As the blog owner, I want to keep the current Astro project, so that the existing deployment and content pipeline remain stable.
6. As the blog owner, I want to avoid a full Mizuki migration for now, so that the project does not become harder to maintain.
7. As a visitor, I want the first screen to communicate the blog identity clearly, so that I know whose site I am visiting.
8. As a visitor, I want the navigation to be easy to find over the banner, so that I can move to blog, projects, search, and archive quickly.
9. As a visitor, I want the navigation to feel light and translucent, so that it blends with the anime banner instead of feeling like a plain admin toolbar.
10. As a visitor, I want the page to remain readable on mobile, so that the anime style does not break phone browsing.
11. As a visitor, I want article cards to show title, date, description, and tags clearly, so that I can choose what to read.
12. As a visitor, I want article cards with cover images to feel richer, so that the list resembles a polished anime blog.
13. As the blog owner, I want article cover images to be optional, so that I do not need to find an image for every post.
14. As the blog owner, I want text-only articles to still look polished, so that older or quick posts do not feel broken.
15. As the blog owner, I want the homepage profile card to stay lightweight, so that it supports the layout without becoming an overloaded character profile.
16. As a visitor, I want the profile card to show the author identity and useful links, so that I can understand the person behind the blog.
17. As a visitor, I want the homepage to show recent and featured posts in a flowing layout, so that the site feels alive.
18. As the blog owner, I want the blog index to share the homepage card style, so that the visual system is consistent.
19. As a visitor, I want tags to look like soft badges, so that the page has anime-blog personality while staying scannable.
20. As a visitor, I want light and dark mode to keep working, so that the design is comfortable in either theme.
21. As the blog owner, I want the theme toggle to remain available in the floating nav, so that existing behavior is preserved.
22. As the blog owner, I want search navigation to remain visible, so that the existing Pagefind workflow remains discoverable.
23. As a visitor, I want the page background to feel softer and more layered, so that it is closer to Mizuki's atmosphere.
24. As a visitor, I do not want decorations to cover text or controls, so that the site remains usable.
25. As the blog owner, I want the refresh to avoid new backend services, so that Cloudflare Pages deployment remains simple.
26. As the blog owner, I want the refresh to preserve RSS, sitemap, and SEO metadata behavior, so that the already-deployed site remains production-ready.
27. As the blog owner, I want the first stage to focus on homepage and blog index, so that the work can be finished and verified before touching article detail pages.
28. As the blog owner, I want a design foundation that can later support more Mizuki-like features, so that future upgrades can build on this instead of starting over.
29. As a future maintainer, I want visual configuration to live in a small stable interface, so that image, copy, and style changes do not require hunting across components.
30. As a future maintainer, I want the article card to encapsulate optional image behavior, so that homepage and blog index do not duplicate card logic.

## Implementation Decisions

- Keep the current Astro codebase and deployment architecture. Do not fork or migrate to the Mizuki theme.
- Treat Mizuki as a design reference for structure and atmosphere, not as a code dependency.
- The first-stage scope is homepage plus blog index. Article detail page redesign is deferred.
- Use a user-provided anime image as the initial hero banner asset.
- Do not rely on remote image hotlinking for the committed design. Store the selected image with the site assets so deployment is stable.
- Add a small hero configuration surface to the site configuration model. It should support at least a background image, title, subtitle, and optional overlay treatment.
- Extend blog post metadata to support an optional cover image. Existing posts without a cover image must continue to build and render.
- Upgrade the article card component into the deep module for post presentation. It should own optional image rendering, fallback styling, date display, description, and tags.
- Upgrade the site header into a floating translucent navigation surface. It should preserve existing navigation items and theme toggle behavior.
- Rework the homepage composition into a hero-first layout followed by a two-column section: lightweight author/profile card on the left and article stream on the right.
- Keep the profile card lightweight. It should avoid becoming a detailed anime character sheet in this stage.
- Update the blog index to reuse the same post-card presentation language as the homepage.
- Preserve current routes and URLs. This refresh should not break deployed links.
- Preserve the existing dark/light/system theme behavior.
- Prefer CSS variables and Tailwind utility composition consistent with the current project instead of introducing a new design system library.
- Keep decorative effects restrained: soft glass, layered backgrounds, subtle glow, rounded cards, and pastel accents are in scope; heavy animations and clutter are out of scope.
- Ensure the banner has overlay treatment so text remains readable regardless of the image's brightness.
- Make the layout responsive from desktop to mobile. On mobile, the hero should remain readable and the profile/card columns should stack naturally.
- Keep performance reasonable by using appropriately sized static image assets and avoiding excessive animation.

## Testing Decisions

- Good tests should verify externally observable behavior: pages build, routes render, optional images do not break cards, metadata remains valid, and deployed static output still contains expected routes.
- Existing deployment checks remain the baseline. The build must continue to pass the Astro check, static build, Pagefind indexing, and deployment verification workflow.
- The first stage should run the existing pipeline test after changes because the content schema will change to support optional cover images.
- Visual verification should include at least the homepage and blog index at desktop and mobile widths.
- Visual verification should check both posts with an image and posts without an image, so the fallback behavior is proven.
- Visual verification should check that the floating nav does not overlap important hero text or become unreadable against the banner.
- Visual verification should check dark mode and light mode because the palette and glass effects need to work in both.
- Search, RSS, sitemap, and robots should be smoke-checked after the visual refresh to confirm that the frontend changes did not disturb production behavior.
- Prior art in this repo includes the deployment verification script and pipeline test script. The new work should continue to use those commands as release gates rather than adding a heavy browser test suite immediately.

## Out of Scope

- Full migration to the Mizuki theme.
- Copying Mizuki source code or using Mizuki as a direct dependency.
- Rebuilding the article detail page reading experience in this first stage.
- Adding a music player.
- Adding banner carousel behavior.
- Adding live2D, floating mascots, or complex character animation.
- Adding comments or analytics.
- Adding custom domain support.
- Adding a full theme configuration CMS.
- Rewriting the content model beyond optional post cover image metadata.
- Changing the Cloudflare deployment provider or repository workflow.
- Solving image copyright or licensing. The user is responsible for choosing images they are comfortable using.

## Further Notes

The user selected the following design decisions during grilling:

- Route: keep current project and perform a Mizuki-inspired refresh, while selectively adopting Mizuki design structure.
- Hero image source: user-provided image, not generated art and not direct remote hotlinking as the long-term implementation.
- Homepage layout: large banner plus lightweight left profile card plus right article stream.
- Profile card intensity: lightweight personal card, not a full character profile.
- Navigation: floating translucent top nav, close to the Mizuki reference.
- Article card: optional cover image with graceful fallback.
- First-stage scope: homepage and blog index.

An initial candidate anime image has already been provided locally and copied into the public image assets during the interrupted implementation attempt. The implementation should decide whether to keep that copied asset, rename or optimize it, and avoid committing unnecessary duplicate source files.

## Completion Evidence

- The first-stage refresh was implemented without migrating to the Mizuki theme.
- The homepage now uses the selected anime banner as a configurable hero image.
- The header now uses a floating translucent glass treatment.
- The homepage now follows a banner-first layout with a lightweight profile/sidebar area and post stream.
- Blog post metadata now supports optional cover images.
- Article cards now render cover images when present and keep a text-first fallback when absent.
- The blog index now shares the upgraded card language.
- The root source image is ignored; the deployed asset lives under public site images.
- `npm run build` passed with `PUBLIC_SITE_URL=https://personal-blog-97i.pages.dev`.
- `npm run verify:deploy` passed with `PUBLIC_SITE_URL=https://personal-blog-97i.pages.dev`.
- `npm run test:pipeline` passed with `PUBLIC_SITE_URL=https://personal-blog-97i.pages.dev`.
- Local preview smoke check confirmed `/`, `/blog/`, and `/images/hero/laundry-room.jpg` render the expected hero/card assets.
