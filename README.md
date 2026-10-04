![Alt](https://repobeats.axiom.co/api/embed/4c2033a26ae9688ea307ee0a62002f1c50b03588.svg 'Repobeats analytics image')

## Development

Use Node.js 24 and pnpm 11.25.0 (`corepack enable`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```sh
pnpm check       # Biome lint, formatting, and imports
pnpm check:fix   # Apply safe Biome fixes
pnpm format     # Format files
pnpm typecheck  # TypeScript sources and generated Next.js types
pnpm test:ci    # Unit tests
pnpm build      # Production build and sitemap
```

Biome 2.5.13 replaces ESLint and Prettier. The CI runs validation on pull requests and pushes to main.
