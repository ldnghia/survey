# Build BUILD
FROM node:18-alpine AS BUILD
ARG ENVIRONMENT=develop
ENV BUILD_STANDALONE true
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:$ENVIRONMENT

# Build PRODUCTION
FROM node:18-alpine AS PRODUCTION
COPY --from=BUILD /app/package.json ./
COPY --from=BUILD /app/next.config.js ./
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static
COPY --from=BUILD /app/.next/server ./.next/server

EXPOSE 3000

CMD ["node", "server.js"]