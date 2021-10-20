// @ts-check

import fatifyReverseRoutes from 'fastify-reverse-routes';

export default (fastify) => {
  fastify.register(fatifyReverseRoutes.plugin);
};
