// @ts-check

import fp from 'fastify-plugin';
import fatifyReverseRoutes from 'fastify-reverse-routes';

export default fp(async (fastify) => {
  fastify.register(fatifyReverseRoutes.plugin);
});
