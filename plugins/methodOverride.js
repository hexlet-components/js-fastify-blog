// @ts-check

import fp from 'fastify-plugin';
import fastifyMethodOverride from 'fastify-method-override';

export default fp(async (fastify) => {
  fastify.register(fastifyMethodOverride);
});
