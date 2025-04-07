# Estágio de build
FROM node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Estágio de produção
FROM node:21-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

RUN yarn global add ts-node typescript

CMD ["yarn", "start"]
