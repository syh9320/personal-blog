Status: done

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

## Current evidence

- `git remote -v` shows `origin` set to `https://github.com/syh9320/personal-blog.git`.
- Local `main` is currently ahead of `origin/main` with local deployment-progress commits that still need pushing.
- `gh auth status` reports that the `syh9320` token is invalid.
- `git ls-remote --heads origin main` fails with `SEC_E_NO_CREDENTIALS`.
- HTTPS authentication could not be repaired through `gh auth login`, `gh auth setup-git`, or Git Credential Manager.
- A repo-specific SSH key was generated at `C:\Users\邵宇杭\.ssh\personal_blog_github_ed25519`.
- The repository remote was changed to `git@github.com:syh9320/personal-blog.git`.
- The repository-local `core.sshCommand` is configured to use `C:/Users/邵宇杭/.ssh/personal_blog_github_ed25519`.
- The generated public key was added to GitHub by the user.
- `git push` succeeded and updated remote `main` to `7fefc20`.
- `git ls-remote --heads origin main` confirmed remote `main` at `7fefc20014da1bb91f49d18e6215694ae47088aa`.

Public key to add at `https://github.com/settings/keys`:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBfjQhZuCLm5dt0/imFJ4A7WWE0VX/y8lTn+LnsXe/al 2634439099@qq.com
```

## Acceptance criteria

- [ ] `gh auth status` reports logged in
- [x] `git remote -v` shows origin pointing to `github.com/syh9320/personal-blog`
- [x] `main` branch pushed successfully with all commits intact
- [x] Repository is publicly visible (or private, per user preference)

## Blocked by

No current blocker for repository push. `gh auth status` still does not report a healthy GitHub CLI token, but Git operations now work over SSH for this repository.
