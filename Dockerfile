FROM node:18

WORKDIR /app

COPY package.json /app
RUN npm install

RUN apt update
RUN apt -y install ffmpeg

COPY . /app
RUN npm run compile

CMD ["npm", "start"]