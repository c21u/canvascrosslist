FROM node:lts AS builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --no-progress --non-interactive

COPY .eslintrc.cjs .
COPY webpack.common.mjs .
COPY webpack.prod.mjs .
COPY .babelrc.json .
COPY client client

RUN yarn run build

FROM node:lts

WORKDIR /app

COPY package.json .
COPY patches patches
COPY yarn.lock .

RUN yarn install --production --no-progress --non-interactive && yarn cache clean

COPY --from=builder /app/dist dist
COPY server server

ARG app_version
ENV APP_VERSION=$app_version

EXPOSE 3000

USER node

# ENTRYPOINT [ "yarn", "run" ]
# CMD ["start" ]
CMD [ "yarn", "run", "start" ]
