# Сборка отделена от финального образа: better-sqlite3 компилируется из
# исходников, для этого нужны python3 и g++, и тащить их в рантайм незачем.
FROM node:26-slim AS builder

# corepack из образов Node 26 убран, поэтому pnpm ставится напрямую. Версия
# берётся из поля packageManager, чтобы образ и разработка совпадали.
RUN npm install -g pnpm@11.20.0

RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Зависимости ставятся до копирования кода, чтобы слой с ними переиспользовался
# и не пересобирался на каждую правку исходников.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:26-slim

# make нужен в рантайме: команды приложения живут в Makefile.
RUN apt-get update && apt-get install -y --no-install-recommends make \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g pnpm@11.20.0

WORKDIR /app
COPY --from=builder /app /app

# Порт не задаётся: fastify-cli по умолчанию слушает 3000, и на этот порт
# рассчитан урок docker_basics_course/600-network, где контейнер запускают
# как `docker run -p 8080:3000`.
#
# Адрес обязателен: на 127.0.0.1 сервер внутри контейнера снаружи недоступен,
# ровно об этом урок и рассказывает.
#
# Флаг -o обязателен тоже: без него fastify-cli не читает экспорт `options` из
# плагина и регистрирует его дважды, падая с «Route with name root already
# registered».
CMD ["pnpm", "exec", "fastify", "start", "-a", "0.0.0.0", "-l", "info", "-P", "-o", "server/plugin.js"]
