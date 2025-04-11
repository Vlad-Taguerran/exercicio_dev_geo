FROM node:21-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:21-alpine  AS runner

WORKDIR /app

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN yarn install --network-timeout 600000
RUN yarn install --production 
ENV JWT_SECRET='2d3d8b43fa0cb7929eeacc30f52d7e5b4b3f52adb923497e4549f7b5cb26292b'

EXPOSE 3000

CMD [ "yarn", "start" ]