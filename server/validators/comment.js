// @ts-check

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { comments } from "../../db/schema/index.js";
import { formatErrors } from "./errors.js";

// Имя необязательно: пустую строку оставляем в базе, а подстановку «Аноним»
// делает шаблон через перевод. Так английский интерфейс не покажет русское
// слово из базы. Обязателен только текст комментария.
const commentSchema = createInsertSchema(comments, {
  author: z.string().trim().optional().default(""),
  content: z.string().trim().min(1),
}).pick({ author: true, content: true });

export const validateComment = (data) => {
  const result = commentSchema.safeParse(data ?? {});

  return result.success
    ? { data: result.data, errors: null }
    : { data: null, errors: formatErrors(result.error) };
};
