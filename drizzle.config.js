import { defineConfig } from "drizzle-kit";

// Конфиг drizzle-kit выбирается тем же DATABASE_CLIENT, что и схема в
// db/schema/index.js. Миграции у диалектов свои: SQL, сгенерированный для
// sqlite, в postgres не применить.
//
//   pnpm run db:generate            # sqlite
//   DATABASE_CLIENT=postgres pnpm run db:generate
const isPostgres = process.env.DATABASE_CLIENT === "postgres";

export default isPostgres
  ? defineConfig({
      dialect: "postgresql",
      schema: "./db/schema/pg.js",
      out: "./db/migrations-pg",
      dbCredentials: {
        url:
          process.env.DATABASE_URL ??
          `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
      },
    })
  : defineConfig({
      dialect: "sqlite",
      schema: "./db/schema/sqlite.js",
      out: "./db/migrations-sqlite",
      dbCredentials: {
        url: process.env.DATABASE_PATH ?? "./database.sqlite",
      },
    });
