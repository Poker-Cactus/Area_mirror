##
## EPITECH PROJECT, 2025
## area
## File description:
## Dockerfile
##

FROM node:24-alpine3.21
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npx", "nx", "serve", "server", "--host='0.0.0.0'", "--port=8080"]