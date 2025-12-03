# --- Etapa de construcción ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# --- Etapa de producción ---
FROM nginx:alpine3.22
RUN apk update && apk add --no-cache libpng --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
