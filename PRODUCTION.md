# Production: Payload, PostgreSQL and R2

Set the variables listed in `.env.example` in the deployment platform. Do not
commit real credentials or copy the old Strapi signing secrets into Payload.
Use a stable random PAYLOAD_SECRET across builds, restarts and instances.

## Runtime

- Node 24.22.1, matching package.json and Dockerfile.
- PostgreSQL is selected automatically when DATABASE_URL starts with postgres.
- SQLite remains available for local development and isolated tests.
- NEXT_PUBLIC_SITE_URL must be https://brev.al at build time and runtime.
- The R2 endpoint and public endpoint must include https://.
- Uploads use the existing bucket under payload/, without changing old Strapi keys.
- Uploads are server-side; browser upload CORS rules are not required.
- No persistent local database or upload volume is needed in PostgreSQL/R2 mode.

Nixpacks uses nixpacks.toml: pnpm build, then pnpm start:production. The start
command applies the appropriate database migrations before serving Next.js.
The Dockerfile also applies migrations before start. PostgreSQL and SQLite
migrations live in separate directories; never run SQLite SQL on PostgreSQL.

## Cutover completed on 2026-10-24

The former public Strapi schema is preserved in strapi_archive_20261024. Payload
uses the new public schema in the same database. A full row export is also kept
locally in the ignored .data directory. The production import comes from the
actual database, including unpublished projects and the complete media library.
Old Strapi administrator hashes are archived; Payload has a separate new login.

The exact environment and one-time administrator credentials are saved in
ignored local .tmp files. Import neither of those into Git or Docker builds.
After deploying, sign in at /admin and change the temporary administrator
password. Administrator bootstrap environment variables are unnecessary for
normal runtime. Email delivery is not configured: password recovery requires an
email adapter before it can send mail externally.

Keep the archived schema and old R2 keys until the cutover is accepted. Restoring
Strapi requires first stopping Payload, preserving any new Payload data, and
restoring the archived schema as public; do not restart Strapi against Payload's
new public tables.

The import retained 26 published articles, 21 published projects with their French
translations, 2 unpublished projects and 171 media records. The two unpublished
projects reused the published neova slug in Strapi; their draft slugs were changed
to inter-planetary-content-delivery and received. Published slugs were unchanged.
