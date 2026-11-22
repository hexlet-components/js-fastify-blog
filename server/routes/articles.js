// @ts-check

import { eq } from "drizzle-orm";
import i18next from "i18next";
import { articles } from "../../db/schema/index.js";
import { findArticle } from "../helpers/articles.js";
import { findComments } from "../helpers/comments.js";
import { validateArticle } from "../validators/article.js";

export default (app) => {
  const updateArticle = async (req, reply) => {
    const { id } = req.params;
    const article = await findArticle(app, id);
    const { data, errors } = validateArticle(req.body.data);

    if (errors) {
      req.flash("error", i18next.t("views.article.edit.error"));
      reply.code(422);
      reply.render("articles/edit", { article: { ...article, ...req.body.data }, errors });
      return reply;
    }

    await app.db
      .update(articles)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(articles.id, Number(id)));

    req.flash("info", i18next.t("views.article.edit.success"));
    reply.redirect(app.reverse("articles"));
    return reply;
  };

  const destroyArticle = async (req, reply) => {
    const { id } = req.params;

    try {
      await app.db.delete(articles).where(eq(articles.id, Number(id)));
      req.flash("info", i18next.t("views.article.delete.success"));
    } catch (e) {
      console.log(e);
      req.flash("error", i18next.t("views.article.delete.error"));
    }

    reply.redirect(app.reverse("articles"));
    return reply;
  };

  app
    .get("/articles", { name: "articles" }, async (req, reply) => {
      reply.render("articles/index", { articles: await app.db.select().from(articles) });
      return reply;
    })
    .get("/articles/new", { name: "newArticle" }, (req, reply) => {
      reply.render("articles/new", { article: { title: "", content: "" } });
    })
    .post("/articles", async (req, reply) => {
      const { data, errors } = validateArticle(req.body.data);

      if (errors) {
        req.flash("error", i18next.t("views.article.create.error"));
        reply.code(422);
        reply.render("articles/new", { article: req.body.data ?? {}, errors });
        return reply;
      }

      await app.db.insert(articles).values(data);
      req.flash("info", i18next.t("views.article.create.success"));
      reply.redirect(app.reverse("articles"));
      return reply;
    })
    .get("/articles/:id", { name: "article" }, async (req, reply) => {
      const article = await findArticle(app, req.params.id);

      if (!article) {
        reply.callNotFound();
        return reply;
      }

      reply.render("articles/show", {
        article,
        comments: await findComments(app, article.id),
        comment: {},
      });
      return reply;
    })
    .get("/articles/:id/edit", { name: "editArticle" }, async (req, reply) => {
      reply.render("articles/edit", { article: await findArticle(app, req.params.id) });
      return reply;
    })
    // HTML-форма умеет только GET и POST, поэтому PATCH и DELETE приходят
    // POST-запросом со скрытым полем `_method`. Разбирает его плагин
    // @hexlet/fastify-method-override, подключённый в plugin.js.
    .patch("/articles/:id", updateArticle)
    .delete("/articles/:id", destroyArticle);
};
