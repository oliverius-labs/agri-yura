# --- Etapa de construcción ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# --- Etapa de producción ---
FROM nginx:alpine-otel
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
