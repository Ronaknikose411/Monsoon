# ──────────────── Stage 1: build ────────────────
FROM node:23-alpine AS builder
WORKDIR /app

# Only copy package manifests first for caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build it
COPY . .
RUN npm run build   # outputs to /app/dist

# ──────────────── Stage 2: serve ────────────────
FROM nginx:stable-alpine

# Clean default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose container port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
