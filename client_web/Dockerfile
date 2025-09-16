FROM node:20-alpine
WORKDIR /app
COPY index.js ./
RUN npm install express
VOLUME ["/shared_data"]
EXPOSE 8081
CMD ["node", "index.js"]
