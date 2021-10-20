// @ts-check

import fastifyErrorPage from 'fastify-error-page';

export default (fastify) => {
  if (fastify.mode !== 'production') {
    fastify.register(fastifyErrorPage);
  }
};
