// @ts-check

export default async (fastify) => {
  fastify.get('/articles', { name: 'articles' }, async (req, reply) => {
    const articles = await fastify.db.models.Article.findAll();
    reply.render('articles/index', { articles });
    return reply;
  });

  fastify.get('/articles/new', { name: 'newArticle' }, async (req, reply) => {
    reply.render('index');
    return reply;
  });

  fastify.get('/articles/:id/edit', { name: 'editArticle' }, async (req, reply) => {
    reply.render('index');
    return reply;
  });

  fastify.get('/articles/:id', { name: 'article' }, async (req, reply) => {
    reply.render('index');
    return reply;
  });
};
