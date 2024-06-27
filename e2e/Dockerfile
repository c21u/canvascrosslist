FROM cypress/base:10
WORKDIR /app

ENV CI=1

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --non-interactive --no-progress

RUN npx cypress verify