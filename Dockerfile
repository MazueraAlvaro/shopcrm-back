FROM node:16.14-alpine3.15 AS development

ENV PORT 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g glob rimraf @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]