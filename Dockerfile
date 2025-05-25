# Use a lightweight Node.js image to compile your source
FROM node:23-alpine AS builder


# Set /app as the working directory for subsequent commands
WORKDIR /app


# Copy package manifests first (best practice for caching)
COPY package.json package-lock.json ./


# Install all dependencies exactly as specified in package-lock.json
RUN npm ci


# Copy the rest of your source code into the container
COPY . .


# Run the build script (Vite will output production files to /app/dist)
RUN npm run build


# Tell Docker the container listens on port 80 at runtime
EXPOSE 80
