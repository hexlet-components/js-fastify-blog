// @ts-check

import { eq } from "drizzle-orm";
import { articles } from "../../db/schema/index.js";

export const findArticle = async (app, id) => {
  const [article] = await app.db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)))
    .limit(1);

  return article ?? null;
};
