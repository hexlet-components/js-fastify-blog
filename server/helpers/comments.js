// @ts-check

import { eq } from "drizzle-orm";
import { comments } from "../../db/schema/index.js";

// Порядок по id совпадает с порядком добавления: identity-колонка растёт
// монотонно, а у created_at может совпасть значение внутри одной секунды.
export const findComments = async (app, articleId) =>
  app.db
    .select()
    .from(comments)
    .where(eq(comments.articleId, Number(articleId)))
    .orderBy(comments.id);
