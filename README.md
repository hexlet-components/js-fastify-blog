# JS Fastify Blog

[![Node CI](https://github.com/hexlet-components/js-fastify-blog/actions/workflows/nodeci.yml/badge.svg)](https://github.com/hexlet-components/js-fastify-blog/actions/workflows/nodeci.yml)

## Зачем это нужно

Блог на [Fastify](https://fastify.dev/): статьи, формы, серверный рендеринг
шаблонов, база через ORM, локализация.

Служит примером приложения, которое больше одного файла с маршрутами, и
используется курсами про докер, Vagrant и деплой как то, что нужно упаковать и
развернуть. База одна, PostgreSQL: локально её роль играет PGlite, тот же
postgres, собранный в WebAssembly и живущий внутри процесса, а на деплое
указывается настоящий сервер.

## Requirement

- NodeJS v26
- PostgreSQL — только для деплоя, локально не нужен

## Commands

```bash
make install
make dev
```

## Database

The application runs on PGlite by default, so `make install && make dev` needs
nothing else installed. The database lives in the `database/` directory,
migrations are applied at startup.

To use a PostgreSQL server, point the app at it, either with `DATABASE_URL` or
with the separate variables below.

```bash
make prepare-env    # creates .env from .env.example
```

```dotenv
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres

# instead of DATABASE_URL the parts can be given separately
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
```

The dialect is the same either way, so schema (`db/schema/index.js`) and
migrations (`db/migrations`) are single.

```bash
make test               # PGlite, in memory
pnpm run db:generate    # generate a migration from the schema
```

## Running an application with Postgres (production)

Set the connection variables, then run

```bash
make build # build assets
make start # Open in browser: http://localhost:8080
```

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
