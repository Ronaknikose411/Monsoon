
# ──────────────── Stage 1: build ────────────────
FROM node:23-alpine AS builder
WORKDIR /app


# only copy package manifests so npm ci caches
COPY package.json package-lock.json ./
RUN npm ci


# copy source & build
COPY . .
RUN npm run build   # → outputs to /app/dist


# ──────────────── Stage 2: serve ────────────────
FROM nginx:stable-alpine
# remove default static content
RUN rm -rf /usr/share/nginx/html/*


# copy built files
COPY --from=builder /app/dist /usr/share/nginx/html


# expose port 80
EXPOSE 80


# run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
