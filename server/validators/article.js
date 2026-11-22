// @ts-check

import { createInsertSchema } from "drizzle-zod";
import { articles } from "../../db/schema/index.js";
import { formatErrors } from "./errors.js";

// Схема выводится из схемы таблицы, поэтому типы колонок и обязательность
// полей не дублируются руками. Сверху добавлено только то, чего в таблице нет:
// запрет пустой строки. Раньше это была валидация `notEmpty` внутри модели
// Sequelize.
const articleSchema = createInsertSchema(articles, {
  title: (schema) => schema.min(1),
  content: (schema) => schema.min(1),
}).pick({ title: true, content: true });

export const validateArticle = (data) => {
  const result = articleSchema.safeParse(data ?? {});

  return result.success
    ? { data: result.data, errors: null }
    : { data: null, errors: formatErrors(result.error) };
};
