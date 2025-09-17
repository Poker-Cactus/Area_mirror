FROM node:20-alpine
WORKDIR /app
COPY app.js ./
COPY about.json ./
RUN npm install express
EXPOSE 8080
CMD ["node", "app.js"]
