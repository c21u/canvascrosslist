FROM node:12-alpine as builder

# Set a working directory
WORKDIR /usr/src/app

COPY . .

# Install Node.js dependencies
RUN yarn install

RUN yarn run build --release

FROM node:12-alpine as runner
WORKDIR /usr/src/app
COPY --from=builder --chown=node:node /usr/src/app/build .
RUN yarn install --production --no-progress
RUN chmod 755 /usr/src/app

# Run the container under "node" user by default
USER node

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

CMD [ "node", "server.js" ]
