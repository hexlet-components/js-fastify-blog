// @ts-check

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import fp from "fastify-plugin";
import * as schema from "../../db/schema.js";

// Путь к базе. Раньше три окружения описывал config.cjs для Sequelize.
//
// В тестах база живёт в памяти и создаётся заново на каждый прогон. Прежняя
// схема с файлом database.test.sqlite требовала отдельного шага pretest,
// который откатывал и накатывал миграции; без него строки от предыдущих
// прогонов накапливались, и тесты начинали находить чужие статьи вместо своих.
const getDatabasePath = () => {
  if (process.env.DATABASE_PATH) {
    return process.env.DATABASE_PATH;
  }

  return process.env.NODE_ENV === "test" ? ":memory:" : "./database.sqlite";
};

export default fp(async (app) => {
  const sqlite = new Database(getDatabasePath());
  const db = drizzle(sqlite, { schema });

  // Миграции применяются на старте. У Sequelize это был отдельный шаг
  // `sequelize db:migrate` в prestart и pretest, и он разъезжался с кодом.
  migrate(db, { migrationsFolder: "./db/migrations" });

  app.decorate("db", db);
  app.decorate("schema", schema);
  app.addHook("onClose", async () => {
    sqlite.close();
  });
});
