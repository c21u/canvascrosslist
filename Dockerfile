FROM node:20-bookworm AS builder

ARG YARN_VERSION=4.6.0

WORKDIR /app

ENV COREPACK_HOME=/corepack
ENV YARN_CACHE_FOLDER=/app/.yarn/cache
ENV YARN_ENABLE_GLOBAL_CACHE=false

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  pkg-config \
  libsecret-1-dev \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY .yarn .yarn

RUN yarn install --immutable

ARG BUILD_FOR="prod"

COPY .eslintrc.cjs .
COPY webpack.common.mjs .
COPY webpack.${BUILD_FOR}.mjs .
COPY .babelrc.json .
COPY client client

RUN yarn run build:${BUILD_FOR}

FROM node:20-bookworm

ARG YARN_VERSION=4.6.0

WORKDIR /app

ENV COREPACK_HOME=/corepack
ENV YARN_CACHE_FOLDER=/app/.yarn/cache
ENV YARN_ENABLE_GLOBAL_CACHE=false

RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY .yarn .yarn

RUN yarn install --immutable

COPY --from=builder /app/dist dist
COPY server server

ARG app_version
ENV APP_VERSION=$app_version

RUN chown -R node:node /app /corepack

EXPOSE 3000

USER node

CMD [ "yarn", "run", "start" ]