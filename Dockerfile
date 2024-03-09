FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile


FROM base AS build
COPY --from=prod-deps /app/node_modules /app/node_modules
RUN pnpm install --frozen-lockfile
RUN pnpm run build


FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "pnpm", "start" ]