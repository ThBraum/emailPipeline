# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Install only dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build-time API base (Vite replaces import.meta.env at build)
ARG VITE_EMAIL_API_URL=/
ENV VITE_EMAIL_API_URL=${VITE_EMAIL_API_URL}

# Build production bundle
RUN npm run build

# Runtime stage (Nginx)
FROM nginx:1.27-alpine AS runtime

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
