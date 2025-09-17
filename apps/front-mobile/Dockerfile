##
## EPITECH PROJECT, 2025
## area
## File description:
## Dockerfile
##

FROM node:24-alpine3.21
WORKDIR /app
COPY apps/front-mobile/package*.json ./
RUN npm install
COPY apps/front-mobile .
# Adapt the command for the mobile
# CMD ["npm", "run", "build"]