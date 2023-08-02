FROM node:18-alpine3.14

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci && npm run build && npm cache clean --force 

EXPOSE 4000

CMD ["npm", "run", "start:dev"]