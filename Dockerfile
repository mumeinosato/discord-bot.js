FROM node:18

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run compile

CMD ["npm", "start"]