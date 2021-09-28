FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.13.0-alpine
COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/order .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

