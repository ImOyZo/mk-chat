FROM node:22.22.3-alpine3.23

WORKDIR /app

COPY . .

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "server.js"]