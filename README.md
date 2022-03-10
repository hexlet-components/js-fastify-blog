# JS Fastify Blog

[![Node CI](https://github.com/hexlet-components/js-fastify-blog/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-fastify-blog/actions)

## Требования

* NodeJS v14.18.1
* Sqlite или PostgreSQL

## Команды

```bash
make setup
```

## Запуск тестов с Postgres

Для запуска тестов с Postgres необходимо отредактировать *config/config.cjs* и под ключом `test` закомментировать использование SQLite и раскомментировать переменные окружения

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

Указать переменные окружения вручную или подготовить файл *.env* командой

```bash
make env-prepare
```

В нём указать данные для подключения к БД

```dotenv
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
```

## Запуск приложения с Postgres (продакшен)

Экспортировать переменные окружения для работы с БД или подготовить *.env* файл с переменными

Запуск

```bash
make start # Open in browser: http://localhost:8080
```

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-fastify-blog).
