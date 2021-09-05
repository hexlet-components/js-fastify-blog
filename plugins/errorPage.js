// @ts-check

import fp from 'fastify-plugin';
import fastifyErrorPage from 'fastify-error-page';

export default fp(async (fastify) => {
  if (fastify.mode !== 'production') {
    fastify.register(fastifyErrorPage);
  }
});
