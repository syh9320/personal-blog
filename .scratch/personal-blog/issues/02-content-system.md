Status: ready-for-agent

# Content system

## Parent

`.scratch/personal-blog/PRD.md`

## What to build

Add the structured content model for posts and projects. Blog posts should be written in MDX and validated through Content Collections. Project entries should also be structured content so the homepage and projects page can render portfolio data without hardcoding it into components.

## Acceptance criteria

- [x] Blog posts are represented as MDX content with validated metadata.
- [x] Blog metadata includes title, description, publication date, optional updated date, tags, draft state, and featured state.
- [x] Project entries are represented as structured content with validated metadata.
- [x] Project metadata includes name, description, start date, status, tags, optional repository URL, optional demo URL, and featured state.
- [x] Example blog and project content exists for development.
- [x] Invalid required metadata fails the build clearly.
- [x] Draft posts are excluded from production-facing lists.

## Blocked by

- `.scratch/personal-blog/issues/01-project-scaffold.md`
