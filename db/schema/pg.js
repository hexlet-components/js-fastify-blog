import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Постгресовая копия схемы из sqlite.js. Держать одну схему на два диалекта
// drizzle не умеет: типы колонок берутся из разных пакетов (pg-core против
// sqlite-core), и таблица, объявленная одним, другому не подходит.
//
// Оба диалекта нужны потому, что урок production_basics_course/550-database
// велит задеплоить блог с PostgreSQL, а локально проще держать файл sqlite.
export const articles = pgTable("articles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
