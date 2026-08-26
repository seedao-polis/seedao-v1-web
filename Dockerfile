# syntax=docker/dockerfile:1

# CRA static site → nginx (port 3000, matches host reverse-proxy pattern)

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
# husky / canvas native build not needed for `yarn build`
ENV HUSKY=0
ENV CI=false
RUN yarn install --frozen-lockfile --ignore-scripts
COPY . .
RUN yarn build

FROM nginx:1.27-alpine AS runner
COPY deploy/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
