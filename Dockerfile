From node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN cd server && npm install
RUN cd client && npm install
RUN cd client && npm run build






EXPOSE 3301
EXPOSE 3000

CMD ["node","api/server.js"]