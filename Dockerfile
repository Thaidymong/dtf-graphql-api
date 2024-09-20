FROM node:20.11.0

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 80
CMD [ "npm", "start" ]