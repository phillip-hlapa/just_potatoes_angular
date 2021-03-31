FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY controllers ./controllers

COPY files ./files

COPY models ./models

COPY utils ./utils

COPY models ./models

COPY notes.txt  .

COPY routes.js .

COPY server.js .

RUN ls ./

CMD ["node", "server.js"]


#FROM node:alpine
