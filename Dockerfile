# Сборка отделена от финального образа: vite, tailwind, vitest и drizzle-kit
# нужны, чтобы собрать ассеты, а приложению в рантайме нет.
FROM node:26-slim AS builder

# corepack из образов Node 26 убран, поэтому pnpm ставится напрямую. Версия
# берётся из поля packageManager, чтобы образ и разработка совпадали.
RUN npm install -g pnpm@11.20.0

WORKDIR /app

# Зависимости ставятся до копирования кода, чтобы слой с ними переиспользовался
# и не пересобирался на каждую правку исходников.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Дерево обрезается здесь же, а не в финальном образе: тот тогда копирует
# готовый прод-набор и не ходит в реестр второй раз.
RUN pnpm prune --prod

FROM node:26-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY server ./server
COPY db ./db

# Приложение запускается нодой напрямую, без pnpm и без Makefile: в финальном
# образе живёт одна команда, а пакетный менеджер тянул бы за собой и себя, и
# проверку состояния node_modules. Обрезанное дерево эту проверку не проходит
# (pnpm-lock.yaml здесь нет), и pnpm молча уходил ставить зависимости заново,
# после чего контейнер падал на «Ignored build scripts».
#
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
CMD ["node", "node_modules/fastify-cli/cli.js", "start", "-a", "0.0.0.0", "-l", "info", "-P", "-o", "server/plugin.js"]
