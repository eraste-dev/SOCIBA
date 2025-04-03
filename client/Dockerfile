# Stage 1: Build
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Deploy
FROM node:16-alpine as deploy
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 3000
CMD npm run start
