FROM node:16
ENV SESSION_SECRET=secret
ENV PORT=8080

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]