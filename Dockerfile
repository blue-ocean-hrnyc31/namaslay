FROM node:12-alpine
WORKDIR /namaslay
COPY package.json .
RUN npm install
COPY . .
RUN ["npm", "start"]
