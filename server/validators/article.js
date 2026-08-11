// @ts-check

import { createInsertSchema } from "drizzle-zod";
import { articles } from "../../db/schema/index.js";

// Схема выводится из схемы таблицы, поэтому типы колонок и обязательность
// полей не дублируются руками. Сверху добавлено только то, чего в таблице нет:
// запрет пустой строки. Раньше это была валидация `notEmpty` внутри модели
// Sequelize.
const articleSchema = createInsertSchema(articles, {
  title: (schema) => schema.min(1),
  content: (schema) => schema.min(1),
}).pick({ title: true, content: true });

/**
 * Приводит ошибки zod к виду, который ожидают шаблоны: массив объектов
 * `{ path, message }`. Ровно так выглядели ошибки Sequelize, и миксины форм
 * группируют их по `path`.
 */
const formatErrors = (error) =>
  error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

export const validateArticle = (data) => {
  const result = articleSchema.safeParse(data ?? {});

  return result.success
    ? { data: result.data, errors: null }
    : { data: null, errors: formatErrors(result.error) };
};
