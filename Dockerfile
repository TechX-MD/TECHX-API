FROM node:20

WORKDIR /app

RUN apt update && apt install -y python3 python3-pip ffmpeg

RUN pip3 install yt-dlp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","server.js"]
