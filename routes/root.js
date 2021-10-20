// @ts-check

export default (fastify) => {
  fastify.get('/', { name: 'root' }, async (req, reply) => {
    reply.render('index');
    return reply;
  });
};
