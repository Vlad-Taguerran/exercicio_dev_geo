FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install

RUN yarn global add ts-node typescript

COPY . .

RUN yarn build

CMD ["yarn", "dev"]
