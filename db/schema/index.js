import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Диалект один, PostgreSQL: локально его роль играет PGlite (тот же postgres,
// собранный в WebAssembly), на деплое настоящий сервер. Раньше диалектов было
// два, и схему приходилось держать в двух файлах: типы колонок drizzle берёт
// из разных пакетов, и таблица из sqlite-core в pg-core не подходит.
//
// Колонки в snake_case: так их создала первая миграция, и существующая база
// должна остаться читаемой.
export const articles = pgTable("articles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default { articles };
