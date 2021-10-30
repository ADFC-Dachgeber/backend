FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn prisma:generate

RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn" ]
