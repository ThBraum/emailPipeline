FROM node:20-bullseye-slim AS build
WORKDIR /app

COPY package.json package-lock.json* ./
ENV npm_config_optional=true
RUN npm install --no-audit --no-fund || npm install --no-audit --no-fund --legacy-peer-deps

RUN npm install @rollup/rollup-linux-x64-gnu --no-audit --no-fund --save-optional || true

COPY . .

ARG VITE_EMAIL_API_URL
ENV VITE_EMAIL_API_URL=${VITE_EMAIL_API_URL}

RUN EMBER_ENV=production npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
