FROM node:16.14-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g glob rimraf @nestjs/cli

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.14-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]