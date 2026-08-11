// @ts-check

import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { migrate as migrateSqlite } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { migrate as migratePg } from "drizzle-orm/node-postgres/migrator";
import fp from "fastify-plugin";
import pg from "pg";
import schema, { isPostgres } from "../../db/schema/index.js";

// Диалект выбирается переменной DATABASE_CLIENT. По умолчанию sqlite: так блог
// запускается одной командой, без поднятой базы. PostgreSQL нужен для деплоя,
// его требует урок production_basics_course/550-database.
//
// Раньше три окружения описывал config.cjs для Sequelize, который умел оба
// диалекта из коробки. У drizzle схемы диалектов несовместимы, поэтому их две
// (db/schema/pg.js и db/schema/sqlite.js), и миграции у них тоже свои.

const buildPostgres = () => {
  const connectionString =
    process.env.DATABASE_URL ??
    `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}` +
      `@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

  const pool = new pg.Pool({ connectionString });
  const db = drizzlePg(pool, { schema });

  return {
    db,
    migrate: () => migratePg(db, { migrationsFolder: "./db/migrations-pg" }),
    close: () => pool.end(),
  };
};

const buildSqlite = () => {
  // В тестах база живёт в памяти и создаётся заново на каждый прогон. Файловая
  // тестовая база требовала отдельного шага, откатывающего и накатывающего
  // миграции; без него строки прошлых прогонов копились, и тесты начинали
  // находить чужие статьи.
  const path =
    process.env.DATABASE_PATH ??
    (process.env.NODE_ENV === "test" ? ":memory:" : "./database.sqlite");

  const sqlite = new Database(path);
  const db = drizzleSqlite(sqlite, { schema });

  return {
    db,
    migrate: () => migrateSqlite(db, { migrationsFolder: "./db/migrations-sqlite" }),
    close: async () => sqlite.close(),
  };
};

export default fp(async (app) => {
  const { db, migrate, close } = isPostgres ? buildPostgres() : buildSqlite();

  // Миграции применяются на старте. У Sequelize это был отдельный шаг
  // `sequelize db:migrate` в prestart и pretest, и он разъезжался с кодом.
  await migrate();

  app.decorate("db", db);
  app.decorate("schema", schema);
  app.addHook("onClose", async () => {
    await close();
  });
});
