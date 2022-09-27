FROM bitnami/node:16.17.0

RUN mkdir -p /app
WORKDIR /app

COPY ["package.json", "yarn.lock", "/app/"]
RUN yarn

COPY . /app

RUN yarn build

ENV NODE_ENV development
ENV PORT 3000
ENV NUXT_PORT 3000
ENV NEST_PORT 3000

CMD ["node", "dist/main.js"]
