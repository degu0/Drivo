ARG NODE_IMAGE=node:22.20.0-slim
ARG NPM_VERSION=11.6.1

FROM ${NODE_IMAGE} AS build
ARG NPM_VERSION
RUN npm install -g npm@${NPM_VERSION}
WORKDIR /app

ENV DATABASE_URL=postgresql://build:build@localhost:5432/build

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci

COPY . .
RUN npm run build

FROM ${NODE_IMAGE} AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

RUN mkdir -p uploads && chown node:node uploads

USER node
EXPOSE 3333

CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && exec node dist/main"]
