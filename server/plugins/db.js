// @ts-check

import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { migrate as migratePg } from "drizzle-orm/node-postgres/migrator";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import fp from "fastify-plugin";
import pg from "pg";
import schema from "../../db/schema/index.js";

const migrationsFolder = "./db/migrations";

// База одна, PostgreSQL, и подключение выбирается по окружению. Задан адрес
// сервера (DATABASE_URL или DATABASE_HOST) — идём туда, этого требует урок
// production_basics_course/550-database. Не задан — база поднимается внутри
// процесса через PGlite, тот же postgres в WebAssembly.
//
// Так блог запускается одной командой и при этом говорит с той же СУБД, что на
// деплое. Раньше вторым диалектом был sqlite, и за него платили двумя схемами,
// двумя наборами миграций и сборкой нативного модуля better-sqlite3 из
// исходников, для которой в образ ставились python3 и g++.
const getConnectionString = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (!process.env.DATABASE_HOST) {
    return null;
  }

  const port = process.env.DATABASE_PORT ?? 5432;

  return (
    `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}` +
    `@${process.env.DATABASE_HOST}:${port}/${process.env.DATABASE_NAME}`
  );
};

const buildPostgres = (connectionString) => {
  const pool = new pg.Pool({ connectionString });
  const db = drizzlePg(pool, { schema });

  return {
    db,
    migrate: () => migratePg(db, { migrationsFolder }),
    close: () => pool.end(),
  };
};

const buildPglite = () => {
  // В тестах база живёт в памяти и создаётся заново на каждый прогон. Файловая
  // тестовая база требовала отдельного шага, откатывающего и накатывающего
  // миграции; без него строки прошлых прогонов копились, и тесты начинали
  // находить чужие статьи.
  const path =
    process.env.DATABASE_PATH ?? (process.env.NODE_ENV === "test" ? undefined : "./database");

  const client = new PGlite(path);
  const db = drizzlePglite(client, { schema });

  return {
    db,
    migrate: () => migratePglite(db, { migrationsFolder }),
    close: () => client.close(),
  };
};

export default fp(async (app) => {
  const connectionString = getConnectionString();
  const { db, migrate, close } = connectionString ? buildPostgres(connectionString) : buildPglite();

  // Миграции применяются на старте. Отдельным шагом они разъезжались с кодом:
  // приложение уже требовало колонку, которую забыли накатить.
  await migrate();

  app.decorate("db", db);
  app.decorate("schema", schema);
  app.addHook("onClose", async () => {
    await close();
  });
});
