// @ts-check

import fastifyMethodOverride from 'fastify-method-override';

export default (fastify) => {
  fastify.register(fastifyMethodOverride);
};
