![Alt](https://repobeats.axiom.co/api/embed/4c2033a26ae9688ea307ee0a62002f1c50b03588.svg 'Repobeats analytics image')

## Development

The portfolio and Payload CMS run together in Next.js. Strapi is no longer needed
by the application. Use Node **24.22.1+** (within v24) and **pnpm 11.28.5**.

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
# Replace PAYLOAD_SECRET with a random secret of at least 32 characters.
pnpm dev
```

Open [the website](http://localhost:3000/en) and [Payload admin](http://localhost:3000/admin).
Create the first administrator in the admin UI. No administrator credentials are
committed. Optionally set `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD` in
`.env.local` and run `pnpm cms:seed` to create the first account from the CLI.
The password must have at least 12 characters; the script does nothing if a user
already exists.

Local data is stored in `.data/payload.db` (SQLite) and `.data/media` (uploads).
These files, the local secret, and migration exports are ignored by Git. Back up
the entire `.data` directory to preserve both content and uploaded files.
`PAYLOAD_MEDIA_DIR` optionally overrides the upload directory.

## Content

- `/admin`: authenticated management of users, articles, projects and media.
- `/api/blogs`, `/api/projects`, `/api/media`: Payload REST endpoints.
- English and French content, with English fallback for missing translations.
- Articles and projects support drafts and publication. Visitors can only read
  published content; creating, editing and deleting require an authenticated user.
- Markdown fields preserve the existing article and project renderer.
- Lists, detail pages and featured projects use Payload's server-side Local API
  with access checks enabled. The browser does not call the old CMS.
- `/sitemap.xml` reads published CMS content dynamically; admin and API routes are
  excluded from indexing through `/robots.txt`.

## Importing existing content

The import is an explicit, one-time operation, never a startup dependency:

```sh
pnpm cms:export
pnpm cms:import
# Or import a previously saved snapshot:
pnpm cms:import path/to/strapi-export.json
```

`cms:export` reads the existing public API in English and French, including every
pagination page. Use `STRAPI_EXPORT_URL` for another source and optionally
`STRAPI_EXPORT_TOKEN` for a read token. The snapshot defaults to
`.data/strapi-export.json`.

`cms:import` upserts documents by their legacy document ID and locale, downloads
referenced collection media into Payload, and preserves article/project slugs.
It can be rerun without duplicating documents or media. Existing Markdown,
including external links and embedded CDN URLs, is preserved. The migration does
not delete or modify anything in the old CMS.

The local migration performed on 24 October 2026 imported **26 English articles,
21 projects with French translations, and 115 media files**. There were no public
French articles, so French article pages use English fallback. This snapshot only
contains content readable through the source API; private drafts, user accounts,
passwords and unpublished translations have not been migrated.

## Validation

```sh
pnpm check                         # Biome lint, formatting and imports
pnpm typecheck                     # Next, CMS, import scripts and browser test types
pnpm test:ci                       # Frontend and service tests
pnpm test:cms                      # Real Payload/SQLite integration tests
pnpm test:i18n                     # Locale negotiation, catalog parity and ICU
pnpm build                        # Production build
pnpm exec playwright install chromium
pnpm test:e2e                      # Production server and Chromium tests
```

CMS integration tests use a separate temporary SQLite database and upload folder.
Browser tests apply the initial migration to a fresh database under `.data/e2e-*`
and use port 3100. They never modify the local imported content. Test output lives
in `.tmp/playwright-results`. CI runs these checks, including browser tests.

## Database schema and production

Development uses Payload's automatic SQLite schema push. The committed initial
migration supports a fresh production database. Do not run production migrations
against a database previously managed with development schema push.

For a production database, provide environment variables (including a strong
`PAYLOAD_SECRET`, `DATABASE_URL` and the public `NEXT_PUBLIC_SITE_URL`), then run:

```sh
pnpm cms:migrate
pnpm start
```

The Dockerfile uses Node 24.22.1, builds this combined application, applies
migrations at startup, and listens on port 3000. Mount persistent storage at
`/app/.data` for SQLite and uploads. Do not use multiple independent instances
with the same local SQLite file. This integration currently uses local SQLite;
it has not changed or shut down the existing production Strapi service.

No email adapter is configured for local use. Configure one before relying on
password recovery in a deployed environment. Payload packages must stay aligned
on the same version. The existing site layouts are grouped under
`src/app/(frontend)` so their styles and analytics do not affect Payload admin.

## Languages and Content Studio

The website uses `/en/...` and `/fr/...` URLs with a persistent language selector.
Old links redirect to the preferred language. See [INTERNATIONALIZATION.md](INTERNATIONALIZATION.md)
for the next-intl architecture, caching and SEO rules.

Payload has a dedicated light/dark Content Studio theme, an editorial dashboard,
localized forms, Markdown writing/preview tabs and keyboard-friendly topic fields.
These customizations use Payload's extension points and do not change stored
content schemas. Website styles and CMS styles remain separate.
