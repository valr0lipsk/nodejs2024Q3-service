FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--es-module-specifier-resolution=node"

CMD ["npm", "run", "start:dev"]