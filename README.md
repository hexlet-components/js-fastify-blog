# JS Fastify Blog

[![Main](https://github.com/hexlet-components/js-fastify-blog/actions/workflows/main.yml/badge.svg)](https://github.com/hexlet-components/js-fastify-blog/actions/workflows/main.yml)

## Зачем это нужно

Блог на [Fastify](https://fastify.dev/): статьи, формы, серверный рендеринг
шаблонов, база через ORM, локализация.

Служит примером приложения, которое больше одного файла с маршрутами, и
используется курсами про докер, Vagrant и деплой как то, что нужно упаковать и
развернуть. Отсюда и две базы: sqlite по умолчанию, чтобы запускалось без
внешних сервисов, и PostgreSQL для деплоя.

## Requirement

* NodeJS v26
* Sqlite (по умолчанию) или PostgreSQL

## Commands

```bash
make install
make dev
```

## Database

The application runs on SQLite by default, so `make install && make dev` needs
nothing else installed. Migrations are applied at startup.

To use PostgreSQL, set `DATABASE_CLIENT=postgres` and point the app at the
database, either with `DATABASE_URL` or with the separate variables below.

```bash
make prepare-env    # creates .env from .env.example
```

```dotenv
DATABASE_CLIENT=postgres
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres

# instead of DATABASE_URL the parts can be given separately
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
```

The same variable selects the dialect for tests and for migration generation:

```bash
make test                                   # SQLite, in-memory
DATABASE_CLIENT=postgres make test          # PostgreSQL

pnpm run db:generate                        # SQLite migrations
DATABASE_CLIENT=postgres pnpm run db:generate   # PostgreSQL migrations
```

Each dialect keeps its own schema (`db/schema/sqlite.js`, `db/schema/pg.js`) and
its own migrations (`db/migrations-sqlite`, `db/migrations-pg`). Drizzle cannot
describe both with one definition: column types come from different packages.

## Running an application with Postgres (production)

Set `DATABASE_CLIENT=postgres` and the connection variables, then run

```bash
make build # build assets
make start # Open in browser: http://localhost:8080
```

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
