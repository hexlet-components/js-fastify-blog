// @ts-check

import { and, eq } from "drizzle-orm";
import fastify from "fastify";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { articles } from "../db/schema/index.js";
import init from "../server/plugin.js";

// TODO: сейчас каждый тест оставляет после себя артефакты в БД
// попытатся использовать транзакции или перед каждым тестом очищать БД

describe("requests", () => {
  let app;

  // Sequelize отдавал модель с findOne/findByPk. У drizzle это запросы, поэтому
  // два маленьких хелпера вместо повторения select().from().where() в каждом
  // тесте. `?? null` сохраняет прежнее поведение: не найдено это null, а не
  // undefined, и проверки toBeNull() остаются осмысленными.
  const findArticle = async ({ title, content }) => {
    const [article] = await app.db
      .select()
      .from(articles)
      .where(and(eq(articles.title, title), eq(articles.content, content)))
      .limit(1);

    return article ?? null;
  };

  const findArticleById = async (id) => {
    const [article] = await app.db.select().from(articles).where(eq(articles.id, id)).limit(1);

    return article ?? null;
  };

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
  });

  test("GET 200", async () => {
    const res = await app.inject({
      method: "GET",
      url: app.reverse("root"),
    });
    expect(res.statusCode).toBe(200);
  });

  test("GET 404", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/wrong-path",
    });
    expect(res.statusCode).toBe(404);
  });

  test("show articles - GET /articles", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/articles",
    });

    expect(response.statusCode).toBe(200);
  });

  test("new article - GET /articles/new", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/articles/new",
    });

    expect(response.statusCode).toBe(200);
  });

  test("create article - POST /articles", async () => {
    const newArticleData = {
      title: "Article 1",
      content: "Article 1 content",
    };

    const response = await app.inject({
      method: "POST",
      url: "/articles",
      payload: {
        data: newArticleData,
      },
    });

    expect(response.statusCode).toBe(302);

    const article = await findArticle(newArticleData);
    expect(article).not.toBeNull();
  });

  test("edit article - GET /articles/:id", async () => {
    const newArticleData = {
      title: "Article 2",
      content: "Article 2 content",
    };

    await app.inject({
      method: "POST",
      url: "/articles",
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await findArticle(newArticleData);

    const response2 = await app.inject({
      method: "GET",
      url: `/articles/${newArticle.id}`,
    });

    expect(response2.statusCode).toBe(200);
  });

  test("update article - PATCH /articles/:id", async () => {
    const newArticleData = {
      title: "Article 3",
      content: "Article 3 content",
    };

    await app.inject({
      method: "POST",
      url: "/articles",
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await findArticle(newArticleData);

    const updatedArticleData = {
      title: "Article updated",
      content: "Article updated content",
    };

    const response2 = await app.inject({
      method: "PATCH",
      url: `/articles/${newArticle.id}`,
      payload: {
        data: updatedArticleData,
      },
    });

    expect(response2.statusCode).toBe(302);

    const updatedArticle = await findArticle(updatedArticleData);
    expect(updatedArticle).not.toBeNull();
    const article = await findArticle(newArticleData);
    expect(article).toBeNull();
  });

  // Формы отправляют PATCH и DELETE как POST со скрытым полем `_method`,
  // потому что HTML умеет только GET и POST. Прямые PATCH и DELETE проверяются
  // выше, здесь проверяется именно подмена.
  test("update article - POST with _method=patch", async () => {
    const articleData = {
      title: "Article via _method",
      content: "Article via _method content",
    };

    await app.inject({
      method: "POST",
      url: "/articles",
      payload: { data: articleData },
    });

    const article = await findArticle(articleData);

    const updatedData = {
      title: "Article via _method updated",
      content: "Article via _method updated content",
    };

    const response = await app.inject({
      method: "POST",
      url: `/articles/${article.id}`,
      payload: { _method: "patch", data: updatedData },
    });

    expect(response.statusCode).toBe(302);
    expect(await findArticle(updatedData)).not.toBeNull();
  });

  test("delete article - POST with _method=delete", async () => {
    const articleData = {
      title: "Article to delete via _method",
      content: "Article to delete via _method content",
    };

    await app.inject({
      method: "POST",
      url: "/articles",
      payload: { data: articleData },
    });

    const article = await findArticle(articleData);

    const response = await app.inject({
      method: "POST",
      url: `/articles/${article.id}`,
      payload: { _method: "delete" },
    });

    expect(response.statusCode).toBe(302);
    expect(await findArticleById(article.id)).toBeNull();
  });

  test("POST without _method is rejected", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/articles/1",
      payload: {},
    });

    expect(response.statusCode).toBe(405);
  });

  test("delete article - DELETE /articles/:id", async () => {
    const newArticleData = {
      title: "Article 4",
      content: "Article 4 content",
    };

    await app.inject({
      method: "POST",
      url: "/articles",
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await findArticle(newArticleData);

    const response2 = await app.inject({
      method: "DELETE",
      url: `/articles/${newArticle.id}`,
    });

    expect(response2.statusCode).toBe(302);

    const updatedArticle = await findArticle(newArticleData);
    expect(updatedArticle).toBeNull();
  });

  test("show article - GET /articles/:id", async () => {
    const newArticleData = {
      title: "Article 5",
      content: "Article 5 content",
    };

    await app.inject({
      method: "POST",
      url: "/articles",
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await findArticle(newArticleData);

    const response2 = await app.inject({
      method: "GET",
      url: `/articles/${newArticle.id}`,
    });

    expect(response2.statusCode).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
