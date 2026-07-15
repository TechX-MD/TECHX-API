FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --break-system-packages -U yt-dlp
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","server.js"]
