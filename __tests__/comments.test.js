// @ts-check

import { eq } from "drizzle-orm";
import fastify from "fastify";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { articles } from "../db/schema/index.js";
import { findComments } from "../server/helpers/comments.js";
import init from "../server/plugin.js";

describe("comments", () => {
  let app;
  let articleNumber = 0;

  const createArticle = async () => {
    articleNumber += 1;
    const title = `Article ${articleNumber}`;
    const response = await app.inject({
      method: "POST",
      url: "/articles",
      payload: { data: { title, content: `${title} content` } },
    });

    expect(response.statusCode).toBe(302);

    const [article] = await app.db
      .select()
      .from(articles)
      .where(eq(articles.title, title))
      .limit(1);

    return article;
  };

  const addComment = async (articleId, data) =>
    app.inject({
      method: "POST",
      url: `/articles/${articleId}/comments`,
      payload: { data },
    });

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
  });

  test("shows an empty state for an article without comments", async () => {
    const article = await createArticle();
    const response = await app.inject({
      method: "GET",
      url: app.reverse("article", { id: article.id }),
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toContain("No comments yet");
    expect(response.payload).toContain("Add a comment");
  });

  test("adds a comment and shows it on the article page", async () => {
    const article = await createArticle();
    const response = await addComment(article.id, { author: "Alice", content: "First comment" });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe(`/articles/${article.id}`);

    const created = await findComments(app, article.id);
    expect(created).toHaveLength(1);
    expect(created[0]).toMatchObject({
      articleId: article.id,
      author: "Alice",
      content: "First comment",
    });

    const page = await app.inject({
      method: "GET",
      url: `/articles/${article.id}`,
    });

    expect(page.payload).toContain("Alice");
    expect(page.payload).toContain("First comment");
  });

  test("allows an empty author and renders the anonymous label", async () => {
    const article = await createArticle();
    const response = await addComment(article.id, { author: "   ", content: "No name here" });

    expect(response.statusCode).toBe(302);

    const created = await findComments(app, article.id);
    expect(created).toHaveLength(1);
    expect(created[0].author).toBe("");

    const page = await app.inject({
      method: "GET",
      url: `/articles/${article.id}`,
    });

    expect(page.payload).toContain("Anonymous");
    expect(page.payload).toContain("No name here");
  });

  test("rejects an empty comment content without saving it", async () => {
    const article = await createArticle();
    const response = await addComment(article.id, { author: "Bob", content: "   " });

    expect(response.statusCode).toBe(422);
    expect(response.payload).toContain("Bob");
    expect(response.payload).toContain("Add a comment");
    expect(await findComments(app, article.id)).toHaveLength(0);
  });

  test("returns 404 when the article does not exist", async () => {
    const response = await addComment(999_999, { content: "Orphan comment" });

    expect(response.statusCode).toBe(404);
  });

  test("shows comments only on their own article", async () => {
    const first = await createArticle();
    const second = await createArticle();

    await addComment(first.id, { author: "Alice", content: "Only on the first article" });

    const firstPage = await app.inject({
      method: "GET",
      url: `/articles/${first.id}`,
    });
    const secondPage = await app.inject({
      method: "GET",
      url: `/articles/${second.id}`,
    });

    expect(firstPage.payload).toContain("Only on the first article");
    expect(secondPage.payload).not.toContain("Only on the first article");
  });

  afterAll(async () => {
    await app.close();
  });
});
