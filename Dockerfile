FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@17.3.4
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/metube /usr/share/nginx/html
