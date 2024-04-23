// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/articles', { name: 'articles' }, async (req, reply) => {
      console.log(app.db);
      const articles = await app.db.models.Article.findAll();
      reply.render('articles/index', { articles });
      return reply;
    })
    .get('/articles/new', { name: 'newArticle' }, (req, reply) => {
      const article = app.db.models.Article.build();
      reply.render('articles/new', { article });
    })
    .post('/articles', async (req, reply) => {
      const article = app.db.models.Article.build(req.body.data);

      try {
        await article.save();
        req.flash('info', i18next.t('views.article.create.success'));
        reply.redirect(app.reverse('articles'));
      } catch ({ errors }) {
        req.flash('error', i18next.t('views.article.create.error'));
        reply.code(422);
        console.log(errors);
        reply.render('articles/new', { article, errors });
      }

      return reply;
    })
    .get('/articles/:id', { name: 'article' }, async (req, reply) => {
      const { id } = req.params;
      const article = await app.db.models.Article.findByPk(id);
      reply.render('articles/show', { article });
      return reply;
    })
    .get('/articles/:id/edit', { name: 'editArticle' }, async (req, reply) => {
      const { id }= req.params;
      const article = await app.objection.models.article.query().findById(id);
      reply.render('articles/edit', { article });
      return reply;
    })
    .patch('/articles/:id', async (req, reply) => {
      const { id } = req.params;
      const articleData = req.body.data;
      await app.objection.models.article.query().patch(articleData).findById(id);
      req.flash('info', i18next.t('flash.articles.update.success'));
      reply.redirect(app.reverse('articles'));
      return reply;
    })
    .delete('/articles/:id', async (req, reply) => {
      const { id } = req.params;
      const article = await app.db.models.Article.findByPk(id);

      try {
        if (article) {
          await article.destroy();
        }
        req.flash('info', i18next.t('views.article.delete.success'));
      } catch ({ errors }) {
        req.flash('error', i18next.t('views.article.delete.error'));
      }

      reply.redirect(app.reverse('articles'));
      return reply;
    });
};
