# Internationalization

The website uses `next-intl` and the Next.js App Router. Supported languages and
the default are declared once in `src/i18n/locales.ts`, also used by Payload's
content-localization configuration.

## Routing and preferences

Every website URL has a language prefix: `/en/projects`, `/fr/projects`,
`/fr/blog/articles/mon-article`. An explicit prefix is authoritative. Legacy links
such as `/projects` redirect through next-intl's locale negotiation: saved
`NEXT_LOCALE` cookie, then the browser's `Accept-Language`, then English.

`src/proxy.ts` excludes `/admin`, `/api`, Next internals and static files. Payload
URLs and uploaded file URLs are never prefixed or redirected by website i18n.
The site and Payload have separate HTML root layouts. Because Next.js cannot
expose a shared `locale` root parameter across these layouts, `i18n/request.ts`
uses next-intl's middleware-provided `requestLocale` rather than `next/root-params`.
There is no custom parsing of language headers and no deprecated locale setter.

`src/i18n/navigation.ts` exports the locale-aware `Link`, `useRouter` and
`usePathname` APIs. Use these for website links. Use `next/link` for CMS navigation.
The language selector preserves query parameters and fragments. For article and
project detail pages, its server action resolves the same published document in
the target language before navigating, so translated slugs do not lead to 404s.

## Messages and formatting

Catalogs are in `src/lib/dictionaries/en.json` and `fr.json`, with identical keys.
Use `getTranslations` in server code and `useTranslations` in client components.
Use next-intl's formatter for dates and numbers; the request timezone is
`Europe/Paris` so server and client produce matching output.

The small `get-locale` and `get-dictionary` modules are compatibility adapters to
next-intl for existing presentational components. They do not negotiate language,
parse headers or implement their own fallback. The client provider receives only
shared UI namespaces; existing home-section dictionaries remain server-loaded.

## Content and performance

Payload's content locale is always explicit, with English fallback. Only published
documents are returned by website services and access checks remain enabled.
React `cache` deduplicates CMS reads within a server render, with locale included
in every cache key. Tagged Next.js data caches also reuse published content between requests,
partitioned by locale. Admin changes expire the affected entries immediately. Featured projects are fetched with the server-rendered home page,
instead of waiting for browser hydration and a second action request.

Payload's interface language and content language are separate standard features.
The UI supports English/French; the content picker displays full language names.
Studio shortcuts preserve the selected content locale in their URLs.

## Search engines and verification

Canonical links, language alternates and the XML sitemap include the locale and
translated article slug. Existing unprefixed links still work through redirects.
The admin and API are excluded from indexing.

Run `pnpm test:i18n` for negotiation, cookie priority, catalog parity and ICU
formatting. `pnpm test:e2e` checks actual language switching, translated slugs,
query preservation, canonical links, Payload boundaries and the studio UI.

## Translating interface copy

Both catalogs contain real translations, including the hero, journey dialogs,
footer, empty/error states and experiment instructions. `ui` holds shared page
labels. `LocalizedText` is a small next-intl client component for text-only slots
inside presentation helpers; interactive components use `useTranslations`.
Keep product names, technology names and CMS category identifiers stable, and
translate their displayed labels rather than changing filtering keys or routes.
Browser tests visit the home, art, projects, category and experiment pages in
both languages and assert visible localized content, not just the URL.

Cache Components pages pass the URL locale explicitly rather than reading request
headers. Request configuration only resolves the middleware locale when there is
no explicit override. The website client provider receives locale, messages and
timezone directly so static layouts do not invoke request-based server defaults.
