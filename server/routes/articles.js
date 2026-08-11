// @ts-check

import { eq } from "drizzle-orm";
import i18next from "i18next";
import { articles } from "../../db/schema.js";
import { validateArticle } from "../validators/article.js";

export default (app) => {
  const findArticle = (id) =>
    app.db
      .select()
      .from(articles)
      .where(eq(articles.id, Number(id)))
      .get();

  const updateArticle = async (req, reply) => {
    const { id } = req.params;
    const article = findArticle(id);
    const { data, errors } = validateArticle(req.body.data);

    if (errors) {
      req.flash("error", i18next.t("views.article.edit.error"));
      reply.code(422);
      reply.render("articles/edit", { article: { ...article, ...req.body.data }, errors });
      return reply;
    }

    app.db
      .update(articles)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(articles.id, Number(id)))
      .run();

    req.flash("info", i18next.t("views.article.edit.success"));
    reply.redirect(app.reverse("articles"));
    return reply;
  };

  const destroyArticle = async (req, reply) => {
    const { id } = req.params;

    try {
      app.db
        .delete(articles)
        .where(eq(articles.id, Number(id)))
        .run();
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
      reply.render("articles/index", { articles: app.db.select().from(articles).all() });
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

      app.db.insert(articles).values(data).run();
      req.flash("info", i18next.t("views.article.create.success"));
      reply.redirect(app.reverse("articles"));
      return reply;
    })
    .get("/articles/:id", { name: "article" }, async (req, reply) => {
      reply.render("articles/show", { article: findArticle(req.params.id) });
      return reply;
    })
    .get("/articles/:id/edit", { name: "editArticle" }, async (req, reply) => {
      reply.render("articles/edit", { article: findArticle(req.params.id) });
      return reply;
    })
    .patch("/articles/:id", updateArticle)
    .delete("/articles/:id", destroyArticle)
    // HTML-форма умеет только GET и POST, поэтому PATCH и DELETE приходят
    // POST-запросом со скрытым полем `_method`.
    //
    // Раньше его разбирал пакет fastify-method-override. Он заброшен с 2023
    // года и с fastify 5 роняет приложение на старте: «plugin being registered
    // mixes async and callback styles».
    //
    // Замена сделана явной регистрацией маршрута, а не хуком: маршрутизация в
    // fastify происходит раньше хуков, поэтому подменить метод в onRequest
    // нельзя. Маршрутов таких два, и здесь видно, куда уходит POST.
    .post("/articles/:id", async (req, reply) => {
      const method = String(req.body?._method ?? "").toLowerCase();

      if (method === "patch") {
        return updateArticle(req, reply);
      }

      if (method === "delete") {
        return destroyArticle(req, reply);
      }

      // Ответ обязан быть отправлен: с одним лишь reply.code() запрос повисает
      // до таймаута, а не отвечает 405.
      return reply.code(405).send({ error: "Method Not Allowed" });
    });
};
