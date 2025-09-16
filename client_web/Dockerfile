FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
VOLUME ["/shared_data"]
EXPOSE 8081
COPY wait-for-file.sh /usr/local/bin/wait-for-file.sh
RUN chmod +x /usr/local/bin/wait-for-file.sh
CMD ["npm", "start"]
