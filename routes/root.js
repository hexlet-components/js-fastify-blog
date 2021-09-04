// @ts-check

export default async (fastify) => {
  fastify.get('/', { name: 'root' }, async (req, reply) => {
    reply.render('index');
    return reply;
  });
};
