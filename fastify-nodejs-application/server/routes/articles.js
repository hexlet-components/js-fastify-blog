// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/articles', { name: 'articles' }, async (req, reply) => {
      const articles = await app.objection.models.article.query();
      reply.render('articles/index', { articles });
      return reply;
    })
    .get('/articles/:id', { name: 'article' }, async (req, reply) => {
      const { id } = req.params;
      const article = await app.objection.models.article.query().findById(id);
      reply.render('articles/show', { article });
      return reply;
    })
    .delete('/articles/:id', async (req, reply) => {
      const { id } = req.params;
      await app.objection.models.article.query().deleteById(id);
      req.flash('info', i18next.t('flash.articles.delete.success'));
      reply.redirect(app.reverse('articles'));
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
    .get('/articles/new', { name: 'newArticle' }, (req, reply) => {
      const article = new app.objection.models.article();
      reply.render('articles/new', { article });
    })
    .post('/articles', async (req, reply) => {
      const article = new app.objection.models.article();
      article.$set(req.body.data);

      try {
        const validArticle = await app.objection.models.article.fromJson(req.body.data);
        await app.objection.models.article.query().insert(validArticle);
        req.flash('info', i18next.t('flash.articles.create.success'));
        reply.redirect(app.reverse('articles'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.articles.create.error'));
        reply.render('articles/new', { article, errors: data });
      }

      return reply;
    });
};
