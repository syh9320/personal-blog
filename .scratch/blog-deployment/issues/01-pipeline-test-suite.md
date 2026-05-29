Status: done

# 01-pipeline-test-suite

## Parent

`.scratch/blog-deployment/PRD.md`

## What to build

Create a deployment pipeline test script that validates the build and verification workflow locally. The script should confirm that the build pipeline (astro check + astro build + pagefind index generation) correctly passes with valid content and correctly fails with invalid content, and that the deploy verification script correctly passes or fails based on `PUBLIC_SITE_URL`.

The test script should:
1. Run `npm run build` with a valid `PUBLIC_SITE_URL` and assert success
2. Temporarily create an invalid blog post (missing required frontmatter), run `astro check`, assert failure, then clean up
3. Run `npm run verify:deploy` after a successful build and assert success
4. Run `npm run verify:deploy -- --allow-placeholder` with `PUBLIC_SITE_URL=https://example.com` and assert success (placeholder check is bypassed)

Follow the same check/pass/fail pattern used in `scripts/verify-deploy.mjs`: each assertion prints `[ok]` or `[fail]` with an optional detail line, and the script exits with code 1 if any check fails.

## Acceptance criteria

- [x] Script runs successfully when all checks pass
- [x] Build failure test: temporarily injects invalid content, runs astro check, asserts non-zero exit code, then cleans up
- [x] Verify-deploy tests: asserts pass with valid URL, asserts pass with placeholder URL when `--allow-placeholder` flag is set
- [x] Script exits with code 1 when any check fails
- [x] Script uses the same output format as `verify-deploy.mjs` (check name, [ok]/[fail], optional detail)
- [x] Script cleans up all temporary files it creates, even on failure

## Blocked by

None - can start immediately
