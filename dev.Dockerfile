FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY public ./public
COPY next.config.js .

ENV NEXT_TELEMETRY_DISABLED 1

CMD \
    if [ -f yarn.lock ]; then yarn dev; \
    elif [ -f package-lock.json ]; then npm run dev; \
    elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
    else yarn dev; \
    fi