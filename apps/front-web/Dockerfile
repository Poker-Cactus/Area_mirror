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
EXPOSE 8081
CMD ["npx", "nx", "serve", "front-web", "--port=8081"]