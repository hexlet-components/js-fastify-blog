// @ts-check

import i18next from "i18next";
import { comments } from "../../db/schema/index.js";
import { findArticle } from "../helpers/articles.js";
import { findComments } from "../helpers/comments.js";
import { validateComment } from "../validators/comment.js";

export default (app) => {
  app.post("/articles/:id/comments", { name: "createComment" }, async (req, reply) => {
    const { id } = req.params;
    const article = await findArticle(app, id);

    if (!article) {
      reply.callNotFound();
      return reply;
    }

    const { data, errors } = validateComment(req.body.data);

    if (errors) {
      req.flash("error", i18next.t("views.comments.create.error"));
      reply.code(422);
      reply.render("articles/show", {
        article,
        comments: await findComments(app, article.id),
        comment: req.body.data ?? {},
        errors,
      });
      return reply;
    }

    await app.db.insert(comments).values({ ...data, articleId: article.id });
    req.flash("info", i18next.t("views.comments.create.success"));
    reply.redirect(app.reverse("article", { id: article.id }));
    return reply;
  });
};
