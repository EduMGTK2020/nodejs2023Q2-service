FROM node:18-alpine3.14

WORKDIR /app

COPY . .

# for migration in container
# RUN npm ci && npm cache clean --force
# CMD ["npm", "run", "start:all"]

# for local migrations
RUN npm ci && npm run build && npm cache clean --force
CMD ["npm", "run", "start:dev"]
