# auth/Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "server.js"]  # or your main file

