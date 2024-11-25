FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--es-module-specifier-resolution=node"

CMD sh -c "npm run migration:run && npm run start:dev"