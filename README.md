# JS Fastify Blog

[![Main](https://github.com/hexlet-components/js-fastify-blog/actions/workflows/main.yml/badge.svg)](https://github.com/hexlet-components/js-fastify-blog/actions/workflows/main.yml)

## Requirement

* NodeJS v20.6.1
* Sqlite или PostgreSQL

## Commands

```bash
make install
make dev
```

## Run tests with Postgres

To run tests with Postgres, you need to edit *config/config.cjs* and under the `test` key comment out the use of SQLite and uncomment the environment variables

```js
  // test: {
  //   dialect: 'sqlite',
  //   storage: './database.test.sqlite',
  // },
  test: {
    dialect: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  },
```

Specify environment variables manually or prepare a *.env* file with the command

```bash
make prepare-env
```

In it specify the data to connect to the database

```dotenv
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
```

## Running an application with Postgres (production)

Export environment variables to work with the database or prepare a *.env* file with variables

Run

```bash
make build # build assets
make start # Open in browser: http://localhost:8080
```

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
