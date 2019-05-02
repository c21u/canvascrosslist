FROM node:10.15.3-alpine as builder

# Set a working directory
WORKDIR /usr/src/app

RUN apk update; apk add git

ADD . .

# Install Node.js dependencies
RUN yarn install

RUN yarn run build --release

FROM node:10.15.3-alpine as runner
WORKDIR /usr/src/app
RUN apk update; apk add git
COPY --from=builder /usr/src/app/build .
RUN yarn install --production --no-progress
USER node

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

CMD [ "node", "server.js" ]
