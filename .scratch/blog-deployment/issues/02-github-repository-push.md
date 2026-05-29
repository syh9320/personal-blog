Status: ready-for-agent

# 02-github-repository-push

## Parent

`.scratch/blog-deployment/PRD.md`

## What to build

Push the local Git repository to GitHub so that Cloudflare Pages can import it for deployment. This slice requires GitHub credentials (HITL).

Steps:
1. Verify the local repo is clean and all intended changes are committed
2. Authenticate to GitHub via `gh auth login`
3. Create a new GitHub repository named `personal-blog` under the user's account (`syh9320`)
4. Add the GitHub repository as the `origin` remote
5. Push the `main` branch (currently 3 commits plus any new work from prior slices)

After this slice, the full codebase should be visible at `https://github.com/syh9320/personal-blog`.

## Acceptance criteria

- [ ] `gh auth status` reports logged in
- [ ] `git remote -v` shows origin pointing to `github.com/syh9320/personal-blog`
- [ ] `main` branch pushed successfully with all commits intact
- [ ] Repository is publicly visible (or private, per user preference)

## Blocked by

None - can start immediately (but should be done after all code/configuration changes from other slices are committed)
