FROM node:14
WORKDIR /app
RUN npm install pushstate-server -g

COPY package*.json /app/

RUN npm ci
COPY . /app

RUN npm run build
CMD pushstate-server -d ./dist -p 80
